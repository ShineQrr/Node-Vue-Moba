const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // ref表示关联哪个模型
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)