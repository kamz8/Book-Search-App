import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        searchResults: [],
        wishlist: [],
        loading: false,
        error: null,
        selectedBook: null
    },
    mutations: {
        setSearchResults(state, results) {
            state.searchResults = results
        },
        setWishlist(state, wishlist) {
            state.wishlist = wishlist
        },
        addToWishlist(state, book) {
            if (!state.wishlist.some(item => item.key === book.key)) {
                state.wishlist.push(book)
            }
        },
        removeFromWishlist(state, book) {
            state.wishlist = state.wishlist.filter(item => item.key !== book.key)
        },
        setLoading(state, isLoading) {
            state.loading = isLoading
        },
        setError(state, error) {
            state.error = error
        },
        setSelectedBook(state, book) {
            state.selectedBook = book
        }
    },
    actions: {
        async searchBooks({ commit }, searchParams) {
            commit('setLoading', true)
            commit('setError', null)
            try {
                const queryParams = [];
                if (searchParams.query) queryParams.push(`q=${encodeURIComponent(searchParams.query)}`);
                if (searchParams.author) queryParams.push(`author=${encodeURIComponent(searchParams.author)}`);
                if (searchParams.title) queryParams.push(`title=${encodeURIComponent(searchParams.title)}`);
                if (searchParams.isbn) queryParams.push(`isbn=${encodeURIComponent(searchParams.isbn)}`);
                if (searchParams.publisher) queryParams.push(`publisher=${encodeURIComponent(searchParams.publisher)}`);
                if (searchParams.subject) queryParams.push(`subject=${encodeURIComponent(searchParams.subject)}`);

                const queryString = queryParams.join('&');
                const results = await storage.getSearchResults(queryString);
                if (results) {
                    commit('setSearchResults', results)
                } else {
                    const response = await fetch(`https://openlibrary.org/search.json?${queryString}`);
                    const data = await response.json();
                    commit('setSearchResults', data.docs);
                    await storage.saveSearchResults(queryString, data.docs);
                }
            } catch (error) {
                commit('setError', 'An error occurred while searching for books.');
                console.error(error);
            } finally {
                commit('setLoading', false)
            }
        },
        async initializeWishlist({ commit }) {
            const wishlist = await storage.getWishlist()
            commit('setWishlist', wishlist || [])
        },
        async addToWishlist({ commit, state }, book) {
            commit('addToWishlist', book)
            await storage.saveWishlist(state.wishlist)
        },
        async removeFromWishlist({ commit, state }, book) {
            commit('removeFromWishlist', book)
            await storage.saveWishlist(state.wishlist)
        },
        setSelectedBook({ commit }, book) {
            commit('setSelectedBook', book)
        }
    },
    getters: {
        getBookByKey: (state) => (key) => {
            return state.searchResults.find(book => book.key === key) ||
                state.wishlist.find(book => book.key === key)
        },
        selectedBook: state => state.selectedBook
    }
})
