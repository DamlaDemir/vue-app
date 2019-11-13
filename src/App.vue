<template>
  <div id="app">
    <navbar />
        <div class="row">
          <div id="menu" class="col-md-3">
          <Menu :menus="menus"></Menu>
          </div>
          <div class="col-md-9 pageDiv">
            <router-view />
          </div>
        </div>
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
      debugger;
      return this.$store.state.menu.menus
    }

  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.row {
  padding-top : 2%
}
.pageDiv {
  border: 1px solid #000 !important;
}


</style>
