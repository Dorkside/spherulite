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
  async asyncData({ $content, route }) {
    console.log(decodeURI(route.path.substring(1)))
    const page = await $content(decodeURI(route.path.substring(1))).fetch()

    return {
      page,
    }
  },
  mounted() {
    this.$nuxt.$emit('navigate', this.page.slug)
  },
}
</script>
