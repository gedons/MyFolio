import { defineStore } from 'pinia';
import axios from 'axios';
import api from '../api';
import { useAuthStore } from './auth';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    pagination: {
      totalProjects: 0,
      totalPages: 1,
      currentPage: 1,
      limit: 4,
      hasNextPage: false,
      hasPrevPage: false,
    },
    loading: false,
    error: null,
    stats: null,
  }),

  getters: {
    featuredProjects: (state) => state.projects.filter(p => p.featured),
    allProjects: (state) => [...state.projects].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)),
  },

  actions: {
    async fetchProjects(options = {}) {
      const { page = 1, limit = 4, featured = null } = typeof options === 'number' ? { page: options } : options;
      
      this.loading = true;
      this.error = null;
      try {
        let url = `${api}/projects/all?page=${page}&limit=${limit}`;
        if (featured !== null && featured !== undefined) {
          url += `&featured=${featured}`;
        }

        const response = await axios.get(url);
        
        if (response.data && response.data.projects) {
          this.projects = response.data.projects;
          if (response.data.pagination) {
            this.pagination = response.data.pagination;
          }
        } else if (Array.isArray(response.data)) {
          this.projects = response.data;
        }
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
        await this.fetchProjects({ page: 1 });
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
        await this.fetchProjects({ page: this.pagination.currentPage });
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
        await this.fetchProjects({ page: this.pagination.currentPage });
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
