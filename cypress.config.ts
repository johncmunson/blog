import { defineConfig } from 'cypress'
import { getPostsByTag } from './lib/md'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    async setupNodeEvents(on, config) {
      const postsByTag = await getPostsByTag()
      config.env.postsByTag = postsByTag
      return config
    },
  },
})
