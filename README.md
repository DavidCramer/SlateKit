# SlateKit

A boilerplate React application built with Vite and TypeScript, that implements a minimal, flexible runtime for building dynamic React UIs purely from JSON schemas.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd slatekit
    ```
    *(Replace `<your-repository-url>` with the actual URL of this repository.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(If you use yarn, you can run `yarn install`)*

### Running the Development Server

To start the development server, run:
```bash
npm run dev
```
This will start the Vite development server, and you should be able to view the application in your browser, usually at `http://localhost:5173` (Vite's default) or another port if specified. The server supports Hot Module Replacement (HMR).

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the app in development mode using Vite. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser. The page will reload if you make edits, and you will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include hashes.

### `npm run preview`

Serves the production build locally. This command should be run after `npm run build`. It's a good way to check if the production build works correctly before deploying.

## Project Structure

The project structure is organized as follows:

```
slatekit/
├── .gitignore           # Specifies intentionally untracked files that Git should ignore
├── README.md            # This file
├── components/          # Reusable UI components
│   ├── elements/        # Basic HTML element wrappers (Button, Input, etc.)
│   ├── layout/          # Layout components (e.g., Layout)
│   ├── list/            # List-related components
│   ├── modal/           # Modal dialog components
│   ├── panels/          # Panel components
│   └── settings/        # Components related to settings UI
├── constants/           # Application-wide constants
├── contexts/            # React context providers (e.g., AppContext)
├── renderer/            # The core SchemaRenderer logic
├── utils/               # Shared utility functions (e.g., logic checks, helpers)
├── schemas/             # JSON schema definitions for dynamic UIs
├── index.html           # Main HTML entry point
├── index.tsx            # Main application entry point (React) - typically in src/
├── App.tsx              # Root React component - typically in src/
├── metadata.json        # Project metadata
├── package-lock.json    # Records exact versions of dependencies
├── package.json         # Project dependencies and scripts
├── services/            # Application services (e.g., StorageService)
├── templates/           # Code templates or boilerplate
├── tsconfig.json        # TypeScript compiler configuration
└── vite.config.ts       # Vite build tool configuration
```

*(Note: While `index.tsx` and `App.tsx` are at the root in this boilerplate, they are commonly found within a `src/` directory in many React projects.)*

Key files and directories:

*   **`index.html`**: The main HTML file that serves as the entry point for the browser.
*   **`index.tsx`**: The entry point for the React application, located at the root. It renders the root `App` component into the DOM.
*   **`App.tsx`**: The main application component, located at the root, where you typically define routing and overall layout.
*   **`components/`**: Contains all reusable React components.
    *   `elements/`: Basic UI elements.
    *   `layout/`: Components that define the structure of parts of the UI.
    *   Other subdirectories group components by feature or type.
*   **`constants/`**: Stores constant values used throughout the application.
*   **`contexts/`**: Holds React Context API implementations for global state management.
*   **`services/`**: Contains modules for business logic, API calls, or other services like local storage management.
*   **`templates/`**: Likely contains templates for generating new components or modules.
*   **`vite.config.ts`**: Configuration file for Vite, the build tool.
*   **`package.json`**: Lists project dependencies, scripts, and other metadata.
*   **`tsconfig.json`**: TypeScript compiler options.

## Key Technologies

This project is built with the following core technologies:

*   **React 19:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework used for styling (imported via CDN in `index.html`).
*   **React Icons:** For including popular icon sets.

## Configuration

Environment variables are managed by Vite. The configuration in `vite.config.ts` shows an example of how variables like `API_KEY` are loaded from `.env` files.

To set up your local environment variables:

1.  Create a `.env` file in the root of the project (e.g., by copying `.env.example` if it exists, or creating it from scratch).
2.  Add your environment-specific keys to this file, for example:
    ```env
    API_KEY=your_actual_api_key_here
    ```

These variables will be available in your application via `process.env`. Remember to add `.env` to your `.gitignore` file if it's not already there to avoid committing sensitive keys.

## Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This command bundles the application and outputs the static files to the `dist/` directory. The build is optimized for performance, with minified code and hashed filenames for caching.

## Previewing the Production Build

After building the project, you can preview the production build locally using Vite's preview command:

```bash
npm run preview
```

This will start a local static web server that serves the files from the `dist/` directory. It's useful for checking the final build before deployment.

## Schema-Driven Dynamic UI

SlateKit's SchemaRenderer is a tiny, powerful system for building dynamic React UIs entirely from **JSON schemas**.

Your **schema** defines:

- *What* components render
- *How* they look (`props`)
- *How* they’re laid out (`children`)
- *Where* they store data (`path` + `bind`)
- *What events they emit* (`emits`)

---

## 🧩 Key Concepts

### ✅ `type`

Each node declares *which* React component to render.

```json
{ "type": "Input" }
```

---

### ✅ `props`

**All real component props** live under `props` to avoid conflicts with schema logic.

```json
{
  "type": "Input",
  "props": {
    "label": "First Name",
    "placeholder": "John Doe"
  }
}
```

---

### ✅ `children`

Defines nested schema blocks.

**Two modes:**

**A)** If `children` is an **object**, its keys extend the **data path**.

```json
{
  "type": "Panel",
  "children": {
    "name": { "type": "Input" }
  }
}
```

**Result:** Data → `{ panel: { name } }`

**B)** If `children` is an **array**, they **do not** extend the path. Perfect for layout-only containers.

```json
{
  "type": "Columns",
  "children": [
    { "type": "Input", "bind": "username" },
    { "type": "Input", "bind": "email" }
  ]
}
```

**Result:** Data → `{ username, email }`

---

### ✅ `bind`

Overrides the auto path, letting you choose where data lives.

```json
{
  "type": "Input",
  "bind": "profile.firstName"
}
```

No matter how deeply nested, the value lands at `profile.firstName`.

---

### ✅ `emits`

Defines events the component can emit.

```json
{
  "type": "Button",
  "props": { "label": "Save" },
  "emits": { "onClick": "saveTriggered" }
}
```

The final event emitted: `<path>.saveTriggered`

---

### ✅ `conditions`

Controls whether a node renders, using form state.

```json
{
  "conditions": {
    "showIf": { "path": "account.type", "equals": "admin" }
  }
}
```

---

## ⚙️ Path Logic

- **Default:** built by `children` keys (object).
- **Array children:** do not add path segments.
- `` always overrides path.

---

## 🔌 Events

Subscribe to events with the `EventBus`:

```ts
eventBus.on("profilePage.saveBtn.saveTriggered", handler);
```

---

## 🧩 Putting It Together

**Example Schema:**

```json
{
  "profilePage": {
    "type": "Panel",
    "props": {
      "title": "Profile",
      "description": "Manage your info"
    },
    "children": {
      "personal": {
        "type": "Panel",
        "props": { "title": "Personal Info" },
        "children": {
          "name": { "type": "Input", "props": { "label": "Name" } },
          "bio": { "type": "Textarea", "props": { "label": "Bio" } }
        }
      },
      "layout": {
        "type": "Columns",
        "children": [
          {
            "type": "Input",
            "props": { "label": "Username" },
            "bind": "username"
          },
          {
            "type": "Input",
            "props": { "label": "Email" },
            "bind": "email"
          }
        ]
      },
      "saveBtn": {
        "type": "Button",
        "props": { "label": "Save" },
        "emits": { "onClick": "profileSaved" }
      }
    }
  }
}
```

**Resulting Data:**

```json
{
  "personal": { "name": "", "bio": "" },
  "username": "",
  "email": ""
}
```

---

## ✅ Extension Principles

- New UI element → add to `typeToComponent`
- New layout → `children` as arrays
- Custom data shape → use `bind`
- Events → `emits` + `EventBus`

---

## ✅ Design Goals

- **Tiny:** minimal runtime logic.
- **Explicit:** no hidden magic.
- **Flexible:** layout ≠ state.

---

## 🤖 AI Guidance

- Use `props` for component props only.
- Use `bind` to control output shape.
- Use `children` type (object or array) wisely.
- Keep `path` clear and explicit.
- For events, always namespace and resolve paths properly.

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details (if one exists, or add your chosen license file).

Alternatively, if you do not have a specific license file yet:

This project is currently not licensed. Please add a license file (e.g., `LICENSE.md` with the text of the MIT License or another open-source license) to define how others can use, modify, and distribute this software.
