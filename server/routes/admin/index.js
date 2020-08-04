module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    })
    // mergeParams: true 从父路由导入params对象（父路由是app）,允许在中间件获取到req.params,则可以获取:resource

    // const Category = require('../../models/Category')

    // 创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新资源，需要在路径中携带id
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取资源列表
    router.get('/', async (req, res) => {
        // 找到10条数据
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 查找某条资源详情
    router.get('/:id', async (req, res) => {
        // 根据id找到分类名称
        const item = await req.Model.findById(req.params.id)
        res.send(item)
    })

    // 删除资源
    router.delete('/:id', async (req, res) => {
        // 根据id找到分类名称
        const item = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // auth表示一个登录校验的中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        // 接收到的文件在res.file,本身在express中没有res.file，是因为用了multer这个中间件
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 登录接口 login 请求方法用post
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        //  1、根据用户名找用户
        // select('+password') 表示查的时候把password这个字段取出来
        const user = await AdminUser.findOne({ username: username }).select('+password')
        // 如果用户存在，则进行下一步校验；如果用户不存在，则抛出异常
        assert(user, 422, '用户不存在')

        // 2、校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 3、返回token
        // 这里的app.get 通过传参来和请求区别，只有一个参数就是获取全局的变量
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理函数 也是一个中间件，4个参数，表示错误处理
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}