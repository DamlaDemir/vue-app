<template>
  <div>
    <Modal :modalShow="showModal" size="xs">Liste Sayfası Modal</Modal>
    <router-link to="/Note/List" target="_blank">Note Page</router-link>
    <br />
    <router-link :to="handlePath()">Git</router-link>
    <br />

    <b-button @click="openModal">Modal aç</b-button>

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
import Modal from "@/components/Modal";

export default {
  name: "list",
  data() {
    return {
      list: [],
      selectMode: "multi",
      show: true,
      showModal: false
    };
  },
  components: { Modal },
  created() {
    this.list = require("@/data/product.json");
  },
  methods: {
    onRowSelected(items) {
      this.$parent.selectedRows = items.map(x => {
        return x.id;
      });
    },
    removeProduct() {
      console.log("product removed");
      console.log(this.$parent.selectedRows);
    },
    handlePath() {
      console.log("handle path");
      return "/views/Home";
    },
    openModal() {
      this.showModal = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$parent.removeFunction = this.removeProduct;
    });
  }
};
</script>

<style>
</style>