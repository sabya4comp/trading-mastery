# Markets in Profile — chapter content (grounded in the uploaded PDF)
BOOK = {
    "id": "mip",
    "short": "MiP",
    "title": "Markets in Profile",
    "author": "James Dalton, Robert B. Dalton & Eric T. Jones",
    "color": "#2dd4bf",
    "tagline": "Profiting from the auction process — fair value, timeframes, brackets, trends and asymmetric opportunity.",
    "blurb": "Dalton's deep dive into the auction process: how markets find fair value, how brackets and trends develop across timeframes, and how day traders read market-generated information for asymmetric opportunities.",
}

CHAPTERS = [
{
 "id": "mip-ch1", "num": 1, "title": "The Only Constant",
 "blurb": "Markets change constantly — from ERISA and relative performance to absolute return — but the auction process never changes.",
 "concepts": [
  {"t": "Change is the only constant", "b": "From the creation of ERISA, to the rise and fall of relative performance, the fall of the great bull, and the rise of absolute return — the environment keeps changing. The trader must adapt.", "k": "Adapt to the era — but the auction process underneath never changes."},
  {"t": "Succeeding in an absolute-return world", "b": "In an absolute-return environment, the goal is asymmetric opportunities — risking little to make a lot — not beating a benchmark.", "k": "Aim for asymmetric risk/reward, not benchmark-relative returns."},
  {"t": "Pure, unbiased information", "b": "The market itself produces pure, unbiased information: price, time, volume. Everything else is interpretation.", "k": "Market-generated information is the only truly unbiased information."},
  {"t": "People change markets, markets change people", "b": "Markets are made of people; crowd behavior moves prices, and price movement changes crowd behavior. It's a feedback loop.", "k": "Markets and psychology feed each other in a continuous loop."}
 ],
 "quiz": [
  {"q": "What is the 'only constant' in markets, according to Chapter 1?", "o": ["Change itself — while the auction process underneath stays the same", "Interest rates", "The S&P 500", "Volatility"], "a": 0, "x": "The chapter traces decades of change and concludes the process is constant."},
  {"q": "In an absolute-return market environment, what is the primary objective?", "o": ["Identifying asymmetric opportunities — risking little to gain a lot", "Beating the S&P 500", "Maximizing turnover", "Avoiding all risk"], "a": 0, "x": "The preface and Chapter 1 emphasize asymmetric opportunity over relative performance."},
  {"q": "Why is market-generated information called 'pure, unbiased'?", "o": ["Because the market itself produces it (price, time, volume) without anyone's opinion", "Because it is free", "Because it is always bullish", "Because it comes from the government"], "a": 0, "x": "MGMI reflects what all participants actually did — no spin."},
  {"q": "'People change markets, markets change people' describes…", "o": ["The feedback loop between crowd behavior and price", "A marketing slogan", "A labor strike", "An exchange merger"], "a": 0, "x": "Behavior moves price; price changes behavior."}
 ],
 "cards": [
  {"term": "Asymmetric opportunity", "def": "A trade where potential reward greatly exceeds the risk — the goal in an absolute-return world."},
  {"term": "Market-generated information (MGI)", "def": "Pure, unbiased data the market itself produces: price, time, volume."},
  {"term": "Absolute return", "def": "The post-1990s paradigm: making money regardless of market direction, not beating a benchmark."}
 ]
},
{
 "id": "mip-ch2", "num": 2, "title": "Information",
 "blurb": "Fundamental vs market-generated information, the auctions, fair value, and demystifying market behavior.",
 "concepts": [
  {"t": "Fundamental information", "b": "Fundamental information — news, earnings, supply/demand — must be interpreted, and 'rational or irrational?' — people are seldom rational when money is at stake.", "k": "Fundamentals are interpreted; people are irrational under pressure."},
  {"t": "Market-generated information and the auctions", "b": "The market is a continuous two-way auction. Market-generated information — what price actually did — is unbiased and reveals where trade facilitated.", "k": "The auction produces the only unbiased information: what price did."},
  {"t": "Fair value", "b": "Fair value is the price area where the auction is balanced — where buying and selling are roughly equal. The market auctions away from fair value and returns to it.", "k": "Fair value = the balanced center of the auction; the market returns to it."},
  {"t": "Market Profile fundamentals", "b": "Market Profile visualizes the auction: TPO letters build the distribution, showing where value formed and where the market was rejected.", "k": "The profile is a picture of the auction — value vs rejection."},
  {"t": "Demystifying market behavior", "b": "Once you see the market as an auction seeking fair value, 'mysterious' moves become logical: imbalances push price away from value; responsive activity brings it back.", "k": "Market behavior is logical once you see it as an auction."}
 ],
 "quiz": [
  {"q": "Why are people 'seldom rational' in markets?", "o": ["Because financial decisions are made under pressure with incomplete information", "Because they dislike math", "Because markets are random", "Because brokers force them"], "a": 0, "x": "Chapter 2: decisions under pressure + incomplete information → irrationality."},
  {"q": "What is 'fair value'?", "o": ["The price area where the auction is balanced between buyers and sellers", "The 200-day moving average", "The highest price of the day", "Analyst consensus"], "a": 0, "x": "Fair value is where trade facilitates evenly — the center of the profile."},
  {"q": "What makes market-generated information different from fundamental information?", "o": ["It is what the market actually did (price/time/volume), not anyone's interpretation", "It is always delayed", "It only works on Fridays", "It requires a subscription"], "a": 0, "x": "MGI is pure behavior; fundamentals are opinions about the future."},
  {"q": "How does the market 'demystify' its own behavior?", "o": ["By viewing it as a two-way auction that moves to facilitate trade and find fair value", "By publishing a manual", "By moving randomly", "By following cycles exactly"], "a": 0, "x": "The auction framework makes price movement logical and readable."}
 ],
 "cards": [
  {"term": "Two-way auction", "def": "The market mechanism where price moves up/down over time to facilitate trade."},
  {"term": "Fair value", "def": "The balanced price area of the auction where trade facilitates evenly."},
  {"term": "Market Profile", "def": "A chart of TPOs organizing price vs time to visualize the auction."},
  {"term": "Fundamental information", "def": "External data (news, reports, supply/demand) that requires interpretation."}
 ]
},
{
 "id": "mip-ch3", "num": 3, "title": "Timeframes",
 "blurb": "Scalpers, day traders, short-term, intermediate and long-term players — and why your timeframe is your strategy cornerstone.",
 "concepts": [
  {"t": "Breaking down market timeframes", "b": "Markets operate on multiple timeframes simultaneously: scalpers (seconds/minutes), day traders (the session), short-term (days), intermediate (weeks), long-term investors (months/years).", "k": "Every participant operates on a timeframe — know yours."},
  {"t": "The day trader's auction", "b": "The day trader reads the single-session auction: open, development, close. The day timeframe is where market-generated information is most actionable.", "k": "The day timeframe is the day trader's home auction."},
  {"t": "Your timeframe is your strategy cornerstone", "b": "Everything — holding period, risk, references — flows from your timeframe. Mixing timeframes without awareness is how traders get chopped up.", "k": "Pick your timeframe consciously; it defines your whole strategy."}
 ],
 "quiz": [
  {"q": "Which participants does Chapter 3 break market timeframes into?", "o": ["Scalper, day trader, short-term trader, intermediate trader/investor, long-term investor", "Only day traders", "Bulls and bears", "Morning and afternoon sessions"], "a": 0, "x": "Five timeframe players, from scalper to long-term investor."},
  {"q": "Why is 'your timeframe your strategy cornerstone'?", "o": ["Because holding period, risk and reference points all derive from it", "Because the exchange sets it for you", "Because it changes your commission", "Because longer is always better"], "a": 0, "x": "Timeframe defines strategy, risk and which references matter."},
  {"q": "For a day trader, the primary auction is…", "o": ["The single trading session — open to close", "The overnight session only", "The entire year", "The pre-market only"], "a": 0, "x": "Day traders read the day-timeframe auction."}
 ],
 "cards": [
  {"term": "Timeframe", "def": "The holding period a participant uses — from scalping seconds to investing years."},
  {"term": "Day trader", "def": "A trader who reads and trades the single-session auction, flat by the close."},
  {"term": "Scalper", "def": "A very short-term trader capturing small moves within seconds to minutes."}
 ]
},
{
 "id": "mip-ch4", "num": 4, "title": "Auctions and Indicators",
 "blurb": "The search for value, key market-generated indicators (POC, value area, initial balance), and visualization.",
 "concepts": [
  {"t": "The search for value", "b": "Every day the market auctions to find value — probing higher and lower until two-sided trade emerges. The day's range is the footprint of that search.", "k": "The market probes to find value; the range is the search footprint."},
  {"t": "Point of Control (POC)", "b": "The POC is the price with the most TPOs — the fairest price of the day, where the auction was most balanced.", "k": "POC = the price with the most TPOs = the day's fairest price."},
  {"t": "Value area", "b": "The value area contains roughly 70% of the day's TPOs around the POC — the accepted price region. The value area high (VAH) and low (VAL) are its edges.", "k": "Value area ≈ 70% of TPOs; VAH/VAL are its boundaries."},
  {"t": "Initial balance", "b": "The initial balance is the range of the first hour (first two TPOs periods). It often sets the day's tone and is a key reference for breakouts.", "k": "Initial balance = first-hour range; watch for breakout or balance."},
  {"t": "Visualization", "b": "Perfecting the art of visualization means mentally projecting where the auction is headed — using the developing profile to anticipate, not react.", "k": "Visualize the developing auction to anticipate rather than react."}
 ],
 "quiz": [
  {"q": "What is the Point of Control (POC)?", "o": ["The price level with the most TPOs — the day's fairest price", "The closing price", "The opening price", "The highest volume price of the month"], "a": 0, "x": "POC = most TPOs = fairest price."},
  {"q": "What does the value area represent?", "o": ["The price region holding about 70% of the day's TPOs around the POC", "The whole day's range", "Only the first hour", "The overnight range only"], "a": 0, "x": "Value area ≈ 70% of TPOs; its edges are VAH and VAL."},
  {"q": "What is the initial balance?", "o": ["The price range established during the first hour of trading", "The full day's range", "The margin balance", "The overnight gap"], "a": 0, "x": "First-hour range — a key reference for the day's development."},
  {"type": "chart", "shape": "trendUp", "q": "This profile is elongated upward with single prints at the top. What is happening?", "o": ["Range extension up — initiative buying is in control and the market is trending", "A balanced normal day", "Long liquidation at the lows", "A quiet open"], "a": 0, "x": "An elongated profile with excess on one side = one-sided initiative activity = trend/range extension."}
 ],
 "cards": [
  {"term": "POC (Point of Control)", "def": "The price with the most TPOs in a profile — the fairest price of the period."},
  {"term": "Value area", "def": "The region containing ~70% of TPOs around the POC; bounded by VAH and VAL."},
  {"term": "Initial balance", "def": "The range of the first hour of trading — a key day-timeframe reference."},
  {"term": "Range extension", "def": "Price moving beyond the established range with one-sided initiative activity."}
 ]
},
{
 "id": "mip-ch5", "num": 5, "title": "Long-Term Auctions",
 "blurb": "The compound auction process, the ebb and flow of balance, where trends end and brackets begin, and asymmetric opportunity.",
 "concepts": [
  {"t": "The compound-auction process", "b": "Long-term value is built by compounding daily auctions: each day adds or subtracts from the larger auction. The long-term profile is the sum of daily profiles.", "k": "Long-term value compounds from daily auctions."},
  {"t": "The ebb and flow of balance", "b": "Markets oscillate between balance (bracket/range) and imbalance (trend). Balance is where value accumulates; imbalance is where price moves.", "k": "Markets breathe: balance ↔ imbalance."},
  {"t": "Where trends end and brackets begin", "b": "A trend ends when initiative activity exhausts (excess) and responsive activity returns price to value — that's where a bracket begins.", "k": "Excess + responsive return = trend ends, bracket begins."},
  {"t": "Asymmetric opportunities and risk", "b": "The best long-term opportunities appear at the edges of balance — where the market is mispriced relative to the big picture, giving asymmetric risk/reward.", "k": "Edge of balance + big-picture context = asymmetric opportunity."},
  {"t": "Assembling the big picture: context within context", "b": "Long-term strategy means stacking context: yearly inside quarterly inside monthly inside daily. Each timeframe's value area informs the next.", "k": "Stack timeframes: context within context within context."}
 ],
 "quiz": [
  {"q": "What is the 'compound-auction process'?", "o": ["Long-term value built by compounding daily auctions over time", "A single day's range", "A type of order", "A news event"], "a": 0, "x": "Daily auctions compound into the long-term auction."},
  {"q": "Markets move in an 'ebb and flow' between…", "o": ["Balance (brackets) and imbalance (trends)", "Bull and bear only", "Open and close", "High and low volume"], "a": 0, "x": "Balance accumulates value; imbalance moves price."},
  {"q": "A trend typically ends when…", "o": ["Initiative activity exhausts (excess) and price returns to value, starting a bracket", "The news cycle ends", "Volume dries up completely", "The exchange closes"], "a": 0, "x": "Excess + return to value = trend → bracket transition."},
  {"q": "Why are bracket edges considered asymmetric opportunities?", "o": ["Because price there is mispriced vs the bigger picture — limited risk, larger potential reward", "Because they always reverse immediately", "Because volume is highest there", "Because they happen at the open only"], "a": 0, "x": "Edge of balance + context = favorable risk/reward."}
 ],
 "cards": [
  {"term": "Bracket (balance)", "def": "A trading range where the market auctions two-sided and builds value."},
  {"term": "Compound auction", "def": "How daily auctions compound to form the long-term market auction."},
  {"term": "Excess", "def": "Price movement beyond the value area — often the sign a move is exhausting."},
  {"term": "Context within context", "def": "Reading the market by stacking multiple timeframes, each inside the larger one."}
 ]
},
{
 "id": "mip-ch6", "num": 6, "title": "Intermediate-Term Auctions",
 "blurb": "Convergence, the bracketing process, bracket↔trend transitions, and the convergence of intellect and emotion.",
 "concepts": [
  {"t": "Defining the intermediate term & convergence", "b": "The intermediate term (days to weeks) is where brackets live. Convergence — price and time aligning — is how you read whether a bracket will hold or break.", "k": "Intermediate term = the bracketing timeframe; watch convergence."},
  {"t": "Bracket to trend, trend to bracket", "b": "A bracket transitions to a trend when one side gains control (initiative breakout with continuation). A trend transitions back to a bracket when the move exhausts into balance.", "k": "Breakout with continuation = bracket→trend; exhaustion = trend→bracket."},
  {"t": "Countertrend auctions", "b": "Countertrend auctions move against the prevailing trend — usually responsive, shorter-lived, and higher risk. Know when you're trading with vs against.", "k": "Countertrend = responsive move against the trend — riskier, shorter-lived."},
  {"t": "Convergence of intellect and emotion", "b": "The best trades happen when your intellectual read of structure and your emotional state align — when you're calm and the market confirms your read.", "k": "Trade when head and gut agree — intellect converging with emotion."},
  {"t": "The quest to do better than 'normal'", "b": "Most traders earn 'normal' results by doing normal things. Doing better requires doing the uncommon: preparation, patience, and reading MGI others ignore.", "k": "Better-than-normal results come from uncommon preparation and patience."}
 ],
 "quiz": [
  {"q": "In the intermediate term, markets mostly live in…", "o": ["Brackets (balance) that can transition to trends", "Permanent trends", "Single-point ranges", "Chaos"], "a": 0, "x": "Intermediate term = bracketing process with transitions."},
  {"q": "A bracket becomes a trend when…", "o": ["One side takes control with an initiative breakout that continues", "Volume disappears", "The market closes early", "Open interest drops to zero"], "a": 0, "x": "Initiative breakout + continuation = new trend."},
  {"q": "Countertrend auctions are…", "o": ["Responsive moves against the prevailing trend — shorter-lived and riskier", "Always the best trades", "Only possible in forex", "Guaranteed winners"], "a": 0, "x": "Countertrend = against the trend = higher risk, shorter duration."},
  {"q": "What does 'the convergence of intellect and emotion' mean for trading?", "o": ["Your structural read and your emotional state align — calm confidence in a confirmed read", "Feeling greedy at the highs", "Panic at the lows", "Ignoring the chart because you feel bullish"], "a": 0, "x": "Best trades: intellect and emotion converging, not conflicting."}
 ],
 "cards": [
  {"term": "Intermediate term", "def": "Days-to-weeks timeframe where brackets and transitions develop."},
  {"term": "Bracket → trend", "def": "Transition when initiative breakout continues beyond the range."},
  {"term": "Trend → bracket", "def": "Transition when a trend exhausts and price rebalances."},
  {"term": "Countertrend auction", "def": "A responsive move against the prevailing trend; shorter-lived, higher risk."}
 ]
},
{
 "id": "mip-ch7", "num": 7, "title": "Short-Term Trading",
 "blurb": "Mind traps, where to look for trades, reference points, fading extremes vs going with breakouts — 'the expert reasons contextually'.",
 "concepts": [
  {"t": "Analyzing short-term markets & common mind traps", "b": "Short-term analysis means reading the developing day auction. Common mind traps: anchoring to the open, recency bias, and trading every wiggle.", "k": "Avoid mind traps — don't anchor to the open or trade every wiggle."},
  {"t": "Where to look: around intermediate-term brackets", "b": "The best short-term trades occur around intermediate-term reference points — bracket edges, value areas, POCs of the larger timeframe.", "k": "Hunt short-term trades at the edges of bigger-timeframe structure."},
  {"t": "Your own worst enemy: your brain", "b": "Your brain seeks patterns and certainty; markets are probabilistic. The brain is the worst enemy — manage it with process, not willpower.", "k": "Your brain is your worst enemy — use process to manage it."},
  {"t": "Fade the extremes, go with breakouts", "b": "The core short-term playbook: fade (trade against) excess extremes, and go with confirmed breakouts of reference levels.", "k": "Fade extremes, follow breakouts."},
  {"t": "Reference points & 'the expert reasons contextually'", "b": "Never be a laggard: the all-important reference points are prior highs/lows, value area edges, POCs, initial balance. The expert reasons contextually — every level means something only in context.", "k": "Experts reason contextually: references matter relative to the bigger picture."}
 ],
 "quiz": [
  {"q": "Where should short-term traders look for the best opportunities?", "o": ["Around intermediate-term brackets and their reference points", "Only in the first minute", "Randomly", "Only on news days"], "a": 0, "x": "Opportunities cluster around larger-timeframe brackets and references."},
  {"q": "The core short-term playbook is to…", "o": ["Fade the extremes and go with confirmed breakouts", "Buy every dip blindly", "Sell every rally blindly", "Trade only at the close"], "a": 0, "x": "'Fade the Extremes, Go with Breakouts' is a named section of Chapter 7."},
  {"q": "Why is 'your brain' called your own worst enemy?", "o": ["Because it craves certainty and patterns while markets are probabilistic", "Because it forgets passwords", "Because it is slow", "Because it dislikes charts"], "a": 0, "x": "The brain's pattern-seeking conflicts with probabilistic markets."},
  {"q": "What does 'the expert reasons contextually' mean?", "o": ["Reference points matter only relative to the surrounding market context", "Experts memorize fixed rules", "Context never matters", "Experts ignore levels"], "a": 0, "x": "The same price level means different things in different contexts."}
 ],
 "cards": [
  {"term": "Fade the extremes", "def": "Trade against price excesses — betting on return to value."},
  {"term": "Reference points", "def": "Key prior levels: highs/lows, value area edges, POCs, initial balance."},
  {"term": "Mind traps", "def": "Cognitive biases (anchoring, recency) that sabotage short-term decisions."},
  {"term": "Contextual reasoning", "def": "Interpreting any price level relative to the larger market structure."}
 ]
},
{
 "id": "mip-ch8", "num": 8, "title": "Day Trading Is for Everyone",
 "blurb": "Top-down analysis, inventory imbalances, market condition, yesterday's trade, the five open types, and the day trader's checklist.",
 "concepts": [
  {"t": "Top down", "b": "Day trading starts top-down: read the overnight and prior day, establish the bigger context, then read today's open within it.", "k": "Always start top-down: context first, then the open."},
  {"t": "Inventory imbalances & their correction", "b": "If the market closes one-sided (e.g., too long), the next open often corrects the inventory — 'flight to safety' or liquidation drives the open. Watch yesterday's close for today's open bias.", "k": "Overnight inventory imbalance often drives the next open."},
  {"t": "Market condition from yesterday's trade", "b": "Yesterday's structure (trend day, normal day, range) sets expectations for today — but 'the market is open' means today can do anything; stay flexible.", "k": "Yesterday informs, but today's auction decides."},
  {"t": "The five open types", "b": "Open-drive (one-sided move from the open), open-test-drive (probe then reverse), open-rejection-reverse, open-auction (two-sided), and open-auction in/out of range — each tells you who controls the open.", "k": "Name the open: drive, test-drive, rejection-reverse, or auction."},
  {"t": "The day trader's checklist", "b": "A written checklist — context, references, open type, plan, risk — executed every day turns trading into a repeatable process. Practice until it's automatic.", "k": "Checklists make discipline repeatable — practice, practice, practice."}
 ],
 "quiz": [
  {"q": "A day trader should always begin with…", "o": ["Top-down analysis: overnight/prior-day context before today's open", "A random entry", "Buying the first dip", "Maximizing size"], "a": 0, "x": "'Top Down' — context before the open."},
  {"q": "What often drives the open after a one-sided close?", "o": ["Correction of the overnight inventory imbalance", "Nothing ever", "Only earnings", "The weather"], "a": 0, "x": "Inventory imbalances get corrected at/after the open."},
  {"q": "Which is NOT one of the classic open types in Markets in Profile?", "o": ["Open-super-drive-ultra", "Open-drive", "Open-test-drive", "Open-rejection-reverse"], "a": 0, "x": "The real ones: open-drive, open-test-drive, open-rejection-reverse, open-auction (in/out of range)."},
  {"q": "What does the day trader's checklist accomplish?", "o": ["A repeatable process: context, references, open type, plan and risk, every day", "A guarantee of profit", "Lower commissions", "Faster typing"], "a": 0, "x": "Checklists turn good habits into a repeatable daily process."}
 ],
 "cards": [
  {"term": "Open-drive", "def": "A one-sided move straight from the open — initiative activity in control."},
  {"term": "Open-test-drive", "def": "The open probes a level, gets rejected, and reverses — responsive control."},
  {"term": "Open-rejection-reverse", "def": "The open is rejected from the prior range and reverses direction."},
  {"term": "Open-auction", "def": "A two-sided open where price auctions within (or out of) range."},
  {"term": "Inventory imbalance", "def": "A one-sided overnight position that the next session tends to correct."}
 ]
},
{
 "id": "mip-ch9", "num": 9, "title": "Profiting from Market-Generated Information",
 "blurb": "Timeframe diversification and the new paradigm — using MGI across timeframes to build a real edge.",
 "concepts": [
  {"t": "Timeframe diversification", "b": "Reading MGI across multiple timeframes diversifies your information edge — the day inside the week inside the month gives far more context than any single chart.", "k": "Diversify across timeframes to diversify your information edge."},
  {"t": "The new paradigm", "b": "The new paradigm: trade the auction, not the news. In a world of instant information, the edge is reading what the market actually does with all that information.", "k": "Edge = reading the auction (MGI), not the headlines."}
 ],
 "quiz": [
  {"q": "What is 'timeframe diversification' in Markets in Profile?", "o": ["Using market-generated information across multiple timeframes for context and edge", "Trading many markets at once", "Using many indicators on one chart", "Holding positions overnight always"], "a": 0, "x": "Chapter 9: stack timeframes of MGI for a diversified edge."},
  {"q": "In the 'new paradigm', where does the trader's edge come from?", "o": ["Reading the auction / market-generated information, not interpreting news", "Reading more news faster", "Using more leverage", "Trading less information"], "a": 0, "x": "The market's own behavior is the edge in an information-saturated world."}
 ],
 "cards": [
  {"term": "Timeframe diversification", "def": "Combining MGI from multiple timeframes to diversify edge and context."},
  {"term": "New paradigm", "def": "Edge comes from reading the auction process, not from faster news."}
 ]
}
]
