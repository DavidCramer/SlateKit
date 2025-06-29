# AI Agent Codebase Guide

This document provides a comprehensive overview of the codebase structure and the purpose of each file. It is intended to help AI agents (and human developers) understand the project quickly and efficiently. Refer to this guide when you need to understand the role of a specific file or directory.

## Table of Contents

- [High-Level Project Structure](#high-level-project-structure)
- [Core Application Files](#core-application-files)
- [Directory Deep Dive](#directory-deep-dive)
  - [`components/`](#components)
  - [`constants/`](#constants)
  - [`contexts/`](#contexts)
  - [`demo/`](#demo)
  - [`renderer/`](#renderer)
  - [`schemas/`](#schemas)
  - [`services/`](#services)
  - [`templates/`](#templates)
  - [`ui-engine/`](#ui-engine)
  - [`utils/`](#utils)

---

## High-Level Project Structure

This section outlines the purpose of the main directories within the project.

- **`components/`**: Contains reusable UI components that are used throughout the application. These are likely specific to the main application's look and feel.
- **`constants/`**: Holds files that define constant values used across the application, such as API endpoints, configuration keys, or fixed values.
- **`contexts/`**: Manages React Context API providers and consumers. This is used for global state management or for passing data through the component tree without having to pass props down manually at every level.
- **`demo/`**: Contains demonstration or showcase components, possibly used for development, testing, or style guides.
- **`renderer/`**: Likely responsible for rendering UI elements based on a schema or a specific data structure. This suggests a dynamic UI generation approach.
- **`schemas/`**: Stores JSON schema files. These schemas probably define the structure of data or UI elements that the `renderer/` or `ui-engine/` might use.
- **`services/`**: Contains modules that handle external interactions, such as API calls, data fetching, or local storage management.
- **`templates/`**: Holds template files, which could be for generating new components, code snippets, or other boilerplate structures.
- **`ui-engine/`**: Appears to be a core UI rendering engine or a separate, more generic UI library. It has its own components, contexts, and utilities, suggesting it might be a distinct module or framework used by the main application.
- **`utils/`**: Contains utility functions and helper modules that provide common functionalities used in various parts of the application.

---

## Core Application Files

This section describes the main files at the root of the project.

- **`.gitignore`**: Specifies intentionally untracked files that Git should ignore.
- **`App.tsx`**: Typically the main application component in a React application. It often acts as the root component that orchestrates other parts of the UI.
- **`README.md`**: Provides general information about the project, how to set it up, build, and run it.
- **`components/`...**: (Covered in [Directory Deep Dive](#components))
- **`contributing.md`**: Contains guidelines for contributing to the project.
- **`index.css`**: Global CSS styles for the application.
- **`index.html`**: The main HTML entry point for the web application. React will typically mount the application into an element within this file.
- **`index.tsx`**: The main TypeScript (or JavaScript) entry point for the application. This is where the React application is usually initialized and rendered into the DOM.
- **`metadata.json`**: Likely contains metadata about the project, application configuration, or perhaps default settings for the UI or schema rendering.
- **`package-lock.json`**: Records the exact versions of dependencies used in the project, ensuring reproducible builds. Managed by npm.
- **`package.json`**: Defines project metadata, dependencies, scripts (for building, testing, running), and other project configurations.
- **`renderer/`...**: (Covered in [Directory Deep Dive](#renderer))
- **`schemas/`...**: (Covered in [Directory Deep Dive](#schemas))
- **`services/`...**: (Covered in [Directory Deep Dive](#services))
- **`templates/`...**: (Covered in [Directory Deep Dive](#templates))
- **`tsconfig.json`**: Configuration file for the TypeScript compiler (tsc). It specifies root files and compiler options.
- **`ui-engine/`...**: (Covered in [Directory Deep Dive](#ui-engine))
- **`utils/`...**: (Covered in [Directory Deep Dive](#utils))
- **`vite.config.ts`**: Configuration file for Vite, a modern frontend build tool. It defines how the project is built, bundled, and served during development.

---

## Directory Deep Dive

This section provides a more detailed look into each of the main directories.

### `components/`

This directory houses reusable React components that form the building blocks of the application's user interface. These components are generally specific to the application's design and functionality, distinguishing them from the more generic components potentially found in `ui-engine/`.

- **`ItemSelector.tsx`**: A component likely used for selecting one or more items from a list or collection.
- **`ItemWorkspace.tsx`**: A component that provides a workspace or editable area for a selected item. This could be where users interact with or configure item details.
- **`Sidebar.tsx`**: A component representing a sidebar navigation or content panel, typically appearing on the left or right side of the layout.
- **`WorkArea.tsx`**: A central area in the UI where main content is displayed or tasks are performed. It might host different views or tools depending on the application state.

#### `components/elements/`

This subdirectory contains fundamental UI elements, often wrappers around HTML elements or more complex atomic components.

- **`Button.tsx`**: A custom button component, likely with specific styling or functionality.
- **`Checkbox.tsx`**: A custom checkbox component.
- **`FieldBase.tsx`**: A base component for form fields, possibly providing common layout, labeling, or error handling.
- **`Input.tsx`**: A custom text input component.
- **`Select.tsx`**: A custom dropdown/select component.
- **`Template.tsx`**: This could be a generic template component used for rendering dynamic content based on a template structure, or a base template for creating other components.
- **`Textarea.tsx`**: A custom textarea component for multi-line text input.
- **`ToggleSwitch.tsx`**: A component for a toggle switch (on/off).
- **`Triggered.tsx`**: The name suggests a component that performs an action or changes state when triggered by an event.

#### `components/layout/`

This subdirectory is for components that define the overall structure and layout of the application's pages or views.

- **`SidebarLayout.tsx`**: A layout component that likely includes a sidebar and a main content area, using the `Sidebar.tsx` and `WorkArea.tsx` components.
- **`index.ts`**: Typically an export file (e.g., `export * from './SidebarLayout';`) that makes components from this directory easily importable from the parent directory (e.g., `import { SidebarLayout } from './layout';`).

#### `components/list/`

Components related to displaying lists of items.

- **`List.tsx`**: A component for rendering a list of items.
- **`ListItem.ts`**: Likely defines the TypeScript type or interface for a single item within a list. It could also potentially be a non-visual utility or a simple component for rendering individual list items, though the `.ts` extension suggests it's more likely a type definition or utility class.
- **`index.ts`**: Export file for list-related components and types.

#### `components/modal/`

Components for displaying modal dialogs.

- **`CreateItemModal.tsx`**: A modal dialog specifically for creating new items.
- **`Modal.tsx`**: A generic modal component that can be customized for various purposes.

#### `components/panels/`

Components for creating panel sections in the UI.

- **`Panel.tsx`**: A generic panel component, possibly used as a container for related content or controls.
- **`index.ts`**: Export file for panel components.

#### `components/settings/`

Components related to application settings or configuration.

- **`SettingsModal.tsx`**: A modal dialog for displaying and modifying application settings.
- **`SettingsModalContentArea.tsx`**: The main content area within the settings modal.
- **`SettingsModalSidebar.tsx`**: A sidebar component within the settings modal, possibly for navigating different settings sections.

### `constants/`

This directory holds files that define constant values used throughout the application. Using constants helps to avoid magic numbers/strings, improves maintainability, and makes the codebase easier to understand.

- **`constants.ts`**: A TypeScript file that likely exports various constant values. These could include API keys, default configuration settings, string literals for UI elements, event names, or any other values that remain fixed during runtime.

### `contexts/`

This directory contains React Context API implementations. Context provides a way to pass data through the component tree without having to pass props down manually at every level. This is useful for global state like theme, user information, or application-wide event handling.

- **`AppContext.tsx`**: Likely provides a general application context. This could hold global state related to the application's overall functionality, user session, preferences, or shared data accessible by many components.
- **`EventContext.tsx`**: Suggests a context specifically for managing and dispatching events throughout the application. This could be a custom event system or an integration with a global event bus, allowing components to subscribe to and react to events without direct coupling. This is also present in `ui-engine/contexts/`, indicating it might be a shared pattern or a more generic event system used by both the app and the engine.

### `demo/`

This directory contains components or pages used for demonstration purposes. This can be helpful for developers to see components in action, for testing new features, or for creating a style guide.

- **`FormElementShowcase.tsx`**: A component specifically designed to showcase various form elements available in the application (likely those from `components/elements/` or `ui-engine/components/`). This is useful for visual testing and ensuring consistency of form controls.

### `renderer/`

This directory appears to be responsible for dynamically rendering UI elements based on a predefined schema. This is a powerful pattern for building UIs that can change based on configuration or data.

- **`SchemaRenderer.tsx`**: This is likely the core component of the rendering logic. It would take a schema (probably a JSON object, like those in `schemas/`) as input and translate it into React components. It might map schema types to specific UI components (e.g., a "string" type in the schema maps to an `<Input />` component). This component is also present in `ui-engine/`, suggesting that the main application might use or extend a core schema rendering capability from the `ui-engine`.

### `schemas/`

This directory contains JSON schema files. These files define the structure, data types, and constraints for data objects or UI configurations that the application uses, particularly with the `SchemaRenderer.tsx` or the `ui-engine`.

- **`example-2.json`**: An example JSON schema file.
- **`example.json`**: Another example JSON schema file.

These files serve as examples or actual definitions for the structure of data that the `SchemaRenderer.tsx` (or a similar mechanism in `ui-engine/`) would consume to generate UI elements or forms dynamically. They might define things like form fields, their types (text, number, boolean), validation rules, layout information, and conditional logic for displaying elements. There is also a `schema.json` in `ui-engine/` which might be a meta-schema or a core schema definition.

### `services/`

This directory contains services that encapsulate logic for data fetching, storage, or other external interactions. This helps to separate concerns and keeps components cleaner.

- **`RemoteStorageService.ts`**: This service likely handles interactions with a remote storage solution (e.g., a cloud database, an API backend). It would contain methods for fetching, saving, updating, and deleting data from a remote server.
- **`StorageService.ts`**: This service could be an abstraction layer for storage. It might provide a unified interface for different types of storage (like local storage, session storage, or even the `RemoteStorageService`). Alternatively, it could be specifically for local browser storage (localStorage/sessionStorage).

### `templates/`

This directory holds template files used for generating code or other structured content. This is often used with scaffolding tools or scripts to create new components or modules with a consistent structure.

- **`componentTemplate.ts`**: A TypeScript file that likely contains a template string or a function that generates the boilerplate code for a new React component. This helps in maintaining consistency and speeding up the development process when creating new UI components.

### `ui-engine/`

This directory appears to contain a core UI engine or a reusable UI library. It has its own set of components, contexts, and utilities, suggesting it might be a more generic framework that the main application (`App.tsx` and `components/`) builds upon or utilizes. It seems to focus on schema-driven UI generation and event handling.

- **`App.tsx`**: Similar to the root `App.tsx`, this might be the entry point or main orchestrator for UI rendering if the `ui-engine` can run standalone or is used in a micro-frontend context.
- **`SchemaRenderer.tsx`**: A core component for rendering UI based on a JSON schema. This is likely the heart of the `ui-engine`'s dynamic UI generation capabilities.
- **`index.css`**: CSS styles specific to the `ui-engine` components.
- **`index.ts`**: Export file, making `ui-engine` modules and components easily importable.
- **`main.tsx`**: Similar to the root `index.tsx`, this could be the entry point for initializing and rendering the `ui-engine` if it's treated as a separate application or module.
- **`schema.json`**: A JSON schema file, possibly a meta-schema for defining other schemas, or a default/core schema used by the `SchemaRenderer.tsx` in this engine.

#### `ui-engine/components/`

Contains generic UI components that are part of the `ui-engine`. These are likely fundamental building blocks for schema-based rendering.

- **`Panel.tsx`**: A generic panel component.
- **`Radio.tsx`**: A radio button component.
- **`Select.tsx`**: A select/dropdown component.
- **`Template.tsx`**: A component for rendering based on templates, possibly different from the root `components/elements/Template.tsx` or a more generic version.
- **`Text.tsx`**: A component for displaying text, perhaps with specific styling or formatting options.
- **`Toggle.tsx`**: A toggle switch component.
- **`Triggered.tsx`**: A component that reacts to triggers or events, similar to its counterpart in the main `components/elements/` directory.

#### `ui-engine/contexts/`

Contexts specific to the `ui-engine`.

- **`EventContext.tsx`**: An event context for the `ui-engine`, likely for managing internal events or providing an event bus for engine components.
- **`FormContext.tsx`**: A context for managing form state within the `ui-engine`, especially relevant if the engine is heavily used for generating forms from schemas.

#### `ui-engine/utils/`

Utility functions for the `ui-engine`.

- **`logicUtils.ts`**: Contains utility functions related to business logic, conditional rendering, or data manipulation within the `ui-engine`.

#### `ui-engine/` Test Files

The `ui-engine` directory also contains several TypeScript files that appear to be test files or experimental scripts:
- **`test-2.ts`**
- **`test-3.ts`**
- **`test-4.ts`**
- **`test.ts`**
These are likely used for testing functionalities within the `ui-engine`, experimenting with its API, or developing new features.

### `utils/`

This top-level directory contains utility functions and helper modules that are generally applicable across the main application.

- **`logicUtils.ts`**: This file likely contains general-purpose utility functions related to business logic, data manipulation, or common algorithms that are used in various parts of the main application (outside of the `ui-engine`). This is distinct from `ui-engine/utils/logicUtils.ts`, which contains utilities specific to the UI engine's internal logic and operations.
