/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['components', 'context', 'hooks', 'lib', 'pages', 'types'], // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
  },
}

module.exports = nextConfig
