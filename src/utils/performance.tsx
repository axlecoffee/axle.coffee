/**
 * @fileoverview Performance monitoring utilities for Axle's Coffee website
 * Provides hooks and utilities for monitoring performance metrics and user experience
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';

/**
 * Extended Performance Entry interfaces for Web Vitals
 */
interface PerformanceEventTiming extends PerformanceEntry {
	processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
	value: number;
	hadRecentInput: boolean;
}

interface NetworkInformation {
	effectiveType: string;
	downlink: number;
	rtt: number;
	saveData: boolean;
	addEventListener: (type: string, listener: () => void) => void;
	removeEventListener: (type: string, listener: () => void) => void;
}

interface NavigatorWithConnection extends Navigator {
	connection?: NetworkInformation;
	mozConnection?: NetworkInformation;
	webkitConnection?: NetworkInformation;
}

interface PerformanceNavigationTimingExtended extends PerformanceNavigationTiming {
	navigationStart: number;
}

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
	/** First Contentful Paint */
	fcp?: number;
	/** Largest Contentful Paint */
	lcp?: number;
	/** First Input Delay */
	fid?: number;
	/** Cumulative Layout Shift */
	cls?: number;
	/** Time to Interactive */
	tti?: number;
	/** Total Blocking Time */
	tbt?: number;
}

/**
 * Network information interface
 */
export interface NetworkInfo {
	/** Connection type */
	effectiveType?: string;
	/** Downlink speed */
	downlink?: number;
	/** Round Trip Time */
	rtt?: number;
	/** Data saver mode */
	saveData?: boolean;
}

/**
 * Custom hook for monitoring Core Web Vitals
 * @returns Performance metrics object
 */
export function usePerformanceMetrics(): PerformanceMetrics {
	const [metrics, setMetrics] = useState<PerformanceMetrics>({});

	useEffect(() => {
		// Only run in browser environment
		if (typeof window === 'undefined') return;

		let observer: PerformanceObserver | null = null;

		try {
			// Observe performance entries
			observer = new PerformanceObserver(list => {
				for (const entry of list.getEntries()) {
					switch (entry.entryType) {
						case 'paint':
							if (entry.name === 'first-contentful-paint') {
								setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
							}
							break;
						case 'largest-contentful-paint':
							setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
							break;
						case 'first-input':
							setMetrics(prev => ({
								...prev,
								fid: (entry as PerformanceEventTiming).processingStart - entry.startTime,
							}));
							break;
						case 'layout-shift':
							if (!(entry as LayoutShift).hadRecentInput) {
								setMetrics(prev => ({
									...prev,
									cls: (prev.cls || 0) + (entry as LayoutShift).value,
								}));
							}
							break;
					}
				}
			});

			// Start observing different metrics
			observer.observe({ type: 'paint', buffered: true });
			observer.observe({ type: 'largest-contentful-paint', buffered: true });
			observer.observe({ type: 'first-input', buffered: true });
			observer.observe({ type: 'layout-shift', buffered: true });
		} catch (error) {
			console.warn('Performance Observer not supported:', error);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, []);

	return metrics;
}

/**
 * Custom hook for monitoring network information
 * @returns Network information object
 */
export function useNetworkInfo(): NetworkInfo {
	const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({});

	useEffect(() => {
		if (typeof window === 'undefined') return () => {};

		const updateNetworkInfo = () => {
			const nav = navigator as NavigatorWithConnection;
			const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

			if (connection) {
				setNetworkInfo({
					effectiveType: connection.effectiveType,
					downlink: connection.downlink,
					rtt: connection.rtt,
					saveData: connection.saveData,
				});
			}
		};

		updateNetworkInfo();

		// Listen for connection changes
		const nav = navigator as NavigatorWithConnection;
		const connection = nav.connection;
		if (connection) {
			connection.addEventListener('change', updateNetworkInfo);
			return () => connection.removeEventListener('change', updateNetworkInfo);
		}

		return () => {};
	}, []);

	return networkInfo;
}

/**
 * Custom hook for monitoring page load performance
 * @returns Page load metrics
 */
export function usePageLoadMetrics() {
	const [loadMetrics, setLoadMetrics] = useState<{
		domContentLoaded?: number;
		windowLoad?: number;
		navigationStart?: number;
		isLoading: boolean;
	}>({ isLoading: true });

	useEffect(() => {
		if (typeof window === 'undefined') return () => {};

		const updateMetrics = () => {
			const navigation = performance.getEntriesByType(
				'navigation'
			)[0] as PerformanceNavigationTiming;

			if (navigation) {
				const navExtended = navigation as PerformanceNavigationTimingExtended;
				setLoadMetrics({
					domContentLoaded: navigation.domContentLoadedEventEnd - navExtended.navigationStart,
					windowLoad: navigation.loadEventEnd - navExtended.navigationStart,
					navigationStart: navExtended.navigationStart,
					isLoading: false,
				});
			}
		};

		if (document.readyState === 'complete') {
			updateMetrics();
		} else {
			window.addEventListener('load', updateMetrics);
			return () => window.removeEventListener('load', updateMetrics);
		}

		return () => {};
	}, []);

	return loadMetrics;
}

/**
 * Custom hook for tracking resource loading
 * @returns Resource loading metrics
 */
export function useResourceMetrics() {
	const [resources, setResources] = useState<{
		scripts: number;
		stylesheets: number;
		images: number;
		fonts: number;
		totalSize: number;
	}>({
		scripts: 0,
		stylesheets: 0,
		images: 0,
		fonts: 0,
		totalSize: 0,
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const updateResourceMetrics = () => {
			const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

			let scripts = 0;
			let stylesheets = 0;
			let images = 0;
			let fonts = 0;
			let totalSize = 0;

			resources.forEach(resource => {
				const url = resource.name;
				const size = resource.transferSize || 0;
				totalSize += size;

				if (url.includes('.js') || url.includes('script')) {
					scripts++;
				} else if (url.includes('.css') || url.includes('stylesheet')) {
					stylesheets++;
				} else if (
					url.includes('.png') ||
					url.includes('.jpg') ||
					url.includes('.gif') ||
					url.includes('.webp')
				) {
					images++;
				} else if (url.includes('.woff') || url.includes('.woff2') || url.includes('.ttf')) {
					fonts++;
				}
			});

			setResources({ scripts, stylesheets, images, fonts, totalSize });
		};

		// Update immediately and on load
		updateResourceMetrics();
		window.addEventListener('load', updateResourceMetrics);

		return () => window.removeEventListener('load', updateResourceMetrics);
	}, []);

	return resources;
}

/**
 * Performance monitoring utility functions
 */
export const PerformanceUtils = {
	/**
	 * Logs performance metrics to console
	 * @param metrics - Performance metrics to log
	 */
	logMetrics: (metrics: PerformanceMetrics) => {
		console.group('🚀 Performance Metrics');
		if (metrics.fcp) console.log(`First Contentful Paint: ${metrics.fcp.toFixed(2)}ms`);
		if (metrics.lcp) console.log(`Largest Contentful Paint: ${metrics.lcp.toFixed(2)}ms`);
		if (metrics.fid) console.log(`First Input Delay: ${metrics.fid.toFixed(2)}ms`);
		if (metrics.cls) console.log(`Cumulative Layout Shift: ${metrics.cls.toFixed(4)}`);
		console.groupEnd();
	},

	/**
	 * Sends performance metrics to analytics (placeholder)
	 * @param metrics - Performance metrics to send
	 */
	sendToAnalytics: (metrics: PerformanceMetrics) => {
		// In a real application, you would send these to your analytics service
		console.log('📊 Sending metrics to analytics:', metrics);
	},

	/**
	 * Checks if performance is acceptable based on thresholds
	 * @param metrics - Performance metrics to check
	 * @returns Whether performance meets acceptable thresholds
	 */
	isPerformanceAcceptable: (metrics: PerformanceMetrics): boolean => {
		const thresholds = {
			fcp: 2500, // ms
			lcp: 4000, // ms
			fid: 300, // ms
			cls: 0.25, // score
		};

		return (
			(!metrics.fcp || metrics.fcp <= thresholds.fcp) &&
			(!metrics.lcp || metrics.lcp <= thresholds.lcp) &&
			(!metrics.fid || metrics.fid <= thresholds.fid) &&
			(!metrics.cls || metrics.cls <= thresholds.cls)
		);
	},
};

/**
 * Component for displaying performance metrics in development
 */
export function PerformanceMonitor() {
	const metrics = usePerformanceMetrics();
	const networkInfo = useNetworkInfo();
	const loadMetrics = usePageLoadMetrics();
	const resourceMetrics = useResourceMetrics();

	// Only show in development
	if (process.env.NODE_ENV !== 'development') {
		return null;
	}

	return (
		<div
			style={{
				position: 'fixed',
				bottom: 10,
				left: 10,
				background: 'rgba(0, 0, 0, 0.8)',
				color: 'white',
				padding: 10,
				borderRadius: 5,
				fontSize: 12,
				zIndex: 9999,
				maxWidth: 300,
			}}
		>
			<div>
				<strong>Performance Monitor</strong>
			</div>
			{metrics.fcp && <div>FCP: {metrics.fcp.toFixed(0)}ms</div>}
			{metrics.lcp && <div>LCP: {metrics.lcp.toFixed(0)}ms</div>}
			{metrics.fid && <div>FID: {metrics.fid.toFixed(0)}ms</div>}
			{metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
			{networkInfo.effectiveType && <div>Connection: {networkInfo.effectiveType}</div>}
			{loadMetrics.domContentLoaded && <div>DOM: {loadMetrics.domContentLoaded.toFixed(0)}ms</div>}
			<div>
				Resources: {resourceMetrics.scripts}js, {resourceMetrics.stylesheets}css,{' '}
				{resourceMetrics.images}img
			</div>
		</div>
	);
}
