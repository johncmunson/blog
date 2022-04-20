// Notice how custom components in the 'content' directory work
// with both TailwindCSS and CSS Modules.

const Custom = () => (
  <div className="marquee">
    <div className="marquee__inner" aria-hidden="true">
      <span>Yo</span>
      <span>dawg,</span>
      <span>I&apos;m</span>
      <span>a</span>
      <span className="text-green-500">custom</span>
      <span className="text-green-500">component</span>
    </div>
  </div>
)

export default Custom
