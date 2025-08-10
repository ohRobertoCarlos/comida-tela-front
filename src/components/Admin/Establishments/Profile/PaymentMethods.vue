<template>
    <div>
        <label>Payment methods:</label>
        <div class="payment-methods-form-section">
            <template v-if="profile.payment_methods && profile.payment_methods.values">
                <div v-for="paymentMethod in profile.payment_methods.values" :key="paymentMethod.id" class="payment-method-card-item">
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input v-model="paymentMethod.title" name="title" type="text" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label for="title">
                            Accepted:
                            <input v-model="paymentMethod.accepted" name="accepted" type="checkbox"/>
                        </label>
                    </div>
                    <a class="button-remove-payment-methods" @click="remove(paymentMethod.id)">
                        <i class="fa-solid fa-xmark"></i>
                    </a>
                </div>
            </template>

            <button type="button" @click="add" class="button-add-payment-methods">Add</button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
    profile: Object|null
});

const emit = defineEmits(['add', 'remove']);

function add() {
    emit('add', { id : Math.random().toString(36).substring(2, 9), title: '', accepted: true });
}

function remove(id) {
    emit('remove', id);
}

</script>

<style scoped>
.payment-methods-form-section {
    margin-bottom: 15px;
}

.payment-method-card-item {
    display: flex;
    position: relative;
    width: 100%;
    background-color: #ebeef1;
    border-radius: 4px;
    margin: 0px 0px 15px 5px;
}

.form-control {
    width: 100%;
    padding: 8px;
    font-size: 1.1em;
    border-radius: 4px;
    border: 1px solid #ced4da;
    margin-bottom: 20px;
    box-sizing: border-box;
}

.form-group {
    margin: 10px;
    width: 100%;
}

.button-add-payment-methods {
    background-color: #e63946;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
}

.button-remove-payment-methods {
    width: 30px;
    text-align: center;
    background-color: #e63946;
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: white;
    border-radius: 50%;
}
</style>
