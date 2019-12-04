<template>
  <div id="app">
    <component :is="layout" ref="layoutComp">
      <router-view />
    </component>
  </div>
</template>
<script>
const default_layout = "simple";
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "Layout"; // her urlde sayfanın hangi layoutu kullanacağı meta içinde belirtiliyor.
      //Sayfanın kullandığı layouta göre dinamik layout oluşturulması
    }
  },
  watch: {},
  methods: {},
  mounted() {}
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Numans");
html,
body {
  height: 100%;
  font-family: "Numans", sans-serif !important;
}
.routerView {
  padding-top: 3%;
  padding-left: 5%;
}
</style>
