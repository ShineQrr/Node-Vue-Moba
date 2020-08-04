import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 全局给http请求加个拦截器,这样就不用在每个页面都判断
http.interceptors.response.use(res => {
    // Do something with request error
    return res
}, err => {
    // Do something with response error
    if (err.response.data.message) {
        Vue.prototype.$message.error(err.response.data.message)
    }
    return Promise.reject(err)
})

export default http