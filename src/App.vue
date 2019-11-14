<template>
  <div id="app">
    <navbar />
    <div class="row">
      <div id="menu" class="col-md-2">
        <Menu :menus="menus"></Menu>
      </div>
      <div class="col-md-10">
        <Toolbar :toolbarItems="toolbar" />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Toolbar from "@/components/Toolbar";

export default {
  components: {
    Menu,
    Navbar,
    Toolbar
  },
  data() {
    return {
      data: [],
      toolbarItems: {}
    };
  },
  created() {},
  computed: {
    menus() {
      return this.$store.state.menu.menus;
    },
    toolbar() {
      debugger;
      let toolbar = [];
      if (this.menuId != undefined && Object.keys(this.roleMenus).length > 0) {
        let t = this.roleMenus.filter(
          x => x.MENU_ID === parseInt(this.menuId)
        )[0];
        if (t.MENU_AUTH.length > 0) toolbar = t.MENU_AUTH;
      }
      return toolbar;
    },
    menuId() {
      return this.$route.query.menu_id;
    },
    roleMenus() {
      return this.$store.state.toolbar.roleMenus;
    }
  },
  methods: {
    Add() {
      debugger;
      console.log("App vue add fonksiyon");
      console.log(this.$children.length);
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  padding-top: 2%;
}
</style>
