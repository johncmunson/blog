type NavContentProps = {
  rootProps?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any
  }
}

export const NavContent = ({ rootProps }: NavContentProps) => (
  <div
    {...rootProps}
    className={`grid grid-cols-2 sm:grid-cols-3 gap-y-9 gap-x-5 md:text-lg lg:text-xl`}
    data-cy="nav-content"
  >
    <section>
      <h3 className="font-medium">Most Popular</h3>
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
    </section>
    <section>
      <h3 className="font-medium">Trending</h3>
      <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
    </section>
    <section>
      <h3 className="font-medium">Subscribe</h3>
      <ul>
        <li>Twitter</li>
        <li>Newsletter</li>
        <li>RSS</li>
      </ul>
    </section>
    <section>
      <h3 className="font-medium">Address</h3>
      <address className="not-italic whitespace-nowrap">
        3750 Washington Ave
        <br />
        St. Louis, MO 63108
        <br />
        United States
      </address>
    </section>
    <section>
      <h3 className="font-medium">Downloads</h3>
      <ul>
        <li>Fonts</li>
        <li>Templates</li>
        <li>Apps</li>
      </ul>
    </section>
    <section>
      <h3 className="font-medium">About</h3>
      <ul>
        <li>Mission</li>
        <li>Core Values</li>
        <li>Privacy Policy</li>
      </ul>
    </section>
  </div>
)
