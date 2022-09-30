## Todo

1. Comment system
2. Internationalization
3. Image component inside markdown
4. Hyperlinks on blog post headers
5. Trending / Most Popular posts / Analytics
6. SEO
7. Newsletter
8. Authors page and posts by author
9. Remote content and images
10. RSS
11. Custom 404
12. [Layouts RFC](https://nextjs.org/blog/layouts-rfc)
    - Nested layouts
    - Server rendered components
    - Suspense
    - etc.
13. Auth and admin panel?
14. Monetization (ads, job board, paywall for some gated content, etc.)
15. [Dark mode](https://usehooks-ts.com/react-hook/use-dark-mode)
16. Reorganize the code following DDD principles
    - https://giancarlobuomprisco.com/next/a-scalable-nextjs-project-structure
    - https://khalilstemmler.com/articles/domain-driven-design-intro/
17. Syntax highlighting for markdown code snippets
18. Audit the eslint setup
    - https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
    - https://nextjs.org/docs/basic-features/eslint#additional-configurations
19. Testing
20. Blog post ToC
21. Blog post footnotes
22. [Blog post drafts](https://jekyllrb.com/docs/posts/#drafts)
23. Blog post excerpts? We already support "description" in the frontmatter, so I'm inclined to say no on this one
24. Bug: It appears that the markdown engine I'm currently using does not accept HTML
25. Different layouts for different types of blog posts
26. We already have the concept of tags... do we also need [categories](https://jekyllrb.com/docs/posts/#categories)?
27. Permalinks???
    - bitly?
    - Every page would have a uuid?
    - uuid redirects to the pretty url?
    - [Rewrites?](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
28. Feature flags
    - This would be great for enabling "bootstrap mode", where you only have a couple of blog posts,
      but you want to be forward-thinking and build out features that only make sense once you have a
      larger backlog built up.
29. [Blog post series](https://dev.to/kallmanation/dev-to-writing-making-a-series-3h79)

## Random Links

- https://nextjs-prism.vercel.app/prism
- https://amirardalan.com/blog/use-next-image-with-react-markdown

## Blog Post Ideas

- A lot of people focus on the dangers of optimizing or over-engineering too early. But people rarely talk about the dangers of waiting long to start implementing more robust patterns. There exists a golden window of when you should should focus on re-architecting... as soon as working within the current architecture begins to feel painful and tedious. As soon as you feel like the existing architecture is steering you into spaghetti more often than it is steering you into the pit of success. You should always be vigilant about looking for this golden window. If you over-engineer early on, you will likely create an architecture that isn't actually suited to the domain you're working in because the process wasn't informed enough by real-world experience. On the flip side, if you allow simple and naive patterns stick around well past their welcome, then you will one day find yourself lost in a maze with no idea how to get out. Either way, you eventually end up with a pile of spaghetti code. So, when you start that next project, perhaps you start out with a handful of transaction scripts, eventually graduate to MVC, and finally you go all-in on DDD. Always be on the lookout for when it's time to graduate, or if you are happy with where you're at.
-
