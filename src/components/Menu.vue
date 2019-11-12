<template>
  <div class="tree-menu">
    <div>{{ label }}</div>
    <Menu 
      v-for="node in nodes" 
      :key="node.ID"
      :nodes="node.MENU" 
      :label="node.TANIM"
    >
    </Menu>

  </div>
</template>
<script>
  export default { 
    props: [ 'label', 'nodes' ],
    name: 'Menu'
  }
</script>