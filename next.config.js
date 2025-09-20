/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './.next',
  reactStrictMode: false,
  sassOptions: {
    prependData: `@use "./src/styles/utils/placeholders" as *; @use "./src/styles/utils/vars" as *;`,
  },
  reactStrictMode: false,
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
