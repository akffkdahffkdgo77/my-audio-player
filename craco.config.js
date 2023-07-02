// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json'
            }
        }
    ]
};
