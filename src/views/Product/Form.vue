<template>
  <div>
    Product Form Page
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        label="Shipping Address"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          label-cols-sm="3"
          label="Street:"
          label-align-sm="right"
          label-for="nested-street"
        >
          <b-form-input id="nested-street"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="City:"
          label-align-sm="right"
          label-for="nested-city"
        >
          <b-form-input id="nested-city"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="State:"
          label-align-sm="right"
          label-for="nested-state"
        >
          <b-form-input id="nested-state"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="Country:"
          label-align-sm="right"
          label-for="nested-country"
        >
          <b-form-input id="nested-country"></b-form-input>
        </b-form-group>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>