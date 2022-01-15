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
      return {
        nodes: [
          {
            id: 'id1',
            name: 'name1',
            val: 1,
          },
          {
            id: 'id2',
            name: 'name2',
            val: 10,
          },
          {
            id: 'id3',
            name: 'name2',
            val: 10,
          },
          {
            id: 'id4',
            name: 'name2',
            val: 10,
          },
        ],
        links: [
          {
            source: 'id1',
            target: 'id2',
          },
          {
            source: 'id1',
            target: 'id3',
          },
          {
            source: 'id2',
            target: 'id3',
          },
          {
            source: 'id3',
            target: 'id4',
          },
        ],
      }
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
