import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})


// 前端出现任何错误，都会走request响应拦截器
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// 全局给http请求加个拦截器,这样就不用在每个页面都判断
http.interceptors.response.use(res => {
    // Do something with request error
    return res
}, err => {
    // Do something with response error
    if (err.response.data.message) {
        Vue.prototype.$message.error(err.response.data.message)
    }
    if (err.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(err)
})

export default http