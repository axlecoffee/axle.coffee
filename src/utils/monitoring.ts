/**
 * @fileoverview Simple monitoring setup for production environment
 * Tracks errors, performance metrics, and user interactions
 *
 * @author Axle Duggan
 * @version 1.0.0
 */

export interface MonitoringConfig {
	/** Whether monitoring is enabled */
	enabled: boolean;
	/** API endpoint for sending metrics */
	endpoint?: string;
	/** Sample rate for performance monitoring (0-1) */
	sampleRate: number;
	/** Whether to log to console in development */
	debug: boolean;
}

export interface CustomErrorEvent {
	/** Error message */
	message: string;
	/** Error stack trace */
	stack?: string;
	/** URL where error occurred */
	url: string;
	/** Line number */
	line?: number;
	/** Column number */
	column?: number;
	/** Timestamp */
	timestamp: number;
	/** User agent */
	userAgent: string;
}

export interface PerformanceEvent {
	/** Event type */
	type: 'navigation' | 'paint' | 'interaction';
	/** Event name */
	name: string;
	/** Duration in milliseconds */
	duration: number;
	/** Timestamp */
	timestamp: number;
	/** Additional metadata */
	metadata?: Record<string, unknown>;
}

const DEFAULT_CONFIG: MonitoringConfig = {
	enabled: process.env.NODE_ENV === 'production',
	sampleRate: 0.1, // Monitor 10% of sessions
	debug: process.env.NODE_ENV === 'development',
};

class SimpleMonitoring {
	private config: MonitoringConfig;
	private sessionId: string;
	private events: (CustomErrorEvent | PerformanceEvent)[] = [];

	constructor(config: Partial<MonitoringConfig> = {}) {
		this.config = { ...DEFAULT_CONFIG, ...config };
		this.sessionId = this.generateSessionId();

		if (this.config.enabled && this.shouldSample()) {
			this.init();
		}
	}

	/**
	 * Initialize monitoring
	 */
	private init(): void {
		if (typeof window === 'undefined') return;

		// Track unhandled errors
		window.addEventListener('error', this.handleError.bind(this));
		window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));

		// Track performance metrics
		this.observePerformance();

		// Send events periodically
		setInterval(() => this.flush(), 30000); // Every 30 seconds

		// Send events before page unload
		window.addEventListener('beforeunload', () => this.flush());
	}

	/**
	 * Generate a unique session ID
	 */
	private generateSessionId(): string {
		return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Determine if this session should be monitored based on sample rate
	 */
	private shouldSample(): boolean {
		return Math.random() < this.config.sampleRate;
	}

	/**
	 * Handle JavaScript errors
	 */
	private handleError(event: globalThis.ErrorEvent): void {
		const errorEvent: CustomErrorEvent = {
			message: event.message || 'Unknown error',
			stack: event.error?.stack as string,
			url: event.filename || window.location.href,
			line: event.lineno,
			column: event.colno,
			timestamp: Date.now(),
			userAgent: navigator.userAgent,
		};

		this.trackEvent(errorEvent);
	}

	/**
	 * Handle promise rejections
	 */
	private handlePromiseRejection(event: PromiseRejectionEvent): void {
		const errorEvent: CustomErrorEvent = {
			message: `Unhandled Promise Rejection: ${event.reason}`,
			stack: event.reason?.stack,
			url: window.location.href,
			timestamp: Date.now(),
			userAgent: navigator.userAgent,
		};

		this.trackEvent(errorEvent);
	}

	/**
	 * Observe performance metrics
	 */
	private observePerformance(): void {
		if (!('PerformanceObserver' in window)) return;

		// Observe paint metrics
		try {
			const paintObserver = new PerformanceObserver(list => {
				for (const entry of list.getEntries()) {
					this.trackEvent({
						type: 'paint',
						name: entry.name,
						duration: entry.startTime,
						timestamp: Date.now(),
					});
				}
			});
			paintObserver.observe({ entryTypes: ['paint'] });
		} catch (e) {
			this.log('Failed to observe paint metrics:', e);
		}

		// Observe navigation metrics
		try {
			const navObserver = new PerformanceObserver(list => {
				for (const entry of list.getEntries()) {
					this.trackEvent({
						type: 'navigation',
						name: 'page-load',
						duration: entry.duration,
						timestamp: Date.now(),
						metadata: {
							domContentLoaded:
								(entry as PerformanceNavigationTiming).domContentLoadedEventEnd -
								(entry as PerformanceNavigationTiming).requestStart,
							loadComplete:
								(entry as PerformanceNavigationTiming).loadEventEnd -
								(entry as PerformanceNavigationTiming).requestStart,
						},
					});
				}
			});
			navObserver.observe({ entryTypes: ['navigation'] });
		} catch (e) {
			this.log('Failed to observe navigation metrics:', e);
		}
	}

	/**
	 * Track a custom event
	 */
	public trackEvent(event: CustomErrorEvent | PerformanceEvent): void {
		if (!this.config.enabled) return;

		this.events.push(event);
		this.log('Event tracked:', event);

		// Flush immediately for errors
		if ('message' in event) {
			this.flush();
		}
	}

	/**
	 * Track a custom interaction
	 */
	public trackInteraction(
		name: string,
		duration: number,
		metadata?: Record<string, unknown>
	): void {
		this.trackEvent({
			type: 'interaction',
			name,
			duration,
			timestamp: Date.now(),
			metadata: metadata || {},
		});
	}

	/**
	 * Send events to monitoring endpoint
	 */
	private async flush(): Promise<void> {
		if (this.events.length === 0) return;

		const events = [...this.events];
		this.events = [];

		if (this.config.endpoint) {
			try {
				await fetch(this.config.endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						sessionId: this.sessionId,
						events,
						url: window.location.href,
						timestamp: Date.now(),
					}),
				});
				this.log(`Sent ${events.length} events to monitoring endpoint`);
			} catch (error) {
				this.log('Failed to send events:', error);
				// Re-add events to queue for retry
				this.events.unshift(...events);
			}
		} else {
			this.log('No monitoring endpoint configured, events:', events);
		}
	}

	/**
	 * Log debug messages
	 */
	private log(...args: unknown[]): void {
		if (this.config.debug) {
			console.log('[Monitoring]', ...args);
		}
	}
}

// Create and export singleton instance
export const monitoring = new SimpleMonitoring({
	// Override default config here if needed
	// endpoint: 'https://your-monitoring-service.com/api/events',
});

// Export class for custom instances
export { SimpleMonitoring };
