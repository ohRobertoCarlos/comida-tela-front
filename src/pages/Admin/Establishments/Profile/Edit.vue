<template>
    <div class="container">
        <form v-if="profile" @submit.prevent="update">
            <label for="title">Facebook Link:</label>
            <input v-model="profile.facebook_link" name="facebook_link" type="text" class="form-control"/>

            <label for="title">Instagram Link:</label>
            <input v-model="profile.instagram_link" name="instagram_link" type="text" class="form-control"/>

            <label for="title">Whatsapp</label>
            <input v-model="profile.whatsapp" name="whatsapp" type="text" class="form-control"/>

            <label for="title">localization:</label>
            <input v-model="profile.localization" name="localization" type="text" class="form-control"/>

            <label for="title">address:</label>
            <input v-model="profile.address" name="address" type="text" class="form-control"/>

            <label for="title">Image cover:</label>
            <input accept="image/*" @change="handleFile" name="image_cover_profile_url" type="file" class="form-control"/>

            <OpeningHours :profile="profile" @add="addOpeningHours" @remove="removeOpeningHours"/>

            <PaymentMethods :profile="profile" @add="addPaymentMethods" @remove="removePaymentMethods"/>

            <button type="submit" class="button-submit-form-default">
                Update
            </button>
        </form>
    </div>
</template>

<script setup>
import { useEstablishmentsStore } from "@/stores/Admin/Establishments/establishmentStore";
import { useProfilesStore } from "@/stores/Admin/Establishments/Profile/profileStore";
import { onMounted, ref } from "vue";
import { uploadPublic } from '@/Utils/UploadFile.js';
import OpeningHours from "@/components/Admin/Establishments/Profile/OpeningHours.vue";
import PaymentMethods from "@/components/Admin/Establishments/Profile/PaymentMethods.vue";

const props = defineProps({
  establishmentId: String
});

const establishmentStore = useEstablishmentsStore();
const profileStore = useProfilesStore();

const profile = ref(null);
const establishment = ref(null);
const file = ref(null);

onMounted(async () => {
    establishment.value = await establishmentStore.find(props.establishmentId);
    profile.value = establishment.value.profile;
    profile.value.opening_hours = JSON.parse(profile.value.opening_hours);
    profile.value.payment_methods = JSON.parse(profile.value.payment_methods);
});

async function update() {
    if (!confirm('Do you really want to update your profile?')) {
        return;
    }

    let publicFileUrl = '';
    if (file.value !== null) {
        publicFileUrl = await uploadPublic(file.value);
    }

    if (publicFileUrl) {
        profile.value.image_cover_profile_url = publicFileUrl;
    }

    const profileUpdated = await profileStore.update(props.establishmentId, profile.value);

    if (!profileUpdated) {
        alert('Unable to update profile');
        return;
    }

    alert('Profile updated successfully!');
}

function handleFile(event) {
    file.value = event.target.files[0] ?? null;
}

function addOpeningHours(openingHours) {
    if (!profile.value.opening_hours) {
        profile.value.opening_hours = { values : [] };
    }

    profile.value.opening_hours.values.push(openingHours);
}

function removeOpeningHours(id) {
    profile.value.opening_hours.values = profile.value.opening_hours.values.filter(openingHour => openingHour.id !== id);
}

function addPaymentMethods(paymentMethod) {
    if (!profile.value.payment_methods) {
        profile.value.payment_methods = { values : [] };
    }

    profile.value.payment_methods.values.push(paymentMethod);
}

function removePaymentMethods(id) {
    profile.value.payment_methods.values = profile.value.payment_methods.values.filter(paymentMethod => paymentMethod.id !== id);
}

</script>

<style scoped>
.form-control {
    width: 100%;
    padding: 8px;
}

input[type="text"], input[type="number"], input[type="file"], textarea {
    width: 100%;
    padding: 15px;
    font-size: 1.1em;
    border-radius: 8px;
    border: 1px solid #ced4da;
    margin-bottom: 20px;
    box-sizing: border-box;
}
</style>
