/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components', 'context', 'hooks', 'lib', 'pages', 'types'], // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
  },
}
