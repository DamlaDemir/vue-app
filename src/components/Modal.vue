<template>
  <b-modal v-model="modalShow" @hidden="hideModal" :size="size" hide-footer>
    <template v-slot:modal-title>{{title}}</template>
    <div class="d-block text-center">
      <slot></slot>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "xl"
    }
  },
  created() {
    debugger;
  },
  computed: {
    modalShow() {
      debugger;
      return this.$store.state.toolbar.showModal;
    }
  },
  methods: {
    hideModal() {
      this.$store.dispatch("toolbar/changeShowModal", false);
    }
  }
};
</script>

<style>
</style>