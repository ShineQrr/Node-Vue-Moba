module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        // 给请求对象上挂载一个Model,根据请求路径中的resource，转成大写类，去models文件夹下找对应的类
        req.Model = require(`../models/${modelName}`)
        next()
    }
}