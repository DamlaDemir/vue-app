import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { menu } from './modules/Menu.module';

export default new Vuex.Store({
  modules: {
    menu
  }
});
