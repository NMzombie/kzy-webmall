const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const isProd = process.env.NODE_ENV === 'production'

const { VUE_APP_MAIN_HOSTNAME: main_hostname = 'ngmm365.com' } = process.env

// cdn开关
const OPENCDN = false
const webpackHtmlOptions = {
    dnsPrefetch: [
        `https://tradeapi.${main_hostname}`,
        `https://accountapi.${main_hostname}`,
        `https://goodsapi.${main_hostname}`,
        `https://payapi.${main_hostname}`,
        `https://lgscapi.${main_hostname}`,
        `https://dataapi.${main_hostname}`,
        `https://cartapi.${main_hostname}`,
        `https://contentapi.${main_hostname}`,
        `https://cardapi.${main_hostname}`,
        `https://protectapi.${main_hostname}`,
        `https://accountapi.${main_hostname}`,
        `https://buyershowapi.${main_hostname}`,
        `https://contentapi.${main_hostname}`,
        `https://contentapi.${main_hostname}`,
        `https://knowledgeapi.${main_hostname}`,
        `https://cardapi.${main_hostname}`,
        `https://contentapi.${main_hostname}`,
        `https://learningapi.${main_hostname}`,
    ],
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'js-cookie': 'Cookies'
    },
    cdn: {
    // 生产环境
        build: {
            css: [
                'https://cdn.jsdelivr.net/npm/vant@1.5/lib/index.css'
            ],
            js: [
                'https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js',
                'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
                'https://unpkg.com/vuex@3.0.1/dist/vuex.min.js',
                'https://cdn.jsdelivr.net/npm/vant@1.5/lib/vant.min.js',
                'https://cdn.jsdelivr.net/npm/js-cookie@2.1.3/src/js.cookie.min.js'
            ]
        }
    }
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave:false,
    devServer: {
        open: false,
        host: 'localhost',
        port: 3200,
        after (app) {
            // app.use(bodyParser.urlencoded({ extended: false }))
            // app.use(bodyParser.json())
            // app.use(kvApi({
            //   dataWrap (data) {
            //     return {
            //       code: 10000,
            //       data: data
            //     }
            //   }
            // }))
            app.all('/api/login_cell', (req, res, next) => {
                const server = require('./server/account')
                server(res)
            })
        },
    },
    configureWebpack: config => {
        config.resolve.extensions = ['.js', '.vue', '.json']
        if (isProd) {
            if (OPENCDN) {
                config.externals = webpackHtmlOptions.externals
            }
        }
    },
    chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     */
        config.plugins
            .delete('prefetch')
            .delete('preload')
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('http-handle', resolve("src/http-handle"))
            .set('static', resolve('public/static'))
            .set('@', resolve('src'))
        // 清除警告
        config.performance
            .set('hints', false)
        // config
        //   .plugin('define')
        //   .tap(args => {
        //     args[0]['app_build_version'] = lastVersion
        //     return args
        //   })
        /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 修改 public/index.html
     */
        config.plugin('html').tap(args => {
            if (isProd && OPENCDN) {
                args[0].cdn = webpackHtmlOptions.cdn.build
            }
            args[0].dnsPrefetch = webpackHtmlOptions.dnsPrefetch
            args[0].main_hostname = main_hostname

            return args
        })
    },
    css: {
        loaderOptions: {
            // pass Less.js Options to less-loader
            less: {
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    staticimg_origin: `"https://staticimg.${main_hostname}"`
                }
            }
        }
    }
}
