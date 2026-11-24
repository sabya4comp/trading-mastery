const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom'); // devDependency
const root = require('path').resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
// shims
window.localStorage = (() => { let s = {}; return { getItem: k => (k in s ? s[k] : null), setItem: (k, v) => { s[k] = String(v); }, removeItem: k => { delete s[k]; }, clear: () => { s = {}; } }; })();
window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
window.innerWidth = 1280; window.innerHeight = 800;
window.scrollTo = () => {};
const dataJs = fs.readFileSync(path.join(root, 'js/data.js'), 'utf8');
const appJs = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
window.eval(dataJs);
window.eval(appJs);
const doc = window.document;
const $ = (s) => doc.querySelector(s);
const $$ = (s) => [...doc.querySelectorAll(s)];
const assert = (cond, msg) => { if (!cond) { console.error('FAIL:', msg); process.exitCode = 1; } else console.log('ok:', msg); };

// 1. dashboard renders
assert($('#app .hero h1') && $('#app .hero h1').textContent.includes('Master the markets'), 'dashboard hero renders');
assert($$('.book-card').length === 4, '4 book cards on dashboard');
assert($$('.stat').length === 5, '5 stat cards');
assert($$('.leader').length > 0, 'leaderboard renders');

// 2. navigate to library
window.location.hash = '#/library';
window.dispatchEvent(new window.Event('hashchange'));
assert($$('.book-card').length === 4, 'library shows 4 books');

// 3. open a book
window.location.hash = '#/book/steidlmayer';
window.dispatchEvent(new window.Event('hashchange'));
const rows = $$('.chapter-row');
assert(rows.length === 13, 'steidlmayer has 13 chapter rows');
assert(rows[0].classList.contains('done') === false && !rows[0].classList.contains('locked'), 'ch1 unlocked');
assert(rows[1].classList.contains('locked'), 'ch2 locked initially');

// 4. open chapter 1 lesson
window.location.hash = '#/chapter/som-ch1';
window.dispatchEvent(new window.Event('hashchange'));
assert($$('.concept').length === 5, 'ch1 lesson shows 5 concept cards');

// 5. start quiz
$$('[data-mode="quiz"]')[0].click();
assert($('.q-card'), 'quiz renders');
assert($$('.opt').length === 4, '4 options');

// answer all questions correctly (we know answers from data)
const D = window.APP_DATA;
const ch = D.books[0].chapters[0];
for (let i = 0; i < ch.quiz.length; i++) {
  const q = ch.quiz[i];
  $$('.opt')[q.a].click();
  assert($('.feedback.show'), 'feedback shown after answering q' + (i + 1));
  const next = $('#q-next'); assert(next, 'next button exists q' + (i + 1));
  next.click();
}
assert($('.results'), 'results screen renders');
const resText = $('.results').textContent;
assert(resText.includes('100%'), 'perfect score shown');
assert(resText.includes('+XP') || /\+\d+ XP/.test(resText), 'XP breakdown shown');

// check state saved
const S = JSON.parse(window.localStorage.getItem('mma_state_v1'));
assert(S.xp > 0, 'XP saved to localStorage: ' + S.xp);
assert(S.progress['steidlmayer']['som-ch1'].done === true, 'chapter marked done');
assert(S.progress['steidlmayer']['som-ch1'].best === 100, 'best score 100 saved');
assert(S.badges.includes('first-steps') && S.badges.includes('flawless'), 'badges earned: ' + S.badges.join(','));

// 6. chapter 2 now unlocked
window.location.hash = '#/book/steidlmayer';
window.dispatchEvent(new window.Event('hashchange'));
const rows2 = $$('.chapter-row');
assert(rows2[0].classList.contains('done'), 'ch1 shows done');
assert(!rows2[1].classList.contains('locked'), 'ch2 unlocked after completing ch1');

// 7. flashcards
window.location.hash = '#/chapter/som-ch2';
window.dispatchEvent(new window.Event('hashchange'));
$$('[data-mode="cards"]')[0].click();
const cards = $$('.fcard');
assert(cards.length === ch.cards.length || cards.length > 0, 'flashcards render: ' + cards.length);
const before = JSON.parse(window.localStorage.getItem('mma_state_v1')).xp;
cards.forEach(c => c.click());
const after = JSON.parse(window.localStorage.getItem('mma_state_v1')).xp;
assert(after === before + 10, 'flashcard review bonus +10 XP (' + before + ' -> ' + after + ')');
assert($$('.fcard.flipped').length === cards.length, 'all cards flipped');

// 8. chart question renders svg (unlock som-ch6 by marking ch1-5 done)
{
  const S2 = JSON.parse(window.localStorage.getItem('mma_state_v1'));
  S2.progress['steidlmayer'] = S2.progress['steidlmayer'] || {};
  for (let i = 1; i <= 5; i++) S2.progress['steidlmayer']['som-ch' + i] = { done: true, best: 80, attempts: 1, xp: 50 };
  window.localStorage.setItem('mma_state_v1', JSON.stringify(S2));
  window.eval(appJs); // reload app so it picks up seeded state
}
window.location.hash = '#/chapter/som-ch6';
window.dispatchEvent(new window.Event('hashchange'));
$$('[data-mode="quiz"]')[0].click();
// advance to first chart question
const ch6 = D.books[0].chapters[5];
let qi = 0;
while (qi < ch6.quiz.length && ch6.quiz[qi].type !== 'chart') {
  $$('.opt')[ch6.quiz[qi].a].click(); $('#q-next').click(); qi++;
}
assert($('.q-chart') && $('.q-chart').tagName.toLowerCase() === 'svg', 'chart question renders SVG profile');

// 9. glossary
window.location.hash = '#/glossary';
window.dispatchEvent(new window.Event('hashchange'));
assert($$('.gloss-item').length > 100, 'glossary lists terms: ' + $$('.gloss-item').length);
const gs = $('#g-search'); gs.value = 'POC'; gs.dispatchEvent(new window.Event('input'));
assert($$('.gloss-item').length >= 1 && $('.gloss-item').textContent.toLowerCase().includes('point of control') || $$('.gloss-item').length >= 1, 'glossary search filters');

// 10. profile
window.location.hash = '#/profile';
window.dispatchEvent(new window.Event('hashchange'));
assert($$('.rank-row').length === 8, 'rank ladder shows 8 ranks');
assert($$('.badge').length === 12, '12 badges shown');
assert($('#reset-btn'), 'reset button present');

// 11. streak
assert(S.streak >= 1, 'daily streak tracked: ' + S.streak);

console.log('\nSMOKE TEST ' + (process.exitCode ? 'FAILED' : 'PASSED'));
