import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const authStore = useAuthStore();

export const useUsersStore = defineStore('users', {
  state: () => ({

  }),

  actions: {
    async create(establishmentId, data) {
        try {
            let response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Unable to create a user');
            }

            return true;
        } catch (error) {
            return null;
        }
    },
    async find(establishmentId, userId) {
        try {
            let data = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/users/${userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                }
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => null);

            return data;
        } catch (error) {
            return null;
        }
    },
    async all(establishmentId) {
        try {
            let data = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/users`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                }
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => null);

            return data;
        } catch (error) {
            return null;
        }
    },
    async update(establishmentId, userId, data) {
        try {
            let response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/users/${userId}`, {
                method : 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Unable to update user");
            }

            return true;
        } catch (error) {
            return null;
        }
    }
  },
});
