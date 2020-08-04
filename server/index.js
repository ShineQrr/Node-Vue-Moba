const express = require('express');

const app = express()

// app.set表示在当前这个express实例上设置一个变量
app.set('secret', 'asdfghjkl')

app.use(require('cors')())
// 使用express.json()中间件才能获取post的req.body
app.use(express.json())

// 静态托管。uploads这个文件夹下的文件都是静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})
