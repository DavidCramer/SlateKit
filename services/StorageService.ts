
import { ProjectState, ProjectDetails, AvailableProject, AppSettings, defaultAppSettings } from '../contexts/ProjectContext';

/**
 * Key used for storing and retrieving the project state from localStorage.
 */
const LOCAL_STORAGE_KEY = 'slateKitProjectState';

// Default AppSettings from ProjectContext is the source of truth for defaults.
// This ensures consistency when merging stored settings.

/**
 * Loads the entire project state from localStorage.
 * It retrieves and validates the persisted ProjectState, including currentProject, availableProjects, settings, and isLoading.
 * @returns {ProjectState | null} The stored project state if found and valid, otherwise null.
 */
export const loadProjectStateFromStorage = (): Partial<ProjectState> | null => { // Return Partial for flexibility before merging with defaults
  try {
    const storedStateString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedStateString) {
      const parsedState = JSON.parse(storedStateString) as Partial<ProjectState>;
      
      let validCurrentProject: ProjectDetails | null = null;
      if (parsedState.currentProject === null) {
        validCurrentProject = null;
      } else if (parsedState.currentProject && typeof parsedState.currentProject === 'object') {
        const cp = parsedState.currentProject as Partial<ProjectDetails>;
        if (
          typeof cp.id === 'string' &&
          typeof cp.name === 'string' &&
          typeof cp.dateCreated === 'string' &&
          typeof cp.lastUpdated === 'string'
        ) {
          validCurrentProject = cp as ProjectDetails;
        } else {
            console.warn("Stored currentProject has invalid structure, discarding.", cp);
            // keep validCurrentProject as null
        }
      }

      let validAvailableProjects: AvailableProject[] = [];
      if (Array.isArray(parsedState.availableProjects)) {
        validAvailableProjects = parsedState.availableProjects.filter(p => {
          if (p && typeof p === 'object' &&
              typeof p.id === 'string' &&
              typeof p.name === 'string' &&
              typeof p.dateCreated === 'string' &&
              typeof p.lastUpdated === 'string') {
            return true;
          }
          console.warn("An item in stored availableProjects has invalid structure, discarding.", p);
          return false;
        }) as AvailableProject[];
      }
      
      // Validate settings
      let validSettings: AppSettings = { ...defaultAppSettings }; // Start with default from ProjectContext
      if (parsedState.settings && typeof parsedState.settings === 'object') {
         // Merge stored settings with defaults to ensure all keys are present and new keys get defaults
        validSettings = { ...defaultAppSettings, ...parsedState.settings };
        // Basic validation for theme
        if (validSettings.theme !== 'light' && validSettings.theme !== 'dark') {
            console.warn(`Stored theme '${validSettings.theme}' is invalid, defaulting to '${defaultAppSettings.theme}'.`);
            validSettings.theme = defaultAppSettings.theme;
        }
        // remoteStorageEnabled (boolean) and remoteApiUrl (string) will take their stored value
        // or the default from the spread if not present in parsedState.settings.
      } else if (parsedState.settings !== undefined) {
        // If settings exists but is not a valid object, log warning and use defaults
        console.warn("Stored settings are invalid, using default settings.");
      }
      
      const validIsLoading = typeof parsedState.isLoading === 'boolean' ? parsedState.isLoading : false;

      return {
        currentProject: validCurrentProject,
        availableProjects: validAvailableProjects,
        settings: validSettings,
        isLoading: validIsLoading,
      };
    }
  } catch (error) {
    console.error("Error reading project state from localStorage:", error);
  }
  return null;
};

/**
 * Saves the entire project state to localStorage.
 * @param {ProjectState} state - The project state object to save.
 */
export const saveProjectStateToStorage = (state: ProjectState): void => {
  try {
    // Ensure settings object is well-formed and includes all default fields before saving
    const stateToSave: ProjectState = {
      ...state,
      settings: state.settings ? { ...defaultAppSettings, ...state.settings } : { ...defaultAppSettings },
      isLoading: typeof state.isLoading === 'boolean' ? state.isLoading : false,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Error writing project state to localStorage:", error);
  }
};
