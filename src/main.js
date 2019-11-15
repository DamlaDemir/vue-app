import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import "bootstrap-css-only/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  created() {
    this.getDynamicMenus();
    this.getToolbarItems();
  },
  computed: {
    menus() {
      return store.state.menu.menus;
    }
  },
  methods: {
    getDynamicMenus() {
      this.$store
        .dispatch("menu/fetchMenus")
        .then(() => {
          this.createdRouterObject(this.menus.MENU);
          this.$store.dispatch("toolbar/fetchRoleMenus");
        })
        .catch(err => console.log(err));
    },
    createdRouterObject(menu) {
      var that = this;
      menu.forEach(function(menuItem) {
        if (!menuItem.BASLIK) {
          import(`@/views/${menuItem.SAYFA}/List.vue`)
            .then(() => {
              console.log(`${menuItem.SAYFA} liste component var`);
              const routerObj = {
                name: `/${menuItem.SAYFA}/List`,
                path: `/${menuItem.SAYFA}/List`,
                component: () => import(`@/views/${menuItem.SAYFA}/List.vue`),
                type: "form"
              };
              that.$router.addRoutes([routerObj]);
            })
            .catch(() => {
              console.log(`${menuItem.SAYFA} liste component yok`);
            });

          import(`@/views/${menuItem.SAYFA}/Form.vue`)
            .then(() => {
              console.log(`${menuItem.SAYFA} form component var`);
              const routerObj = {
                name: `/${menuItem.SAYFA}/Form`,
                path: `/${menuItem.SAYFA}/Form/:id?`,
                component: () => import(`@/views/${menuItem.SAYFA}/Form.vue`),
                type: "form"
              };
              that.$router.addRoutes([routerObj]);
            })
            .catch(() => {
              console.log(`${menuItem.SAYFA} form component yok`);
            });
        } else {
          that.createdRouterObject(menuItem.MENU);
        }
      });
    },
    getToolbarItems() {
      this.$store.dispatch("toolbar/fetchToolbarItems");
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
