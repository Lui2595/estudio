# PERF.md — Core Web Vitals notes

## LCP on `/`
Hero background image can delay LCP. Mitigations used/possible:
- Full-bleed CSS background is decorative; brand text is the LCP candidate (good).
- If hero were `<img>`, use `priority` + sized image + CDN.

## INP on filters
Debounced search (300ms) reduces work per keystroke. Sorting/filter runs on memoized list. Avoid heavy sync work in render.

## CLS on images
`next/image` with `fill` inside `aspect-ratio: 1/1` containers reserves space → low CLS.
