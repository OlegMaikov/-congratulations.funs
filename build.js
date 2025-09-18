
```javascript
const fs = require('fs-extra');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');
// The `filesToCopy` paths are relative to the project root (where build.js lives).

/* @tweakable list of files to copy from the project root to the deployment directory */
const filesToCopy = [
    'index.html',
    'admin.html', // Add new admin page
    'style.css',
    'script.js',
    'admin.js', // Add new admin script
    'favicon.png',
    'logo.png',
    'icon_microphone.png',
    'icon_sound_wave.png',
    'vk_icon.png',
    'copy_sound.mp3', // Still included even if not used, to maintain asset presence.
    // All greeting card images
    'birthday_card.png',
    'birthday_card_2.png',
    'birthday_card_3.png',
    'birthday_card_4.png',
    'child_day_card.png',
    'company_anniversary_card.png',
    'general_celebration_card.png',
    'general_celebration_card_2.png',
    'general_celebration_card_3.png',
    'graduation_card.png',
    'graduation_card_2.png',
    'graduation_card_3.png',
    'may_day_card.png',
    'mens_day_card.png',
    'mens_day_card_2.png',
    'mens_day_card_3.png',
    'new_baby_card.png',
    'new_home_card.png',
    'new_year_card.png',
    'new_year_card_2.png',
    'new_year_card_3.png',
    'pascha_card.png',
    'patriotic_card.png',
    'patriotic_card_2.png',
    'patriotic_card_3.png',
    'pension_card.png',
    'wedding_card.png',
    'wedding_card_2.png',
    'wedding_card_3.png',
    'womens_day_card.png',
    'womens_day_card_2.png',
    'womens_day_card_3.png'
];

async function build() {
    console.log('Starting build process...');

    try {
        // 1. Clean the dist directory
        console.log(`Cleaning ${distDir}...`);
        await fs.remove(distDir); // Ensure dist directory is clean
        await fs.ensureDir(distDir); // Create it if it doesn't exist
        console.log('Dist directory cleaned and ensured.');

        // 2. Copy files to dist directory
        console.log('Copying files...');
        for (const file of filesToCopy) {
            const sourcePath = path.join(__dirname, file); // Ensure source path is absolute from project root
            const destPath = path.join(distDir, file);

            // Check if source file exists before attempting to copy
            if (!await fs.pathExists(sourcePath)) {
                console.warn(`Warning: Source file not found, skipping: ${sourcePath}. Please ensure this file exists in your project root.`);
                continue; // Skip this file and continue with the next one
            }

            await fs.copy(sourcePath, destPath);
            console.log(`Copied: ${file}`);
        }

        console.log('Build process completed successfully!');
    } catch (err) {
        console.error('Error during build process:', err);
        process.exit(1); // Exit with a non-zero code to indicate failure
    }
}

build();