const getDefaultState = () => {
  return {
    roleMenus: [],
    toolbarItems: [],
    showModal: false
  };
};

export const toolbar = {
  namespaced: true,
  state: getDefaultState(),
  getters: {},
  mutations: {
    setRoleMenus(state, roleMenus) {
      debugger;
      state.roleMenus = roleMenus;
    },
    setToolbarItems(state, toolbarItems) {
      state.toolbarItems = toolbarItems;
    },
    setShowModal(state, value) {
      state.showModal = value;
    }
  },
  actions: {
    fetchRoleMenus(context) {
      context.commit("setRoleMenus", require("@/data/roleMenu.json"));
    },
    fetchToolbarItems(context) {
      context.commit("setToolbarItems", require("@/data/toolbar.json"));
    },
    changeShowModal(context, value) {
      context.commit("setShowModal", value);
    }
  }
};
