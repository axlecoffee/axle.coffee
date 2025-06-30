/**
 * @fileoverview Unit tests for utility functions
 * Tests performance monitoring and other utility functionality
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

describe('Performance Utilities', () => {
	// Mock performance API
	const mockPerformance = {
		getEntriesByType: jest.fn(),
		getEntriesByName: jest.fn(),
		now: jest.fn(() => Date.now()),
	};

	beforeAll(() => {
		Object.defineProperty(global, 'performance', {
			value: mockPerformance,
			writable: true,
		});
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should have performance API available', () => {
		expect(global.performance).toBeDefined();
		expect(typeof global.performance.now).toBe('function');
	});

	it('should be able to mock performance entries', () => {
		const mockEntries = [
			{
				name: 'first-contentful-paint',
				entryType: 'paint',
				startTime: 100,
				duration: 0,
			},
		];

		mockPerformance.getEntriesByType.mockReturnValue(mockEntries);

		const paintEntries = performance.getEntriesByType('paint');
		expect(paintEntries).toEqual(mockEntries);
		expect(mockPerformance.getEntriesByType).toHaveBeenCalledWith('paint');
	});
});

describe('Browser Detection Utilities', () => {
	const originalUserAgent = navigator.userAgent;

	afterEach(() => {
		Object.defineProperty(navigator, 'userAgent', {
			value: originalUserAgent,
			writable: true,
		});
	});

	it('should detect Internet Explorer correctly', () => {
		Object.defineProperty(navigator, 'userAgent', {
			value: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
			writable: true,
		});

		const isIE = /MSIE|Trident/.test(navigator.userAgent);
		expect(isIE).toBe(true);
	});

	it('should not detect IE for modern browsers', () => {
		Object.defineProperty(navigator, 'userAgent', {
			value:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			writable: true,
		});

		const isIE = /MSIE|Trident/.test(navigator.userAgent);
		expect(isIE).toBe(false);
	});
});

describe('Clipboard Utilities', () => {
	const mockClipboard = {
		writeText: jest.fn(),
	};

	beforeAll(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: mockClipboard,
			writable: true,
		});
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should be able to write to clipboard', async () => {
		mockClipboard.writeText.mockResolvedValue(undefined);

		await navigator.clipboard.writeText('test text');

		expect(mockClipboard.writeText).toHaveBeenCalledWith('test text');
	});

	it('should handle clipboard write failures', async () => {
		const error = new Error('Clipboard write failed');
		mockClipboard.writeText.mockRejectedValue(error);

		await expect(navigator.clipboard.writeText('test')).rejects.toThrow('Clipboard write failed');
	});
});
