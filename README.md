## Offline Object Detection (Fully In‑Browser)

Client‑side object detection demo built with Next.js 15 (App Router + Turbopack). The detection model is (or will be) loaded directly in the browser (Web Worker) so no image bytes ever leave the user’s machine.

### Current Scope

- Drag & drop image upload (context + preview)
- Inline hook scaffolding for worker‑based model loading (`use-inline-object-detect`)
- Generation of a base64 data URI (`data:<mime>;base64,<...>`) used as the model input buffer
- Normalized bounding boxes (0–1) rendered responsively with colored overlays
- Deterministic per‑label coloring (HSL) — no external color lib

### Why Offline?

- Privacy: image never leaves browser
- Latency: avoids network + cold model start on remote server
- Cost: no per‑request inference charges

### Quick Start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 and drop an image.

### Scripts

```bash
pnpm dev     # start dev server
pnpm build   # production build
pnpm start   # run production build
pnpm lint    # lint (ESLint Flat config)
```

Enjoy privacy‑first object detection! 🕵️‍♀️
