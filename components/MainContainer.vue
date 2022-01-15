<template>
  <main>
    <!-- <slot></slot> -->
    <aside>
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
        ],
        links: [
          {
            source: 'id1',
            target: 'id2',
          },
        ],
      }
    },
  },
}
</script>
