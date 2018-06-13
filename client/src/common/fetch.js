import 'whatwg-fetch';

export default function callApi(endpoint, method = 'get', body = null) {
    const options = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : body,
    };

    return fetch(endpoint, { ...options })
        .then(response => {
            return response.json().then(json => ({ json, response }));
        })
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return Promise.resolve(json);
        })
        .catch(err => Promise.reject(err));
}
