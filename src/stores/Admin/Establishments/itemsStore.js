import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const authStore = useAuthStore();

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: []
  }),

  actions: {
    async all(establishmentId) {
        try {
            let data = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/menus/items`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => null);
    
            this.items = data;
        } catch (error) {
            this.items = null;
        }
    },
    async create(data) {
        try {
            let formData = new FormData();
            formData.append('title', data.title);
            formData.append('min_price', data.min_price);
            formData.append('max_price', data.max_price ?? 0);
            formData.append('cover_image', data.cover_image);
            formData.append('description', data.description);
            formData.append('establishment_id', data.establishment_id);
            formData.append('portions', data.portions);
            formData.append('currency', data.currency);

            if (data.categories.length > 0) {
                formData.append('categories[]', data.categories);
            }

            let item = await fetch(`${API_BASE_URL}/establishments/${data.establishment_id}/menus/items`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : formData
            })
                .then(response => response.json())
                .then(json => json.data)
                .catch(error => {
                    return null;
                });

            return item;
        } catch (error) {
            return null;
        }
    }
  },
});
