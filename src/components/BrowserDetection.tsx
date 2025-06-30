/**
 * Browser detection utility for IE compatibility
 * Redirects IE browsers to legacy version
 */
'use client';

import { useEffect } from 'react';

/**
 * Checks if the browser is Internet Explorer and redirects to legacy version
 */
export function useBrowserDetection() {
	useEffect(() => {
		const userAgent = navigator.userAgent;

		// Check for IE browsers (MSIE or Trident)
		if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) {
			// Redirect to legacy version for IE browsers
			window.location.href = '/legacy/home.html';
		}
	}, []);
}

/**
 * Component that handles browser detection on initial load
 */
export default function BrowserDetection() {
	useBrowserDetection();
	return null; // This component renders nothing
}
