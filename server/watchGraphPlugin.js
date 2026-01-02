const path = require('path');
const { exec } = require('child_process');

module.exports = function (context, options) {
    return {
        name: 'docusaurus-plugin-auto-graph',

        getPathsToWatch() {
            // Watch all markdown files in the blog directory
            const blogDir = path.join(process.cwd(), 'blog');
            return [`${blogDir}/**/*.{md,mdx}`];
        },

        async loadContent() {
            // This hook is called when the plugin is loaded OR when watched files change.
            // We can trigger the graph generation here.
            try {
                console.log('📝 Blog content changed detected by plugin. Regenerating graph...');

                const scriptPath = path.join(process.cwd(), 'server', 'generateGraph.js');
                exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`❌ Error regenerating graph: ${error.message}`);
                        return;
                    }
                    if (stdout) console.log(stdout.trim());
                    if (stderr) console.error(stderr.trim());
                });
            } catch (e) {
                console.error('❌ Error regenerating graph:', e);
            }
        },

        // contentLoaded is required by Docusaurus lifecycle if loadContent is used, 
        // even if we don't return anything useful from loadContent for the frontend.
        async contentLoaded({ content, actions }) {
            // No-op: we just wanted side-effects of loadContent
        }
    };
};
