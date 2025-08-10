<template>
    <div class="container">
        <QrCodeViewer v-if="establishment" :qrcode-url="establishment.menu.qr_code_image_path_url" />
    </div>
</template>

<script setup>
import QrCodeViewer from '@/components/Admin/Establishments/QrCodeViewer.vue';
import { useEstablishmentsStore } from '@/stores/Admin/Establishments/establishmentStore';
import { onMounted, ref } from 'vue';

const props = defineProps({
    establishmentId: String
});

const establishment = ref(null);
const establishmentStore = useEstablishmentsStore();

onMounted(async () => {
    establishment.value = await establishmentStore.find(props.establishmentId);
});

</script>

<style>

</style>
