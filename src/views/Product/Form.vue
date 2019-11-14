<template>
  <div>
    <b-card-group deck>
      <b-card
        border-variant="danger"
        header="Product Form"
        header-border-variant="danger"
        header-text-variant="danger"
        align="center"
      >
        <b-card-text>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">Name:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-default" placeholder="Enter your name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">Description:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-default" placeholder="Enter your description"></b-form-input>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>