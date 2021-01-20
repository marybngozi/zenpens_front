import axios from 'axios';
import store from '../store'

export default function setup() {
    axios.interceptors.request.use(function(config) {
        const token = store.getters.token;
        if(token) {
            config.headers['x-access-token'] = token;
            config.headers['usertype'] = store.getters.usertype;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}