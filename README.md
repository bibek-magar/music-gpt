## 🎵 Prompt-to-Music Generation UI Simulation

This repo contains the take-home assignment for recreating the MusicGPT “Create Music” experience. The goal is to deliver a pixel-accurate interface, polished micro-interactions, and a believable real-time workflow without actually generating audio.

## 📋 Assignment Brief

### 1. Project Overview and Goal

The objective is to simulate the full Prompt-to-Music Generation workflow UI/UX with the same fidelity as the production MusicGPT "Create Music" page. Strict adherence to the Figma specifications is required, while still leaving room for tasteful, senior-level enhancements. Evaluation focuses on UI polish, animation smoothness, and real-time synchronization that feels production-ready.

### 2. Figma Design Integration (Critical)

- **Design reference:** [Figma Design](https://www.figma.com/design/RLCJ9w4VqAUBLENOZvgAHp/Web-Development-Task?node-id=0-1&t=rgL1pOowjzvGSUD5-1)
- **Prototype reference:** [Interactive Prototype](https://www.figma.com/proto/RLCJ9w4VqAUBLENOZvgAHp/Web-Development-Task)

All spacing, colors, typography, and animations must mirror these files, including easing curves for panel expansion or contraction states.

### 3. Technical Specification and Architecture

| Component              | Technology                             | Rationale                                                      |
| ---------------------- | -------------------------------------- | -------------------------------------------------------------- |
| **Frontend**           | Next.js (App Router)                   | Component-based structure with built-in routing and streaming. |
| **Styling**            | Tailwind CSS                           | Utility-first styling accelerates fidelity to Figma tokens.    |
| **Real-Time Sync**     | WebSockets (`socket.io`)               | Simulates progress broadcasts and shared state transitions.    |
| **State Management**   | Zustand                                | Lightweight global store for synchronized panels.              |
| **Backend Simulation** | Next Route Handlers + custom WS server | Keeps REST + WebSocket orchestration in one codebase.          |

#### 3.2 Architecture Rationale (State Flow)

1. Centralized Zustand store tracks every generation item across all statuses.
2. Prompt submissions post to a Route Handler that validates and queues work.
3. The simulated backend pushes `progress`, `completed`, or `failed` payloads over the socket.
4. Profile popup and recent generations subscribe to the same selectors, updating in lockstep.
5. Animations use Framer Motion and CSS keyframes tuned to the prototype’s durations and easing.

### 4. Implementation Requirements Breakdown

#### 4.1 Create Music Page (Main Screen)

| Feature        | Requirement                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Prompt Box** | Matches Figma exactly, including first-load glow and cycling placeholder prompts with expansion/contract animations. |
| **Buttons**    | Hover, active, and disabled states mirror provided variants pixel-for-pixel.                                         |
| **User Flow**  | Empty prompts cannot be submitted; CTA stalls until input is valid.                                                  |

#### 4.2 Generation State Simulations

| State             | Visual Requirement                                                  | Triggered By                |
| ----------------- | ------------------------------------------------------------------- | --------------------------- |
| 🫙 **Empty**       | Encourages users to start creating; clean illustration.             | Initial load / no data      |
| ⚙️ **Generating** | Displays animated progress pills or loaders per Figma.              | `GENERATION_PROGRESS` event |
| ✅ **Completed**  | Renders dual variant cards with durations and cover art treatments. | `GENERATION_COMPLETE` event |
| ❌ **Failed**     | Shows explicit failure copy and iconography with retry affordance.  | `GENERATION_FAILED` event   |

#### 4.3 Real-Time Synchronization

- Profile popup (top-right) mirrors the latest status snapshot in compact form.
- Recent generations rail presents the expanded view of the identical dataset.
- Both surfaces animate through states simultaneously upon every WebSocket event.

#### 4.4 Bonus Features

- Content caching layer for repeat visits.
- Floating music player that preserves play/pause per track.
- Functional prompt composer utility buttons.

### 5. Submission & Evaluation

#### 5.1 Submission Checklist

- ✅ Public GitHub repo with complete source.
- ✅ README covering tech stack, architecture rationale, setup steps, and design/animation notes.
- ✅ Screen recording that demonstrates every UI state, prompt submission, and real-time sync.

#### 5.2 Evaluation Criteria

1. Design fidelity to Figma, plus tasteful innovation.
2. Animation quality, easing accuracy, and transition smoothness.
3. Code structure, clarity, and maintainability.
4. Robust WebSocket implementation and scalability considerations.
5. Perfect synchronization between the profile popup and recent generations panel.

### 6. Timeline & Contact

The assignment window is one week from the invitation (Tuesday, December 30). For clarifications, coordinate with Sakar Ghimire, who shared the official brief and Figma package.

## 🔧 Tech Stack

- **Framework:** Next.js (App Router) + React 19
- **Styling:** Tailwind CSS v4 with a custom token palette
- **State:** Zustand for a lightweight global store shared across the prompt input, profile popup, and recent generations panel
- **Real-Time:** `socket.io` + custom Next.js API routes to simulate WebSocket events

## 🧱 Architecture Overview

```text
app/
 └── api/
	 └── generate/route.ts      ← REST entrypoint for prompt submissions
pages/api/socket.ts            ← socket.io server bootstrap
store/useGenerationStore.ts    ← shared Zustand store
hooks/useGenerationSocket.ts   ← hydrates store with live events
components/
 ├── atoms / molecules         ← visual building blocks
 └── organisms                 ← prompt composer, sidebar, profile popup, etc.
```

1. The prompt composer posts to `/api/generate`. The route validates the text, emits a `generation:queued` event, and schedules a series of `progress`, `failed`, or `completed` messages through the socket server.
2. `useGenerationSocket` keeps a single socket client alive and forwards events into the Zustand store so every subscriber renders the same data in sync.
3. Both the profile popup and the recent generations rail subscribe to the same store selectors, ensuring empty/generating/completed/failed/paginating states animate simultaneously.

## 🛰️ Real-Time Simulation Flow

| Event                  | Description                                                                   |
| ---------------------- | ----------------------------------------------------------------------------- |
| `generation:queued`    | New prompt enqueued; appears instantly in both panels.                        |
| `generation:progress`  | Emits staged percentages + phase labels (“Sketching idea”, “Layering stems”). |
| `generation:failed`    | ~15% of runs end in a failure card with retry affordance.                     |
| `generation:completed` | Sends two variants (v1 & v2) with generated titles + durations.               |

Pagination is faked client-side: requesting “Load history” shows skeleton rows for 1.2s before appending seeded entries so the UI demonstrates an infinite query state.

## 🧭 Running the Project

```bash
pnpm install
pnpm dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000). The socket server automatically boots when the client connects to `/api/socket`.

## 🖌️ Design + Animation Notes

- Prompt composer border plays a short glow animation on first paint, matching the brief.
- Placeholder text cycles through curated prompts with a typewriter effect every 6 seconds.
- Buttons expose hover, pressed, and disabled states aligned with the Figma tokens.
- Active socket status is surfaced directly in the composer footer (Synced vs. Syncing) for immediate feedback.
- Recent generations + profile popup rely on the same data store so transitions remain perfectly synchronized.

## 📹 Submission Checklist

- [x] Full source with documented architecture (this README)
- [x] WebSocket-driven simulation + synchronized panels
- [x] Screen recording (add your clip when sharing the repo link)
