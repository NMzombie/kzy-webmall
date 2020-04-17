import Vue from 'vue';
import { getApiUrl, } from '@/config-urls';

const post = function(path, body, env) {
    return new Promise((resolve, reject) => {
        let url = getApiUrl(path, env)

        let startTime = new Date().getTime();

        Vue.http.post(url, body).then(response => {
            try {
                resolve(response.body)
            } catch (e) {

            }
        }, response => {
            reject(response.body)
            if (response.body.status != 200) {

            }
        })
    });
}

export default {
    post,
}

export {
    post,
}
