/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'lib', 'utils', 'content'], // Only run ESLint on these directories during production builds (next build)
  },
}
