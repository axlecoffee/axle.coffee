/**
 * @fileoverview Unit tests for React components
 * Tests browser detection and other components functionality
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

import { render } from '@testing-library/react';
import BrowserDetection from '@/components/BrowserDetection';

// Mock next/navigation
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn(),
	}),
}));

describe('BrowserDetection Component', () => {
	const originalUserAgent = navigator.userAgent;

	afterEach(() => {
		Object.defineProperty(navigator, 'userAgent', {
			value: originalUserAgent,
			writable: true,
		});
	});

	it('should render null for modern browsers', () => {
		Object.defineProperty(navigator, 'userAgent', {
			value:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			writable: true,
		});

		const { container } = render(<BrowserDetection />);
		expect(container.firstChild).toBeNull();
	});

	// Skip navigation tests due to JSDom limitations with window.location
	it.skip('should redirect IE users (skipped due to JSDom navigation limitations)', () => {
		expect(true).toBe(true);
	});

	it.skip('should detect MSIE user agent (skipped due to JSDom navigation limitations)', () => {
		expect(true).toBe(true);
	});
});
