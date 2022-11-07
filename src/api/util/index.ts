import axios from 'axios';
let url = '';
// if (process.env.VUE_APP_COMMON_API === undefined) {
//     url = window.location.protocol + '//' + window.location.host;
// } else {
//     url = window.location.protocol + '//' + window.location.hostname + process.env.VUE_APP_COMMON_API
// }
export const api = axios.create({
    // baseURL: url
    baseURL: 'http://localhost:30483'
})
// export default api;