import React, { useEffect, useRef, createContext, useContext, ReactNode, useId, ElementType } from 'react';
import { MdClose } from 'react-icons/md';
import Button from '../elements/Button'; // Import the new Button component

/**
 * Context for sharing modal-specific data with sub-components.
 */
interface ModalContextType {
  onClose: () => void;
  titleId: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * Custom hook to access ModalContext.
 * Throws an error if used outside a ModalContextProvider.
 */
const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalContextProvider');
  }
  return context;
};

/**
 * Props for the ModalHeader component.
 */
interface ModalHeaderProps {
  /** The title text for the modal header. */
  title: string;
  /** Optional icon component (e.g., from react-icons) to display before the title. */
  icon?: ElementType;
  /** Optional class names for custom styling of the header container. */
  className?: string;
  /** If true, the default close button will be hidden. Defaults to false. */
  hideCloseButton?: boolean;
}

/**
 * Modal.Header sub-component.
 * Renders the header section of the modal, including an optional icon, the title, and a close button.
 */
const ModalHeader: React.FC<ModalHeaderProps> = ({ title, icon: IconComponent, className = '', hideCloseButton = false }) => {
  const { onClose, titleId } = useModalContext();
  return (
    <header className={`flex items-center justify-between mb-4 sm:mb-6 ${className}`}>
      <div className="flex items-center flex-grow min-w-0"> {/* min-w-0 for proper truncation if title is long */}
        {IconComponent && <IconComponent className="w-6 h-6 text-sky-400 mr-2 flex-shrink-0" aria-hidden="true" />}
        <h2 id={titleId} className="text-xl sm:text-2xl font-bold text-white truncate">
          {title}
        </h2>
      </div>
      {!hideCloseButton && (
         <Button
          variant="link"
          onClick={onClose}
          aria-label="Close modal"
          className="text-slate-400 hover:text-slate-200 !p-0 ml-4 flex-shrink-0" // override padding for icon button
        >
          <MdClose className="w-6 h-6" />
        </Button>
      )}
    </header>
  );
};

/**
 * Props for the ModalContent component.
 */
interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Modal.Content sub-component.
 * Renders the main content area of the modal.
 */
const ModalContent: React.FC<ModalContentProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex-grow mb-6 sm:mb-8 text-slate-300 ${className}`}>
      {children}
    </main>
  );
};

/**
 * Interface for defining an action button in the ModalFooter.
 */
export interface ActionButtonProps {
  /** The text label for the button. */
  label: string;
  /** Callback function when the button is clicked. Defaults to ModalContext's onClose if not provided. */
  onClick?: () => void;
  /** Visual variant of the button. Defaults to 'secondary'. */
  variant?: 'primary' | 'secondary' | 'danger'; // item and link variants are not typical for modal footers
  /** Optional icon component to display before the label. */
  icon?: ElementType;
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean;
  /** Optional additional CSS class names for the button. */
  className?: string;
}

/**
 * Props for the ModalFooter component.
 */
interface ModalFooterProps {
  /** An array of action button configurations. */
  actions: ActionButtonProps[];
  /** Optional class names for custom styling of the footer container. */
  className?: string;
}

/**
 * Modal.Footer sub-component.
 * Renders the footer area of the modal, typically for action buttons defined by the 'actions' prop.
 */
const ModalFooter: React.FC<ModalFooterProps> = ({ actions, className = '' }) => {
  const { onClose } = useModalContext();

  return (
    <footer className={`flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse ${className}`}>
      {actions.map((action, index) => {
        const handleClick = action.onClick || onClose;
        return (
          <Button
            key={action.label + index} 
            variant={action.variant || 'secondary'}
            onClick={handleClick}
            disabled={action.disabled || false}
            icon={action.icon}
            className={`w-full sm:w-auto ${action.className || ''}`}
          >
            {action.label}
          </Button>
        );
      })}
    </footer>
  );
};


/**
 * Props for the main Modal component.
 */
interface ModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Callback function to close the modal. */
  onClose: () => void;
  /** The content of the modal, expected to include Modal.Header, Modal.Content, etc. */
  children: ReactNode;
  /** Optional size for the modal width. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  /** Optional. ID for an element that labels the modal. If not provided, an ID will be generated for Modal.Header. */
  ariaLabelledby?: string;
}

/**
 * A generic, reusable compound Modal component.
 * It handles common modal behaviors like visibility, overlay, Escape key closure.
 * Use with Modal.Header, Modal.Content, and Modal.Footer sub-components.
 *
 * @param {ModalProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered modal or null if not open.
 */
const ModalRoot: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  ariaLabelledby,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // Generate a unique ID for the title if no explicit ariaLabelledby is provided
  // This ID will be passed via context to Modal.Header
  const autoTitleId = useId();
  const titleId = ariaLabelledby || autoTitleId;


  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <ModalContext.Provider value={{ onClose, titleId }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        aria-modal="true"
        role="dialog"
        aria-labelledby={titleId} // Uses the ID provided or generated for the title
        onClick={onClose} // Close on overlay click
      >
        <div
          ref={modalRef}
          className={`bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full ${sizeClasses[size]} transform transition-all duration-300 ease-in-out scale-100 flex flex-col`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

// Assign sub-components as static properties
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});

export default Modal;