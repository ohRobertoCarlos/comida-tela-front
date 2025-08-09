import { defineStore } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

export const useRatingsStore = defineStore('ratings', {
  state: () => ({

  }),

  actions: {
    async rating(establishmentId, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/ratings`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Unable to create rating');
            }

            return true;
        } catch (error) {
            return false;
        }
    }
  },
});
