/**
 * @fileoverview TypeScript interface definitions for React components
 * Defines props, state, and event handler types for type safety and IntelliSense
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

/**
 * Base props interface for page components
 */
export interface BasePageProps {
	/** Optional CSS class name for custom styling */
	className?: string;
	/** Optional children elements */
	children?: React.ReactNode;
}

/**
 * Props for components that handle clipboard operations
 */
export interface ClipboardHandlerProps {
	/** Text to copy to clipboard */
	text: string;
	/** Display title for the clipboard notification */
	title?: string;
	/** Optional callback when copy operation completes */
	onCopy?: (text: string, title?: string) => void;
}

/**
 * Props for button components with clipboard functionality
 */
export interface ClipboardButtonProps extends ClipboardHandlerProps {
	/** Button text content */
	children: React.ReactNode;
	/** CSS class for button styling */
	className?: string;
	/** Additional button props */
	buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Props for navigation menu items
 */
export interface MenuItemProps {
	/** Menu item label */
	label: string;
	/** Target URL or section ID */
	target?: string;
	/** Whether the item is currently active */
	isActive?: boolean;
	/** Click handler function */
	onClick?: () => void;
	/** Optional icon class name */
	iconClass?: string;
}

/**
 * Props for dropdown menu component
 */
export interface DropdownMenuProps {
	/** Menu items to display */
	items: MenuItemProps[];
	/** Whether the dropdown is currently open */
	isOpen: boolean;
	/** Function to toggle dropdown state */
	onToggle: () => void;
	/** Optional CSS class for styling */
	className?: string;
}

/**
 * Props for hamburger menu button
 */
export interface HamburgerButtonProps {
	/** Whether the menu is currently open */
	isOpen: boolean;
	/** Function to toggle menu state */
	onToggle: () => void;
	/** Accessibility label */
	ariaLabel?: string;
	/** Optional CSS class for styling */
	className?: string;
}

/**
 * Props for header component
 */
export interface HeaderProps {
	/** Page title */
	title: string;
	/** Optional subtitle */
	subtitle?: string;
	/** Logo image URL */
	logoSrc?: string;
	/** Logo alt text */
	logoAlt?: string;
	/** Navigation menu items */
	menuItems?: MenuItemProps[];
}

/**
 * Props for section container components
 */
export interface SectionProps extends BasePageProps {
	/** Section ID for navigation targeting */
	id?: string;
	/** Whether the section is currently visible */
	isVisible?: boolean;
	/** Section title */
	title?: string;
}

/**
 * Props for payment method components
 */
export interface PaymentMethodProps {
	/** Payment method name */
	name: string;
	/** Payment address or identifier */
	address: string;
	/** Optional icon class */
	iconClass?: string;
	/** Optional description */
	description?: string;
}

/**
 * Props for social link components
 */
export interface SocialLinkProps {
	/** Platform name */
	platform: string;
	/** URL to the social profile */
	url: string;
	/** Display text */
	text: string;
	/** Optional icon class */
	iconClass?: string;
}

/**
 * Props for project link components
 */
export interface ProjectLinkProps {
	/** Project name */
	name: string;
	/** Project URL */
	url: string;
	/** Project description */
	description?: string;
	/** Whether it's an external link */
	isExternal?: boolean;
}

/**
 * Color mode options
 */
export type ColorMode = 'light' | 'dark';

/**
 * Props for color mode toggle component
 */
export interface ColorModeToggleProps {
	/** Current color mode */
	currentMode: ColorMode;
	/** Function to toggle color mode */
	onToggle: () => void;
	/** Optional CSS class */
	className?: string;
}

/**
 * Browser detection result
 */
export interface BrowserInfo {
	/** Browser name */
	name: string;
	/** Whether it's Internet Explorer */
	isIE: boolean;
	/** User agent string */
	userAgent: string;
}

/**
 * Props for browser detection component
 */
export interface BrowserDetectionProps {
	/** Callback when IE is detected */
	onIEDetected?: () => void;
	/** URL to redirect IE users to */
	legacyUrl?: string;
}

/**
 * Notification message structure
 */
export interface NotificationMessage {
	/** Unique message ID */
	id: string;
	/** Message text content */
	text: string;
	/** Message type */
	type: 'success' | 'error' | 'info' | 'warning';
	/** Duration in milliseconds */
	duration?: number;
}

/**
 * Props for notification system
 */
export interface NotificationProps {
	/** Array of notification messages */
	messages: NotificationMessage[];
	/** Function to remove a notification */
	onRemove: (id: string) => void;
	/** Container CSS class */
	className?: string;
}

/**
 * Animation transition states
 */
export type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * Props for animated components
 */
export interface AnimatedComponentProps {
	/** Current animation state */
	animationState: AnimationState;
	/** Animation duration in milliseconds */
	duration?: number;
	/** CSS class for styling */
	className?: string;
	/** Child elements */
	children: React.ReactNode;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
	/** Color mode */
	mode: ColorMode;
	/** Primary color palette */
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		text: string;
	};
	/** Font configuration */
	fonts: {
		primary: string;
		secondary: string;
	};
}

/**
 * Application context state
 */
export interface AppContextState {
	/** Current theme configuration */
	theme: ThemeConfig;
	/** Current color mode */
	colorMode: ColorMode;
	/** Whether mobile menu is open */
	isMobileMenuOpen: boolean;
	/** Active notification messages */
	notifications: NotificationMessage[];
}

/**
 * Application context actions
 */
export interface AppContextActions {
	/** Toggle color mode */
	toggleColorMode: () => void;
	/** Toggle mobile menu */
	toggleMobileMenu: () => void;
	/** Add notification message */
	addNotification: (message: Omit<NotificationMessage, 'id'>) => void;
	/** Remove notification message */
	removeNotification: (id: string) => void;
}

/**
 * Complete application context type
 */
export interface AppContextType extends AppContextState, AppContextActions {}
