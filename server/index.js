const express = require('express');

const app = express()

app.use(require('cors')())
// 使用express.json()中间件才能获取post的req.body
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})
