module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    // mergeParams: true 从父路由导入params对象（父路由是app）,允许在中间件获取到req.params,则可以获取:resource

    // const Category = require('../../models/Category')

    // 新建分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 编辑分类，需要在路径中携带id
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取分类列表
    router.get('/', async (req, res) => {
        // 找到10条数据
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 查找某条数据
    router.get('/:id', async (req, res) => {
        // 根据id找到分类名称
        const item = await req.Model.findById(req.params.id)
        res.send(item)
    })

    // 删除某条分类数据
    router.delete('/:id', async (req, res) => {
        // 根据id找到分类名称
        const item = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        // 给请求对象上挂载一个Model,根据请求路径中的resource，转成大写类，去models文件夹下找对应的类
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)


    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        // 接收到的文件在res.file,本身在express中没有res.file，是因为用了multer这个中间件
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 登录接口 login 请求方法用post
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        //  1、根据用户名找用户
        const AdminUser = require('../../models/AdminUser')
        // select('+password') 表示查的时候把password这个字段取出来
        const user = await AdminUser.findOne({ username: username }).select('+password')
        // 如果用户存在，则进行下一步校验；如果用户不存在，则抛出异常
        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }

        // 2、校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            // 422表示客户端提交的数据有问题
            return res.status(422).send({
                message: '密码错误'
            })
        }

        // 3、返回token
        const jwt = require('jsonwebtoken')
        // 这里的app.get 通过传参来和请求区别，只有一个参数就是获取全局的变量
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
}