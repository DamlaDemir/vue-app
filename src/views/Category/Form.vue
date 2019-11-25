<template>
  <div class="col-md-11">
    <b-card header="Product Form">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Category Name" label-for="name">
          <b-form-input id="name" v-model="form.name" required></b-form-input>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CategoryForm",
  data() {
    return {
      formData: {
        name: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    saveCategory() {
      console.log("added category");
    }
  },
  created() {
    // this.$root.$children[0].getFormData("fetchProductFormData", "product"); //Ap.vuedaki getFormDataya ulaşmak için
    this.$parent.saveFunction = this.saveCategory;
  },
  computed: {
    form() {
      return this.formData;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$root.$children[0].getFormData(this.$options.name, "category"); //Ap.vuedaki getFormDataya ulaşmak için
    });
  }
};
</script>

<style>
</style>