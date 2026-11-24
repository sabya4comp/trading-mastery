# Market Mastery Academy 📈

A professional, gamified educational web app that teaches the trading concepts from the four
uploaded books — chapter by chapter, with lessons, quizzes, flashcards and interactive
Market Profile chart challenges.

## Source books (all content distilled from these PDFs)

| Short | Book | Chapters |
|-------|------|----------|
| SOM | **Steidlmayer on Markets** (Steidlmayer & Hawkins, 2nd ed.) | 13 |
| MiP | **Markets in Profile** (Dalton, Dalton & Jones) | 9 |
| MOM | **Mind Over Markets** (Dalton, Jones & Dalton, updated ed.) | 7 |
| M&M | **Markets and Momentum** (Dalton / MGI Trading) | 29 |

**Total: 58 gamified chapters · 188 concept cards · 170 quiz questions · 172 flashcards**

## Run it

No build step is required to use the app — it is a static site:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from disk also works (all data is embedded in `js/data.js`).

## Features

- **Dashboard** — XP, trader rank ladder (Novice → Market Master), daily streak, chapter
  progress, badge count, continue-learning shortcut, simulated leaderboard.
- **Library** — the four books with per-book progress rings and chapter lists.
- **Chapters** — sequential unlocking (finish a chapter quiz to unlock the next):
  - 📖 **Lesson**: concept cards with key takeaways, distilled from the chapter.
  - ❓ **Quiz**: multiple-choice with instant feedback, explanations, streak bonuses,
    first-completion and perfect-score XP bonuses. Includes **chart challenges** that render
    real Market Profile shapes (normal, trend, "p"/"b", double-distribution) as SVG and ask
    you to identify the day type / signal.
  - 🃏 **Flashcards**: flip cards of key terms; flipping all cards in a chapter earns a +10 XP
    review bonus.
- **Glossary** — all 172 terms searchable across books.
- **Profile** — rank ladder, stats, 12 badges (book completions, streaks, perfect scores,
  XP milestones, Market Master), leaderboard, and a reset button.
- **Gamification** — XP with streak multipliers, confetti on completion, badge-unlock toasts,
  daily login streaks. All progress persists in `localStorage`.

## Project structure

```
trading-mastery/
├── index.html               # app shell
├── css/style.css            # theme & components
├── js/app.js                # router, gamification engine, views, SVG profile renderer
├── js/data.js               # generated content (window.APP_DATA) — do not edit by hand
├── data/content.json        # generated content (readable copy)
└── tools/
    ├── content_steidlmayer.py   # chapter content per book (authored, grounded in the PDFs)
    ├── content_mip.py
    ├── content_mom.py
    ├── content_momentum_a.py    # chapters 1–15
    ├── content_momentum_b.py    # chapters 16–29
    ├── build.py                 # validates + builds data/content.json and js/data.js
    └── smoke.test.js            # jsdom end-to-end smoke test (39 assertions)
```

## Editing content

Edit the `tools/content_*.py` modules, then regenerate:

```bash
python3 tools/build.py     # validates structure and rewrites data/ + js/data.js
npm test                   # runs the jsdom smoke test (requires npm install)
```

Chapter schema: `blurb`, `concepts[{t,b,k}]` (title/body/key-takeaway), `quiz[{q,o[4],a,x,type?,shape?}]`
(`type:"chart"` + `shape` renders a profile SVG), `cards[{term,def}]`.

## Disclaimer

Educational content only, distilled from the source books for learning purposes.
Nothing here is financial advice.
