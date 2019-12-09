import ApiService from "@/services/api.service";
import { TokenService } from "@/services/storage.service";
var qs = require("qs");

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  login: async function (username, password) {
    const requestData = {
      method: "POST",
      url: `/token`,
      data: qs.stringify({
        grant_type: "password",
        username: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);
      TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();
      // ApiService.mount401Interceptor();
      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError("", "Kullanıcı adı veya şifre hatalı");
    }
  },
  //Access Token yenile
  refreshToken: async function () {
    ApiService.removeHeader();
    const refreshToken = TokenService.getRefreshToken();

    const requestData = {
      method: "post",
      url: `/token`,
      data: qs.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      //   ,
      //   auth: {
      //     username: process.env.VUE_APP_CLIENT_ID,
      //     password: process.env.VUE_APP_CLIENT_SECRET
      //   }
    };

    try {
      const response = await ApiService.customRequest(requestData);
      if (response == undefined) {
        //Refresh token süresi dolmuş ise yeni token üretilemez response undefined gelir
        throw new AuthenticationError("", "refresh token süresi dolmuş");
      } else {
        TokenService.saveToken(response.data.access_token);
        TokenService.saveRefreshToken(response.data.refresh_token);
        ApiService.setHeader(); //axios istekleri için header'a token'ın eklenmesi
        return response.data.access_token;
      }
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  logout() {
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    TokenService.removeUser();
    ApiService.removeHeader();

    // NOTE: Again, we'll cover the 401 Interceptor a bit later.
    // ApiService.unmount401Interceptor();
  },

  //token alındıktan sonra giriş yapan kullanıcının bilgilerinin getirilmesi
  getUser: async function (userRequest) {
    try {
      const response = await ApiService.post(
        "/api/Values/GetUser",
        userRequest
      );
      TokenService.saveUser(response.data);
      return response.data;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
};

export default UserService;

export { UserService, AuthenticationError };
