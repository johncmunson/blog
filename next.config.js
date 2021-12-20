/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'lib', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}
