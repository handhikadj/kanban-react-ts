import axios from 'axios';

export default axios.create({
    baseURL: 'https://todo-api-18-140-52-65.rakamin.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + import.meta.env.VITE_API_TOKEN
    }
})