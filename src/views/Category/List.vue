<template>
  <div>
    Category List Page
    <b-table
      selectable
      selected-variant="active"
      sticky-header
      striped
      hover
      :items="list"
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
    this.$parent.removeFunction = this.removeCategory;
  },
  methods: {
    onRowSelected(items) {
      this.$parent.selectedRows = items.map(x => {
        return x.id;
      });
    },
    removeCategory() {
      console.log("category removed");
    }
  },
  mounted() {}
};
</script>

<style>
</style>