/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

// https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion-typescript
const path = require('path');

// The folders containing files importing twin.macro
const includedDirs = [path.resolve(__dirname, 'components')];

module.exports = function withTwin(nextConfig) {
    return {
        ...nextConfig,
        webpack(config, options) {
            const { dev, isServer } = options;
            config.module = config.module || {};
            config.module.rules = config.module.rules || [];

            // Make the loader work with the new app directory
            // https://github.com/ben-rogerson/twin.macro/issues/788
            const patchedDefaultLoaders = options.defaultLoaders.babel;
            patchedDefaultLoaders.options.hasServerComponents = false;
            patchedDefaultLoaders.options.hasReactRefresh = false;

            config.module.rules.push({
                test: /\.(tsx|ts)$/,
                include: includedDirs,
                use: [
                    patchedDefaultLoaders,
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMaps: dev,
                            presets: [['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
                            plugins: [require.resolve('babel-plugin-macros'), require.resolve('@emotion/babel-plugin'), [require.resolve('@babel/plugin-syntax-typescript'), { isTSX: true }]]
                        }
                    }
                ]
            });

            if (!isServer) {
                config.resolve.fallback = {
                    ...(config.resolve.fallback || {}),
                    fs: false,
                    module: false,
                    path: false,
                    os: false,
                    crypto: false
                };
            }

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options);
            }
            return config;
        }
    };
};
