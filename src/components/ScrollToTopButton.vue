<template>
  <button @click="scrollToTop" class="back-to-top" ref="backToTopBtn">↑</button>
</template>

<script setup>
import { ref } from 'vue';

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const backToTopBtn = ref(null);

window.onscroll = () =>  {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.value.style.display = 'flex';
    } else {
        backToTopBtn.value.style.display = 'none';
    }
};

</script>

<style scoped>
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
    z-index: 1001;
}

.back-to-top:hover {
    background-color: #d62828;
}
</style>