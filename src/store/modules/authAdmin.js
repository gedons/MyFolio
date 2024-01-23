import api from '../../services/api';

const state = {
  adminToken: sessionStorage.getItem('adminToken') || null,
  //adminToken: null,
};

const getters = {
  isAdminAuthenticated: (state) => !!state.adminToken,
};

const actions = {
  async adminLogin({ commit }, credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { authToken } = response.data;
  
      if (authToken) {
        commit('setAdminToken', authToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login Error:', error);
      return false;
    }
  },
  

  async adminLogout({ commit }) {
    try {
      // Clear admin token from state and local storage
      commit('clearAdminToken');
      return true; 
    } catch (error) {
      console.error('Logout Error:', error);
      return false;
    }
  },
};

const mutations = {
  setAdminToken(state, authToken) {
    state.adminToken = authToken;
    // Optionally, you can also store the token in local storage for persistence
    sessionStorage.setItem('adminToken', authToken);
  },
  clearAdminToken(state) {
    state.adminToken = null;
    sessionStorage.removeItem('adminToken');  
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
