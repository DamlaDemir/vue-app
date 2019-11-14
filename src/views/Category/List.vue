<template>
  <div>
    Category List Page
    <b-table striped hover :items="list.categories"></b-table>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      list: []
    };
  },
  components: {},
  created() {
    this.list = require("@/data/category.json");
  }
};
</script>

<style>
</style>