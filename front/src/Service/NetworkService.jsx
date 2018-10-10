import AuthService from './AuthService';
import { endpoint } from '../Constants';

const Auth = new AuthService();

export function fetchApi(url, options) {
    // TODO: Some checks

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Auth.getToken()
    };

    return fetch(`${endpoint}/${url}`, {
        headers,
        ...options
    })
        .then(res => res.json())
        .then(res => {
            if (res.success !== true) {
                // Handle success false
                return Promise.reject(res.message);
            }
            return Promise.resolve(res);
        })
        .catch(err => {
            return Promise.reject('Fetching error: ' + err);
        });
}
