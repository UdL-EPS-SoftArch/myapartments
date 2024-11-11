import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '4isjgp',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./e2e/plugins/index.js')(on, config)
    },
    specPattern: './e2e/features/**/*.feature',
    excludeSpecPattern: '**/*.{js,ts}',
    supportFile: false,
    experimentalRunAllSpecs: true
  },
})
