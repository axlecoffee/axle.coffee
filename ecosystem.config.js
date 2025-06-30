/**
 * PM2 ecosystem configuration for Axle's Coffee website
 * Serves the static exported Next.js build
 */
module.exports = {
	apps: [
		{
			name: 'axle-coffee-website',
			script: 'server.js',
			interpreter: 'node',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
			env_production: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
		},
	],
};
