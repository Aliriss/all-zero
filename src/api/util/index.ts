import axios from 'axios';
export const api = axios.create({
    baseURL: import.meta.env.VITE_COMMON_API
    // baseURL: 'http://localhost:30483'
})
// export default api;
