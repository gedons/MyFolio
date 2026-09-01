import { defineStore } from 'pinia';
import axios from 'axios';
import api from '../api';
import { useAuthStore } from './auth';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
    stats: null,
  }),

  getters: {
    featuredProjects: (state) => state.projects.filter(p => p.featured),
    allProjects: (state) => [...state.projects].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),
  },

  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${api}/projects/all`);
        // Support { projects: [...] } or direct array [...]
        this.projects = response.data?.projects || response.data || [];
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to fetch projects';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchStats() {
      try {
        const response = await axios.get(`${api}/projects/stats`);
        this.stats = response.data;
        return this.stats;
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    },

    async createProject(projectData) {
      const auth = useAuthStore();
      this.loading = true;
      try {
        const response = await axios.post(`${api}/projects/create`, projectData, {
          headers: auth.authHeader
        });
        await this.fetchProjects();
        return { success: true, project: response.data.project };
      } catch (err) {
        const message = err.response?.data?.message || err.response?.data?.error || 'Failed to create project';
        return { success: false, error: message };
      } finally {
        this.loading = false;
      }
    },

    async updateProject(id, projectData) {
      const auth = useAuthStore();
      this.loading = true;
      try {
        const response = await axios.put(`${api}/projects/update/${id}`, projectData, {
          headers: auth.authHeader
        });
        await this.fetchProjects();
        return { success: true, project: response.data.project };
      } catch (err) {
        const message = err.response?.data?.message || err.response?.data?.error || 'Failed to update project';
        return { success: false, error: message };
      } finally {
        this.loading = false;
      }
    },

    async toggleFeatured(id) {
      const auth = useAuthStore();
      try {
        await axios.patch(`${api}/projects/${id}/featured`, {}, {
          headers: auth.authHeader
        });
        // Optimistically or refetch
        const project = this.projects.find(p => p._id === id);
        if (project) {
          project.featured = !project.featured;
        }
        return { success: true };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to toggle featured state';
        return { success: false, error: message };
      }
    },

    async reorderProjects(orders) {
      const auth = useAuthStore();
      try {
        await axios.put(`${api}/projects/reorder`, { orders }, {
          headers: auth.authHeader
        });
        // Update local state orders
        orders.forEach(({ id, displayOrder }) => {
          const p = this.projects.find(proj => proj._id === id);
          if (p) p.displayOrder = displayOrder;
        });
        return { success: true };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to reorder projects';
        return { success: false, error: message };
      }
    },

    async deleteProject(id) {
      const auth = useAuthStore();
      this.loading = true;
      try {
        await axios.delete(`${api}/projects/delete/${id}`, {
          headers: auth.authHeader
        });
        this.projects = this.projects.filter(p => p._id !== id);
        return { success: true };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete project';
        return { success: false, error: message };
      } finally {
        this.loading = false;
      }
    }
  }
});
