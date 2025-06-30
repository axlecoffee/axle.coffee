/**
 * @fileoverview Custom React hooks for Axle's Coffee website
 * Provides reusable logic for clipboard operations, menu state, color mode, and notifications
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
	ColorMode,
	NotificationMessage,
	BrowserInfo,
	AnimationState,
} from '@/types/components';

/**
 * Custom hook for clipboard operations with notification feedback
 * @param defaultTitle - Default title for clipboard notifications
 * @returns Object with copy function and state
 */
export function useClipboard(defaultTitle: string = 'Text') {
	const [isSupported, setIsSupported] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsSupported(!!navigator.clipboard);
	}, []);

	/**
	 * Copies text to clipboard and shows notification
	 * @param text - Text to copy
	 * @param title - Optional title for notification
	 * @returns Promise that resolves when copy is complete
	 */
	const copyToClipboard = useCallback(
		async (text: string, title?: string): Promise<void> => {
			if (!isSupported) {
				throw new Error('Clipboard API not supported');
			}

			try {
				setError(null);
				await navigator.clipboard.writeText(text);

				// Create notification
				const messageContainer = document.getElementById('clipboardMessages');
				if (messageContainer) {
					const message = document.createElement('div');
					message.className = 'clipboardMessage';
					message.textContent = `Copied ${title || defaultTitle}: ${text}`;
					messageContainer.appendChild(message);

					// Auto-remove after animation
					setTimeout(() => {
						if (messageContainer.contains(message)) {
							messageContainer.removeChild(message);
						}
					}, 3000);
				}
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : 'Failed to copy';
				setError(errorMessage);
				throw new Error(errorMessage);
			}
		},
		[isSupported, defaultTitle]
	);

	return {
		copyToClipboard,
		isSupported,
		error,
	};
}

/**
 * Custom hook for managing color mode (light/dark theme)
 * @param defaultMode - Default color mode
 * @returns Object with current mode and toggle function
 */
export function useColorMode(defaultMode: ColorMode = 'dark') {
	const [colorMode, setColorMode] = useState<ColorMode>(defaultMode);

	// Apply mode to document body
	useEffect(() => {
		const body = document.body;
		if (colorMode === 'light') {
			body.classList.add('light-mode');
		} else {
			body.classList.remove('light-mode');
		}
	}, [colorMode]);

	// Load saved preference from localStorage
	useEffect(() => {
		const saved = localStorage.getItem('color-mode') as ColorMode;
		if (saved === 'light' || saved === 'dark') {
			setColorMode(saved);
		}
	}, []);

	/**
	 * Toggles between light and dark mode
	 */
	const toggleColorMode = useCallback(() => {
		const newMode = colorMode === 'light' ? 'dark' : 'light';
		setColorMode(newMode);
		localStorage.setItem('color-mode', newMode);
	}, [colorMode]);

	return {
		colorMode,
		toggleColorMode,
		isDark: colorMode === 'dark',
		isLight: colorMode === 'light',
	};
}

/**
 * Custom hook for managing dropdown/menu state
 * @param initialOpen - Initial open state
 * @returns Object with open state and control functions
 */
export function useDropdown(initialOpen: boolean = false) {
	const [isOpen, setIsOpen] = useState(initialOpen);
	const dropdownRef = useRef<HTMLElement | null>(null);

	/**
	 * Toggles dropdown open state
	 */
	const toggle = useCallback(() => {
		setIsOpen(prev => !prev);
	}, []);

	/**
	 * Opens the dropdown
	 */
	const open = useCallback(() => {
		setIsOpen(true);
	}, []);

	/**
	 * Closes the dropdown
	 */
	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				close();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {};
	}, [isOpen, close]);

	// Close dropdown on escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				close();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}

		return () => {};
	}, [isOpen, close]);

	return {
		isOpen,
		toggle,
		open,
		close,
		dropdownRef,
	};
}

/**
 * Custom hook for managing notification messages
 * @returns Object with notifications array and management functions
 */
export function useNotifications() {
	const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

	/**
	 * Adds a new notification
	 * @param notification - Notification data without ID
	 */
	const addNotification = useCallback((notification: Omit<NotificationMessage, 'id'>) => {
		const id = Math.random().toString(36).substr(2, 9);
		const newNotification: NotificationMessage = {
			...notification,
			id,
			duration: notification.duration || 3000,
		};

		setNotifications(prev => [...prev, newNotification]);

		// Auto-remove notification after duration
		setTimeout(() => {
			setNotifications(prev => prev.filter(n => n.id !== id));
		}, newNotification.duration);
	}, []);

	/**
	 * Removes a notification by ID
	 * @param id - Notification ID to remove
	 */
	const removeNotification = useCallback((id: string) => {
		setNotifications(prev => prev.filter(notification => notification.id !== id));
	}, []);

	/**
	 * Clears all notifications
	 */
	const clearNotifications = useCallback(() => {
		setNotifications([]);
	}, []);

	return {
		notifications,
		addNotification,
		removeNotification,
		clearNotifications,
	};
}

/**
 * Custom hook for browser detection
 * @returns Browser information object
 */
export function useBrowserDetection(): BrowserInfo {
	const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
		name: 'Unknown',
		isIE: false,
		userAgent: '',
	});

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const isIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1;

		let name = 'Unknown';
		if (isIE) {
			name = 'Internet Explorer';
		} else if (userAgent.indexOf('Chrome') !== -1) {
			name = 'Chrome';
		} else if (userAgent.indexOf('Firefox') !== -1) {
			name = 'Firefox';
		} else if (userAgent.indexOf('Safari') !== -1) {
			name = 'Safari';
		} else if (userAgent.indexOf('Edge') !== -1) {
			name = 'Edge';
		}

		setBrowserInfo({
			name,
			isIE,
			userAgent,
		});

		// Redirect IE users to legacy version
		if (isIE) {
			window.location.href = '/legacy/home.html';
		}
	}, []);

	return browserInfo;
}

/**
 * Custom hook for managing section visibility (for navigation)
 * @param sectionId - ID of the section to manage
 * @returns Object with visibility state and control functions
 */
export function useSectionVisibility(sectionId: string) {
	const [isVisible, setIsVisible] = useState(sectionId === 'main_section_container_1');

	/**
	 * Shows this section and hides others
	 */
	const showSection = useCallback(() => {
		// Hide all sections
		const sections = document.querySelectorAll('[id^="main_section_container_"]');
		sections.forEach(section => {
			(section as HTMLElement).style.display = 'none';
		});

		// Show target section
		const targetSection = document.getElementById(sectionId);
		if (targetSection) {
			targetSection.style.display = 'flex';
		}

		setIsVisible(true);
	}, [sectionId]);

	/**
	 * Hides this section
	 */
	const hideSection = useCallback(() => {
		const targetSection = document.getElementById(sectionId);
		if (targetSection) {
			targetSection.style.display = 'none';
		}
		setIsVisible(false);
	}, [sectionId]);

	return {
		isVisible,
		showSection,
		hideSection,
	};
}

/**
 * Custom hook for managing animation states
 * @param duration - Animation duration in milliseconds
 * @returns Object with animation state and control functions
 */
export function useAnimation(duration: number = 300) {
	const [animationState, setAnimationState] = useState<AnimationState>('exited');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Starts enter animation
	 */
	const enter = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		setAnimationState('entering');
		timeoutRef.current = setTimeout(() => {
			setAnimationState('entered');
		}, duration);
	}, [duration]);

	/**
	 * Starts exit animation
	 */
	const exit = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		setAnimationState('exiting');
		timeoutRef.current = setTimeout(() => {
			setAnimationState('exited');
		}, duration);
	}, [duration]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		animationState,
		enter,
		exit,
		isVisible: animationState === 'entering' || animationState === 'entered',
	};
}

/**
 * Custom hook for loading external scripts
 * @param src - Script source URL
 * @param async - Whether to load script asynchronously
 * @returns Loading state
 */
export function useScript(src: string, async: boolean = true) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Check if script already exists
		const existingScript = document.querySelector(`script[src="${src}"]`);
		if (existingScript) {
			setLoading(false);
			return;
		}

		const script = document.createElement('script');
		script.src = src;
		script.async = async;

		script.onload = () => {
			setLoading(false);
		};

		script.onerror = () => {
			setError(`Failed to load script: ${src}`);
			setLoading(false);
		};

		document.body.appendChild(script);

		return () => {
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, [src, async]);

	return { loading, error };
}

/**
 * Custom hook for local storage state management
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Array with current value and setter function
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
	const [value, setValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch {
			return defaultValue;
		}
	});

	const setStoredValue = useCallback(
		(newValue: T) => {
			try {
				setValue(newValue);
				localStorage.setItem(key, JSON.stringify(newValue));
			} catch (error) {
				console.error(`Error saving to localStorage key "${key}":`, error);
			}
		},
		[key]
	);

	return [value, setStoredValue];
}
