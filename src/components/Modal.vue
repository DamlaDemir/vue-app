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
  name: "Modal",
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
  created() {},
  computed: {
    showModal() {
      return this.modalShow;
    }
  },
  methods: {
    hideModal() {
      this.$parent.showModal = false;
    }
  }
};
</script>

<style>
</style>