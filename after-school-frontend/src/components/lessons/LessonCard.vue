
<script setup>
import { ref, computed, watch } from "vue";

import { getImageUrl } from "../../utils/imageUrl.js";
import { useCart } from "../../composables/useCart.js";
import EnrolmentInfo from "./EnrolmentInfo.vue";

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
});

const imageFailed = ref(false);

// Generate complete image URL
const imageUrl = computed(() => {
  return getImageUrl(props.lesson.image);
});

// Reset image error when image changes
watch(imageUrl, () => {
  imageFailed.value = false;
});

// Handle broken images
const handleImageError = () => {
  console.warn("Failed to load lesson image:", imageUrl.value);
  imageFailed.value = true;
};

// Cart functionality
const { addToCart, getAvailableSpaces } = useCart();
</script>

<template>
  <article class="lesson-card">

    <!-- Lesson Image -->
    <img
      v-if="imageUrl && !imageFailed"
      :src="imageUrl"
      :alt="lesson.topic"
      class="lesson-image"
      @error="handleImageError"
    />

    <!-- Fallback -->
    <div
      v-else
      class="lesson-image-placeholder"
    >
      No Image Available
    </div>

    <!-- Lesson Details -->
    <div class="lesson-details">

      <h3>{{ lesson.topic }}</h3>

      <p>Location: {{ lesson.location }}</p>

      <p>Price: £{{ lesson.price }}</p>

      <p>
        Available Spaces:
        {{ getAvailableSpaces(lesson) }}
      </p>

      <!-- Enrolment -->
      <EnrolmentInfo
        :lesson-id="lesson._id"
      />

      <!-- Add to Cart -->
      <button
        class="add-cart-btn"
        :disabled="getAvailableSpaces(lesson) === 0"
        @click="addToCart(lesson)"
      >
        {{
          getAvailableSpaces(lesson) === 0
            ? "No Spaces Available"
            : "Add to Cart"
        }}
      </button>

    </div>
  </article>
</template>
