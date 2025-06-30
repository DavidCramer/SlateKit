import React, {ReactNode, isValidElement, useState} from 'react';
import {useApp} from '@/contexts';
import {classConstants} from '@/constants/constants.ts';
import {Panel} from "@/components/ui/panels";
import {UISchema} from "@/json/UISchema.ts";
import SchemaRenderer from "@/renderer/SchemaRenderer.tsx";
import {NavBar} from "@/components/ui";

interface LayoutProps {
    schema: UISchema,
    variant?: 'vertical' | 'horizontal'
    sidebarTitle: string,
    sidebarFooter?: ReactNode | UISchema;
    sidebarAriaLabel?: string;
    mainAriaLabel?: string;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    const {appState: {settings: {theme}}} = useApp();
    const {
        schema,
        sidebarFooter,
        sidebarTitle,
        sidebarAriaLabel = 'Sidebar',
        mainAriaLabel = 'Main',
        variant = 'vertical'
    } = props;
    const layoutClasses = classConstants(theme).sidebarLayout;

    const [activeItem, setActiveItem] = useState<string>(Object.keys(schema)[0]);

    const SidebarFooter = sidebarFooter && (
        isValidElement(sidebarFooter) ? sidebarFooter : <SchemaRenderer schema={sidebarFooter as UISchema}/>
    );

    return (
        <div className={'vertical' === variant ? layoutClasses.containerVertical : layoutClasses.containerHorizontal}>
            <Panel
                title={sidebarTitle}
                variant={'vertical' === variant ? 'aside' : 'default'}
                footer={'vertical' === variant ? SidebarFooter : null}
                aria-label={sidebarAriaLabel}
            >
                <NavBar schema={schema} variant={variant} callback={setActiveItem}/>
            </Panel>
            <Panel
                variant={'main'}
                aria-label={mainAriaLabel}
                className={'horizontal' === variant ? 'pr-0! pl-0!' : ''}
            >
                <SchemaRenderer schema={schema[activeItem]}/>
            </Panel>
        </div>
    );
};

export default Layout;
