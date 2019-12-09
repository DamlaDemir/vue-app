import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import DefaultLayout from "./components/layout/DefaultLayout";
import SimpleLayout from "./components/layout/SimpleLayout";
import CustomLayout from "./components/layout/CustomLayout";
import ApiService from "@/services/api.service";
import Constant from "@/common/Constant";
import { TokenService } from "@/services/storage.service";
import InfoHelper from "@/components/infoComponents/InfoHelper";
import "@/services/auth_interceptors"; // apiden dönen isteklerde 401 kontrolü için
import "bootstrap-css-only/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component("defaultLayout", DefaultLayout);
Vue.component("simpleLayout", SimpleLayout);
Vue.component("customLayout", CustomLayout);

Object.defineProperty(Vue.prototype, "$infoHelper", { value: InfoHelper });
//Info helper js dosyasının projenin tamamında this.$infoHelper olarak kullanabilmek için
//Vue.prototype.$infoHelper = InfoHelper bu şekildede oluşturulabilir ama Object.definePropery ile oluşurduğumuz için this.$infoHelper readonly olur.
Object.defineProperty(Vue.prototype, "$ApiService", { value: ApiService });

new Vue({
  created() {
    ApiService.init(Constant.Base_Url);
    if (TokenService.getToken()) {
      //Token varsa istek url'sinin header'ına ekle
      ApiService.setHeader();
    }
    this.getDynamicMenus();
    // this.getToolbarItems();
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
          this.$store.dispatch("toolbar/fetchRoleMenus"); //kullanıcının menülerdeki okuma,yazma,silme yetkilerinin store'a kaydedilmesi
        })
        .catch(err => console.log(err));
    },
    createdRouterObject(menu) {
      //apiden gelen menülerin router ayarlarının yapılması
      var that = this;
      menu.forEach(function(menuItem) {
        if (!menuItem.BASLIK) {
          import(`@/views/${menuItem.SAYFA}/List.vue`)
            .then(() => {
              console.log(`${menuItem.SAYFA} liste component var`);
              const routerObj = {
                name: `${menuItem.SAYFA}_List`,
                path: `/${menuItem.SAYFA}/List`,
                meta: { layout: menuItem.LAYOUT, public: false },
                component: () => import(`@/views/${menuItem.SAYFA}/List.vue`)
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
                name: `${menuItem.SAYFA}_Form`,
                path: `/${menuItem.SAYFA}/Form/:id?`,
                meta: { layout: menuItem.LAYOUT, public: false },
                component: () => import(`@/views/${menuItem.SAYFA}/Form.vue`)
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
    }
    // getToolbarItems() {
    //   this.$store.dispatch("toolbar/fetchToolbarItems");
    // }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
