import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      icoData: [],
      sidebarOpen: true
    },
    mutations: {
      add(state, icos) {
        state.icoData = icos;
      },
      toggleSidebar(state) {
        state.sidebarOpen = !state.sidebarOpen;
      }
    }
  });
};

export default createStore;
