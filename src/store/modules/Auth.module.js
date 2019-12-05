import { UserService } from "@/services/user.service";
import { TokenService } from "@/services/storage.service";
import router from "@/router";

const getDefaultState = () => {
  return {
    // authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: "",
    refreshTokenPromise: null
  };
};

export const auth = {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    loggedIn: state => {
      return state.accessToken ? true : false;
    },

    authenticationErrorCode: state => {
      return state.authenticationErrorCode;
    },

    authenticationError: state => {
      return state.authenticationError;
    },

    authenticating: state => {
      return state.authenticating;
    }
  },
  mutations: {
    // loginRequest(state) {
    //   state.authenticating = true;
    //   state.authenticationError = "";
    //   state.authenticationErrorCode = 0;
    // },

    loginSuccess(state, accessToken) {
      state.accessToken = accessToken;
      // state.authenticating = false;
    },

    loginError(state, { errorCode, errorMessage }) {
      state.authenticating = false;
      state.authenticationErrorCode = errorCode;
      state.authenticationError = errorMessage;
    },

    logoutSuccess(state) {
      state.accessToken = "";
    }
    // ,
    // refreshTokenPromise(state, promise) {
    //   state.refreshTokenPromise = promise;
    // }
  },
  actions: {
    async login({ commit }, { username, password }) {
      // commit("loginRequest");
      try {
        const token = await UserService.login(username, password);
        commit("loginSuccess", token);
        router.push(router.history.current.query.redirect || "/"); //token süresi bitip logout olan kullanıcının login olunca en son kaldığı sayfaya dönmesini sağlamak için
        return true;
      } catch (e) {
        // if (e instanceof AuthenticationError) {
        //   commit("loginError", {
        //     errorCode: e.errorCode,
        //     errorMessage: e.message
        //   });
        // }
        throw e;
      }
    },

    logout({ commit }) {
      UserService.logout();
      commit("logoutSuccess");
      router.push("/login");
    },
    refreshToken({ commit }) {
      debugger;
      // If this is the first time the refreshToken has been called, make a request
      // otherwise return the same promise to the caller
      // if (!state.refreshTokenPromise) {
      return UserService.refreshToken().then(response => {
        debugger;
        // commit("refreshTokenPromise", null);
        commit("loginSuccess", response);
      }).catch(error => {
        debugger;
        throw error;
        // commit("refreshTokenPromise", null);
      });
      // commit("refreshTokenPromise", p);

      // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
      // Clear the promise on error as well.
      // p.then(
      //   response => {
      //     commit("refreshTokenPromise", null);
      //     commit("loginSuccess", response);
      //   },
      //   error => {
      //     debugger;
      //     if (error instanceof AuthenticationError) {
      //       commit("loginError", {
      //         errorCode: error.errorCode,
      //         errorMessage: error.message
      //       });
      //     }
      //     commit("refreshTokenPromise", null);
      //   }
      // );

      // }

    }
  }
};
