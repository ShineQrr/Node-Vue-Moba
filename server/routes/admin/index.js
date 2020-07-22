module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')

    // 新建分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    // 编辑分类，需要在路径中携带id
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取分类列表
    router.get('/categories', async (req, res) => {
        // 找到10条数据
        const items = await Category.find().limit(10)
        res.send(items)
    })

    // 查找某条数据
    router.get('/categories/edit/:id', async (req, res) => {
        // 根据id找到分类名称
        const item = await Category.findById(req.params.id)
        res.send(item)
    })

    // 删除某条分类数据
    router.delete('/categories/:id', async (req, res) => {
        // 根据id找到分类名称
        const item = await Category.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/admin/api', router)
}