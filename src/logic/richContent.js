import Config from '@/config-urls.js'
export default {
    data () {
        return {
            richContent: ''
        }
    },
    methods: {
        loadRichContent (id, frontCover) {
            let url = this.get_detail_api_url(id)
            if (!url) return
            this.$http.get(url).then(res => {
                if (res.status == 200) {
                    // res.body就是获取到html文档内容

                    // 优化商品详情图片加载
                    // let detail = this.transform({
                    //     data: res.body,
                    //     poster: frontCover
                    // })
                    let detail = res.data
                    this.richContent = detail
                    this.$nextTick(() => {
                        const imgArr = document.getElementsByClassName('lazyLoadImg')
                        for (let i = 0; i < imgArr.length; i++) {
                            const element = imgArr[i]
                            element.style.display = 'block'
                        }
                    })
                    this.lazyLoad()
                } else {
                    console.error('获取文档出错')
                }
            })
        },
        get_detail_api_url (id) {
            if (!id || /^http/.test(id)) {
                return id
            }

            if (/^gd_/.test(id)) {
                if (Config.staticimg_url) return Config.staticimg_url + id
                return ''
            }
            if (Config.knowledge_detail_html_base_url) return `${Config.knowledge_detail_html_base_url}${id}?${new Date().getTime()}`
            return ''
        }
    }
}
