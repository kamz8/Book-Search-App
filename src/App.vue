<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Book Search App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/" exact>
        <v-icon left>mdi-magnify</v-icon>
        Search
      </v-btn>
      <v-btn text to="/wishlist">
        <v-icon left>mdi-heart</v-icon>
        Wishlist
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.book-added-animation {
  animation: pulse 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* styles.css */
.card {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card img {
  max-width: 100%;
  height: auto;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card-subtitle {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1em;
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  justify-content: space-between;
}
</style>