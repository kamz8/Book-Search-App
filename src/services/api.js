// src/services/api.js
import axios from 'axios';
import { storage } from '@/utils/storage';

const API_URL = 'https://openlibrary.org/search.json';

export async function searchBooks(params) {
    const cacheKey = JSON.stringify(params);
    const cachedResults = await storage.getSearchResults(cacheKey);

    if (cachedResults) {
        return cachedResults;
    }

    const response = await axios.get(API_URL, { params });
    const results = response.data.docs;

    await storage.saveSearchResults(cacheKey, results);
    return results;
}