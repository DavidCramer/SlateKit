import {createSchemaStore} from "@/stores/createSchemaStore.tsx";

// Contexts.
export * from './AppContext';
export * from './EventContext';

// Schemas.
import settingsSchema from '@/schemas/settings.json';
import appSchema from '@/schemas/app.json';
// Settings

export const SettingsSchema = createSchemaStore(settingsSchema);
export const AppSchema = createSchemaStore(appSchema);
