import React, {createContext, useReducer, useContext, ReactNode, useEffect, Dispatch} from 'react';
import {loadAppStateFromStorage, saveAppStateToStorage} from '../services/StorageService';

// --- 1. Define State and Action Types ---

/**
 * Interface representing application-level settings.
 */
export interface AppSettings {
    theme: 'dark' | 'light';
    remoteStorageEnabled?: boolean; // New: Flag to enable/disable remote storage
    remoteApiUrl?: string;         // New: Base URL for the remote API
    // Future settings can be added here
}

/**
 * Interface representing the detailed structure of an available project in the list.
 */
export interface AvailableApp {
    /** The unique identifier of the project (currently same as name). */
    id: string;
    /** The unique name of the project. */
    name: string;
    /** ISO date string representing when the project was first created/loaded. */
    dateCreated: string;
    /** ISO date string representing when the project was last updated or loaded. */
    lastUpdated: string;
}

/**
 * Interface representing the detailed structure of the currently loaded project.
 * It includes all fields from AvailableApp.
 */
export interface AppDetails extends AvailableApp {
}

/**
 * Interface representing the state managed by the AppContext.
 */
export interface AppState {
    /** The currently active project's details, or null if no project is loaded. */
    currentApp: AppDetails | null;
    /** A list of all known projects. */
    availableApps: AvailableApp[];
    /** Application-wide settings. */
    settings: AppSettings;
    /** Indicates if the application is currently in a loading state. */
    isLoading: boolean;
}

/**
 * Union type representing all possible actions that can be dispatched to the projectReducer.
 */
type Action =
/** Action to load a project. The payload is the project's name (string). */
    | { type: 'LOAD_ITEM'; payload: string }
    /** Action to unload the currently active project. */
    | { type: 'UNLOAD_ITEM' }
    /** Action to set application settings. Payload is a partial AppSettings object. */
    | { type: 'SET_SETTINGS'; payload: Partial<AppSettings> };

/**
 * Interface defining the shape of the AppContext.
 * It includes the current project state and the dispatch function to modify it.
 */
interface AppContextType {
    /** The current state of the project. */
    appState: AppState;
    /** The loadItem function */
    loadItem: (id: string) => void;
    /** The unLoadItem function */
    unLoadItem: () => void;
    /** The dispatch function to send actions to the reducer. */
    dispatch: Dispatch<Action>;
}

/**
 * React Context object for managing project state.
 * Consumers will use this context to access project data and dispatch actions.
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

// --- 2. Initial State and Reducer Function ---

/**
 * Default application settings.
 */
export const defaultAppSettings: AppSettings = { // Exported for use in StorageService
    theme: 'dark',
    remoteStorageEnabled: false,
    remoteApiUrl: 'https://api.example.com/v1/slatekit', // Placeholder default URL
};

/**
 * The initial state for the AppContext when the application loads
 * or if no state is found by the StorageService.
 */
const initialState: AppState = {
    currentApp: null,
    availableApps: [],
    settings: defaultAppSettings,
    isLoading: false,
};

/**
 * Converts a string to kebab-case.
 * Handles spaces, underscores, and camelCase/PascalCase.
 * Removes non-alphanumeric characters (except hyphens) and trims resulting hyphens.
 * @param {string} str - The string to convert.
 * @returns {string} The kebab-cased string.
 */
const toKebabCase = (str: string): string => {
    if (!str) return '';
    return str
        .toString() // Ensure it's a string
        .trim() // Remove leading/trailing whitespace
        // Insert hyphens for camelCase/PascalCase (e.g., MyApp -> My-App)
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        // Replace spaces and underscores with hyphens
        .replace(/[\s_]+/g, '-')
        .toLowerCase() // Convert to lowercase
        // Remove all non-alphanumeric characters except hyphens
        .replace(/[^a-z0-9-]+/g, '')
        // Replace multiple hyphens with a single hyphen
        .replace(/-+/g, '-')
        // Trim leading/trailing hyphens
        .replace(/^-+|-+$/g, '');
};


/**
 * Reducer function for managing project state transitions.
 * @param {AppState} state - The current state.
 * @param {Action} action - The action to be processed.
 * @returns {AppState} The new state after applying the action.
 */
const projectReducer = (state: AppState, action: Action): AppState => {
    const now = new Date().toISOString();
    switch (action.type) {
        case 'LOAD_ITEM':
            const projectNameToLoad = action.payload;
            const projectIdToLoad = toKebabCase(projectNameToLoad); // Convert name to kebab-case for ID

            let projectDetailsToLoad: AppDetails;
            let updatedAvailableApps = [...state.availableApps];

            const existingAppIndex = updatedAvailableApps.findIndex(p => p.id === projectIdToLoad);

            if (existingAppIndex > -1) {
                // App exists, update its lastUpdated
                const existingApp = updatedAvailableApps[existingAppIndex];
                projectDetailsToLoad = {
                    ...existingApp,
                    name: projectNameToLoad, // Ensure name is also updated if it changed casing/spacing but resulted in same ID
                    lastUpdated: now
                };
                updatedAvailableApps[existingAppIndex] = projectDetailsToLoad;
            } else {
                // App does not exist, create new and add to availableApps
                projectDetailsToLoad = {
                    id: projectIdToLoad,
                    name: projectNameToLoad, // Use the original name for display
                    dateCreated: now, // New project, so dateCreated is now
                    lastUpdated: now,
                };
                updatedAvailableApps.push(projectDetailsToLoad);
            }

            return {
                ...state,
                currentApp: projectDetailsToLoad,
                availableApps: updatedAvailableApps,
                isLoading: false, // Ensure isLoading is reset if it was true
            };
        case 'UNLOAD_ITEM':
            return {
                ...state,
                currentApp: null, // availableApps remains unchanged
                isLoading: false,
            };
        case 'SET_SETTINGS':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload,
                },
                isLoading: false, // Assume setting settings is a quick operation
            };
        default:
            // This case should ideally not be reached if TypeScript is used correctly with discriminated unions.
            // However, to satisfy linters or JavaScript environments, ensure all paths return a state.
            // const exhaustiveCheck: never = action; // This line helps ensure all action types are handled.
            // For JavaScript environments or if the above line causes issues:
            console.warn('Unhandled action type:', (action as any).type);
            return state;
    }
};

// --- 3. AppProvider Component ---

/**
 * Props for the AppProvider component.
 */
interface AppProviderProps {
    /** The child components that will have access to the AppContext. */
    children: ReactNode;
}

/**
 * AppProvider component.
 * It wraps parts of the application that need access to project state.
 * It initializes state using the StorageService and saves state changes back using the StorageService.
 * @param {AppProviderProps} props - The props for the component.
 * @returns {React.ReactElement} The provider component.
 */
export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    /**
     * Loads the initial state for the reducer.
     * It attempts to retrieve the full project state using the StorageService.
     * If no data is found or data is partially invalid, it falls back to defaults.
     * @returns {AppState} The initial state for the project context.
     */
    const loadInitialStateFromService = (): AppState => {
        const storedState = loadAppStateFromStorage();
        if (storedState) {
            return {
                ...initialState, // Provides defaults (like settings, isLoading)
                ...storedState,   // Overrides with loaded state
                availableApps: storedState.availableApps || [],
                currentApp: storedState.currentApp || null,
                // Ensure settings are merged or defaulted
                settings: storedState.settings ? {...defaultAppSettings, ...storedState.settings} : defaultAppSettings,
                isLoading: typeof storedState.isLoading === 'boolean' ? storedState.isLoading : false,
            };
        }
        return initialState; // Default if nothing in storage
    };

    const [appState, dispatch] = useReducer(projectReducer, initialState, loadInitialStateFromService);

    // Loader function.
    const loadItem = (id: string) => {
        dispatch({type: 'LOAD_ITEM', payload: id});
    }

    // Unload function.
    const unLoadItem = () => {
        dispatch({type: 'UNLOAD_ITEM'});
    }

    // Effect to save state using StorageService whenever appState changes.
    useEffect(() => {
        saveAppStateToStorage(appState);
    }, [appState]);

    const app = {
        appState,
        loadItem,
        unLoadItem,
        dispatch
    }

    return (
        <AppContext.Provider value={app}>
            {children}
        </AppContext.Provider>
    );
};

// --- 4. Custom Hook to use the AppContext ---

/**
 * Custom hook `useApp` for easy consumption of the AppContext.
 * It provides access to `appState` and `dispatch` function.
 * Throws an error if used outside of a `AppProvider`.
 * @returns {AppContextType} The project context value.
 * @throws {Error} If the hook is not used within a AppProvider.
 */
export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within a AppProvider');
    }
    return context;
};
