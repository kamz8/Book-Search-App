<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="6" lg="4">
        <v-img :src="coverUrl" alt="cover" height="300px" contain></v-img>
      </v-col>
      <v-col sm="12" md="6" lg="8">
        <h1>{{ book.title }}</h1>
        <p><strong>Author(s):</strong> {{ book.author_name ? book.author_name.join(', ') : 'Unknown Author' }}</p>
        <p><strong>First Published:</strong> {{ book.first_publish_year || 'Unknown' }}</p>
        <p><strong>ISBN:</strong> {{ book.isbn ? book.isbn[0] : 'N/A' }}</p>
        <p v-if="book.publisher"><strong>Publisher:</strong> {{ book.publisher.join(', ') }}</p>
        <p v-if="book.subject"><strong>Subjects:</strong> {{ book.subject.join(', ') }}</p>
        <p v-if="book.ebook_count_i"><strong>Available as eBook:</strong> Yes</p>
        <div v-if="book.author_alternative_name">
          <strong>Alternative Author Names:</strong>
          <ul>
            <li v-for="name in book.author_alternative_name" :key="name">{{ name }}</li>
          </ul>
        </div>
      </v-col>
    </v-row>
    <v-btn @click="$router.back()">Back</v-btn>
  </v-container>
</template>

<script>
import {storage} from "@/utils/storage";

export default {
  data() {
    return {
      book: {},
      coverUrl: '',
    };
  },
  async created() {
    const bookId = this.$route.params.id;
    const book = await storage.getBookById(bookId);
    if (book) {
      this.book = book;
      this.coverUrl = book.cover_i
          ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : 'https://via.placeholder.com/300x400?text=No+Cover';
      this.$store.commit('setSelectedBook', book);
    } else {
      this.$router.replace('/');
    }
  }
};
</script>

<style scoped>
/* Dodaj tutaj własne klasy CSS */
</style>
