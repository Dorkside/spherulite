<template>
  <main>
    <aside>
      <client-only>
        <lazy-force-graph-3d :graph-data="graph" />
      </client-only>
    </aside>
    <section
      class="articles-container dark:bg-gray-800 px-8 overflow-x-hidden overflow-y-auto"
    >
      <Nuxt />
    </section>
  </main>
</template>
<script>
export default {
  computed: {
    graph() {
      return this.$store.state.graph
    },
  },
}
</script>
<style scoped>
.articles-container {
  position: absolute;
  top: 16px;
  bottom: 16px;
  right: 16px;
  width: 100%;
  max-width: 600px;
}
</style>
