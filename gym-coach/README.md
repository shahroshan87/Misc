# Spotter (prototype)

Browser prototype of a camera-based lifting coach. Unrelated to the Home Offer Solutions site in this repo; it lives here until it gets its own repository and is not part of the site build.

## Run it

Open `index.html` in Chrome on a laptop (double-click works) and press **Start camera**. The first run downloads the pose model, so it needs an internet connection.

On a phone or tablet the page has to be served over https; a local file will not get camera access there.

## What it does

- Tracks your body with MediaPipe Pose, on the device. Video is not uploaded.
- Counts reps, times each rep's lowering and lifting phase, and starts and stops sets and the rest timer by itself.
- Logs every set against your split, with the weight prefilled from the split or the last set.
- Speaks a rep count and rule-based form cues for ten lifts.
- Optional, with a Claude API key entered under **You**: Claude writes the between-set coaching and reads the bar weight from one camera frame per set when the plates are clearly readable.

All data stays in the browser's local storage.

## Tests

`node gym-coach/test/engine.test.mjs` runs the tracking engine against synthetic joint-angle traces.
