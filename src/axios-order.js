import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dev-burger-builder.firebaseio.com/'
});

export default instance;