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
    debugger;

    if (error.request.status == 401) {
      debugger;
      if (error.config.url.includes(`${Constant.Base_Url}/token`)) {
        store.dispatch("auth/logout");
      } else {
        try {
          debugger;
          await store.dispatch("auth/refreshToken");
          // Retry the original request
          debugger;

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
