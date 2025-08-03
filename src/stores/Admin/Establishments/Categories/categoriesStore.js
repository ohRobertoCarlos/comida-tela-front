import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const authStore = useAuthStore();

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: []
  }),
  actions: {
    async all(establishmentId) {
        try {
            let data = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/categories`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                }
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => null);

            this.categories = data;
        } catch (error) {
            this.categories = [];
        }
    },
    async store(establishmentId, data) {
        try {
            let response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/categories`, {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Unable to create a category");
            }

            return true;
        } catch (error) {
            return false;
        }
    },
    async find(establishmentId, categoryId) {
        try {
            let category = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/categories/${categoryId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                }
            })
            .then(res => res.json())
            .then(res => res.data)
            .catch(erro => null);

            if (!category) {
                throw new Error("Category not found");
            }

            return category;
        } catch (error) {
            return null;
        }
    },
    async update(establishmentId, categoryId, data) {
        try {
            const body = { name : data.name };

            let response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/categories/${categoryId}`, {
                method : 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Unable to update a category");
            }

            return true;
        } catch (error) {
            return false;
        }
    },
    async delete(establishmentId, categoryId) {
        try {
            let response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/categories/${categoryId}`, {
                method : 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error("Unable to delete a category");
            }

            return true;
        } catch (error) {
            return false;
        }
    }
  }
});
