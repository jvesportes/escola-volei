import bundleAnalyzer from '@next/bundle-analyzer';

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [],
  },
  webpack: (config) => {
    let modularizeImports = null;
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports;

        return modularizeImports;
      }),
    );
    if (modularizeImports?.['@headlessui/react']) delete modularizeImports['@headlessui/react'];

    return config;
  },
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig);
