# MusicGPT - Prompt-to-Music Generation UI Simulation

This project simulates the "Create Music" experience of MusicGPT, featuring a high-fidelity UI, smooth animations, and real-time state synchronization using WebSockets.

## 🏗️ Architecture

The project is built using the following technologies:

-   **Frontend:** Next.js (App Router) + React 19
-   **Styling:** Tailwind CSS v4
-   **State Management:** Zustand (Global store for generation state)
-   **Real-Time:** Socket.io (Simulates backend progress updates)
-   **Animations:** CSS Keyframes & Transitions (No external animation libraries used for core effects)

### Key Components

-   **PromptInput:** Handles user input with a custom glow animation and validation.
-   **ProfilePopup & RecentGenerationsPanel:** Display generation history and sync in real-time.
-   **useGenerationStore:** Centralized store managing the state of all generations (queued, generating, completed, failed).
-   **Socket Server:** A custom Next.js API route (`pages/api/socket.ts`) that simulates the backend generation process.

## 🚀 How to Run

1.  **Install Dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

2.  **Run the Development Server:**

    ```bash
    npm run dev
    # or
    pnpm dev
    # or
    yarn dev
    ```

3.  **Open the Application:**

    Visit [http://localhost:3000](http://localhost:3000) in your browser.
