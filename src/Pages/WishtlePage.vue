<template>
  <div>
    <h1 class="text-h4 mb-4">Wishlist</h1>
    <v-row>
      <v-col
          v-for="book in $store.state.wishlist"
          :key="book.key"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-slide-y-transition>
          <book-card :book="book"></book-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <v-alert v-if="$store.state.wishlist.length === 0" type="info" class="mt-4">
      Your wishlist is empty. Add some books!
    </v-alert>
    <v-btn
        @click="exportWishlist"
        color="secondary"
        class="mt-4"
        :disabled="$store.state.wishlist.length === 0"
    >
      <v-icon left>mdi-download</v-icon>
      Export Wishlist
    </v-btn>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import { exportToCSV } from '@/utils/export';

export default {
  name: 'WishlistPage',
  components: {
    BookCard
  },
  methods: {
    exportWishlist() {
      const data = this.$store.state.wishlist.map(book => ({
        Title: book.title,
        Author: book.author_name ? book.author_name.join(', ') : 'Unknown',
        PublishedYear: book.first_publish_year || 'Unknown',
        ISBN: book.isbn ? book.isbn[0] : 'N/A'
      }));
      exportToCSV(data, 'wishlist.csv');
    }
  }
}
</script>