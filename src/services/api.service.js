import axios from "axios";
import { TokenService } from "@/services/storage.service";
// import { store } from "@/store";
// import Constant from "@/common/Constant";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    debugger;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resource) {
    debugger;
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    debugger;
    return axios(data);
  }
  // _401interceptor: null,
  // mount401Interceptor() {
  //   debugger;
  //   this._401interceptor = axios.interceptors.response.use(
  //     response => {
  //       return response;
  //     },
  //     async error => {
  //       debugger;
  //       if (error.request.status == 401) {
  //         if (error.config.url.includes(`${Constant.Base_Url}/token`)) {
  //           // Refresh token has failed. Logout the user
  //           store.dispatch("auth/logout");
  //           throw error;
  //         } else {
  //           // Refresh the access token
  //           try {
  //             await store.dispatch("auth/refreshToken");
  //             // Retry the original request
  //             return this.customRequest({
  //               method: error.config.method,
  //               url: error.config.url,
  //               data: error.config.data
  //             });
  //           } catch (e) {
  //             // Refresh has failed - reject the original request
  //             throw error;
  //           }
  //         }
  //       }

  //       // If error was not 401 just reject as is
  //       throw error;
  //     }
  //   );
  // },

  // unmount401Interceptor() {
  //   // Eject the interceptor
  //   axios.interceptors.response.eject(this._401interceptor);
  // }
};

export default ApiService;
