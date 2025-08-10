<template>
    <div>
        <label>Opening hours:</label>
        <div class="opening-hours-form-section">
            <template v-if="profile.opening_hours && profile.opening_hours.values">
                <div v-for="openingHour in profile.opening_hours.values" :key="openingHour.id" class="opening-hour-card-item">
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input v-model="openingHour.title" name="title" type="text" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label for="title">Opening time:</label>
                        <input v-model="openingHour.opening_time" name="opening_time" type="text" class="form-control"/>
                    </div>
                    <a class="button-remove-opening-hours" @click="remove(openingHour.id)">
                        <i class="fa-solid fa-xmark"></i>
                    </a>
                </div>
            </template>

            <button type="button" @click="add" class="button-add-opening-hours">Add</button>
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
    emit('add', { id : Math.random().toString(36).substring(2, 9), title: '', opening_time: '' });
}

function remove(id) {
    emit('remove', id);
}

</script>

<style scoped>
.opening-hours-form-section {
    margin-bottom: 15px;
}

.opening-hour-card-item {
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

.button-add-opening-hours {
    background-color: #e63946;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
}

.button-remove-opening-hours {
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
