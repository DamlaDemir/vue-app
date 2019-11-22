import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { menu } from "./modules/Menu.module";
import { toolbar } from "./modules/Toolbar.module";
import { product } from "./modules/Product.module";

export default new Vuex.Store({
  modules: {
    menu,
    toolbar,
    product
  }
});
