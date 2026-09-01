import { defineStore } from 'pinia';
import axios from 'axios';
import api from '../api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || null,
    user: JSON.parse(localStorage.getItem('admin_user') || 'null'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    authHeader: (state) => state.token ? { Authorization: `Bearer ${state.token}` } : {},
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(`${api}/auth/login`, credentials);
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user || { username: credentials.username || 'Admin' };
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(this.user));
        return { success: true };
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Login failed. Invalid credentials.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.error = null;
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    },

    checkAuth() {
      const storedToken = localStorage.getItem('admin_token');
      if (storedToken) {
        this.token = storedToken;
        this.user = JSON.parse(localStorage.getItem('admin_user') || 'null');
      }
    }
  }
});
