const getDefaultState = () => {
  return {
    formData: { name: "", description: "", price: null }
  };
};

export const product = {
  namespaced: true,
  state: getDefaultState(),
  getters: {},
  mutations: {
    setFormData(state, value) {
      state.formData = value;
    },
    setResetState(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    fetchProductFormData(context, value) {
      debugger;
      let list = require("@/data/product.json");
      let formData = list.products.filter(x => x.id == parseInt(value))[0];
      context.commit("setFormData", formData);
    },
    resetState(context) {
      context.commit("setResetState");
    }
  }
};
