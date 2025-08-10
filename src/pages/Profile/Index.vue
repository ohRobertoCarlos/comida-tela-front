<template>
    <div>
        <div v-if="establishment" class="section-profile">
            <Header :establishment="establishment" />

            <div class="section-info-profile">
                <div class="section-links-profile">
                    <RouterLink :to="`/${route.params.menuCode}`" class="link-profile">
                        <i class="fa-solid fa-utensils"></i>
                        Menu
                    </RouterLink>

                    <RouterLink :to="`/${establishment.id}/rating`" class="link-profile">
                        <i class="fa-solid fa-star"></i>
                        Rate us
                    </RouterLink>
                </div>

                <div class="section-content-profile">
                    <div class="section-opening-hours">
                        <h3 class="title-opening-hours">Opening hours</h3>
                        <template v-if="establishment.profile.opening_hours && establishment.profile.opening_hours.values">
                            <p class="opening-hour" v-for="openingHour in establishment.profile.opening_hours.values" :key="openingHour.id">
                                <strong>{{ openingHour.title }}: </strong>  {{ openingHour.opening_time }}
                            </p>
                        </template>
                    </div>

                    <div class="section-payment-methods">
                        <h3 class="title-payment-methods">Payment methods</h3>
                        <template v-if="establishment.profile.payment_methods && establishment.profile.payment_methods.values">
                            <p class="payment-method" v-for="paymentMethod in establishment.profile.payment_methods.values" :key="paymentMethod.id">
                                {{ paymentMethod.title }} - {{ paymentMethod.accepted ? 'Accepted' : 'Not accepted' }}
                            </p>
                        </template>
                    </div>

                    <div class="section-localization">
                        <h3 class="title-localization">Localization</h3>
                        <div v-if="establishment.profile.address" class="section-localization-address">
                            <p class="localization-address">{{ establishment.profile.address }}</p>
                            <a class="button-show-map" v-if="!showMap" @click="showMap = true">Show map</a>
                            <div v-if="showMap">
                                <iframe
                                    :src="`https://maps.google.com/maps?q=${establishment.profile.address}&t=&z=14&ie=UTF8&iwloc=B&output=embed`"
                                    width="100%"
                                    height="450"
                                    style="border:0;"
                                    loading="lazy"
                                    allowfullscreen
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const establishment = ref(null);
const showMap = ref(false);

onMounted(async () => {
    const establishmentData = await getEstablishment();

    if (!establishmentData) {
        router.push({
            name: 'NotFound',
            params: { pathMatch: route.path.substring(1).split('/') },
            query: route.query,
            hash: route.hash,
        });
        return;
    }

    establishment.value = establishmentData;
    establishment.value.profile.opening_hours = JSON.parse(establishment.value.profile.opening_hours);
    establishment.value.profile.payment_methods = JSON.parse(establishment.value.profile.payment_methods);
});

async function getEstablishment() {
    try {
        let data = await fetch(`${API_BASE_URL}/establishments/menuCode/${route.params.menuCode}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => json.data)
            .catch(error => null);

        return data;
    } catch (error) {
        return null;
    }
}
</script>

<style scoped>
.section-profile {
    width: 100%;
}

.section-info-profile {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.section-links-profile {
    width: 70%;
    display: flex;
    align-items: center;
    align-self: center;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0;
}

.section-localization {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.link-profile {
    min-width: 300px;
    text-align: center;
    margin: 10px 0;
    padding: 10px 30px;
    background-color: #e63946;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1.2em;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-content-profile {
    display: flex;
    flex-direction: column;
    width: 70%;
    align-self: center;
}

.opening-hour {
    text-align: center;
    margin: 10px 0;
}

.payment-method {
    text-align: center;
    margin: 10px 0;
}

.title-opening-hours {
    text-align: center;
}

.title-payment-methods {
    text-align: center;
}

.title-localization {
    text-align: center;
}

.localization-address {
    text-align: center;
}

.button-show-map {
    text-align: center;
    margin: 0 auto;
    padding: 10px 30px;
    background-color: #e63946;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    justify-self: center;
}

.section-localization-address {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 50px;
}
</style>
