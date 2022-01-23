<template>
  <article
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto dark:prose-invert"
  >
    <h6>
      {{ page.title || page.slug }}
    </h6>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const page = await $content(process.env.LANDING_PAGE || 'index').fetch()

    return {
      page,
    }
  },
}
</script>
