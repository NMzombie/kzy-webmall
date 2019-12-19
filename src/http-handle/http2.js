import Vue from 'vue';
// import store from '@/vuex/store'
// import Logger from '@/logger'
import { getApiUrl, } from '@/config-urls';

const post = function(path, body, env) {
    return new Promise((resolve, reject) => {
        let url = getApiUrl(path, env)

        // let needPerformance = !!(body && body.fe_performance);
        let startTime = new Date().getTime();
        //统计请求开始时间
        // if(needPerformance){
        //   delete body.fe_performance
        //   store.dispatch('ngmmPerformance/StartRequest', {
        //     httpOptions: {
        //       startTime,
        //       url: path
        //     }
        //   })
        // }

        Vue.http.post(url, body).then(response => {
            // 慢接口报警
            let endTime = new Date().getTime();
            let maxTime = 150;
            if (endTime - startTime > maxTime) {
                let obj = {
                    path: url,
                    info: body,
                    err: (endTime - startTime) + "ms > " + maxTime + "ms",
                }
                // Logger.warn(obj)
            }
            //统计请求返回时间
            // if(needPerformance){
            //   let dispatchData = {
            //     endTime
            //   };

            //   if(response.body && response.body.code != 10000){
            //     dispatchData.requestData = body;
            //     dispatchData.responseStatus = response.body.code;
            //     dispatchData.responseData = response.body;
            //   }
            // }

            try {
                resolve(response.body)
            } catch (e) {
                let obj = {
                    path: url,
                    info: body,
                    err: e.stack,
                }
                // Logger.error(obj)
            }
        }, response => {
            reject(response.body)
            // 接口错误处理
            if (response.body.status != 200) {
                // Logger.error(response.body)
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
