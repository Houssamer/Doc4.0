import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/backend/api',
});

export default instance;