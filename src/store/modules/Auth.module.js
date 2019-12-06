import { UserService } from "@/services/user.service";
import { TokenService } from "@/services/storage.service";
import router from "@/router";

const getDefaultState = () => {
  return {
    accessToken: TokenService.getToken(),
    refreshTokenPromise: null
  };
};

export const auth = {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    loggedIn: state => {
      return state.accessToken ? true : false;
    }
  },
  mutations: {
    loginSuccess(state, accessToken) {
      state.accessToken = accessToken;
    },
    logoutSuccess(state) {
      state.accessToken = "";
    },
    refreshTokenPromise(state, promise) {
      state.refreshTokenPromise = promise;
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      // commit("loginRequest");
      try {
        const token = await UserService.login(username, password);
        commit("loginSuccess", token);
        // router.push(router.history.current.query.redirect || "/"); //token süresi bitip logout olan kullanıcının login olunca en son kaldığı sayfaya dönmesini sağlamak için
        router.push("/"); //token süresi bitip logout olan kullanıcının login olunca en son kaldığı sayfaya dönmesini sağlamak için
        return true;
      } catch (e) {
        throw e;
      }
    },

    logout({ commit }) {
      UserService.logout();
      commit("logoutSuccess");
      router.push("/login");
    },
    refreshToken({ commit, state }) {
      debugger;
      if (!state.refreshTokenPromise) {
        const p = UserService.refreshToken();
        commit("refreshTokenPromise", p);
        p.then(response => {
          debugger;
          commit("refreshTokenPromise", null);
          commit("loginSuccess", response);
        }).catch(error => {
          debugger;
          commit("refreshTokenPromise", null);
          throw error;
        });
        return state.refreshTokenPromise;
      }
    }
  }
};
