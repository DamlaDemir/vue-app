<template>
  <div class="col-md-11">
    <b-card header="Product Form">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Product Name" label-for="name">
          <b-form-input id="name" v-model="form.name" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Description" label-for="description">
          <b-form-input id="description" v-model="form.description" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Price" label-for="price">
          <b-form-input id="price" v-model="form.price" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Category:" label-for="category">
          <b-form-select id="category" v-model="form.food" :options="foods" required></b-form-select>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formObj: {
        name: "",
        description: "",
        price: null
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      show: true,
      list: []
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    getData() {
      if (this.$route.params.id !== undefined) {
        this.list = require("@/data/product.json");
        this.formObj = this.list.products.filter(
          x => x.id == parseInt(this.$route.params.id)
        )[0];
      }
    },
    saveProduct() {
      console.log("added product");
    }
  },
  created() {
    this.getData(); //Düzenleme ekranından geliniyorsa
    this.$parent.saveFunction = this.saveProduct;
  },
  computed: {
    form() {
      return this.formObj;
    }
  }
};
</script>

<style>
</style>