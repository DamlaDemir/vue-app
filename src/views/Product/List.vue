<template>
  <div>
    Product List Page
    <b-table striped hover :items="list.products"></b-table>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      list: []
    };
  },
  components: {},
  created() {
    this.list = require("@/data/product.json");
  }
};
</script>

<style>
</style>