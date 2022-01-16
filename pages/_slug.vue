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
  async asyncData({ $content, params }) {
    const page = await $content(params.slug).fetch()

    return {
      page,
    }
  },
  mounted() {
    this.$nuxt.$emit('navigate', this.page.slug)
  },
}
</script>
