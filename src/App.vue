<template>
  <div id="app">
    <div class="row">
      <Modal :modalShow="showModal">
        <keep-alive>
          <component :is="this.$store.state.toolbar.formComponent"></component>
        </keep-alive>
      </Modal>
      <div id="menu" class="col-md-2 col-lg-2 bg-dark menuStyle pt-3" v-show="menuShow">
        <Menu :menus="menus"></Menu>
      </div>
      <div :class="menuShow ? 'col-md-10 col-lg-10 ml-0 pl-0' : 'col-md-12 col-lg-12 ml-0 pl-0'">
        <navbar />
        <div class="toolbar mt-2">
          <Toolbar :toolbarItems="toolbar" />
        </div>
        <div class="routerView">
          <b-alert :show="showAlert" variant="warning">{{alertText}}</b-alert>
          <router-view :key="$route.fullPath" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Toolbar from "@/components/Toolbar";
import Modal from "@/components/Modal";

export default {
  components: {
    Menu,
    Navbar,
    Toolbar,
    Modal
  },
  data() {
    return {
      toolbarItems: {},
      menuShow: true,
      selectedRows: [],
      alertShowTime: 0,
      alertText: "",
      saveFunction: Function,
      removeFunction: Function,
      showModal: false
    };
  },
  created() {
    this.$store.dispatch("toolbar/changeFormComponent", "/Category/Form");
  },
  computed: {
    menus() {
      return this.$store.state.menu.menus;
    },
    toolbar() {
      let toolbar = [];
      if (this.menuId != undefined && Object.keys(this.roleMenus).length > 0) {
        let t = this.roleMenus.filter(
          x => x.MENU_ID === parseInt(this.menuId)
        )[0];
        if (t.MENU_AUTH.length > 0)
          toolbar = t.MENU_AUTH.sort((x, y) => x.Sequence - y.Sequence);
      }
      return toolbar;
    },
    menuId() {
      return this.$route.query.menu_id;
    },
    roleMenus() {
      return this.$store.state.toolbar.roleMenus;
    },
    showAlert() {
      return this.alertShowTime;
    }
  },
  methods: {
    showHideMenu() {
      this.menuShow = !this.menuShow;
    }
  }
};
</script>
<style lang="scss" scoped>
.menuStyle {
  height: 100vh;
}
.toolbar {
  padding-left: 50%;
}
.routerView {
  padding-top: 3%;
  padding-left: 5%;
}
</style>
