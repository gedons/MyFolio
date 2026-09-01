import { defineStore } from 'pinia';
import axios from 'axios';
import api from '../api';
import { useAuthStore } from './auth';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    unreadCount: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMessages() {
      const auth = useAuthStore();
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${api}/contact/all`, {
          headers: auth.authHeader
        });
        this.messages = response.data.messages || [];
        this.unreadCount = response.data.unreadCount || 0;
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to fetch messages';
      } finally {
        this.loading = false;
      }
    },

    async toggleRead(id, currentStatus) {
      const auth = useAuthStore();
      try {
        const response = await axios.patch(`${api}/contact/${id}/read`, { read: !currentStatus }, {
          headers: auth.authHeader
        });
        const msg = this.messages.find(m => m._id === id);
        if (msg) {
          msg.read = !currentStatus;
          this.unreadCount += msg.read ? -1 : 1;
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Failed to update message' };
      }
    },

    async deleteMessage(id) {
      const auth = useAuthStore();
      try {
        await axios.delete(`${api}/contact/${id}`, {
          headers: auth.authHeader
        });
        const msg = this.messages.find(m => m._id === id);
        if (msg && !msg.read) {
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
        this.messages = this.messages.filter(m => m._id !== id);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.response?.data?.message || 'Failed to delete message' };
      }
    },

    async sendMessage(formData) {
      this.loading = true;
      try {
        const response = await axios.post(`${api}/contact/submit`, formData);
        return { success: true, message: response.data.message };
      } catch (err) {
        const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to send message';
        return { success: false, error: msg };
      } finally {
        this.loading = false;
      }
    }
  }
});
