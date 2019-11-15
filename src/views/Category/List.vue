<template>
  <div>
    Category List Page
    <b-table
      selectable
      selected-variant="active"
      sticky-header
      striped
      hover
      :items="list.categories"
      responsive="sm"
      @row-selected="onRowSelected"
      ref="selectableTable"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      list: [],
      selectMode: "multi"
    };
  },
  components: {},
  created() {
    this.list = require("@/data/category.json");
  },
  methods: {
    onRowSelected(items) {
      this.$parent.selectedRows = items.map(x => {
        return x.Id;
      });
    }
  }
};
</script>

<style>
</style>