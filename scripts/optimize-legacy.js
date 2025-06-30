/**
 * Legacy optimization script for production builds
 * Optimizes legacy assets and ensures compatibility with older browsers
 *
 * @author Axle Duggan
 * @version 1.0.0
 * @requires fs-extra
 * @requires path
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * Optimizes legacy CSS and HTML for production
 * @async
 * @function optimizeLegacyAssets
 * @returns {Promise<void>} Promise that resolves when optimization is complete
 */
async function optimizeLegacyAssets() {
	try {
		console.log('🔧 Optimizing legacy assets for production...');

		const outDir = path.join(__dirname, '../out');
		const legacyDir = path.join(outDir, 'legacy');

		// Ensure legacy directory exists
		if (!(await fs.pathExists(legacyDir))) {
			console.warn('⚠️  Legacy directory not found, skipping optimization');
			return;
		}

		// Minify CSS files in the output directory
		const cssDir = path.join(outDir, 'css');
		if (await fs.pathExists(cssDir)) {
			const cssFiles = await fs.readdir(cssDir);

			for (const file of cssFiles) {
				if (file.endsWith('.css')) {
					const filePath = path.join(cssDir, file);
					const content = await fs.readFile(filePath, 'utf8');

					// Basic CSS minification (remove comments and excess whitespace)
					const minified = content
						.replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
						.replace(/\s+/g, ' ') // Replace multiple spaces with single space
						.replace(/;\s*}/g, '}') // Remove semicolon before closing brace
						.replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
						.replace(/;\s*/g, ';') // Remove spaces after semicolons
						.trim();

					await fs.writeFile(filePath, minified);
					console.log(`✅ Minified ${file}`);
				}
			}
		}

		// Optimize legacy HTML files
		const legacyFiles = await fs.readdir(legacyDir);

		for (const file of legacyFiles) {
			if (file.endsWith('.html')) {
				const filePath = path.join(legacyDir, file);
				const content = await fs.readFile(filePath, 'utf8');

				// Basic HTML optimization
				const optimized = content
					.replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments (except IE conditionals)
					.replace(/\s+/g, ' ') // Replace multiple spaces with single space
					.replace(/>\s+</g, '><') // Remove whitespace between tags
					.trim();

				await fs.writeFile(filePath, optimized);
				console.log(`✅ Optimized ${file}`);
			}
		}

		// Create a manifest of all legacy assets
		const manifest = {
			timestamp: new Date().toISOString(),
			files: {
				css: [],
				html: [],
				images: [],
			},
		};

		// Catalog CSS files
		if (await fs.pathExists(cssDir)) {
			const cssFiles = await fs.readdir(cssDir);
			manifest.files.css = cssFiles.filter(f => f.endsWith('.css'));
		}

		// Catalog HTML files
		const htmlFiles = await fs.readdir(legacyDir);
		manifest.files.html = htmlFiles.filter(f => f.endsWith('.html'));

		// Catalog image files if img directory exists
		const imgDir = path.join(outDir, 'img');
		if (await fs.pathExists(imgDir)) {
			const imgFiles = await fs.readdir(imgDir);
			manifest.files.images = imgFiles.filter(
				f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.gif') || f.endsWith('.webp')
			);
		}

		// Write manifest
		await fs.writeFile(
			path.join(outDir, 'legacy-manifest.json'),
			JSON.stringify(manifest, null, 2)
		);

		console.log('📄 Created legacy asset manifest');
		console.log('🎉 Legacy optimization complete!');
	} catch (error) {
		console.error('❌ Error optimizing legacy assets:', error);
		process.exit(1);
	}
}

/**
 * Main execution function
 */
if (require.main === module) {
	optimizeLegacyAssets();
}

module.exports = { optimizeLegacyAssets };
