/**
 * @fileoverview Unit tests for custom React hooks
 * Tests clipboard, color mode, and other hook functionality
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

import { renderHook, act } from '@testing-library/react';
import {
	useClipboard,
	useColorMode,
	useDropdown,
	useNotifications,
	useBrowserDetection,
	useSectionVisibility,
	useLocalStorage,
} from '../hooks';

// Mock DOM elements for testing
beforeEach(() => {
	document.body.innerHTML = '';
	localStorage.clear();
});

describe('useClipboard Hook', () => {
	beforeEach(() => {
		// Mock clipboard API
		Object.assign(navigator, {
			clipboard: {
				writeText: jest.fn(() => Promise.resolve()),
			},
		});

		// Mock clipboard messages container
		const messageContainer = document.createElement('div');
		messageContainer.id = 'clipboardMessages';
		document.body.appendChild(messageContainer);
	});

	it('should copy text to clipboard', async () => {
		const { result } = renderHook(() => useClipboard());

		await act(async () => {
			await result.current.copyToClipboard('test text');
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
		expect(result.current.error).toBe(null);
	});

	it('should handle clipboard API not supported', () => {
		Object.assign(navigator, { clipboard: undefined });

		const { result } = renderHook(() => useClipboard());
		expect(result.current.isSupported).toBe(false);
	});

	it('should handle copy errors', async () => {
		const mockError = new Error('Copy failed');
		Object.assign(navigator, {
			clipboard: {
				writeText: jest.fn(() => Promise.reject(mockError)),
			},
		});

		const { result } = renderHook(() => useClipboard());

		await act(async () => {
			try {
				await result.current.copyToClipboard('test text');
			} catch {
				// Expected to throw
			}
		});

		expect(result.current.error).toBe('Copy failed');
	});
});

describe('useColorMode Hook', () => {
	beforeEach(() => {
		// Reset localStorage
		localStorage.clear();
		// Reset document classes
		document.body.className = '';
	});

	it('should initialize with dark mode by default', () => {
		const { result } = renderHook(() => useColorMode());
		expect(result.current.isDark).toBe(true);
		expect(result.current.isLight).toBe(false);
	});

	it('should toggle color mode', () => {
		const { result } = renderHook(() => useColorMode());

		act(() => {
			result.current.toggleColorMode();
		});

		expect(result.current.isLight).toBe(true);
		expect(result.current.isDark).toBe(false);
		expect(document.body.classList.contains('light-mode')).toBe(true);
	});

	it('should persist color mode in localStorage', () => {
		const { result } = renderHook(() => useColorMode());

		act(() => {
			result.current.toggleColorMode();
		});

		expect(localStorage.getItem('color-mode')).toBe('light');
	});

	it('should load saved preference from localStorage', () => {
		localStorage.setItem('color-mode', 'light');

		const { result } = renderHook(() => useColorMode());

		// Need to wait for effect to run
		act(() => {});

		expect(result.current.isLight).toBe(true);
	});
});

describe('useDropdown Hook', () => {
	it('should initialize with closed state', () => {
		const { result } = renderHook(() => useDropdown());
		expect(result.current.isOpen).toBe(false);
	});

	it('should toggle dropdown state', () => {
		const { result } = renderHook(() => useDropdown());

		act(() => {
			result.current.toggle();
		});

		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.toggle();
		});

		expect(result.current.isOpen).toBe(false);
	});

	it('should open and close dropdown', () => {
		const { result } = renderHook(() => useDropdown());

		act(() => {
			result.current.open();
		});

		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.close();
		});

		expect(result.current.isOpen).toBe(false);
	});

	it('should close on escape key', () => {
		const { result } = renderHook(() => useDropdown());

		act(() => {
			result.current.open();
		});

		expect(result.current.isOpen).toBe(true);

		act(() => {
			const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
			document.dispatchEvent(escapeEvent);
		});

		expect(result.current.isOpen).toBe(false);
	});
});

describe('useNotifications Hook', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should add and remove notifications', () => {
		const { result } = renderHook(() => useNotifications());

		act(() => {
			result.current.addNotification({
				text: 'Test message',
				type: 'success',
			});
		});

		expect(result.current.notifications).toHaveLength(1);
		expect(result.current.notifications[0]?.text).toBe('Test message');
		expect(result.current.notifications[0]?.type).toBe('success');

		// Auto-remove after duration
		act(() => {
			jest.advanceTimersByTime(3000);
		});

		expect(result.current.notifications).toHaveLength(0);
	});

	it('should manually remove notifications', () => {
		const { result } = renderHook(() => useNotifications());

		act(() => {
			result.current.addNotification({
				text: 'Test message',
				type: 'info',
			});
		});

		const notificationId = result.current.notifications[0]?.id;

		act(() => {
			if (notificationId) {
				result.current.removeNotification(notificationId);
			}
		});

		expect(result.current.notifications).toHaveLength(0);
	});

	it('should clear all notifications', () => {
		const { result } = renderHook(() => useNotifications());

		act(() => {
			result.current.addNotification({ text: 'Test 1', type: 'info' });
			result.current.addNotification({ text: 'Test 2', type: 'success' });
		});

		expect(result.current.notifications).toHaveLength(2);

		act(() => {
			result.current.clearNotifications();
		});

		expect(result.current.notifications).toHaveLength(0);
	});
});

describe('useBrowserDetection Hook', () => {
	const originalUserAgent = navigator.userAgent;

	afterEach(() => {
		Object.defineProperty(navigator, 'userAgent', {
			value: originalUserAgent,
			writable: true,
		});
	});

	// Skip navigation tests due to JSDom limitations with window.location
	it.skip('should detect IE browser and redirect (skipped due to JSDom navigation limitations)', () => {
		expect(true).toBe(true);
	});

	it('should detect Chrome browser', () => {
		Object.defineProperty(navigator, 'userAgent', {
			value:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			writable: true,
		});

		const { result } = renderHook(() => useBrowserDetection());

		act(() => {});

		expect(result.current.isIE).toBe(false);
		expect(result.current.name).toBe('Chrome');
	});

	it('should detect Firefox browser', () => {
		Object.defineProperty(navigator, 'userAgent', {
			value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
			writable: true,
		});

		const { result } = renderHook(() => useBrowserDetection());

		act(() => {});

		expect(result.current.isIE).toBe(false);
		expect(result.current.name).toBe('Firefox');
	});

	it('should identify IE user agent without redirect in tests', () => {
		Object.defineProperty(navigator, 'userAgent', {
			value: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
			writable: true,
		});

		const { result } = renderHook(() => useBrowserDetection());

		act(() => {});

		expect(result.current.isIE).toBe(true);
		expect(result.current.name).toBe('Internet Explorer');
		expect(result.current.userAgent).toContain('Trident');
	});
});

describe('useSectionVisibility Hook', () => {
	beforeEach(() => {
		// Create mock sections
		const section1 = document.createElement('div');
		section1.id = 'main_section_container_1';
		section1.style.display = 'block';
		document.body.appendChild(section1);

		const section2 = document.createElement('div');
		section2.id = 'main_section_container_2';
		section2.style.display = 'none';
		document.body.appendChild(section2);
	});

	it('should initialize with main section visible', () => {
		const { result } = renderHook(() => useSectionVisibility('main_section_container_1'));
		expect(result.current.isVisible).toBe(true);
	});

	it('should initialize with other sections hidden', () => {
		const { result } = renderHook(() => useSectionVisibility('main_section_container_2'));
		expect(result.current.isVisible).toBe(false);
	});

	it('should show section when called', () => {
		const { result } = renderHook(() => useSectionVisibility('main_section_container_2'));

		act(() => {
			result.current.showSection();
		});

		expect(result.current.isVisible).toBe(true);

		const section2 = document.getElementById('main_section_container_2');
		expect(section2?.style.display).toBe('flex');
	});
});

describe('useLocalStorage Hook', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should return initial value when key does not exist', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
		expect(result.current[0]).toBe('default');
	});

	it('should set and get values from localStorage', () => {
		const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

		act(() => {
			result.current[1]('new value');
		});

		expect(result.current[0]).toBe('new value');
		expect(localStorage.getItem('test-key')).toBe('"new value"');
	});

	it('should handle JSON serialization', () => {
		const { result } = renderHook(() => useLocalStorage('test-object', { count: 0 }));

		act(() => {
			result.current[1]({ count: 5 });
		});

		expect(result.current[0]).toEqual({ count: 5 });
	});

	it('should handle localStorage errors gracefully', () => {
		// Mock localStorage to throw an error
		const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
		setItemSpy.mockImplementation(() => {
			throw new Error('QuotaExceededError');
		});

		const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

		act(() => {
			result.current[1]('new value');
		});

		// Should still work with in-memory state even if localStorage fails
		expect(result.current[0]).toBe('new value');

		setItemSpy.mockRestore();
	});
});
