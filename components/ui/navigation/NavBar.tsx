import {useState} from "react";
import {UISchema} from '@/json/UISchema';
import SchemaRenderer from "@/renderer/SchemaRenderer.tsx";
import {ListItem} from "@/components/ui";

// Set Props
export type NavBarProps = {
    schema: UISchema;
    initialItem?: string;
    variant?: 'vertical' | 'horizontal';
    callback?: (activeItem: string) => void;
};

/**
 * NavBar component : UI component.
 */
const NavBar = (props: NavBarProps) => {

    const {schema, initialItem, callback, variant = 'vertical'} = props
    const [activeItem, setActiveItem] = useState<string | null>(initialItem ?? Object.keys(schema)[0]);


    // Get the sidebar items.
    const sidebarItems: ListItem[] = Object.keys(schema).map((key) => {
        const item = schema[key];
        return {
            id: key,
            content: item.props.title ?? key,
            onClick: () => {
                setActiveItem(key);
                callback && callback(key);
            },
            icon: item.props.icon ?? null,
            isActive: activeItem === key,
            buttonClassName: 'justify-start py-2.5!',
        };
    });

    const ULClass = variant === 'horizontal' ? 'flex flex-row space-x-4' : 'flex flex-col space-y-2';

    const sidebarSchema = {
        type: 'List',
        props: {
            items: sidebarItems,
            ulClassName: ULClass,
            defaultButtonVariant: "link",
            defaultFullWidthButton: true,
            ariaLabelledby: "navigation-links-heading"
        }
    }
    return (
        <SchemaRenderer schema={sidebarSchema}/>
    );
}

export default NavBar;
