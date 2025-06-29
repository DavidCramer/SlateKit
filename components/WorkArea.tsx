import React from 'react';
import {useApp, ItemDetails} from '../contexts/AppContext';
import {MdDateRange, MdUpdate, MdInfoOutline} from 'react-icons/md';
import {Panel} from './panels';
import FormElementShowcase from '../demo/FormElementShowcase';
import SchemaRenderer from "../renderer/SchemaRenderer.tsx";

// Example Schema.
import schema from '../schemas/example.json';

/**
 * WorkArea component for the AppWorkspace.
 * This is the main content area where project-specific information and features are displayed.
 * It consumes AppContext directly to get project information.
 * @returns {React.ReactElement | null} The rendered WorkArea component, or null if no project is loaded.
 */
const WorkArea: React.FC = () => {
    const {appState} = useApp();


    if (!appState.currentItem) {
        // This should ideally not happen if WorkArea is only rendered when a project is active,
        // but it's a good safeguard.
        return null;
    }

    const project: ItemDetails = appState.currentItem;

    /**
     * Formats an ISO date string into a more readable locale-specific string.
     * @param {string} isoString - The ISO date string to format.
     * @returns {string} The formatted date string, or 'N/A' or 'Invalid Date' on error.
     */
    const formatDate = (isoString: string): string => {
        if (!isoString) return 'N/A';
        try {
            return new Date(isoString).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'});
        } catch (e) {
            console.error("Error formatting date:", e);
            return 'Invalid Date';
        }
    };

    return (
        <SchemaRenderer schema={schema} basePath={'currentItem'} />
    )

    return (

        <div>
            {/* Form Element Showcase - Demo Component */}
            <FormElementShowcase/>
        </div>
    );
};

export default WorkArea;
