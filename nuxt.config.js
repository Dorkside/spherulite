/* eslint-disable no-unused-vars */
const ohm = require('ohm-js')
const fs = require('fs')

const g = ohm.grammar(fs.readFileSync('ohm/obsidian.ohm'))

const semantics = g.createSemantics().addOperation('extractTags', {
  _iter(...children) {
    return children.map((child) => child.extractTags())
  },
  _terminal() {
    return undefined
  },
  text(e) {
    return e.extractTags()
  },
  link(_1, _2, text, _3) {
    return text.extractTags()
  },
  linkText(_1) {
    return this.sourceString
  },
  tag(_1, text, _2) {
    return text.extractTags()
  },
  tagText(_1) {
    return this.sourceString
  },
})

const getTextChildren = (item) => {
  return (
    item.children &&
    item.children
      .map((child) => {
        if (child.type === 'text') {
          return child.value
        }
        return getTextChildren(child)
      })
      .flat()
  )
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'spherulite',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/3DForceGraph.client.js' },
    { src: '~/plugins/SpriteText.client.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  colorMode: {
    classSuffix: '',
  },

  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension === '.md') {
        document.tags = getTextChildren(document.body)
          .filter((text) => text !== '\n')
          .map((text) => {
            const match = g.match(text)
            return semantics(match)
              .extractTags()
              .filter((tag) => !!tag)
          })
          .filter((tag) => !!tag)
          .flat(Infinity)
      }
    },
  },
}
