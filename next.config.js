/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTwin = require('./withTwin');

const nextConfig = withTwin({
    reactStrictMode: true
});

module.exports = nextConfig;
