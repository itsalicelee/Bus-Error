import axios from 'axios';

const API_ROOT = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001';

const instance = axios.create({
    baseURL: API_ROOT,
});

export default instance;
