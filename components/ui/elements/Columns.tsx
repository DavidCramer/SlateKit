import React, { ReactNode } from 'react';
import { useApp } from '../../../contexts/AppContext';

interface ColumnsProps {
    children?: ReactNode;
    className?: string;
    gap?: string | number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    columns?: number;
    rows?: number;
    autoFit?: boolean;
    autoFill?: boolean;
    minColumnWidth?: string;
    padding?: string;
    margin?: string;
}

const Columns: React.FC<ColumnsProps> = ({
    children,
    className = '',
    gap = '4',
    align = 'stretch',
    justify = 'start',
    columns,
    rows,
    autoFit = true,
    autoFill = false,
    minColumnWidth = '250px',
    padding,
    margin,
    ...props
}) => {
    const { themeClasses: { columns: columnsThemeClasses } } = useApp();

    const alignClasses = {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch'
    };

    const justifyClasses = {
        start: 'justify-content-start',
        center: 'justify-content-center',
        end: 'justify-content-end',
        between: 'justify-content-between',
        around: 'justify-content-around',
        evenly: 'justify-content-evenly'
    };

    const computedClasses = [
        columnsThemeClasses?.base || 'grid',
        alignClasses[align],
        justifyClasses[justify],
        gap && `gap-${gap}`,
        padding && `p-${padding}`,
        margin && `m-${margin}`,
        className,
    ].filter(Boolean).join(' ');

    const getGridTemplateColumns = () => {
        if (autoFit) {
            return `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
        }
        if (autoFill) {
            return `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`;
        }
        if (columns) {
            return `repeat(${columns}, 1fr)`;
        }
        return 'none';
    };

    const style: React.CSSProperties = {
        gridTemplateColumns: getGridTemplateColumns(),
        ...(rows && { gridTemplateRows: `repeat(${rows}, 1fr)` }),
        ...(gap && { gap: typeof gap === 'number' ? `${gap * 0.25}rem` : `var(--gap-${gap}, 1rem)` }),
    };

    return (
        <div
            className={computedClasses}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
};

export default Columns;
