<template>
  <main>
    <slot></slot>
    <aside>
      <client-only>
        <lazy-force-graph-3d />
      </client-only>
    </aside>
  </main>
</template>
