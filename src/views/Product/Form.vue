<template>
  <div>
    <b-card header="Product Form">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Product Name" label-for="name">
          <b-form-input id="name" v-model="form.name" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Description"
          label-for="description"
        >
          <b-form-input
            id="description"
            v-model="form.description"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Price" label-for="price">
          <b-form-input id="price" v-model="form.price" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Category Name" label-for="name">
          <Choices
            :options="categories"
            v-on:input="form.categories = $event"
            v-bind:value="form.categories"
          />
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Choices from "@/components/Choices.vue";
export default {
  name: "ProductForm",
  data() {
    return {
      formData: {
        name: "",
        description: "",
        price: null,
        categories: []
      },
      categories: [],
      show: true,
      list: []
    };
  },
  components: { Choices },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    saveProduct() {
      console.log("added product");
    }
  },
  created() {
    // this.$root.$children[0].getFormData("fetchProductFormData", "product"); //Ap.vuedaki getFormDataya ulaşmak için
    this.categories = require("@/data/category.json"); //cacheden çekilecek
  },
  computed: {
    form() {
      return this.formData;
    }
  },
  mounted() {
    this.$nextTick(() => {
      debugger;
      //App.vue nun içindeki DefaultLayoutu bulmak için
      let parent = this.$root.$children[0].$children.find(child => {
        return child.$options.name === "CustomLayout";
      });
      parent.getFormData(this.$options.name, "product"); //DefaultLayout.vue daki getFormDataya ulaşmak için

      this.$parent.saveFunction = this.saveProduct;
    });
  }
};
</script>

<style></style>
