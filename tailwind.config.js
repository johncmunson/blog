// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

// https://tailwindcss.com/docs/configuration

// Upgrade to tailwind 3.1 to get...
// https://tailwindcss.com/blog/tailwindcss-v3-1#first-party-type-script-types
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{js,ts,jsx,tsx,md}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // https://tailwindcss.com/docs/screens#max-width-breakpoints
      screens: {
        // Say you have className={`${MY_CLASSES}`} and you really want to
        // use all the styles that come with MY_CLASSES. But, maybe you don't
        // want the top margins that it comes with (at every min-width breakpoint).
        // This is a super convenient way to erase all the top margin styles...
        //   className={`${MY_CLASSES} -99xl:mt-0`}
        // Unfortunately, because this is still first and foremost a min-width
        // breakpoint system and because of how precedence works, you can't then
        // re-apply min-width classes once you've used -99xl to reset the top margin.
        // In other words, this will not work...
        //   className={`${MY_CLASSES} -99xl:mt-0 sm:mt-4`}
        //
        // UPDATE: Tailwind now supports max-width breakpoints, which might make this
        // solution obsolete. Or maybe not, I'm not sure. Give it a try...
        // https://tailwindcss.com/blog/tailwindcss-v3-2#max-width-and-dynamic-breakpoints
        '-99xl': { max: '99999px' },
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
      },
      colors: {
        primary: colors.sky,
      },
    },
  },
  // Tailwind supports plugins too
  // plugins: [require('@tailwindcss/typography')],
}
