const express = require('express')
const Vue = require('vue')

const app = express()
const renderer = require('vue-server-renderer').createRenderer()

const page = new Vue({
    template: '<div>456</div>'
})

app.get('/', async (req, res) => {
    try {
        const html = await renderer.renderToString(page)
        console.log(html)
        res.send(html)
    } catch (error) {
        res.status(500).send('服务器错误：' + error)
    }
})
let port = 3001
app.listen(port, () => {
    console.log(`在${port},启动成功`);
})