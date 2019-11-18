<template>
  <b-modal v-model="showModal" @hidden="hideModal" :size="size" hide-footer>
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
    },
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  created() {
    debugger;
  },
  computed: {
    showModal() {
      debugger;
      return this.modalShow;
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