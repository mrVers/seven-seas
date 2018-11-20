import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      icoData: [],
      sidebarOpen: true,
      gainers: [],
      losers: []
    },
    mutations: {
      add(state, icos) {
        state.icoData = icos;
      },
      toggleSidebar(state) {
        state.sidebarOpen = !state.sidebarOpen;
      },
      populateGainers(state, gainers) {
        state.gainers = gainers;
      },
      populateLosers(state, losers) {
        state.losers = losers;
      }
    }
  });
};

export default createStore;
