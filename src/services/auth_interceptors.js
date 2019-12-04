import axios from "axios";

import store from "@/store";
import ApiService from "@/services/api.service";
import Constant from "@/common/Constant";

axios.interceptors.response.use(
  response => {
    debugger;
    return response;
  },
  async error => {
    if (error.request.status == 401) {
      debugger;
      //refresh token alınırken 401 hatası gelirse lagout işlemi yapılır
      if (error.config.url.includes(`${Constant.Base_Url}/token`)) {
        // Refresh token has failed. Logout the user
        store.dispatch("auth/logout");
      } else {
        // Refresh the access token
        try {
          debugger;
          await store.dispatch("auth/refreshToken");
          // Retry the original request
          return ApiService.customRequest({
            method: error.config.method,
            url: error.config.url,
            data: error.config.data
          });
        } catch (e) {
          debugger;
          store.dispatch("auth/logout");
        }
      }
    }
  }
);
