<!-- BookDetails.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ book.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-img :src="coverUrl" :alt="book.title" contain height="300"></v-img>
          </v-col>
          <v-col cols="12" sm="6">
            <p><strong>Author(s):</strong> {{ book.author_name ? book.author_name.join(', ') : 'Unknown Author' }}</p>
            <p><strong>First Published:</strong> {{ book.first_publish_year || 'Unknown' }}</p>
            <p><strong>ISBN:</strong> {{ book.isbn ? book.isbn[0] : 'N/A' }}</p>
            <p v-if="book.publisher"><strong>Publisher:</strong> {{ book.publisher.join(', ') }}</p>
            <p v-if="book.subject"><strong>Subjects:</strong> {{ book.subject.join(', ') }}</p>
            <p v-if="book.ebook_count_i"><strong>Available as eBook:</strong> Yes</p>
          </v-col>
        </v-row>
        <v-expansion-panels v-if="book.author_alternative_name">
          <v-expansion-panel>
            <v-expansion-panel-header>Alternative Author Names</v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul>
                <li v-for="name in book.author_alternative_name" :key="name">{{ name }}</li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BookDetails',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: true
    };
  },
  computed: {
    coverUrl() {
      return this.book.cover_i
          ? `http://covers.openlibrary.org/b/id/${this.book.cover_i}-L.jpg`
          : 'https://via.placeholder.com/300x450?text=No+Cover';
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit('close');
    }
  }
};
</script>