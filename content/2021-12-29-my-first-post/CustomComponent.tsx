// Notice how custom components in the 'content' directory work
// with both TailwindCSS and CSS Modules.

const Custom = () => (
  <div className="marquee">
    <div className="marquee__inner" aria-hidden="true">
      <span>Yo</span>
      <span>dawg,</span>
      <span>I&apos;m</span>
      <span>a</span>
      <span className="text-blue-600">custom</span>
      <span className="text-blue-600">component.</span>
    </div>
  </div>
)

export default Custom
