import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const authStore = useAuthStore();

export const useProfilesStore = defineStore('profiles', {
  state: () => ({
    profile: null
  }),

  actions: {
    async update(establishmentId, profile) {

        let data = { ...profile };

        data.opening_hours = JSON.stringify(data.opening_hours);
        data.payment_methods = JSON.stringify(data.payment_methods);
        try {
            const profileUpdated = await fetch(`${API_BASE_URL}/establishments/${establishmentId}/profiles`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${authStore.accessToken}`
                },
                body : JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        return false;
                    }

                    return true;
                })
                .catch(error => false);

            return profileUpdated;
        } catch (error) {
            return null;
        }
    },
  },
});
