const getDefaultState = () => {
  return {
    roleMenus: [],
    toolbarItems: [],
    showModal: false,
    formComponentPath: "/Category/Form"
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
    },
    setFormComponent(state, value) {
      debugger;
      state.formComponentPath = value;
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
      return context.commit("setShowModal", value);
    },
    importFormComponent(context, value) {
      return context.commit("setFormComponent", value);
    }
  }
};
