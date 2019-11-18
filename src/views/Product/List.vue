<template>
  <div>
    Product List Page
    <b-table
      selectable
      selected-variant="active"
      sticky-header
      striped
      hover
      :items="list.products"
      responsive="sm"
      @row-selected="onRowSelected"
      ref="selectableTable"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      list: [],
      selectMode: "multi"
    };
  },
  components: {},
  created() {
    this.list = require("@/data/product.json");
    this.$parent.removeFunction = this.removeProduct;
  },
  methods: {
    onRowSelected(items) {
      this.$parent.selectedRows = items.map(x => {
        return x.id;
      });
    },
    removeProduct() {
      console.log("product removed");
    }
  }
};
</script>

<style>
</style>