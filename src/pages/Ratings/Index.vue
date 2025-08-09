<template>
    <div class="container">
        <div class="rating-container">
            <form @submit.prevent="submitForm" class="rating-form">
            <h2>Rate your experience</h2>
            <p>Your opinion is very important to us!</p>

            <div class="stars-section">
                <div class="rating-group">
                <label>Price:</label>
                <div class="stars">
                    <span
                    v-for="star in 5"
                    :key="'price-' + star"
                    @click="rate('price', star)"
                    :class="{ 'filled': star <= form.price_stars }"
                    >★</span>
                </div>
                </div>

                <div class="rating-group">
                <label>Environment:</label>
                <div class="stars">
                    <span
                    v-for="star in 5"
                    :key="'environment-' + star"
                    @click="rate('environment', star)"
                    :class="{ 'filled': star <= form.environment_stars }"
                    >★</span>
                </div>
                </div>

                <div class="rating-group">
                <label>Service:</label>
                <div class="stars">
                    <span
                    v-for="star in 5"
                    :key="'service-' + star"
                    @click="rate('service', star)"
                    :class="{ 'filled': star <= form.service_stars }"
                    >★</span>
                </div>
                </div>

                <div class="rating-group">
                <label>Products:</label>
                <div class="stars">
                    <span
                    v-for="star in 5"
                    :key="'products-' + star"
                    @click="rate('products', star)"
                    :class="{ 'filled': star <= form.products_stars }"
                    >★</span>
                </div>
                </div>
            </div>

            <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea id="comment" v-model="form.comment" rows="4"></textarea>
            </div>

            <div class="personal-data">
                <h3>Your data (optional)</h3>
                <p>Filling in your details helps us better understand your visit.</p>

                <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name">
                </div>

                <div class="form-group">
                <label for="phone_number">Phone:</label>
                <input type="tel" id="phone_number" v-model="form.phone_number">
                </div>

                <div class="form-group">
                <label for="birthday">Birthday:</label>
                <input type="date" id="birthday" v-model="form.birthday">
                </div>
            </div>

            <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRatingsStore } from '@/stores/Ratings/ratingsStore';
import { reactive, watch } from 'vue';

const props = defineProps({
  establishmentId: {
    type: [String, Number],
    required: true
  }
});

const ratingsStore = useRatingsStore();

const form = reactive({
  price_stars: 0,
  environment_stars: 0,
  service_stars: 0,
  products_stars: 0,
  establishment_id: props.establishmentId,
  date_visit: new Date().toISOString().slice(0, 10),
  comment: '',
  name: '',
  phone_number: '',
  birthday: '',
  feedback: 'negative',
});

watch(form, (newForm) => {
  const ratings = [
    newForm.price_stars,
    newForm.environment_stars,
    newForm.service_stars,
    newForm.products_stars
  ];
  const totalStars = ratings.reduce((sum, star) => sum + star, 0);
  const averageRating = totalStars / ratings.length;

  if (averageRating > 2.5) {
    form.feedback = 'positive';
  } else {
    form.feedback = 'negative';
  }
}, { deep: true });

function rate(category, star) {
  form[`${category}_stars`] = star;
}

async function submitForm() {
    if (!confirm('Are you sure?')) {
        return;
    }

    const ratingSubmited = await ratingsStore.rating(props.establishmentId, form);
    if (!ratingSubmited) {
        alert('Unable to send your feedback!');
        return;
    }

    resetForm();
    alert('Feedback sent successfully!')
}

function resetForm() {
  Object.assign(form, {
    price_stars: 0,
    environment_stars: 0,
    service_stars: 0,
    products_stars: 0,
    comment: '',
    name: '',
    phone_number: '',
    birthday: '',
    feedback: '',
  });
}
</script>

<style scoped>
.rating-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.rating-form {
  padding: 2rem;
  max-width: 600px;
  width: 100%;
}

.rating-form h2 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
}

.rating-form p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.stars-section {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.rating-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-group label {
  font-weight: bold;
  color: #555;
  flex-basis: 30%;
}

.stars {
  flex-grow: 1;
  text-align: right;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
}

.stars span {
  transition: color 0.2s ease-in-out;
}

.stars span:hover,
.stars span.filled {
  color: #ffc107;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.personal-data {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.personal-data h3 {
  text-align: center;
  color: #444;
  margin-bottom: 0.5rem;
}

.personal-data p {
  text-align: center;
  color: #777;
  margin-bottom: 1.5rem;
}

button {
  display: block;
  width: 100%;
  padding: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 2rem;
}

button:hover {
  background-color: #218838;
}
</style>
