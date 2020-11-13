const path = require('path')
const CracoRawLoaderPlugin = require("@baristalabs/craco-raw-loader");

module.exports = {
    plugins: [
        {
            plugin: CracoRawLoaderPlugin,
            options: {
                test: /\.md$/,
            }
        }
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            libs: path.resolve(__dirname, './src/libs'),
            docs: path.resolve(__dirname, './src/docs'),
            pages: path.resolve(__dirname, './src/pages'),
            components: path.resolve(__dirname, './src/components'),
            styles: path.resolve(__dirname, './src/styles'),
        },
    }
};