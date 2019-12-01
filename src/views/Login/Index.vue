<template>
  <div class="col-md-8 col-lg-8">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Username:" label-for="username">
        <b-form-input
          id="username"
          v-model="form.username"
          type="text"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          required
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign In</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style>
</style>