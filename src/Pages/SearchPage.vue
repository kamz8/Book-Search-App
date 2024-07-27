<template>
  <div>
    <h1 class="text-h4 mb-4">Search Books</h1>
    <v-form @submit.prevent="search" ref="form">
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <v-text-field
              v-model="searchQuery"
              label="Search books"
              prepend-icon="mdi-magnify"
              @keyup.enter="search"
              :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="2">
          <v-btn
              @click="search"
              :loading="$store.state.loading"
              color="primary"
              block
          >
            Search
          </v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-btn @click="toggleAdvanced" color="secondary" block>
            Advanced Filters
          </v-btn>
        </v-col>
      </v-row>

      <v-expand-transition>
        <div v-if="showAdvancedFilters">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="author"
                  label="Author"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="title"
                  label="Title"
                  :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="isbn"
                  label="ISBN"
                  :rules="[rules.isbn]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="publisher"
                  label="Publisher"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="subject"
                  label="Subject"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-btn @click="clearFilters" color="error" block>
                Clear Filters
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-form>

    <v-alert v-if="$store.state.error" type="error" class="mt-4">
      {{ $store.state.error }}
    </v-alert>

    <v-row>
      <v-col
          v-for="book in $store.state.searchResults"
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
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';

export default {
  name: 'SearchPage',
  components: {
    BookCard
  },
  data() {
    return {
      searchQuery: '',
      showAdvancedFilters: false,
      author: '',
      title: '',
      isbn: '',
      publisher: '',
      subject: '',
      rules: {
        required: value => !!value || 'Required.',
        isbn: value => {
          if (!value) return true; // Allow empty value
          const pattern = /^(97(8|9))?\d{9}(\d|X)$/;
          return pattern.test(value) || 'Invalid ISBN.';
        }
      }
    }
  },
  methods: {
    toggleAdvanced() {
      this.showAdvancedFilters = !this.showAdvancedFilters;
    },
    search() {
      this.$refs.form.validate();
      if (this.searchQuery.trim()) {
        const params = {
          query: this.searchQuery,
          author: this.author,
          title: this.title,
          isbn: this.isbn,
          publisher: this.publisher,
          subject: this.subject
        };
        this.$store.dispatch('searchBooks', params);
      }
    },
    clearFilters() {
      this.author = '';
      this.title = '';
      this.isbn = '';
      this.publisher = '';
      this.subject = '';
    }
  }
}
</script>

