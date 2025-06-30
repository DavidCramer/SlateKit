import { ElementType, ReactNode } from 'react';
import type { ButtonVariant } from '@/components/ui';

/**
 * Interface for individual items within the List component.
 */
export interface ListItem {
  /** Unique identifier for the list item, used as React key. */
  id: string | number;
  /** Main content to display within the item's button. Can be a string or ReactNode. */
  content: ReactNode;
  /** Callback function executed when the item is clicked. */
  onClick: () => void;
  /** Optional icon component (e.g., from react-icons) to display in the button. */
  icon?: ElementType;
  /** Position of the icon within the button ('left' or 'right'). Defaults to 'left'. */
  iconPosition?: 'left' | 'right';
  /** Accessible label for the button. If not provided, and content is a string, content will be used. */
  ariaLabel?: string;
  /** Visual variant of the button. Overrides List's defaultButtonVariant. */
  buttonVariant?: ButtonVariant;
  /** Additional CSS class names for the Button component. */
  buttonClassName?: string;
  /** Additional CSS class names for the `<li>` element. */
  listItemClassName?: string;
  /** Whether the item (button) is disabled. Defaults to false. */
  disabled?: boolean;
  /** Optional ReactNode to render as a suffix inside the button (e.g., a chevron icon). */
  suffix?: ReactNode;
  /** If true, indicates this item is the currently active/selected one (e.g., for navigation). Sets `aria-current="page"`. */
  isActive?: boolean;
  /** Whether the button should take up the full width of its container. Overrides List's defaultFullWidthButton. */
  fullWidth?: boolean;
}
