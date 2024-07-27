// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import { storage } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        wishlist: []
    },
    mutations: {
        setWishlist(state, wishlist) {
            state.wishlist = wishlist;
        },
        addToWishlist(state, book) {
            if (!state.wishlist.some(item => item.key === book.key)) {
                state.wishlist.push(book);
                storage.saveWishlist(state.wishlist);
            }
        },
        removeFromWishlist(state, book) {
            state.wishlist = state.wishlist.filter(item => item.key !== book.key);
            storage.saveWishlist(state.wishlist);
        }
    },
    actions: {
        async initializeWishlist({ commit }) {
            const wishlist = await storage.getWishlist();
            commit('setWishlist', wishlist || []);
        }
    }
});