import axios from "axios";

import store from "@/store";
import ApiService from "@/services/api.service";
import Constant from "@/common/Constant";

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.request.status == 401) {
      if (error.config.url.includes(`${Constant.Base_Url}/token`)) {
        store.dispatch("auth/logout");
      } else {
        try {
          //401 unauthorize durumunda refresh token ile yeni token alma
          await store.dispatch("auth/refreshToken");
          // Başarılı bir şekilde access token alındıysa 401 veren request'i tekrar yollama
          return ApiService.customRequest({
            method: error.config.method,
            url: error.config.url,
            data: error.config.data
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else if (error.response.status == 400) {
      if (error.response.data.error == "invalid_grant") {
        //refresh token süresi dolup yeni token alınamazsa logout işlemi yapılması
        store.dispatch("auth/logout");
        throw error;
      }
    }
    throw error;
  }
);
