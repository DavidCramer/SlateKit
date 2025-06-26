
import { AppSettings, AvailableApp, AppDetails } from '../contexts/AppContext';

// This should ideally come from environment variables or a more robust config system.
// For now, it's the fallback if not set in AppSettings.
const FALLBACK_API_BASE_URL = 'https://api.example.com/v1/slatekit'; 

// Helper to get API URL from settings or use fallback
const getApiBaseUrl = (settings?: AppSettings): string => {
  return settings?.remoteApiUrl?.trim() || FALLBACK_API_BASE_URL;
};

/**
 * Generic fetch wrapper for remote API calls.
 * @param endpoint The API endpoint (e.g., '/projects').
 * @param options RequestInit options for fetch.
 * @param currentSettings Current application settings, used to determine the API base URL.
 * @returns Promise<T> Parsed JSON response.
 * @throws Error if the request fails or the response is not ok.
 */
async function fetchRemote<T>(endpoint: string, options: RequestInit = {}, currentSettings?: AppSettings): Promise<T> {
  const apiUrl = `${getApiBaseUrl(currentSettings)}${endpoint}`;
  
  // For debugging purposes:
  // console.log(`[RemoteStorageService] Fetching: ${options.method || 'GET'} ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, {
      mode: 'cors', // Explicitly set mode if dealing with cross-origin requests
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Example: 'Authorization': `Bearer ${currentSettings?.apiToken}`, 
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      let errorData = { message: `Request failed with status ${response.status} ${response.statusText}` };
      try {
        const errorJson = await response.json();
        errorData = { ...errorData, ...errorJson }; // Merge server error message if available
      } catch (e) {
        // Could not parse error JSON, stick with status text
      }
      console.error(`[RemoteStorageService] API Error (${response.status}) for ${apiUrl}:`, errorData);
      throw new Error(errorData.message);
    }

    if (response.status === 204) { // No Content
        return null as unknown as T; // Or specific handling if T can be void
    }
    return await response.json() as T;
  } catch (error) {
    // Log network errors or errors from the !response.ok block
    console.error(`[RemoteStorageService] Network or parsing error for ${apiUrl}:`, error);
    throw error; // Re-throw to be handled by the caller
  }
}

// --- App Endpoints (Boilerplate - Not yet integrated into app logic) ---

export const getAppList = async (settings?: AppSettings): Promise<AvailableApp[]> => {
  console.warn('[RemoteStorageService] getAppList called. NOTE: This is a placeholder and not yet integrated.');
  // Example: return fetchRemote<AvailableApp[]>('/projects', { method: 'GET' }, settings);
  
  // Placeholder implementation:
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return Promise.resolve([
    { id: 'remote-proj-001', name: 'Cloud App Alpha (Remote)', dateCreated: new Date(Date.now() - 86400000*2).toISOString(), lastUpdated: new Date().toISOString() },
    { id: 'remote-proj-002', name: 'Sky App Beta (Remote)', dateCreated: new Date(Date.now() - 86400000).toISOString(), lastUpdated: new Date(Date.now() - 3600000).toISOString() },
  ]);
};

export const loadAppDetails = async (projectId: string, settings?: AppSettings): Promise<AppDetails | null> => {
  console.warn(`[RemoteStorageService] loadAppDetails for ${projectId}. NOTE: Placeholder, not integrated.`);
  // Example: return fetchRemote<AppDetails | null>(`/projects/${projectId}`, { method: 'GET' }, settings);

  // Placeholder implementation:
  await new Promise(resolve => setTimeout(resolve, 500));
  if (projectId === 'remote-proj-001') {
    return Promise.resolve({
      id: 'remote-proj-001',
      name: 'Cloud App Alpha (Loaded Remotely)',
      dateCreated: new Date(Date.now() - 86400000*2).toISOString(),
      lastUpdated: new Date().toISOString(),
      // any other project-specific details here
    });
  }
  return Promise.resolve(null);
};

export const saveApp = async (projectDetails: AppDetails, settings?: AppSettings): Promise<AppDetails> => {
  console.warn(`[RemoteStorageService] saveApp for ${projectDetails.id}. NOTE: Placeholder, not integrated.`);
  // Example:
  // const isNew = projectDetails.dateCreated === projectDetails.lastUpdated; // Simplistic check
  // const method = isNew ? 'POST' : 'PUT';
  // const endpoint = isNew ? '/projects' : `/projects/${projectDetails.id}`;
  // return fetchRemote<AppDetails>(endpoint, { method, body: JSON.stringify(projectDetails) }, settings);

  // Placeholder implementation:
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve({ ...projectDetails, name: `${projectDetails.name} (Remotely Updated)`, lastUpdated: new Date().toISOString() });
};

export const deleteApp = async (projectId: string, settings?: AppSettings): Promise<void> => {
  console.warn(`[RemoteStorageService] deleteApp for ${projectId}. NOTE: Placeholder, not integrated.`);
  // Example: return fetchRemote<void>(`/projects/${projectId}`, { method: 'DELETE' }, settings);
  
  // Placeholder implementation:
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve();
};

// --- AppSettings Endpoints (Boilerplate - Not yet integrated) ---

export const loadAppSettings = async (currentSettings?: AppSettings): Promise<AppSettings | null> => {
  console.warn('[RemoteStorageService] loadAppSettings. NOTE: Placeholder, not integrated for loading initial settings remotely.');
  // Example: return fetchRemote<AppSettings | null>('/settings', { method: 'GET' }, currentSettings);
  
  // Placeholder implementation (simulates fetching settings that might differ from local defaults):
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve({
    theme: 'light', // Example: remote might prefer light
    remoteStorageEnabled: true,
    remoteApiUrl: getApiBaseUrl(currentSettings), // Use current or fallback for consistency
  } as AppSettings);
};

export const saveAppSettings = async (appSettingsToSave: AppSettings, currentSettings?: AppSettings): Promise<AppSettings> => {
  console.warn('[RemoteStorageService] saveAppSettings. NOTE: Placeholder, not integrated for saving settings remotely.');
  // Example: return fetchRemote<AppSettings>('/settings', { method: 'PUT', body: JSON.stringify(appSettingsToSave) }, currentSettings);

  // Placeholder implementation:
  await new Promise(resolve => setTimeout(resolve, 500));
  return Promise.resolve(appSettingsToSave);
};

// --- Utility Endpoint ---

export const testApiConnection = async(apiUrlToTest?: string, currentSettings?: AppSettings): Promise<{ok: boolean, message: string, data?: any}> => {
  const url = apiUrlToTest?.trim() || getApiBaseUrl(currentSettings);
  // Using a common health check path, or just the base URL if it's expected to respond.
  // For a real API, this might be `/health`, `/status`, or simply `/`.
  const healthEndpoint = '/ping'; // A common lightweight endpoint, adjust as needed.
  
  console.log(`[RemoteStorageService] Testing connection to: ${url}${healthEndpoint}`);
  
  // Placeholder: Simulate an API that is hard to reach or specific examples
  if (url.includes("fail_connection.example.com")) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      return { ok: false, message: `Simulated connection failure to ${url}.` };
  }
   if (url.includes("dummy_api.example.com")) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ok: true, message: `Successfully connected to dummy API: ${url}. Status: 200 OK`, data: { status: "OK", version: "1.0-dummy"} };
  }

  // Actual fetch attempt (for other URLs or if placeholders above don't match)
  try {
    const response = await fetch(`${url}${healthEndpoint}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000) // 5-second timeout for the test
    });

    let responseData;
    try { responseData = await response.json(); } catch (e) { /* no json body or parse error */ }

    if (response.ok) {
        return { ok: true, message: `Successfully connected to ${url}${healthEndpoint}. Status: ${response.status}`, data: responseData };
    } else {
        return { ok: false, message: `Failed to connect to ${url}${healthEndpoint}. Status: ${response.status} ${response.statusText}`, data: responseData };
    }
  } catch (error: any) {
    let errorMessage = `Error connecting to ${url}${healthEndpoint}: ${error.message}`;
    if (error.name === 'AbortSignal') errorMessage = `Connection to ${url}${healthEndpoint} timed out.`;
    if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
        errorMessage = `Network error or CORS issue trying to reach ${url}${healthEndpoint}. Check browser console and CORS policy on server.`;
    }
    return { ok: false, message: errorMessage };
  }
};
