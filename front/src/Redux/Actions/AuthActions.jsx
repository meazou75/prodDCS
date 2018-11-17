import { fetchApi } from '../../Service/NetworkService';

export const feedUserMeta = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetchApi('auth/me')
                .then(res => {
                    dispatch({
                        type: 'FEED_USER_META',
                        payload: res.user
                    });
                    return resolve(res.user);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    };
};
