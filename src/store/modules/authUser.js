// authUser.js
import api from '../../services/api';

const state = {
  userToken: sessionStorage.getItem('userToken') || null,
};

const getters = {
  isUserAuthenticated: (state) => !!state.userToken,
};

const actions = {
  async userLogin({ commit }, credentials) {
    try {
      const response = await api.post('/auth/user-login', credentials);
      const { UserauthToken } = response.data;

      commit('setUserToken', UserauthToken);
      return true;
    } catch (error) {
      console.error('User Login Error:', error);
      return false;
    }
  },

  async userRegister({ commit }, userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data; 
    } catch (error) {
      console.error('User Registration Failed', error.message);
      throw error; 
    }
  },

  async userLogout({ commit }) {
    try {
      commit('clearUserToken');
      return true;
    } catch (error) {
      console.error('User Logout Error:', error);
      return false;
    }
  },
  
};

const mutations = {
  setUserToken(state, UserauthToken) {
    state.userToken = UserauthToken;
    sessionStorage.setItem('userToken', UserauthToken);
  },
  clearUserToken(state) {
    state.userToken = null;
    sessionStorage.removeItem('userToken');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
