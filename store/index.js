import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      icoData: [],
      sidebarOpen: false
    },
    mutations: {
      add (state, icos) {
        state.icoData = icos;
      },
      toggleSidebar(state) {
        console.log('toggling');
        console.log(state.sidebarOpen);
        state.sidebarOpen = !state.sidebarOpen;
      }
    }
  });
};

export default createStore;