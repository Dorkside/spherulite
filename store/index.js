export const state = () => ({
  graph: undefined,
})

export const mutations = {
  setGraph(state, graph) {
    state.graph = graph
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const content = await this.$content('/', { deep: true }).fetch()
    const graph = content.reduce(
      (graph, document) => {
        graph.nodes.push({ id: document.slug, name: document.slug })
        graph.nodes.push(
          ...document.tags.map((tag) => ({
            id: tag,
            name: tag,
          }))
        )
        graph.links.push(
          ...document.tags.map((tag) => ({
            source: document.slug,
            target: tag,
          }))
        )
        return graph
      },
      { nodes: [], links: [] }
    )

    commit('setGraph', graph)
  },
}
