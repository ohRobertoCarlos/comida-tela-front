<template>
  <div class="qrcode-container">
    <img
      v-if="qrcodeUrl"
      :src="qrcodeUrl"
      :alt="altText"
      class="qrcode-image"
    />
    <p v-else class="placeholder-text">QR Code not available.</p>

    <a
        v-if="qrcodeUrl"
        class="download-button"
        :download="filename"
        :href="qrcodeUrl"
        target="_blank"
    >
      Download QR Code
    </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    qrcodeUrl: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        default: 'QR Code digital menu'
    },
    filename: {
        type: String,
        default: 'menu-qrcode.png'
    }
});
</script>

<style scoped>
.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  background-color: #f8f8f8;
  max-width: 400px;
  margin: 0 auto;
}

.qrcode-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.placeholder-text {
  font-size: 1rem;
  color: #999;
  text-align: center;
}

.download-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #e63946;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
</style>
