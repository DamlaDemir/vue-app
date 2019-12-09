import { UserService } from "@/services/user.service";
import { TokenService } from "@/services/storage.service";
import router from "@/router";

const getDefaultState = () => {
  return {
    accessToken: TokenService.getToken(),
    refreshTokenPromise: null,
    user: JSON.parse(TokenService.getUser()) //Urlde enter'a basılıp sayfa yeninlenince storeda sıfırlanıyor o yüzden başlangıçta user varsa local storageden çekilir.
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
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      // commit("loginRequest");
      try {
        const token = await UserService.login(username, password);
        commit("loginSuccess", token);
        // router.push(router.history.current.query.redirect || "/"); //token süresi bitip logout olan kullanıcının login olunca en son kaldığı sayfaya dönmesini sağlamak için
        const userRequest = {
          Username: username
        };
        const user = await UserService.getUser(userRequest);
        commit("setUser", user);
        router.push("/"); //token süresi bitip logout olan kullanıcının login olunca en son kaldığı sayfaya dönmesini sağlamak için
        return true;
      } catch (error) {
        commit("setUser", {}); //token alma veya token aldıktan sonra herhangi bir hata oluşursa storedaki user bilgisini sil
        throw error;
      }
    },

    logout({ commit }) {
      UserService.logout();
      commit("logoutSuccess");
      router.push("/login");
    },
    refreshToken({ commit, state }) {
      if (!state.refreshTokenPromise) {
        const p = UserService.refreshToken();
        commit("refreshTokenPromise", p);
        p.then(response => {
          commit("refreshTokenPromise", null);
          commit("loginSuccess", response);
        }).catch(error => {
          commit("refreshTokenPromise", null);
          throw error;
        });
        return state.refreshTokenPromise;
      }
    }
  }
};
