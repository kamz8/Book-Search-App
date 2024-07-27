Book Search App
===============

Overview
--------

Book Search App is a simple Vue.js Single Page Application (SPA) that allows users to search for books using the Open Library Search API. The application displays search results in a readable card format and allows users to add books to a wishlist. The wishlist can be viewed on a separate page and exported to a spreadsheet.

 Features
-----------

| Feature                         | Description                                                                         |
|---------------------------------|-------------------------------------------------------------------------------------|
| ✔️ Vue 2                        | Built using Vue 2 for a reactive and modular user interface.                         |
| ✔️ Vuetify                      | Utilizes Vuetify for modern and responsive UI components.                            |
| ✔️ Open Library Search API      | Integrates with Open Library to fetch book data.                                     |
| ✔️ Wishlist Management          | Add books to a wishlist and view them on a separate page.                            |
| ✔️ Advanced Filters             | Use advanced filters such as author, title, ISBN, publisher, and subject to refine search results. |
| ✔️ Caching                      | Implements caching for API requests to improve performance.                          |
| ✔️ Export to Spreadsheet        | Export the current wishlist to a spreadsheet.                                        |
| ✔️ Local Storage                | Uses IndexedDB for storing search results and wishlist data.                         |


Project Structure
<pre>
src
│   App.vue
│   main.js
│
├───assets
│       logo.png
│
├───components
│       BookCard.vue
│       BookDetails.vue
│
├───Pages
│       SearchPage.vue
│       WishlistPage.vue
│       BookDetailsPage.vue
│
├───plugins
│       vuetify.js
│
├───router
│       index.js
│
├───services
│       api.js
│
├───store
│       index.js
│
└───utils
        export.js
        storage.js
</pre>

Getting Started
---------------

### Prerequisites

Node.js and npm/yarn installed on your machine.

### Installation

1.  Clone the repository:

        git clone https://github.com/your-username/book-search-app.git
        cd book-search-app

2.  Install dependencies:

        npm install
        # or
        yarn install

3.  Run the development server:

        npm run serve
        # or
        yarn serve

4.  Open your browser and navigate to [http://localhost:8080](http://localhost:8080).

Usage
-----

### Search Books

1.  Enter a search query in the search bar.
2.  Optionally, click on "Advanced Filters" to refine your search by author, title, ISBN, publisher, and subject.
3.  Click "Search" to fetch results from the Open Library API.

### Add to Wishlist

1.  Click the "Add to Wishlist" button on a book card to add it to your wishlist.
2.  Navigate to the "Wishlist" page to view your saved books.

### View Book Details

1.  Click the "Details" button on a book card to view detailed information about the book.

### Export Wishlist

1.  Navigate to the "Wishlist" page.
2.  Click the "Export" button to download your wishlist as a spreadsheet.

Project Configuration
---------------------

### Vuetify

Vuetify is used for the UI components. Configuration can be found in `src/plugins/vuetify.js`.

### Vuex

Vuex is used for state management. The store is defined in `src/store/index.js`.

### Router

Vue Router is used for navigation. Routes are defined in `src/router/index.js`.

### IndexedDB

IndexedDB is used for caching search results and storing the wishlist. The storage utility is defined in `src/utils/storage.js`.

Contributing
------------

Contributions are welcome! Please open an issue or submit a pull request for any changes or additions.

License
-------

This project is licensed under the MIT License.

* * *

**Contact:**  
For any questions or suggestions, please contact [your-email@example.com](mailto:your-email@example.com).