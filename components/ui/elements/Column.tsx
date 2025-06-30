import React, { ReactNode } from 'react';
import { useApp } from '../../../contexts/AppContext';

interface ColumnProps {
    children?: ReactNode;
    className?: string;
    width?: string | number;
    rows?: number;
    rowStart?: number;
    rowEnd?: number;
    colStart?: number;
    colEnd?: number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    gap?: string | number;
    padding?: string;
    margin?: string;
}

const Column: React.FC<ColumnProps> = ({
    children,
    className = '',
    width,
    rows,
    rowStart,
    rowEnd,
    colStart,
    colEnd,
    align = 'stretch',
    justify = 'start',
    gap,
    padding,
    margin,
    ...props
}) => {
    const { themeClasses: { column: columnThemeClasses } } = useApp();

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
        columnThemeClasses?.base || 'grid',
        alignClasses[align],
        justifyClasses[justify],
        gap && `gap-${gap}`,
        padding && `p-${padding}`,
        margin && `m-${margin}`,
        className,
    ].filter(Boolean).join(' ');

    const style: React.CSSProperties = {
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(rows && { gridTemplateRows: `repeat(${rows}, 1fr)` }),
        ...(rowStart && { gridRowStart: rowStart }),
        ...(rowEnd && { gridRowEnd: rowEnd }),
        ...(colStart && { gridColumnStart: colStart }),
        ...(colEnd && { gridColumnEnd: colEnd }),
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

export default Column;
