# Spotter (prototype)

Browser prototype of a camera-based lifting coach. Unrelated to the Home Offer Solutions site in this repo; it lives here until it gets its own repository and is not part of the site build.

## Run it

Open `index.html` in Chrome on a laptop (double-click works) and press **Start camera**. The first run downloads the pose model, so it needs an internet connection.

On a phone or tablet the page has to be served over https; a local file will not get camera access there.

## What it does

- Tracks your body with MediaPipe Pose, on the device. Video is not uploaded.
- Counts reps, times each rep's lowering and lifting phase, and starts and stops sets and the rest timer by itself.
- Logs every set against your split, with the weight prefilled from the split or the last set.
- Speaks a rep count and rule-based form cues.
- First run walks through goal, training days and equipment, then builds a split.
- Shows reps against target, a dot per rep, the coach's line and the next set on the camera view, sized to read from across the room.
- Raise one hand and hold to end a set (or start and stop a hand-counted one).
- Ends each workout with a summary against last time, and tracks weekly hard sets per muscle in the Log.
- Knows your equipment: offers only lifts you can do, swaps lifts you can't, and builds a 3, 4 or 5-day split from your goal and equipment.
- Shows goal-based targets (weekly sets, protein, rate of gain) under **You**.
- Optional, with a Claude API key entered under **You**: Claude writes the between-set coaching and reads the bar weight from one camera frame per set when the plates are clearly readable.

All data stays in the browser's local storage.

## Research

`reports/Muscle gain methods by goal.md` is the evidence review behind the split builder and targets. The notes it was written from are in `research_notes/`.

## Tests

`node gym-coach/test/engine.test.mjs` runs the tracking engine against synthetic joint-angle traces.
