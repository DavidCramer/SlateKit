# Contributing to SlateKit

First off, thanks for being interested in contributing to SlateKit — your help keeps this project tiny, flexible, and forward-thinking.

---

## 📌 How SlateKit Works

SlateKit is a schema-driven dynamic UI engine for React. It uses a single JSON schema to:

- Define *what* components render (`type`)
- Pass props to components (`props`)
- Nest components (`children`)
- Map where data lives (`bind`)
- Emit events (`emits`)
- Control conditional logic (`conditions`)

The core rendering logic lives in `renderer/` and connects to contexts in `contexts/`. Reusable components live under `components/`. Schemas are stored in `schemas/`.

---

## 🧩 How to Contribute

### 📝 1. Schema Changes

- If adding a new example schema, put it in `schemas/`.
- Keep schemas small, clear, and well-commented.

### ⚙️ 2. New Components

- Add your React component to the correct `components/` subfolder.
- Register it in `typeToComponent` inside the `SchemaRenderer`.
- Make sure your component accepts `props`, `path`, and event props if needed.

### 🧩 3. Utilities & Logic

- Shared logic lives in `utils/`.
- Use TypeScript types. Keep helpers generic.

### 🪶 4. Context & Events

- Use `contexts/` for anything global (e.g., `EventBus`).
- Keep event names clean and scoped.

### ✅ 5. Testing & Debugging

- Test schemas with nested `children` and `bind` overrides.
- Check that events emit properly and handlers work as expected.

---

## ✨ Rules of Thumb

- Use `props` only for visual component config.
- Use `bind` if you want the output data to flatten or customize structure.
- Never mix schema meta (`conditions`, `emits`) inside `props`.
- Keep the SchemaRenderer dumb and tiny.

---

## 🗂️ Submitting a PR

1. Fork the repo & create your branch (`feature/new-thing`).
2. Make your changes.
3. Add docs or a schema example if it makes sense.
4. Submit a PR with a clear description.

---

## 🤝 Thanks!

Your ideas, bugs, PRs, and curiosity keep SlateKit alive. Tiny, declarative UIs — that’s the spirit!

Stay modular.

🪶 SlateKit Core Team

