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
        this.graph.graphData(JSON.parse(JSON.stringify(this.graphData)))
      }
    },
    async configureGraph() {
      this.graph.cooldownTicks(100)
      // this.graph.onEngineStop(() => this.graph.zoomToFit(400))
      // this.graph.d3Force('charge').strength(-120)
      const SpriteText = await (() =>
        import('~/plugins/SpriteText.client.js'))()
      this.graph.nodeThreeObject((node) => {
        const sprite = new SpriteText.default.default(node.id)
        sprite.material.depthWrite = false // make sprite background transparent
        sprite.color = 'white'
        sprite.textHeight = 2
        return sprite
      })
      this.graph.onNodeClick((node) => {
        // Aim at node from outside it
        const distance = 40
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

        this.graph.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          }, // new position
          node, // lookAt ({ x, y, z })
          3000 // ms transition duration
        )
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
