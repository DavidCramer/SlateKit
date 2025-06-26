
import React, { createContext, useReducer, useContext, ReactNode, useEffect, Dispatch } from 'react';
import { loadProjectStateFromStorage, saveProjectStateToStorage } from '../services/StorageService';

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
export interface AvailableProject {
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
 * It includes all fields from AvailableProject.
 */
export interface ProjectDetails extends AvailableProject {}

/**
 * Interface representing the state managed by the ProjectContext.
 */
export interface ProjectState {
  /** The currently active project's details, or null if no project is loaded. */
  currentProject: ProjectDetails | null;
  /** A list of all known projects. */
  availableProjects: AvailableProject[];
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
  | { type: 'LOAD_PROJECT'; payload: string }
  /** Action to unload the currently active project. */
  | { type: 'UNLOAD_PROJECT' }
  /** Action to set application settings. Payload is a partial AppSettings object. */
  | { type: 'SET_SETTINGS'; payload: Partial<AppSettings> };

/**
 * Interface defining the shape of the ProjectContext.
 * It includes the current project state and the dispatch function to modify it.
 */
interface ProjectContextType {
  /** The current state of the project. */
  projectState: ProjectState;
  /** The dispatch function to send actions to the reducer. */
  dispatch: Dispatch<Action>;
}

/**
 * React Context object for managing project state.
 * Consumers will use this context to access project data and dispatch actions.
 */
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

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
 * The initial state for the ProjectContext when the application loads
 * or if no state is found by the StorageService.
 */
const initialState: ProjectState = {
  currentProject: null,
  availableProjects: [],
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
    // Insert hyphens for camelCase/PascalCase (e.g., MyProject -> My-Project)
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
 * @param {ProjectState} state - The current state.
 * @param {Action} action - The action to be processed.
 * @returns {ProjectState} The new state after applying the action.
 */
const projectReducer = (state: ProjectState, action: Action): ProjectState => {
  const now = new Date().toISOString();
  switch (action.type) {
    case 'LOAD_PROJECT':
      const projectNameToLoad = action.payload;
      const projectIdToLoad = toKebabCase(projectNameToLoad); // Convert name to kebab-case for ID

      let projectDetailsToLoad: ProjectDetails;
      let updatedAvailableProjects = [...state.availableProjects];
      
      const existingProjectIndex = updatedAvailableProjects.findIndex(p => p.id === projectIdToLoad);

      if (existingProjectIndex > -1) {
        // Project exists, update its lastUpdated
        const existingProject = updatedAvailableProjects[existingProjectIndex];
        projectDetailsToLoad = { 
          ...existingProject,
          name: projectNameToLoad, // Ensure name is also updated if it changed casing/spacing but resulted in same ID
          lastUpdated: now 
        };
        updatedAvailableProjects[existingProjectIndex] = projectDetailsToLoad;
      } else {
        // Project does not exist, create new and add to availableProjects
        projectDetailsToLoad = {
          id: projectIdToLoad,
          name: projectNameToLoad, // Use the original name for display
          dateCreated: now, // New project, so dateCreated is now
          lastUpdated: now,
        };
        updatedAvailableProjects.push(projectDetailsToLoad);
      }

      return {
        ...state,
        currentProject: projectDetailsToLoad,
        availableProjects: updatedAvailableProjects,
        isLoading: false, // Ensure isLoading is reset if it was true
      };
    case 'UNLOAD_PROJECT':
      return {
        ...state,
        currentProject: null, // availableProjects remains unchanged
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

// --- 3. ProjectProvider Component ---

/**
 * Props for the ProjectProvider component.
 */
interface ProjectProviderProps {
  /** The child components that will have access to the ProjectContext. */
  children: ReactNode;
}

/**
 * ProjectProvider component.
 * It wraps parts of the application that need access to project state.
 * It initializes state using the StorageService and saves state changes back using the StorageService.
 * @param {ProjectProviderProps} props - The props for the component.
 * @returns {React.ReactElement} The provider component.
 */
export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  /**
   * Loads the initial state for the reducer.
   * It attempts to retrieve the full project state using the StorageService.
   * If no data is found or data is partially invalid, it falls back to defaults.
   * @returns {ProjectState} The initial state for the project context.
   */
  const loadInitialStateFromService = (): ProjectState => {
    const storedState = loadProjectStateFromStorage();
    if (storedState) {
      return {
        ...initialState, // Provides defaults (like settings, isLoading)
        ...storedState,   // Overrides with loaded state
        availableProjects: storedState.availableProjects || [],
        currentProject: storedState.currentProject || null,
        // Ensure settings are merged or defaulted
        settings: storedState.settings ? { ...defaultAppSettings, ...storedState.settings } : defaultAppSettings,
        isLoading: typeof storedState.isLoading === 'boolean' ? storedState.isLoading : false,
      };
    }
    return initialState; // Default if nothing in storage
  };

  const [projectState, dispatch] = useReducer(projectReducer, initialState, loadInitialStateFromService);

  // Effect to save state using StorageService whenever projectState changes.
  useEffect(() => {
    saveProjectStateToStorage(projectState);
  }, [projectState]);

  return (
    <ProjectContext.Provider value={{ projectState, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

// --- 4. Custom Hook to use the ProjectContext ---

/**
 * Custom hook `useProject` for easy consumption of the ProjectContext.
 * It provides access to `projectState` and `dispatch` function.
 * Throws an error if used outside of a `ProjectProvider`.
 * @returns {ProjectContextType} The project context value.
 * @throws {Error} If the hook is not used within a ProjectProvider.
 */
export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
