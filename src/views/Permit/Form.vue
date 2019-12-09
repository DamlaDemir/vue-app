<template>
  <div>
    <b-card header="Permit Form">
      <b-form @submit="onSubmit">
        <b-form-group id="startDate" label="Start Date" label-for="startDate">
          <b-form-input id="name" v-model="formData.StartDate" required></b-form-input>
        </b-form-group>

        <b-form-group id="endDate" label="End Date" label-for="endDate">
          <b-form-input id="description" v-model="formData.EndDate" required></b-form-input>
        </b-form-group>

        <b-form-group id="reason" label="Reason" label-for="reason">
          <b-form-input id="reason" v-model="formData.Reason" required></b-form-input>
        </b-form-group>

        <b-form-group id="permitType" label="Permit Type" label-for="permitType">
          <Choices
            v-on:input="formData.PermitType = $event"
            v-bind:value="formData.PermitType"
            :maxItem="maxItem"
          />
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Choices from "@/components/Choices.vue";
export default {
  name: "PermitForm",
  data() {
    return {
      formData: {
        PermitNo: "",
        PermitType: "",
        StartDate: "",
        EndDate: "",
        Reason: "",
        Status: ""
      },
      permitTypes: [],
      maxItem: 1
    };
  },
  components: { Choices },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    saveProduct() {
      console.log("added permit");
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.$nextTick(() => {
      debugger;
      //App.vue nun içindeki DefaultLayoutu bulmak için
      let parent = this.$root.$children[0].$children.find(child => {
        return child.$options.name === "CustomLayout";
      });
      parent.getFormData(this.$options.name, "/api/Values/GetPermitById"); //DefaultLayout.vue daki getFormDataya ulaşmak için
      this.$parent.saveFunction = this.saveProduct;
    });
  }
};
</script>

<style></style>
