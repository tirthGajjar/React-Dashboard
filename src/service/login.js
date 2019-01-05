import Request from 'axios';
const baseUrl = "http://localhost:4000";

function makeRequest (method, api = 'login', data) {
    return Request[method](baseUrl + api, data)
        .then(r => r);
};

export const login = function (user_name, user_pwd) {
    console.log('data:', user_name);
    console.log('data:', user_pwd);
    return new Promise((resolve, reject) => {
        console.log(data);
        makeRequest('post', '/post', data).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    });
};