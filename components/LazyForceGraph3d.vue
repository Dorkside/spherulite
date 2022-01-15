<template>
  <section ref="container">
    <div ref="force-graph"></div>
  </section>
</template>
<script>
export default {
  props: {
    graphData: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      graph: undefined,
    }
  },
  watch: {
    graphData: {
      handler() {
        this.loadData()
      },
      immediate: true,
    },
  },
  async mounted() {
    if (process.client) {
      await this.initGraph()
      this.loadData()
      this.configureGraph()
      window.addEventListener('resize', this.onResize)
    }
  },
  methods: {
    async initGraph() {
      const ForceGraph3D = await (() =>
        import('~/plugins/3DForceGraph.client.js'))()
      this.graph = ForceGraph3D.default.default()(this.$refs['force-graph'])
    },
    loadData() {
      if (this.graph && this.graphData) {
        this.graph.graphData(this.graphData)
      }
    },
    async configureGraph() {
      this.graph.onEngineStop(() => this.graph.zoomToFit(400))
      const SpriteText = await (() =>
        import('~/plugins/SpriteText.client.js'))()
      this.graph.nodeThreeObject((node) => {
        const sprite = new SpriteText.default.default(node.id)
        sprite.material.depthWrite = false // make sprite background transparent
        sprite.color = 'white'
        sprite.textHeight = 2
        return sprite
      })
    },
    onResize() {
      window.requestAnimationFrame(() => {
        const { width, height } = this.$refs.container.getBoundingClientRect()
        this.graph.width(width).height(height)
      })
    },
  },
}
</script>
