<template>
  <section>
    <div ref="force-graph"></div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      graph: undefined,
    }
  },
  async mounted() {
    if (process.client) {
      const ForceGraph3D = await (() =>
        import('~/plugins/3DForceGraph.client.js'))()
      this.graph = ForceGraph3D.default.default()
      this.graph(this.$refs['force-graph'])
    }
  },
}
</script>
