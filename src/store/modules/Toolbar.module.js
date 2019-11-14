const getDefaultState = () => {
  return {
    roleMenus: [],
    toolbarItems: []
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
    }
  },
  actions: {
    fetchRoleMenus(context) {
      context.commit("setRoleMenus", require("@/data/roleMenu.json"));
    },
    fetchToolbarItems(context) {
      context.commit("setToolbarItems", require("@/data/toolbar.json"));
    }
  }
};
