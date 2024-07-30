/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const path = require('path');

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@swc/helpers'] = path.resolve(
      __dirname,
      'node_modules/@swc/helpers'
    );
    return config;
  },
});
