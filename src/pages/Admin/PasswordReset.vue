<template>
    <div class="container">
        <div v-if="sendedEmailResetPassword === true">
            <p class="message-email-password-reset-sended">A password recovery email has been sent!</p>
        </div>

        <div class="card-password-reset" v-else>
            <div class="section-title-card-password-reset">
                <h3 class="title-card-password-reset">Reset Password</h3>
            </div>
            <div class="section-form-password-reset">
                <form @submit.prevent="reset">
                    <input type="email" name="email" v-model="email" placeholder="E-mail">
                    <button type="submit" :disabled="loading || !email">Send E-mail</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
let loading = ref(false);
const email = ref('');
const sendedEmailResetPassword = ref(false);

async function reset() {
    loading.value = true;

    const emailSended = await authStore.sendEmailPasswordReset(email.value);

    if (!emailSended) {
        alert('We were unable to send you the email to retrieve your password!');
        return;
    }

    sendedEmailResetPassword.value = true;
}
</script>

<style scoped>
.card-password-reset {
    width: 100%;
    max-width: 600px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    justify-self: center;
}

.section-form-password-reset {
    width: 100%;
}

.section-title-card-password-reset {
    width: 100%;
}

.title-card-password-reset {
    text-align: center;
    color: #212529;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #495057;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 15px;
    outline: none;
}

button[type="submit"] {
    width: 100%;
    background-color: #e63946;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #f05865;
}

button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

input::placeholder {
    color: #212529;
}

.message-email-password-reset-sended {
    font-size: 20px;
    text-align: center;
    color: #212529;
}
</style>
