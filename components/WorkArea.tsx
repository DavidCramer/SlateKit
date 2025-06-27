import React from 'react';
import {useApp, ItemDetails} from '../contexts/AppContext';
import {MdDateRange, MdUpdate, MdInfoOutline} from 'react-icons/md';
import {Panel} from './panels';
import FormElementShowcase from '../demo/FormElementShowcase';

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

        <div>
            <h2 className="text-4xl font-extrabold tracking-tight" id="workarea-title">
                Workspace: <span className="text-sky-400">{project.name}</span>
            </h2>
            <div className="text-sm text-slate-400 mt-2 space-x-4">
                    <span className="inline-flex items-center" aria-label={`App ID: ${project.id}`}>
                        {/* ID is not typically displayed but available: project.id */}
                    </span>
                <span className="inline-flex items-center">
                        <MdDateRange className="mr-1.5 text-slate-500" aria-hidden="true"/>
                        Created: {formatDate(project.dateCreated)}
                    </span>
                <span className="inline-flex items-center">
                        <MdUpdate className="mr-1.5 text-slate-500" aria-hidden="true"/>
                        Last Updated: {formatDate(project.lastUpdated)}
                    </span>
            </div>

            <Panel
                variant="card"
                title={`App Overview (ID: ${project.id})`}
                icon={MdInfoOutline}
                className="mb-8"
                titleId="app-overview-title"
            >
                <div className="prose prose-invert max-w-none text-slate-300">
                    <p>
                        This is the main content area for <strong
                        className="font-semibold text-sky-300">{project.name}</strong>.
                        All project-specific components, data visualizations, and interactive features will be displayed here.
                    </p>
                    <p>
                        Start building your amazing application by adding new components and functionalities related to this project.
                        The sidebar provides navigation and global project actions.
                    </p>
                </div>
            </Panel>

            {/* Form Element Showcase - Demo Component */}
            <FormElementShowcase />

            <footer className="mt-12 text-center text-xs text-slate-500">
                <p>All changes are persisted in local storage. Current project: {project.name} (ID: {project.id}).</p>
            </footer>
        </div>
    );
};

export default WorkArea;
