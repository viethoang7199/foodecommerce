import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.18:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;