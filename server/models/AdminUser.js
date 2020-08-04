const mongoose = require('mongoose')

// 管理员暂时需要用户名和密码两个字段
const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,
        // val为用户填写的值
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)