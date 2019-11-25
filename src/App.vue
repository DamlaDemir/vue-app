<template>
  <div id="app">
    <div class="row">
      <Modal :modalShow="showModal">
        <keep-alive>
          <component ref="formComp" :is="this.$store.state.toolbar.formComponent"></component>
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
          <b-alert :show="alertShowTime" variant="warning">{{alertText}}</b-alert>
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
import { ToolbarItemTypeEnum } from "@/common/enums/ToolbarItemTypeEnum";

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
      let roleMenus = this.$store.state.toolbar.roleMenus;
      if (this.menuId != undefined && Object.keys(roleMenus).length > 0) {
        let t = roleMenus.filter(x => x.MENU_ID === parseInt(this.menuId))[0];
        if (t.MENU_AUTH.length > 0)
          toolbar = t.MENU_AUTH.sort((x, y) => x.Sequence - y.Sequence);
      }
      return toolbar;
    },
    menuId() {
      return this.$route.query.menu_id;
    },
    lastOperation() {
      return this.$store.state.toolbar.lastOperation;
    }
  },
  methods: {
    showHideMenu() {
      this.menuShow = !this.menuShow;
    },
    getFormData(name, url) {
      debugger;
      let form;
      //düzenleme ve görüntüle sayfaları açılırken ilgili kayda göre açılması için
      switch (this.lastOperation) {
        case ToolbarItemTypeEnum.Edit:
          form = this.$children.find(child => {
            return child.$options.name === name;
          });
          if (this.$route.params.id !== undefined) {
            let list = require(`@/data/${url}.json`); //apiden ilgili kaydın  çekilmesi
            form.formData = list.filter(
              x => x.id == parseInt(this.$route.params.id)
            )[0];
          }
          break;
        case ToolbarItemTypeEnum.View:
          form = this.$refs["formComp"];
          if (this.selectedRows[0] !== undefined) {
            let list = require(`@/data/${url}.json`);
            form.formData = list.filter(
              x => x.id == parseInt(this.selectedRows[0])
            )[0];
          }
          break;
        default:
          break;
      }
    }
  },
  mounted() {}
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
