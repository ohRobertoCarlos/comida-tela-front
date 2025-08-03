<template>
    <div class="container">
        <div class="card-password-update">
            <div class="section-title-card-password-update">
                <h3 class="title-card-password-update">Password Update</h3>
            </div>

            <div class="password-requirements">
                <ul class="requirements-list">
                    <li :class="{ 'passed': requirements.minLength }">
                        At least 6 characters
                    </li>
                    <li :class="{ 'passed': requirements.hasNumber }">
                        At least one number
                    </li>
                    <li :class="{ 'passed': requirements.hasSpecialChar }">
                        At least one special character (symbol)
                    </li>
                    <li :class="{ 'passed': requirements.isConfirmed }">
                        Password and confirmation must be the same
                    </li>
                </ul>
            </div>

            <div class="section-form-password-update">
                <form @submit.prevent="update">
                    <input type="email" name="email" v-model="email" placeholder="E-mail">
                    <input type="password" @input="checkPassword" v-model="password" name="password" placeholder="Password">
                    <input type="password" @input="checkPassword" v-model="passwordConfirmation" name="password_confirmation" placeholder="Password Confirmation">
                    <button type="submit" :disabled="loading || !filledCredentials">Update Password</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
let loading = ref(false);
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const requirements = reactive({
  minLength: false,
  hasNumber: false,
  hasSpecialChar: false,
  isConfirmed: false
});

const checkPassword = () => {
  const minLength = 6;
  const passwordValue = password.value;

  requirements.minLength = passwordValue.length >= minLength;
  requirements.hasNumber = /\d/.test(passwordValue);
  requirements.hasSpecialChar = /\W/.test(passwordValue);
  requirements.isConfirmed = passwordValue && passwordConfirmation.value && passwordValue === passwordConfirmation.value;
};

const isPasswordValid = computed(() => {
  return Object.values(requirements).every(Boolean);
});

const filledCredentials = computed(() => {
    return email.value && password.value && passwordConfirmation.value;
});

async function update() {
    if (!isPasswordValid.value) {
        alert('Please complete all password requirements.')
        return;
    }

    loading.value = true;

    try {
        const result = await authStore.updatePassword({
            token : route.query.token,
            email: email.value,
            password: password.value,
            password_confirmation : passwordConfirmation.value
        });

        if (result) {
            alert('Password updated successfully!');

            router.push({ name : 'admin.login' });
        } else {
            alert('Unable to update your password!');
        }
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.card-password-update{
    width: 100%;
    max-width: 600px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    justify-self: center;
}

.section-form-password-update{
    width: 100%;
}

.section-title-card-password-update {
    width: 100%;
}

.title-card-password-update{
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

.requirements-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

.requirements-list li {
  color: #c0392b;
  margin-bottom: 5px;
  transition: color 0.3s ease;
}

.requirements-list li.passed {
  color: #27ae60;
}

.form-group {
  margin-bottom: 15px;
}
</style>
