import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: './.next',
  sassOptions: {
    prependData: `@use "/src/styles/utils/placeholders" as *; @use "/src/styles/utils/vars" as *;`,
  },
  /* config options here */
};

export default nextConfig;
