import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
import "bootstrap-css-only/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

new Vue({
  created() {
    console.log("created vue");
    this.getDynamicRoutes();
  },
  computed: {
    menus() {
      return store.state.menu.menus;
    }
  },
  methods: {
    getDynamicRoutes() {
      console.log("getDynamicRoutes a girdi");
      this.$store.dispatch("menu/fetchMenus").then(() => {
        console.log("menuleri çekti");
        this.createdRouterObject(this.menus.MENU);
      }).catch(err => console.log(err))
    },
    createdRouterObject(menu) {
      var that = this;
      menu.forEach(function (menuItem) {
        if (!menuItem.BASLIK) {
          import(`@/views/${menuItem.SAYFA}/List.vue`).then(() => {
            console.log("component var");
            const routerObj = {
              // name: `/${menuItem.SAYFA}/List`,
              path: `/${menuItem.SAYFA}/List`,
              component: () => import(`@/views/${menuItem.SAYFA}/List.vue`)
            }
            that.$router.addRoutes([routerObj]);
          }).catch(() => {
            console.log(`${menuItem.SAYFA} liste component yok`);
          })

          import(`@/views/${menuItem.SAYFA}/Form.vue`).then(() => {
            console.log("component var");
            const routerObj = {
              // name: `/${menuItem.SAYFA}/Form`,
              path: `/${menuItem.SAYFA}/Form`,
              component: () => import(`@/views/${menuItem.SAYFA}/Form.vue`)
            }
            that.$router.addRoutes([routerObj]);
          }).catch(() => {
            console.log(`${menuItem.SAYFA} form component yok`);
          })
        }
        else {
          that.createdRouterObject(menuItem.MENU);
        }
      });
    }

  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");

