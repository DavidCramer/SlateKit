import React, {ReactNode, isValidElement, useState} from 'react';
import {useApp} from '@/contexts';
import {classConstants} from '@/constants/constants.ts';
import {Panel} from "@/components/ui/panels";
import {UISchema} from "@/json/UISchema.ts";
import SchemaRenderer from "@/renderer/SchemaRenderer.tsx";
import {NavBar} from "@/components/ui";

interface SidebarLayoutProps {
    schema: UISchema,
    sidebarTitle: string,
    sidebarFooter?: ReactNode | UISchema;
    sidebarAriaLabel?: string;
    mainAriaLabel?: string;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = (props: SidebarLayoutProps) => {
    const {appState: {settings: {theme}}} = useApp();
    const {schema, sidebarFooter, sidebarTitle, sidebarAriaLabel = 'Sidebar', mainAriaLabel = 'Main'} = props;
    const layoutClasses = classConstants(theme).sidebarLayout;

    const [activeItem, setActiveItem] = useState<string>(Object.keys(schema)[0]);

    const SidebarFooter = sidebarFooter && (
        isValidElement(sidebarFooter) ? sidebarFooter : <SchemaRenderer schema={sidebarFooter as UISchema}/>
    );

    return (
        <div className={`${layoutClasses.container}`}>
            <Panel
                title={sidebarTitle}
                variant={'aside'}
                footer={SidebarFooter}
                aria-label={sidebarAriaLabel}
            >
                <NavBar schema={schema} variant={'vertical'} callback={setActiveItem}/>
            </Panel>
            <Panel
                variant={'main'}
                aria-label={mainAriaLabel}
            >
                <SchemaRenderer schema={schema[activeItem]}/>
            </Panel>
        </div>
    );
};

export default SidebarLayout;
