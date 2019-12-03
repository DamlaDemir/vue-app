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

    <b-table
      selectable
      selected-variant="active"
      sticky-header
      striped
      hover
      :items="permitList"
      responsive="sm"
      @row-selected="onRowSelected"
      ref="selectableTable"
    ></b-table>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import ApiService from "@/services/api.service";
import Constant from "@/common/Constant";

export default {
  name: "list",
  data() {
    return {
      list: [],
      selectMode: "multi",
      show: true,
      showModal: false,
      permitList: []
    };
  },
  components: { Modal },
  created() {
    debugger;

    this.list = require("@/data/product.json");
    ApiService.get(`${Constant.Base_Url}/api/Values/GetUsers`).then(res => {
      debugger;
      this.permitList = res.data;
    });
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

<style></style>
