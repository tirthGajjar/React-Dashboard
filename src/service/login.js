import Request from 'axios';
const baseUrl = "http://localhost:4000";

function makeRequest(method, api = 'login', data) {
    return Request[method](baseUrl + api, data)
        .then(r => r);
};

export const login = function(data){
    console.log('data:' , data);
    return new Promise((resolve, reject) => {
        console.log(data);
        makeRequest('post', '/post', data).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })

};