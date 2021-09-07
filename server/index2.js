const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')


const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, '../public/index.temp.html'), 'utf-8'),
    clientManifest
})

// // 中间件处理静态文件请求
app.use(express.static('../dist/client', {
    index: false
}))

// 路由处理交给vue
app.get('*', async (req, res) => {
    try {
        const context = {
            url: req.url,
        }
        const html = await renderer.renderToString(context)
        // console.log(html)
        res.send(html)
    } catch (error) {
        console.error(error);
        res.status(500).send('服务器错误：' + error)
    }
})

app.listen(3000, () => {
    console.log('启动成功');
})