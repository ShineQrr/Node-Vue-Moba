const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 图片都是把信息保存到一个地址，最终获取这个地址
    avatar: { type: String },
    title: { type: String },
    // 一个英雄可以关联多种角色 如法师、刺客, ref指定要关联的模型
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    // 技能是个数组，其中各个元素都是对象
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    // 装备：items1顺风出装，items2逆风出装。装备是关联的，只要是关联的，都是 mongoose.SchemaTypes.ObjectId
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 使用技巧
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 对抗技巧
    teamTips: { type: String },
    // 英雄关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema)