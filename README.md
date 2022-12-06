## Todo

1. Authors page and posts by author
1. Swap anchor tags in markdown with next/link
1. Comment system
1. Increase line spacing in the body text
1. Github Flavored Markdown. Give it a shot. https://github.com/remarkjs/remark-gfm
1. Trending / Most Popular posts / Analytics
1. SEO
1. Newsletter
1. RSS
1. [New Next 13 features and best practices](https://beta.nextjs.org/docs/getting-started)
1. Reorganize the code following DDD or onion architecture principles
   - https://giancarlobuomprisco.com/next/a-scalable-nextjs-project-structure
   - https://khalilstemmler.com/articles/domain-driven-design-intro/
1. Syntax highlighting for markdown code snippets
   - https://github.com/shikijs/twoslash/tree/main/packages/remark-shiki-twoslash
   - https://nextjs-prism.vercel.app/prism
1. Audit the eslint setup
   - https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
   - https://nextjs.org/docs/basic-features/eslint#additional-configurations
1. Blog post ToC
1. Blog post footnotes
1. Different layouts for different types of blog posts
1. [Scroll Restoration](https://mmazzarolo.com/blog/2021-04-10-nextjs-scroll-restoration/)

## Probably won't do (for now)

1. Monetization (ads, job board, paywall for some gated content, etc). This should be a priority in the future though.
1. Internationalization. It's not yet clear how this would work in Next 13 anyway.
1. Blog post excerpts. We already support "description" in the frontmatter, so I'm inclined to say no on this one
1. [Categories](https://jekyllrb.com/docs/posts/#categories). We already have the concept of tags and series.
1. Feature flags. They might be useful in the future though when the blog is more complex.
1. [SafeQL](https://safeql.dev/) has a better moon/sun dark mode toggle. Not a high priority though.
1. Admin panel and/or authoriing posts in the browser. Too much work for not enough gain.
1. Remote content and images. Again, too much work for right now. Push the local filesystem workflow to it's limits first.

## General Notes

- The file `lib/md.ts` has strayed quite far from only being focused on markdown. It contains lots of business logic. This file should probably be renamed or broken up.
- This goes along with DDD principles mentioned above, but it may be worth investigating if domain objects such as `Post`s should come with methods attached, or if they should continue to just be a collection of properties.

## Random Links

- https://www.ryanfiller.com/blog/remark-and-rehype-plugins
- https://using-remark.gatsbyjs.org/custom-components/

## Blog Post Ideas

- A lot of people focus on the dangers of optimizing or over-engineering too early. But people rarely talk about the dangers of waiting long to start implementing more robust patterns. There exists a golden window of when you should should focus on re-architecting... as soon as working within the current architecture begins to feel painful and tedious. As soon as you feel like the existing architecture is steering you into spaghetti more often than it is steering you into the pit of success. You should always be vigilant about looking for this golden window. If you over-engineer early on, you will likely create an architecture that isn't actually suited to the domain you're working in because the process wasn't informed enough by real-world experience. On the flip side, if you allow simple and naive patterns stick around well past their welcome, then you will one day find yourself lost in a maze with no idea how to get out. Either way, you eventually end up with a pile of spaghetti code. So, when you start that next project, perhaps you start out with a handful of transaction scripts, eventually graduate to MVC, and finally you go all-in on DDD. Always be on the lookout for when it's time to graduate, or if you are happy with where you're at.
- How I built this blog
- How to fork my repo and get up and running with your own blog
