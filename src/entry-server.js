// const createApp = require('./app')
import createApp from "./app"


export default context => {
    console.log(888888, context);
    return new Promise((resolve, reject) => {
        const {
            app,
            router
        } = createApp()
        router.push(context.url)
        router.onReady(() => {
            resolve(app)
        }, reject)
    })
}