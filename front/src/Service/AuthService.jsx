import decode from 'jwt-decode';
import { endpoint } from '../Constants';

export default class AuthService {
    login(props) {
        // Get a token from api server using the fetch api
        return fetch(`${endpoint}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(props),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.auth === false) {
                    return Promise.reject(res.message);
                }
                this.setToken(res.token); // Setting the token in localStorage
                return Promise.resolve(res);
            });
    }

    register(props) {
        return fetch(`${endpoint}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(props),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.auth === false) {
                    return Promise.reject(res.message);
                }
                return Promise.resolve(res);
            });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                // Checking if token is expired. N
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('DCS_TOKEN', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('DCS_TOKEN');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('DCS_TOKEN');
    }

    getRole() {
        return decode(this.getToken()).role;
    }
}
