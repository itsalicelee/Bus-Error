import axios from 'axios';

const API_ROOT = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:4000/api/v1';

const instance = axios.create({
    baseURL: API_ROOT,
    timeout: 60000,
});

export default instance;
