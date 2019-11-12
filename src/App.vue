<template>
  <div id="app">
    <div id="nav">
      <Menu :label="data.TANIM" :nodes="data.MENU"></Menu>
    </div>
    <router-view />
  </div>
</template>
<script>
import Menu from "./components/Menu";

export default {
  components: {
    Menu
  },
  data () {
    return {
      data : []
      }
  },
  created() {
    debugger;
   this.data = require("./data/menu.json");
   console.log(this.data)
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
