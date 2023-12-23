# localhtml

The content of this repo is for building a single page static site with persistent form data and rich text editor fields. The page can be saved locally as a single HTML file and works offline. The local copy holds all data needed to repopulate the sheet, and newer versions of the page can import data from older versions.

A pre-built copy of the example page is provided as `docs/index.html`.  
This is hosted using GitHub pages at https://SageRalph.github.io/localhtml/

## How To use

This project is intended as a quick-start template. To build your own localhtml project, fork this repo and change the content of as needed. For most uses, you should only need to modify files in the `src` folder. You can import any other files needed for your project (CSS, JS, fonts, etc) in `scr/index.js`, these will be automatically bundled during the build process.

## Building the Document

The site is built using Node.js, NPM, and Webpack.

First install dependencies using `npm install --dev`

Build the site for development (unminified) by running `npm run build-debug`

Build the site for production by running `npm run build`

The output should be a single html `docs/index.html` which is a static page containing everything needed to work offline. You may want to host his using GitHub Pages or your static hosting service of choice. If not using GitHub Pages you may want to add `/docs/` to your `.gitignore` file, otherwise:

ONLY COMMIT PRODUCTION BUILDS TO THE REPO

Semantic versioning is used to prompt users to update to the latest version of the sheet when you publish an update. When a local copy of the sheet is opened, the `latestVersionURL` specified in `src/index.js` is checked for a more recent version of the sheet. Note: If a copy of the sheet does not exist at this URL, older versions will not prompt for updates, so if you need to change the hosting location, you should set up a redirect if possible.

A key feature of the site is the ability to save a local copy of the page as a single file that can later be accessed offline. This requires all assets to be inlined by Webpack. Any new content should be serialisable in an HTML file (e.g. HTML, CSS, JavaScript, dataURLs) and not depend on any external resources (e.g. CDNs). Consideration should also be given to the effect on filesize.
