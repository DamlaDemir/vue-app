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
    this.list = require("@/data/product.json");
    ApiService.get(`/api/Values/GetUsers`)
      .then(res => {
        debugger;
        this.permitList = res.data;
        console.log("List then");
        this.$infoHelper.showToast(this, "success", `Başarılı`, "Tebrik");
      })
      .catch(error => {
        debugger;
        this.$infoHelper.showToast(
          this,
          "danger",
          `${error.response.status} Hatası`,
          error.response.statusText
        );
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
