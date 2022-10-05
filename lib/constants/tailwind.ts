// WARNING... it might be split tailwind classes apart. For example, you
// might be tempted to do something like...
//   const CLEARANCE = 10
//   const MARGIN_TOP = `mt-${CLEARANCE}`
//   const MARGIN_BOTTOM = `mb-${CLEARANCE}`
//
// DO NOT DO THIS!! It will break the Tailwind JIT engine.

// Consider making some more Atom components, instead of doing this
// in multiple places...
//   file1: <p className={BODY_TEXT}>Foo</p>
//   file2: <p className={BODY_TEXT}>Bar</p>
//
// See the <PageHeading /> component for a perfect example.

// It might be kinda questionable including margin in some of the
// constants below. Limits their reusablity in different contexts.
// Another reason to start making more Atom components.

export const NAV_MT = 'mt-9'
export const H2 =
  'text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-7 sm:mt-8 md:mt-9 lg:mt-10'
export const H3 =
  'text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 sm:mt-7 md:mt-8 lg:mt-9'
export const BODY_TEXT = `text-base sm:text-lg md:text-xl lg:text-2xl mt-1 sm:mt-2 md:mt-3 lg:mt-4`
const LIST = 'ml-6 md:ml-8 mt-0 sm:mt-0 md:mt-2 lg:mt-2 list-outside'
export const UL = `${BODY_TEXT} ${LIST} list-disc`
export const OL = `${BODY_TEXT} ${LIST} list-decimal`
export const CLEARANCE_FROM_PAGE_LEVEL_HEADER = 'mt-6 sm:mt-8 md:mt-10 lg:mt-12'
