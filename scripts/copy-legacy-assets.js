/**
 * Legacy asset copy script for production builds
 * Ensures IE.css and other legacy assets are accessible at expected paths
 *
 * @author Axle Duggan
 * @version 1.0.0
 * @requires fs-extra
 * @requires path
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * Copies legacy CSS and assets to correct paths for IE compatibility
 * @async
 * @function copyLegacyAssets
 * @returns {Promise<void>} Promise that resolves when all assets are copied
 */
async function copyLegacyAssets() {
	try {
		console.log('📁 Copying legacy assets for production...');

		// Ensure directories exist
		await fs.ensureDir(path.join(__dirname, '../out/css'));

		// Copy IE.css to accessible location for legacy pages
		await fs.copy(
			path.join(__dirname, '../src/app/styles/IE.css'),
			path.join(__dirname, '../out/css/IE.css')
		);
		console.log('copied Legacy IE fonts to:' + path.join(__dirname, '../out/css/IE.css'));
		/*
        // Copy other legacy CSS if needed
        const legacyCssFiles = ['halloween_css.css', 'winter_css.css'];
        for (const cssFile of legacyCssFiles) {
            const sourcePath = path.join(__dirname, '../src/app/styles', cssFile);
            const destPath = path.join(__dirname, '../out/css', cssFile);
        	
            if (await fs.pathExists(sourcePath)) {
                await fs.copy(sourcePath, destPath);
                console.log(`✅ Copied ${cssFile} to /css/${cssFile}`);
            }
        }
        */
	} catch (error) {
		console.error('Error copying legacy assets: ', error);
		process.exit(1);
	}
}

/**
 * Main execution function
 */
if (require.main === module) {
	copyLegacyAssets();
}

module.exports = { copyLegacyAssets };
