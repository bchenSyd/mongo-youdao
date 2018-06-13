import fetch from 'node-fetch';

function fetchApi(url, body = null, method = 'GET') {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            headers,
            body,
        }).then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

export default fetchApi;

