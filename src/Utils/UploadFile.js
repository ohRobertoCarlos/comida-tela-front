import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const authStore = useAuthStore();

export async function uploadPublic(file) {
    try {
        let formData = new FormData();
        formData.append('file', file);

        let response = await fetch(`${API_BASE_URL}/files/public`, {
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

        return response?.path;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
