import axios from 'axios';

const baseUrl = "https://localhost:44373/api";

function get(params) {


    axios.get(params.url)
        .then(response => {
            params.callback && params.callback(response);
        })
        .then(response => {
            params.callback2 && params.callback2(response);
        })
}

function post(params) {
    axios.post(params.url, params.payload)
        .then(response => {
            params.callback && params.callback(response);
        })
}

export { baseUrl, get, post };
