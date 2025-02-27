import { defineStore } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: null
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error('Falha no login');

        const data = await response.json();
        localStorage.setItem('accessToken', data.data.access_token);
        await this.fetchUser();

        return true;
      } catch (error) {
        return false;
      }
    },

    async logout() {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          credentials: 'include',
        });

        localStorage.removeItem('accessToken'); 
        this.accessToken = null;
        this.user = null;

        return true;
      } catch (error) {
        return false;
      }
    },

    async refreshToken() {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Erro ao atualizar token');

        const data = await response.json();
        localStorage.setItem('accessToken', data.data.access_token);
        await this.fetchUser();

        return true;
      } catch (error) {
        return false;
      }
    },

    async fetchUser() {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
          },
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Usuário não autenticado');
        
        const data = await response.json();
        this.user = data.data;
      } catch (error) {
        this.user = null;
      }
    },
  },
});
