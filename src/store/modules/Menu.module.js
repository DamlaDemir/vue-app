const getDefaultState = () => {
    return {
        menus: []
    };
};

export const menu = {
    namespaced: true,
    state: getDefaultState(),
    getters: {

    },
    mutations: {
        setMenus(state, menus) {
            state.menus = menus;
        }
    },
    actions: {
        fetchMenus(context) {
            return  context.commit('setMenus',require("@/data/menu.json"));        
        }
    }
};