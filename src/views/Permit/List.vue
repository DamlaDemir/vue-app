<template>
  <div>
    Damla
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
export default {
  name: "list",
  data() {
    return {
      selectMode: "multi",
      permitList: []
    };
  },
  components: {},
  created() {
    const permitListRequest = {
      UserId: this.$store.state.auth.user.Id
    };
    this.$ApiService
      .post(`/api/Values/GetPermits`, permitListRequest)
      .then(res => {
        this.permitList = res.data;
        console.log(this.permitList);
        this.$infoHelper.showToast(
          this,
          "success",
          `Başarılı`,
          "Veriler başarılı bir şekilde getirildi."
        );
      })
      .catch(error => {
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
      debugger;
      this.$parent.selectedRows = items.map(x => {
        return x.PermitNo;
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
