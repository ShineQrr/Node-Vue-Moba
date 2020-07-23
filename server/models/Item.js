const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 图片都是把信息保存到一个地址，最终获取这个地址
    icon: { type: String }

})

module.exports = mongoose.model('Item', schema)