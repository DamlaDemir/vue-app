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
  },
  methods: {
    onRowSelected(items) {
      debugger;
      this.$parent.selectedRows = items.map(x => {
        return x.id;
      });
      console.log(this.$parent.selectedRows);
    }
  }
};
</script>

<style>
</style>