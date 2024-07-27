// src/utils/storage.js
import Dexie from 'dexie';

// Inicjalizacja IndexedDB
const db = new Dexie('BookSearchApp');
db.version(1).stores({
    searchResults: '++id, query',
    wishlist: '++id, key'
});

export const storage = {
    // Metody dla localStorage
    setLocalItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getLocalItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },

    removeLocalItem(key) {
        localStorage.removeItem(key);
    },

    // Metody dla IndexedDB
    async saveSearchResults(query, results) {
        await db.searchResults.put({ query, results, timestamp: Date.now() });
    },

    async getSearchResults(query) {
        const result = await db.searchResults
            .where('query')
            .equals(query)
            .and(item => Date.now() - item.timestamp < 24 * 60 * 60 * 1000) // 24 godziny
            .first();
        return result ? result.results : null;
    },

    async saveWishlist(wishlist) {
        await db.wishlist.clear();
        await db.wishlist.bulkAdd(wishlist.map(book => ({ key: book.key, data: book })));
    },

    async getWishlist() {
        const wishlist = await db.wishlist.toArray();
        return wishlist.map(item => item.data);
    },
    async getBookById(id) {
        const searchResults = await this.getSearchResults('all');
        if (searchResults) {
            const book = searchResults.find(book => book.key === id);
            if (book) return book;
        }
        const wishlist = await this.getWishlist();
        if (wishlist) {
            return wishlist.find(book => book.key === id);
        }
        return null;
    }
};