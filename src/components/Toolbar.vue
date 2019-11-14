<template>
  <div>
    <b-button-group v-show="getToolbarItems.length > 0">
      <b-button
        :variant="item.Css"
        v-for="(item,index) in getToolbarItems"
        v-bind:key="index"
        v-show="isForm(item.Title)"
      >
        <i :class="item.Icon" />
      </b-button>
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
  methods: {
    isForm(item) {
      debugger;
      if (this.$route.fullPath.includes("Form")) {
        if (item === "Remove") return false;
        else if (item === "Edit") return false;
        else return true;
      } else return true;
    }
  }
};
</script>

<style>
</style>