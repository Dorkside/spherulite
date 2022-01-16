<template>
  <main class="layout-flex bg-gray-800">
    <section
      class="articles-container dark:bg-gray-800 p-4 overflow-x-hidden overflow-y-auto"
    >
      <Nuxt />
    </section>
    <aside class="graph-container">
      <client-only>
        <lazy-force-graph-3d :graph-data="graph" />
      </client-only>
    </aside>
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
.layout-flex {
  display: flex;
  flex-flow: row nowrap;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.graph-container {
  flex: 1 1 auto;
  overflow: hidden;
}

.articles-container {
  flex: 0 0 600px;
  max-width: 600px;
}
</style>
