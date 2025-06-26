import React from 'react';
import Button from '../elements/Button';
import type { ButtonVariant } from '../elements/Button';
import type { ListItem } from './ListItem';

export interface ListProps {
  /** An array of ListItem objects to render. */
  items: ListItem[];
  /** Optional CSS class names for the `<ul>` element. */
  ulClassName?: string;
  /** Optional ID of an element that provides a label for the list. */
  ariaLabelledby?: string;
  /** Default ButtonVariant to apply to all items if not specified on the item itself. */
  defaultButtonVariant?: ButtonVariant;
  /** Default fullWidth setting for buttons in the list. Defaults to true. */
  defaultFullWidthButton?: boolean;
}

/**
 * A reusable List component that renders a list of interactive items,
 * typically using the Button component for each item.
 */
const List: React.FC<ListProps> = ({
  items,
  ulClassName = '',
  ariaLabelledby,
  defaultButtonVariant,
  defaultFullWidthButton = true,
}) => {
  if (!items || items.length === 0) {
    return null; // Or render a placeholder if desired
  }

  return (
    <ul className={ulClassName} aria-labelledby={ariaLabelledby}>
      {items.map((item) => {
        // Determine the aria-label for the button
        let accessibleName = item.ariaLabel;
        if (!accessibleName && typeof item.content === 'string') {
          accessibleName = item.content;
        }

        return (
          <li key={item.id} className={item.listItemClassName}>
            <Button
              variant={item.buttonVariant || defaultButtonVariant}
              onClick={item.onClick}
              icon={item.icon}
              iconPosition={item.iconPosition || 'left'}
              disabled={item.disabled || false}
              fullWidth={item.fullWidth !== undefined ? item.fullWidth : defaultFullWidthButton}
              className={item.buttonClassName}
              aria-label={accessibleName}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.content}
              {item.suffix}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
