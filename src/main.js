import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap-css-only/css/bootstrap.min.css";

Vue.config.productionTip = false;

new Vue({
  created() {
    debugger;
    // store.dispatch("menu/fetchMenus");
    console.log("created vue");
    // console.log(this.menus.MENU);
    // this.createdRouterObject(this.menus.MENU);
    // console.log(router);
  },
  computed: {
    menus() {
      return store.state.menu.menus;
    }
  },
  methods: {
    createdRouterObject(menu) {
      var that = this;
      menu.forEach(function(menuItem) {
        if(!menuItem.BASLIK){
          const routerObj = {
            path:`/${menuItem.SAYFA}/List`,
            component: () => import(`@/views/${menuItem.SAYFA}/List.vue`)
          }
          router.options.routes.push(routerObj);
          console.log(menuItem.TANIM);
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
