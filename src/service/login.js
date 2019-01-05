import Request from 'axios';
const baseUrl = "http://localhost:4000/api";

function makeRequest(method, api = 'login', data) {
    return Request[method](baseUrl + api, data)
        .then(r => r);
};

export const login = function(){
    let data = {
        userName: 'Parag',
        email: 'parag99799@gmail.com',
        password: 'password',
    };
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