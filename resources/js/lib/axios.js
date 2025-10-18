import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';

axios.defaults.withCredentials = true;

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common["Authorization"] - `Bearer ${token}`;
}

export default axios;