import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AppProvider} from './contexts/AppContext';
import {EventProvider} from "@/contexts/EventContext.tsx";

/**
 * The root element ID in the HTML where the React application will be mounted.
 */
const rootElementId = 'root';
const rootElement = document.getElementById(rootElementId);

if (!rootElement) {
    throw new Error(`Could not find root element with ID '${rootElementId}' to mount to.`);
}

/**
 * The root React reconciler instance for the application.
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Renders the main application component tree.
 * The application is wrapped in React.StrictMode for highlighting potential problems
 * and AppProvider to make project state available throughout the app.
 */
root.render(
    <React.StrictMode>
        <AppProvider>
            <EventProvider>
                <App/>
            </EventProvider>
        </AppProvider>
    </React.StrictMode>
);
