<template>
  <v-card :color="isInWishlist ? 'light-green lighten-4' : ''" :data-key="book.key" class="col">
    <v-img
        :src="coverUrl"
        height="200px"
        contain
    ></v-img>
    <v-card-title class="text-subtitle-1">{{ book.title }}</v-card-title>
    <v-card-text>
      <p>Author: {{ book.author_name ? book.author_name.join(', ') : 'Unknown' }}</p>
      <p>First Published: {{ book.first_publish_year || 'Unknown' }}</p>
      <p>ISBN: {{ book.isbn ? book.isbn[0] : 'N/A' }}</p>
    </v-card-text>
    <v-card-actions class="action-buttons">
      <v-btn
          @click="toggleWishlist"
          :color="isInWishlist ? 'success' : 'primary'"
          class="grow"
          v-ripple="{ center: true }"
      >
        <v-icon left color="red">{{ isInWishlist ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        {{ isInWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
      </v-btn>
      <v-btn
          @click="viewDetails"
          color="gray"
          class="grow"
          v-ripple="{ center: true }"
      >
        <v-icon left>mdi-information</v-icon>
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {storage} from "@/utils/storage";

export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    isInWishlist() {
      return this.$store.state.wishlist.some(item => item.key === this.book.key);
    },
    coverUrl() {
      return this.book.cover_i
          ? `http://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`
          : 'https://via.placeholder.com/200x300?text=No+Cover';
    }
  },
  methods: {
    async toggleWishlist() {
      if (this.isInWishlist) {
        await this.$store.dispatch('removeFromWishlist', this.book);
      } else {
        await this.$store.dispatch('addToWishlist', this.book);
      }
    },
    async viewDetails() {
      await storage.saveSearchResults(this.book.key, [this.book]);
      this.$store.commit('setSelectedBook', this.book);
      await this.$router.push({ name: 'BookDetails', params: { id: this.book.key } });
    }
  }
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action-buttons .v-btn {
  flex: 1 1 auto;
  min-width: 48%;
}

@media (max-width: 600px) {
  .action-buttons .v-btn {
    min-width: 100%;
  }
}
</style>
