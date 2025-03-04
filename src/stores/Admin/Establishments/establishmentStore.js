import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const authStore = useAuthStore();

export const useEstablishmentsStore = defineStore('establishments', {
  state: () => ({
    establishments: []
  }),

  actions: {
    async all() {
        try {
            let data = await fetch(`${API_BASE_URL}/establishments`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                }
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => null);
    
            this.establishments = data;
        } catch (error) {
            this.establishments = [];
        }
    },
    async create(data) {
        try {
            let establishment = await fetch(`${API_BASE_URL}/establishments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : JSON.stringify(data)
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => null);
    
            return establishment;
        } catch (error) {
            return null;
        }
    }
  },
});
