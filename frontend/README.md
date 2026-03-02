# Breath Counter 
A minimal breathing counter built with React. Users can choose a preset number of breaths or enter a custom amount, then follow a timed inhale/exhale rhythm. Each full breath (inhale + exhale) reduces the counter by one until the session completes.

## Features
- Preset breathing counts
- Custom breathing count input
- Alternating inhale/exhale text synced to a 4‑second cycle
- Countdown that decreases after each full breath
- Random completion message
- Reset button to restart the session

## How It Works
The breathing rhythm is controlled by a repeating 4‑second timeout. Each cycle toggles the inhale/exhale text and updates an internal counter. Every two cycles (one full breath), the main countdown decreases by one. When the count reaches zero, the loop stops and a completion message appears.


## Notes 
- A Pause button was originally added but removed because pausing mid‑cycle caused timing drift and leftover timeouts. The app is more stable without mid‑breath interruption right now.
- Reset is intended for use between sessions, not during an active breath cycle for the same timing loop reasons.

## Tech Stack 
- React (hooks)
- CSS animations
- JavaScript timing (setTimeout)
