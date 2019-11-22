const getDefaultState = () => {
  return {
    roleMenus: [],
    toolbarItems: [],
    showModal: false,
    formComponent: null,
    lastOperation: null
  };
};

export const toolbar = {
  namespaced: true,
  state: getDefaultState(),
  getters: {},
  mutations: {
    setRoleMenus(state, roleMenus) {
      state.roleMenus = roleMenus;
    },
    // setToolbarItems(state, toolbarItems) {
    //   state.toolbarItems = toolbarItems;
    // },
    // setShowModal(state, value) {
    //   state.showModal = value;
    // },
    setFormComponent(state, value) {
      state.formComponent = () => import(`@/views${value}.vue`);
    },
    setLastOperation(state, value) {
      state.lastOperation = value;
    }
  },
  actions: {
    fetchRoleMenus(context) {
      context.commit("setRoleMenus", require("@/data/roleMenu.json"));
    },
    // fetchToolbarItems(context) {
    //   context.commit("setToolbarItems", require("@/data/toolbar.json"));
    // },
    // changeShowModal(context, value) {
    //   return context.commit("setShowModal", value);
    // },
    changeFormComponent(context, value) {
      return context.commit("setFormComponent", value);
    },
    changeLastOperation(context, value) {
      return context.commit("setLastOperation", value);
    },
    fetchFormData(context, value) {
      debugger;
      const { actionName, id, moduleName } = value;
      context.dispatch(`${moduleName}/${actionName}`, id, {
        root: true
      });
    },
    resetFormState(context, moduleName) {
      context.dispatch(`${moduleName}/resetState`, null, {
        root: true
      });
    }
  }
};
