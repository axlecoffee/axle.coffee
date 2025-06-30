/**
 * @fileoverview Production Express server for Axle's Coffee static website
 * Serves Next.js exported files with proper routing and fallbacks for SPA behavior
 * Used with PM2 for production hosting with zero-downtime deployments
 *
 * @author Axle Duggan
 * @version 1.0.0
 * @requires express
 * @requires path
 * @requires fs
 *
 * @example
 * // Start the server
 * node server.js
 *
 * @example
 * // Start with PM2
 * pm2 start ecosystem.config.js
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3002;

/**
 * Path to the static build output directory
 * @constant {string}
 */
const staticPath = path.join(__dirname, 'out');

/**
 * Validates that the build directory exists before starting server
 * @function
 * @throws {Error} Exits process if build directory not found
 */
function validateBuildDirectory() {
	if (!fs.existsSync(staticPath)) {
		console.error("❌ Build directory 'out' not found. Please run 'pnpm build' first.");
		process.exit(1);
	}
	console.log('✅ Build directory found at:', staticPath);
}

// Check if build exists
validateBuildDirectory();

/**
 * Configures Express to serve static files from the build output
 * Enables serving of CSS, JS, images, and other static assets
 */
app.use(express.static(staticPath));

/**
 * Handles all HTTP requests with intelligent file serving
 * Implements SPA-style routing with fallbacks for missing files
 *
 * @function
 * @param {string} req.path - The requested URL path
 * @param {Object} res - Express response object
 *
 * @example
 * // Serves direct files: /favicon.ico -> /out/favicon.ico
 * // Serves directory index: /about -> /out/about/index.html
 * // Fallback to root: /nonexistent -> /out/index.html
 */
app.get('*', (req, res) => {
	const requestedPath = req.path;
	const filePath = path.join(staticPath, requestedPath);

	// Check if the requested file exists and serve it directly
	if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
		res.sendFile(filePath);
		return;
	}

	// For directories or non-existent paths, try to serve index.html from that directory
	const indexPath = path.join(filePath, 'index.html');
	if (fs.existsSync(indexPath)) {
		res.sendFile(indexPath);
		return;
	}

	// Fallback to main index.html for SPA routing
	const fallbackPath = path.join(staticPath, 'index.html');
	if (fs.existsSync(fallbackPath)) {
		res.sendFile(fallbackPath);
	} else {
		res.status(404).send('File not found');
	}
});

/**
 * Starts the Express server and listens on the specified port
 * @function
 * @param {number} port - Port number to listen on (default: 3002)
 */
app.listen(port, () => {
	console.log(`Website running on http://localhost:${port}`);
	console.log(`Serving static files from: ${staticPath}`);
	console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
