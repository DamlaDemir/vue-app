<template>
  <div @click="divClick">
    Product List Page
    <router-link :to="handlePath()">Git</router-link>
    <div v-if="show">Damla</div>
    <b-button @click.stop="degistir1">TIKLA</b-button>
    <b-button @click="degistir2">TIKLA2</b-button>

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
  name: "list",
  data() {
    return {
      list: [],
      selectMode: "multi",
      show: true
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
    },
    handlePath() {
      console.log("handle path");
      return "/views/Home";
    },
    degistir1() {
      console.log("değiştir");
      this.show = !this.show;
    },
    degistir2() {
      console.log("değiştir2");
    },
    divClick() {
      debugger;
      console.log("div click");
    }
  }
};
</script>

<style>
</style>