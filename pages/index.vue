<template>
  <article
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto dark:prose-invert"
  >
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const page = await $content('Accueil').fetch()

    return {
      page,
    }
  },
}
</script>
