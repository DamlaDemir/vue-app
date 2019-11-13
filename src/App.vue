<template>
  <div id="app">
    <div id="nav">
      <navbar />
      <Menu :menus="menus"></Menu>
    </div>
    <router-view />
  </div>
</template>
<script>
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";

export default {
  components: {
    Menu,
    Navbar
  },
  data () {
    return {
      data : []
      }
  },
  created() {
    // this.$store.dispatch("menu/fetchMenus");
    debugger;
    console.log("APP VUE");
    console.log(this.$router);
  },
  computed: {
    menus() {
      return this.$store.state.menu.menus
    }

  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
