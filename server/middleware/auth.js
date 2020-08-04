module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')


    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        // assert(token, 401, '请提供jwt token')
        assert(token, 401, '请先登录')

        // 获得的tokenData为{ id: '5f28b6988aee59999c726ba4', iat: 1596516391 }类型数据，通过id就可以找到对应的用户
        const { id } = jwt.verify(token, req.app.get('secret'))
        // assert(id, 401, '无效的jwt token')
        assert(id, 401, '请先登录')

        // 通过id查询是否真的存在这个用户
        // 如果希望user在后续过程中也能用，就挂载到req对象上。表示在请求的时候是哪个用户
        // 因为只有req、res是可以在后续请求中使用的
        req.user = await AdminUser.findById(id)
        // 当req.user不存在，报错401 
        assert(req.user, 401, '请先登录')
        await next()
    }
}