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
      this.$parent.showToast("success", "Başarılı", "Kaydetme işlemi başarılı");
      console.log("added category");
    }
  },
  created() {
    // this.$root.$children[0].getFormData("fetchProductFormData", "product"); //Ap.vuedaki getFormDataya ulaşmak için
  },
  computed: {
    form() {
      return this.formData;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let parent = this.$root.$children[0].$children.find(child => {
        return child.$options.name === "DefaultLayout";
      });
      parent.getFormData(this.$options.name, "category"); //Ap.vuedaki getFormDataya ulaşmak için

      this.$parent.saveFunction = this.saveCategory;
    });
  }
};
</script>

<style></style>
