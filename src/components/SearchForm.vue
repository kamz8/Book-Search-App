<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
          v-model="author"
          :rules="[rules.required]"
          label="Author"
          required
      ></v-text-field>
      <v-text-field
          v-model="title"
          :rules="[rules.required]"
          label="Title"
          required
      ></v-text-field>
      <v-text-field
          v-model="isbn"
          :rules="[rules.required, rules.isbn]"
          label="ISBN"
          required
      ></v-text-field>
      <v-btn :disabled="!valid" @click="submit">Search</v-btn>
    </v-form>
    <v-btn @click="toggleAdvancedSearch">Advanced Search</v-btn>
    <div v-if="showAdvancedSearch">
      <!-- Dodaj pola zaawansowanego wyszukiwania tutaj -->
      <v-text-field
          v-model="publisher"
          label="Publisher"
      ></v-text-field>
      <v-text-field
          v-model="subject"
          label="Subject"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      author: '',
      title: '',
      isbn: '',
      publisher: '',
      subject: '',
      showAdvancedSearch: false,
      rules: {
        required: value => !!value || 'Required.',
        isbn: value => {
          const pattern = /^(97(8|9))?\d{9}(\d|X)$/;
          return pattern.test(value) || 'Invalid ISBN.';
        }
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('performSearch', {
          author: this.author,
          title: this.title,
          isbn: this.isbn,
          publisher: this.publisher,
          subject: this.subject
        });
      }
    },
    toggleAdvancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
    }
  }
};
</script>

<style scoped>

</style>
