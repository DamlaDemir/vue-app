<template>
  <div>
    <b-button-group v-show="getToolbarItems.length > 0">
      <b-button
        :variant="item.Css"
        v-for="(item,index) in getToolbarItems"
        v-bind:key="index"
      >{{item.Title}}</b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      menu: {}
    };
  },
  props: {
    toolbarItems: {
      type: Array
    }
  },
  created() {},
  computed: {
    getToolbarItems() {
      return this.toolbarItems;
    }
  },
  methods: {}
};
</script>

<style>
</style>