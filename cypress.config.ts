import { defineConfig } from 'cypress'
import { getPostsByAuthor, getPostsByTag } from './lib/md'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    async setupNodeEvents(on, config) {
      const [postsByTag, postsByAuthor] = await Promise.all([
        getPostsByTag(),
        getPostsByAuthor(),
      ])
      config.env.postsByTag = postsByTag
      config.env.postsByAuthor = postsByAuthor
      return config
    },
  },
})
