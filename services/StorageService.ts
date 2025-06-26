
import { AppState, AppDetails, AvailableApp, AppSettings, defaultAppSettings } from '../contexts/AppContext';

/**
 * Key used for storing and retrieving the project state from localStorage.
 */
const LOCAL_STORAGE_KEY = 'slateKitAppState';

// Default AppSettings from AppContext is the source of truth for defaults.
// This ensures consistency when merging stored settings.

/**
 * Loads the entire project state from localStorage.
 * It retrieves and validates the persisted AppState, including currentApp, availableApps, settings, and isLoading.
 * @returns {AppState | null} The stored project state if found and valid, otherwise null.
 */
export const loadAppStateFromStorage = (): Partial<AppState> | null => { // Return Partial for flexibility before merging with defaults
  try {
    const storedStateString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedStateString) {
      const parsedState = JSON.parse(storedStateString) as Partial<AppState>;
      
      let validCurrentApp: AppDetails | null = null;
      if (parsedState.currentApp === null) {
        validCurrentApp = null;
      } else if (parsedState.currentApp && typeof parsedState.currentApp === 'object') {
        const cp = parsedState.currentApp as Partial<AppDetails>;
        if (
          typeof cp.id === 'string' &&
          typeof cp.name === 'string' &&
          typeof cp.dateCreated === 'string' &&
          typeof cp.lastUpdated === 'string'
        ) {
          validCurrentApp = cp as AppDetails;
        } else {
            console.warn("Stored currentApp has invalid structure, discarding.", cp);
            // keep validCurrentApp as null
        }
      }

      let validAvailableApps: AvailableApp[] = [];
      if (Array.isArray(parsedState.availableApps)) {
        validAvailableApps = parsedState.availableApps.filter(p => {
          if (p && typeof p === 'object' &&
              typeof p.id === 'string' &&
              typeof p.name === 'string' &&
              typeof p.dateCreated === 'string' &&
              typeof p.lastUpdated === 'string') {
            return true;
          }
          console.warn("An item in stored availableApps has invalid structure, discarding.", p);
          return false;
        }) as AvailableApp[];
      }
      
      // Validate settings
      let validSettings: AppSettings = { ...defaultAppSettings }; // Start with default from AppContext
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
        currentApp: validCurrentApp,
        availableApps: validAvailableApps,
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
 * @param {AppState} state - The project state object to save.
 */
export const saveAppStateToStorage = (state: AppState): void => {
  try {
    // Ensure settings object is well-formed and includes all default fields before saving
    const stateToSave: AppState = {
      ...state,
      settings: state.settings ? { ...defaultAppSettings, ...state.settings } : { ...defaultAppSettings },
      isLoading: typeof state.isLoading === 'boolean' ? state.isLoading : false,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Error writing project state to localStorage:", error);
  }
};
