// 主域名 和 被取代的主域名
// const { VUE_APP_MAIN_HOSTNAME: main_hostname, VUE_APP_REPLACED_MAIN_HOSTNAME: replaced_main_hostname } = process.env;
const main_hostname = 'ngmm001.com'
const replaced_main_hostname = 'ngmm365.com'
// 新细胞主环境新域名
const cell_main_hostname = 'nicoschool001.com'

const map = {
    //公共配置
    base: {
        // api接口路径
        api_url_map: {
            '/login_session/': ['http://10.86.10.254:9100/api'],
            '/nodewebapi/': ['http://10.86.10.254:9300'],
            '/education/': ['http://knowledgeapi.ngmm001.com'],
        },

        file_upload_origin:`https://nodewebapi.${main_hostname}`,

        staticimg_hostname:`staticimg.ngmm365.com`,
        staticimg_origin:`https://staticimg.ngmm365.com`,
        staticimg_url:`https://staticimg.ngmm365.com/`,

        // 商品详情html文档的base url
        goods_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/",
        award_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/award/",
        // 帖子详情html文档的base url
        posts_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/content/",
        // posts_detail_html_base_url: `https://staticimg.${main_hostname}/`,
        //付费内容文档内容
        knowledge_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/knowledge/",
        //早教内容文档内容
        zaojiao_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/earlylearning/",
        default_base_url: "http://10.86.10.254:9300/api",
        //引导下载页面url
        go_download_page_url: "http://m.ngmm001.com/page/165",
        // 笔记预览页面请求地址
        posts_detail_preview_html_base_url: "http://adminapi.ngmm001.com/content/community/post/admin/detail",

        //图片跨域处理路径
        proxy_img_base_url: `https://sticker.${main_hostname}/proxy/image`,

        logReportUrl: `https://tj.${main_hostname}/s.gif`,

        mathbox_origin: "http://mathbox.ngmm001.com",

        early_origin: "http://early.ngmm001.com",

        shence_origin: `https://shence.ngmm365.com`,
        //数学盒子首页
        mathbox_index: "http://m.ngmm001.com/mathbox/index",
        // 分销中心首页
        distribution_index: 'http://distribution.ngmm001.com/distribution/index',
        // 分销中心去答题
        distribution_learn: 'http://distribution.ngmm001.com/distribution/learn/index',
        // 分销中心成功页面
        distribution_success: 'http://distribution.ngmm001.com/distribution/learn/success',
        // 分销中转地址
        distribution_router: 'http://distribution.ngmm001.com/distribution/router/index',
        // 分销入口
        distribution_entrance: 'http://m.ngmm001.com/distribution',
        //数学游戏
        mathgame_origin: "http://webgame.ngmm001.com",
        // 早教改版游戏
        earlygame_origin: "http://early.ngmm001.com",
        // 新细胞
        cell_origin: 'http://cell.ngmm001.com',
        solidfoods: `https://knowledgeapi.${main_hostname}`//辅食

    },


    //线上环境配置
    pro: {
        //每个模块对应的base_url
        api_url_map: {
            '/pullnew': [`https://distapi.${main_hostname}`],
            '/fiss': [`https://distapi.${main_hostname}`],
            '/short/getTargetUrl': [`https://distapi.${main_hostname}`],
            '/short/generateWithoutHttp': [`https://distapi.${main_hostname}`],
            '/resource/location/search': [`https://cardapi.${main_hostname}`],
            '/nodewebapi/': [`https://nodewebapi.${main_hostname}`],

            '/rebate': [`https://memberapi.${main_hostname}`],
            '/integral/coupon': [`https://cardapi.${main_hostname}`],
            '/integral/award': [`https://goodsapi.${main_hostname}`],
            '/trade/': [`https://tradeapi.${main_hostname}`], //订单模块
            '/account/': [`https://accountapi.${main_hostname}`], //app账户模块
            '/goods/': [`https://goodsapi.${main_hostname}`], //商品模块
            '/integral/': [`https://goodsapi.${main_hostname}`], //奖品模块
            '/pay/': [`https://payapi.${main_hostname}`], //支付模块
            '/logistics/': [`https://lgscapi.${main_hostname}`], //物流模块
            '/data/': [`https://dataapi.${main_hostname}`], //数据统计模块
            '/cart/': [`https://cartapi.${main_hostname}`], //购物车模块
            '/content/': [`https://contentapi.${main_hostname}`], //内容模块
            '/mall/': [`https://cardapi.${main_hostname}`], //优惠券
            '/protect/': [`https://protectapi.${main_hostname}`], //维权
            '/pickuporder/':[`https://protectapi.${main_hostname}`],//逆向揽件
            '/internalAccount/': [`https://accountapi.${main_hostname}`], //内部员工信息录入
            '/buyershow/': [`https://buyershowapi.${main_hostname}`], //买家秀
            '/addRateInfoNew/': [`https://buyershowapi.${main_hostname}`], //积分买家秀
            '/personalCenter/': [`https://contentapi.${main_hostname}`], //App用户中心
            '/follower/': [`https://contentapi.${main_hostname}`], //App关注用户
            '/knowledge/': [`https://knowledgeapi.${main_hostname}`], //付费内容
            '/solidfoods/': [`https://knowledgeapi.${main_hostname}`], //辅食
            '/card/': [`https://cardapi.${main_hostname}`], //裂变活动
            '/flashsale/': [`https://cardapi.${main_hostname}`], //限时闪购
            '/message/': [`https://contentapi.${main_hostname}`], //消息
            '/earlylearning/': [`https://learningapi.${main_hostname}`], //早教
            '/evaluation/': [`https://learningapi.${main_hostname}`], //测评
            '/search/': [`https://searchapi.${main_hostname}`], //搜索模块
            '/education/': [`https://knowledgeapi.${main_hostname}`], //数学盒子
            '/shoppingcart/': [`https://cartapi.${main_hostname}`], //凑单购物车模块
            '/dist/': [`https://distapi.${main_hostname}`], //分销
            '/algo/': [`https://goodsapi.${main_hostname}`], //算法推荐
            '/groupbuyv2/': [`https://goodsapi.${main_hostname}`], //算法推荐
            '/credit/': [`https://score.${main_hostname}`], // 积分
            '/sign/': [`https://score.${main_hostname}`], // 签到
            '/member': [`https://memberapi.${main_hostname}`], //会员
            '/pwdCoupon/': [`https://cardapi.${main_hostname}`],// 口令红包
            '/live': [`https://liveapi.${main_hostname}`] ,// 直播
            '/cell': [`https://knowledgeapi.${main_hostname}`], //
            '/short': [`https://s.${main_hostname}`], // 生成短链
            '/config': [`https://accountapi.${main_hostname}`], // 配置信息
            '/groupbuypopup/': [`https://cardapi.${main_hostname}`], // 拼团弹窗
        },
        staticimg_hostname:`staticimg.${main_hostname}`,
        staticimg_origin:`https://staticimg.${main_hostname}`,
        staticimg_url:`https://staticimg.${main_hostname}/`,

        // 商品详情html文档的base url
        goods_detail_html_base_url: `https://m.${main_hostname}/virtual-static/html/`,
        award_detail_html_base_url: `https://m.${main_hostname}/virtual-static/html/award/`,
        // 帖子详情html文档的base url
        posts_detail_html_base_url: `https://m.${main_hostname}/virtual-static/html/content/`,
        // posts_detail_html_base_url: `https://staticimg.${main_hostname}/`,
        //付费内容文档内容
        knowledge_detail_html_base_url: `https://m.${main_hostname}/virtual-static/html/knowledge/`,
        //早教内容文档内容
        zaojiao_detail_html_base_url: `https://m.${main_hostname}/virtual-static/html/earlylearning/`,
        //默认的base url，没有匹配上api_url_map则使用default_base_url
        default_base_url: `https://api.${main_hostname}/api`,
        //引导下载页面url
        go_download_page_url: `https://m.${main_hostname}/page/441`,
        // 笔记预览页面请求地址
        posts_detail_preview_html_base_url: `https://adminapi.${main_hostname}/content/community/post/admin/detail`,
        //图片跨域处理路径
        proxy_img_base_url: `https://sticker.${main_hostname}/proxy/image`,
        //学院首页最新地址
        go_app_college_index_url: `https://m.${main_hostname}/app_college_index`,

        mathbox_origin: `https://mathbox.${main_hostname}`,

        early_origin: `https://early.${main_hostname}`,

        shence_origin: `https://shence.${main_hostname}`,

        //数学盒子首页
        mathbox_index: `https://m.${main_hostname}/mathbox/index`,
        // 分销中心首页
        distribution_index: `https://distribution.${main_hostname}/distribution/index`,
        // 分销中心去答题
        distribution_learn: `https://distribution.${main_hostname}/distribution/learn/index`,
        // 分销中心成功页面
        distribution_success: `https://distribution.${main_hostname}/distribution/learn/success`,
        // 分销中转地址
        distribution_router: `https://distribution.${main_hostname}/distribution/router/index`,
        // 分销入口
        distribution_entrance: `https://m.${main_hostname}/distribution`,
        //数学游戏
        mathgame_origin: `https://webgame.${main_hostname}`,
        // 早教改版游戏
        earlygame_origin: `https://staticearly.${main_hostname}`,
        // 新细胞
        cell_origin: `https://cell.${cell_main_hostname}`,
        solidfoods:`https://knowledgeapi.${main_hostname}`//辅食

    },
    //预发环境（beta）
    beta: {
        //每个模块对应的base_url
        api_url_map: {
            '/pullnew': ['http://distapi.ngmm001.com'],
            '/fiss': ['http://distapi.ngmm001.com'],
            '/short/getTargetUrl': ['http://distapi.ngmm001.com'],
            '/short/generateWithoutHttp': ['http://distapi.ngmm001.com'],
            '/resource/location/search': ['http://cardapi.ngmm001.com'],
            '/login_session': ['http://10.86.10.254:9100/api'],
            '/nodewebapi/': ['http://10.86.10.254:9300'],

            '/member': ['http://memberapi.ngmm001.com'],
            '/rebate': ['http://memberapi.ngmm001.com'],
            '/integral/coupon': ['http://cardapi.ngmm001.com'],
            '/integral/award': ['http://goodsapi.ngmm001.com'],
            '/trade/': ['http://tradeapi.ngmm001.com'], //订单模块
            '/account/': ['http://accountapi.ngmm001.com'], //app账户模块
            '/goods/': ['http://goodsapi.ngmm001.com'], //商品模块
            '/integral/': ['http://goodsapi.ngmm001.com'], //奖品模块
            '/pay/': ['http://payapi.ngmm001.com'], //支付模块
            '/logistics/': ['http://lgscapi.ngmm001.com'], //物流模块
            '/data/': ['http://dataapi.ngmm001.com'], //数据统计模块
            '/cart/': ['http://cartapi.ngmm001.com'], //购物车模块
            '/content/': ['http://contentapi.ngmm001.com'], //内容模块
            '/mall/': ['http://cardapi.ngmm001.com'], //优惠券
            '/protect/': ['http://protectapi.ngmm001.com'], //维权
            '/pickuporder/':['http://protectapi.ngmm001.com'],//逆向揽件
            '/internalAccount/': ['http://accountapi.ngmm001.com'], //内部员工信息录入
            '/buyershow/': ['http://buyershowapi.ngmm001.com'], //买家秀
            '/addRateInfoNew/': ['http://buyershowapi.ngmm001.com'], //积分买家秀
            '/personalCenter/': ['http://contentapi.ngmm001.com'], //App用户中心
            '/follower/': ['http://contentapi.ngmm001.com'], //App关注用户
            '/knowledge/': ['http://knowledgeapi.ngmm001.com'], //付费内容
            '/solidfoods/': ['http://knowledgeapi.ngmm001.com'], //辅食
            '/card/': ['http://cardapi.ngmm001.com'], //裂变活动
            '/flashsale/': ['http://cardapi.ngmm001.com'], //限时闪购
            '/message/': ['http://contentapi.ngmm001.com'], //消息
            '/earlylearning/': ['http://learningapi.ngmm001.com'], //早教
            '/evaluation/': ['http://learningapi.ngmm001.com'], //测评
            '/search/': ['http://searchapi.ngmm001.com'], //搜索模块
            '/education/': ['http://knowledgeapi.ngmm001.com'], //数学盒子
            '/shoppingcart/': ['http://cartapi.ngmm001.com'], //凑单购物车模块
            '/dist/': ['http://distapi.ngmm001.com'], //分销
            '/algo/': ['http://goodsapi.ngmm001.com'], //算法推荐
            '/groupbuyv2/': ['http://goodsapi.ngmm001.com'], //算法推荐
            '/credit/': ['http://score.ngmm001.com'], // 积分
            '/sign/': ['http://score.ngmm001.com'], // 签到
            '/member/': ['http://memberapi.ngmm001.com'], // 会员
            '/pwdCoupon/': ['http://cardapi.ngmm001.com'],// 口令红包
            '/live': ['http://liveapi.ngmm001.com'], // 直播
            '/cell': ['http://knowledgeapi.ngmm001.com'], //
            '/short': ['http://s.ngmm001.com'], // 生成短链
            '/config': ['http://accountapi.ngmm001.com'], // 配置信息
            '/solidfoods':['http://knowledgeapi.ngmm001.com'],//辅食
            '/groupbuypopup/': ['http://cardapi.ngmm001.com'], // 拼团弹窗
        },
        // 商品详情html文档的base url
        goods_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/",
        award_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/award/",
        // 帖子详情html文档的base url
        posts_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/content/",
        // posts_detail_html_base_url: `https://staticimg.${main_hostname}/`,
        //付费内容文档内容
        knowledge_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/knowledge/",
        //早教内容文档内容
        zaojiao_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/earlylearning/",
        //默认的base url，没有匹配上api_url_map则使用default_base_url
        default_base_url: "http://api.ngmm001.com/api",
        //引导下载页面url
        go_download_page_url: "http://m.ngmm001.com/page/165",
        // 笔记预览页面请求地址
        posts_detail_preview_html_base_url: "http://adminapi.ngmm001.com/content/community/post/admin/detail",
        //图片跨域处理路径
        proxy_img_base_url: `https://sticker.${main_hostname}/proxy/image`,
        //学院首页最新地址
        go_app_college_index_url: 'http://m.ngmm001.com/app_college_index',

        mathbox_origin: "http://mathbox.ngmm001.com",
        //数学盒子首页
        mathbox_index: "http://m.ngmm001.com/mathbox/index",
        // 分销中心首页
        distribution_index: 'http://distribution.ngmm001.com/distribution/index',
        // 分销中心去答题
        distribution_learn: 'http://distribution.ngmm001.com/distribution/learn/index',
        // 分销中心成功页面
        distribution_success: 'http://distribution.ngmm001.com/distribution/learn/success',
        // 分销中转地址
        distribution_router: 'http://distribution.ngmm001.com/distribution/router/index',
        // 分销入口
        distribution_entrance: 'http://m.ngmm001.com/distribution',
        //数学游戏
        mathgame_origin: "http://webgame.ngmm001.com",
        // 新细胞
        cell_origin: 'http://cell.ngmm001.com',
        solidfoods:'http://knowledgeapi.ngmm001.com'//辅食
    },
    // 测试环境
    betadev: {
        api_url_map: {
            '/resource/location/search': ['http://carddevapi.ngmm001.com'],
            '/login_session/': ['http://10.86.10.254:9100/api'],
            '/nodewebapi/': ['http://10.86.10.254:9300'],

            '/rebate': ['http://memberdevapi.ngmm001.com'],
            '/trade/': ['http://tradedevapi.ngmm001.com'], //订单模块
            '/account/': ['http://accountdevapi.ngmm001.com'], //app账户模块
            '/goods/': ['http://goodsdevapi.ngmm001.com'], //商品模块
            '/pay/': ['http://paydevapi.ngmm001.com'], //支付模块
            '/logistics/': ['http://lgscapi.ngmm001.com'], //物流模块
            '/data/': ['http://dataapi.ngmm001.com'], //数据统计模块
            '/cart/': ['http://cartdevapi.ngmm001.com'], //购物车模块
            '/content/': ['http://contentdevapi.ngmm001.com'], //内容模块
            '/mall/': ['http://carddevapi.ngmm001.com'], //优惠券
            '/protect/': ['http://protectapi.ngmm001.com'], //维权
            '/pickuporder/':['http://protectapi.ngmm001.com'],//逆向揽件
            '/internalAccount/': ['http://accountapi.ngmm001.com'], //内部员工信息录入
            '/buyershow/': ['http://buyershowapi.ngmm001.com'], //买家秀
            '/personalCenter/': ['http://contentapi.ngmm001.com'], //App用户中心
            '/follower/': ['http://contentapi.ngmm001.com'], //App关注用户
            '/knowledge/': ['http://knowledgedevapi.ngmm001.com'], //付费内容
            '/solidfoods/': ['http://knowledgedevapi.ngmm001.com'], //辅食
            '/card/': ['http://carddevapi.ngmm001.com'], //裂变活动
            '/flashsale/': ['http://cardapi.ngmm001.com'], //限时闪购
            '/message/': ['http://contentapi.ngmm001.com'], //消息
            '/earlylearning/': ['http://learningapi.ngmm001.com'], //早教
            '/evaluation/': ['http://learningdevapi.ngmm001.com'], //测评
            '/search/': ['http://searchapi.ngmm001.com'], //搜索模块
            '/education/': ['http://knowledgedevapi.ngmm001.com'], //数学盒子
            '/shoppingcart/': ['http://cartapi.ngmm001.com'], //凑单购物车模块
            '/dist/': ['http://distdevapi.ngmm001.com'], //分销
            '/algo/': ['http://goodsapi.ngmm001.com'], //算法推荐
            '/groupbuyv2/': ['http://goodsapi.ngmm001.com'], //算法推荐
            '/credit/': ['http://score.ngmm001.com'], // 积分
            '/sign/': ['http://score.ngmm001.com'], // 签到
            '/member/': ['http://memberdevapi.ngmm001.com'], // 会员
            '/pwdCoupon/': ['http://cardapi.ngmm001.com'],// 口令红包
            '/live': ['http://livedevapi.ngmm001.com'], // 直播
            '/cell': ['http://knowledgeapi.ngmm001.com'], //
            '/short': ['http://s.ngmm001.com'], // 生成短链
            '/config': ['http://accountdevapi.ngmm001.com'], // 配置信息
        },
        // 商品详情html文档的base url
        goods_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/",
        // 帖子详情html文档的base url
        posts_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/content/",
        // posts_detail_html_base_url: `https://staticimg.${main_hostname}/`,
        //付费内容文档内容
        knowledge_detail_html_base_url: "http://mdev.ngmm001.com/virtual-static/html/knowledge/",
        //早教内容文档内容
        zaojiao_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/earlylearning/",
        default_base_url: "http://10.86.10.254:9300/api",
        //引导下载页面url
        go_download_page_url: "http://m.ngmm001.com/page/165",
        // 笔记预览页面请求地址
        posts_detail_preview_html_base_url: "http://10.86.10.243:8102/content/community/post/admin/detail",
        //图片跨域处理路径
        proxy_img_base_url: `https://sticker.${main_hostname}/proxy/image`,
        //学院首页最新地址
        go_app_college_index_url: 'http://m.ngmm001.com/app_college_index',

        mathbox_origin: "http://mathbox.ngmm001.com",
        //数学盒子首页
        mathbox_index: "http://m.ngmm001.com/mathbox/index",
        // 分销中心首页
        distribution_index: 'http://distribution.ngmm001.com/distribution/index',
        // 分销中心去答题
        distribution_learn: 'http://distribution.ngmm001.com/distribution/learn/index',
        // 分销中心成功页面
        distribution_success: 'http://distribution.ngmm001.com/distribution/learn/success',
        // 分销中转地址
        distribution_router: 'http://distribution.ngmm001.com/distribution/router/index',
        // 分销入口
        distribution_entrance: 'http://m.ngmm001.com/distribution',
        //数学游戏
        mathgame_origin: "http://webgame.ngmm001.com",
        // 新细胞
        cell_origin: 'http://cell.ngmm001.com'
    },
    //254开发环境
    dev: {
        api_url_map: {
            '/resource/location/search': ['http://carddevapi.ngmm001.com'],
            '/login_session/': ['http://10.86.10.254:9100/devapi'],
            '/nodewebapi/': ['http://10.86.10.254:9300'],

            '/trade/': ['http://tradedevapi.ngmm001.com'], //订单模块
            '/account/': ['http://accountdevapi.ngmm001.com'], //app账户模块
            '/goods/': ['http://goodsdevapi.ngmm001.com'], //商品模块
            '/pay/': ['http://paydevapi.ngmm001.com'], //支付模块
            '/logistics/': ['http://lgscdevapi.ngmm001.com'], //物流模块
            '/data/': ['http://datadevapi.ngmm001.com'], //数据统计模块
            '/cart/': ['http://cartdevapi.ngmm001.com'], //购物车模块
            '/content/': ['http://contentdevapi.ngmm001.com'], //内容模块
            '/mall/': ['http://carddevapi.ngmm001.com'], //优惠券
            '/protect/': ['http://protectdevapi.ngmm001.com'], //维权
            '/pickuporder/':['http://protectapi.ngmm001.com'],//逆向揽件
            '/internalAccount/': ['http://accountdevapi.ngmm001.com'], //内部员工信息录入
            '/buyershow/': ['http://buyershowdevapi.ngmm001.com'], //买家秀
            '/personalCenter/': ['http://contentdevapi.ngmm001.com'], //App用户中心
            '/follower/': ['http://contentdevapi.ngmm001.com'], //App关注用户
            '/knowledge/': ['http://knowledgedevapi.ngmm001.com'], //付费内容
            '/solidfoods/': ['http://knowledgedevapi.ngmm001.com'], //辅食
            '/card/': ['http://carddevapi.ngmm001.com'], //裂变活动
            '/message/': ['http://contentdevapi.ngmm001.com'], //消息
            '/earlylearning/': ['http://learningdevapi.ngmm001.com'], //早教
            '/evaluation/': ['http://learningdevapi.ngmm001.com'], //测评
            '/search/': ['http://searchdevapi.ngmm001.com'], //搜索模块
            '/education/': ['http://knowledgedevapi.ngmm001.com'], //数学盒子
            '/shoppingcart/': ['http://cartdevapi.ngmm001.com'], //凑单购物车模块
            '/dist/': ['http://distdevapi.ngmm001.com'], //分销
            '/algo/': ['http://goodsdevapi.ngmm001.com'],//算法推荐
            '/groupbuyv2/': ['http://goodsapi.ngmm001.com'], //算法推荐
            '/pwdCoupon/': ['http://carddevapi.ngmm001.com'],// 口令红包
            '/member/': ['http://memberdevapi.ngmm001.com'], // 会员
            '/live': ['http://livedevapi.ngmm001.com'], // 直播
            '/cell': ['http://knowledgedevapi.ngmm001.com'], //
            '/rebate': ['http://memberdevapi.ngmm001.com'], //
            '/config': ['http://accountdevapi.ngmm001.com'], // 配置信息
            '/solidfoods':['http://knowledgedevapi.ngmm001.com']//辅食

        },
        // 商品详情html文档的base url
        goods_detail_html_base_url: "http://mdev.ngmm001.com/virtual-static/html/",
        award_detail_html_base_url: "http://mdev.ngmm001.com/virtual-static/html/award/",
        // 帖子详情html文档的base url
        posts_detail_html_base_url: "http://mdev.ngmm001.com/virtual-static/html/content/",
        // posts_detail_html_base_url: `https://staticimg.${main_hostname}/`,
        //付费内容文档内容
        knowledge_detail_html_base_url: "http://mdev.ngmm001.com/virtual-static/html/knowledge/",
        //早教内容文档内容
        zaojiao_detail_html_base_url: "http://mdev.ngmm001.com/virtual-static/html/earlylearning/",
        default_base_url: "http://10.86.10.254:9300/api",
        //引导下载页面url
        go_download_page_url: "http://mdev.ngmm001.com/page/165",
        // 笔记预览页面请求地址
        posts_detail_preview_html_base_url: "http://10.86.10.243:8102/content/community/post/admin/detail",
        //图片跨域处理路径
        proxy_img_base_url: `https://sticker.${main_hostname}/proxy/image`,
        //学院首页最新地址
        go_app_college_index_url: 'http://mdev.ngmm001.com/app_college_index',

        mathbox_origin: "http://mathbox.ngmm001.com",
        //数学盒子首页
        mathbox_index: "http://mdev.ngmm001.com/mathbox/index",
        // 分销中心首页
        distribution_index: 'http://distribution.ngmm001.com/distribution/index',
        // 分销中心去答题
        distribution_learn: 'http://distribution.ngmm001.com/distribution/learn/index',
        // 分销中心成功页面
        distribution_success: 'http://distribution.ngmm001.com/distribution/learn/success',
        // 分销中转地址
        distribution_router: 'http://distribution.ngmm001.com/distribution/router/index',
        // 分销入口
        distribution_entrance: 'http://mdev.ngmm001.com/distribution',
        //数学游戏
        mathgame_origin: "http://webgame.ngmm001.com",
        // 新细胞
        cell_origin: 'http://cell.ngmm001.com'
    },

    //本地开发环境
    local: {
        default_base_url: "http://localhost:3200/api",

        api_url_map: {
            '/login_session/': ['http://localhost:9100/api'],
            '/education/': ['http://knowledgedevapi.ngmm001.com'], //数学盒子
            '/nodewebapi/': ['http://localhost:9000'],
            '/solidfoods':['http://knowledgeapi.ngmm001.com']//辅食
        },
        // 商品详情html文档的base url
        goods_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/",
        award_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/award/",
        // 帖子详情html文档的base url
        posts_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/content/",
        // posts_detail_html_base_url: `https://staticimg.${main_hostname}/`,
        //付费内容文档内容
        knowledge_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/knowledge/",
        //早教内容文档内容
        zaojiao_detail_html_base_url: "http://m.ngmm001.com/virtual-static/html/earlylearning/",
        //
        // default_base_url: "http://10.86.10.43:8080",
        //default_base_url: "http://10.86.10.43:8080",
        //引导下载页面url
        go_download_page_url: "http://m.ngmm001.com/page/165",
        // 笔记预览页面请求地址
        posts_detail_preview_html_base_url: "http://adminapi.ngmm001.com/content/community/post/admin/detail",
        //图片跨域处理路径
        proxy_img_base_url: `https://sticker.${main_hostname}/proxy/image`,
        //学院首页最新地址
        go_app_college_index_url: 'http://m.ngmm001.com/app_college_index',

        mathbox_origin: "http://mathbox.ngmm001.com",
        //数学盒子首页
        mathbox_index: "http://m.ngmm001.com/mathbox/index",
        // 分销中心首页
        distribution_index: 'http://distribution.ngmm001.com/distribution/index',
        // 分销中心去答题
        distribution_learn: 'http://distribution.ngmm001.com/distribution/learn/index',
        // 分销中心成功页面
        distribution_success: 'http://distribution.ngmm001.com/distribution/learn/success',
        // 分销中转地址
        distribution_router: 'http://distribution.ngmm001.com/distribution/router/index',
        // 分销入口
        distribution_entrance: 'http://m.ngmm001.com/distribution',
        //数学游戏
        mathgame_origin: "http://webgame.ngmm001.com",
        // 新细胞
        cell_origin: 'http://cell.ngmm001.com',
        solidfoods:'http://knowledgeapi.ngmm001.com'//辅食
    },
};


// let { VUE_APP_API_ENV, VUE_APP_APPID, VUE_APP_APPID_ZJ, VUE_APP_APPID_GJ, VUE_APP_APPID_XY, VUE_APP_APPID_CELL} = process.env;
const VUE_APP_API_ENV = 'beta'
console.log(process.env.VUE_APP_API_ENV,'VUE_APP_API_ENV')
// 本地环境，或者以下环境之外的
// if (!/^(pro|beta|betadev|dev)$/.test(VUE_APP_API_ENV)) {
//     VUE_APP_API_ENV='local'
//     VUE_APP_API_ENV='dev'
//     VUE_APP_API_ENV = 'beta'
//     VUE_APP_API_ENV='betadev'
//     VUE_APP_API_ENV='pro'
// }

// console.log(`VUE_APP_API_ENV : ${VUE_APP_API_ENV}, VUE_APP_APPID : ${VUE_APP_APPID}, VUE_APP_APPID_ZJ : ${VUE_APP_APPID_ZJ},  VUE_APP_APPID_GJ : ${VUE_APP_APPID_GJ},  VUE_APP_APPID_XY : ${VUE_APP_APPID_XY},  VUE_APP_APPID_CELL : ${VUE_APP_APPID_CELL}, VUE_APP_MAIN_HOSTNAME : ${main_hostname}` )

const config = Object.assign({}, map.base, map[VUE_APP_API_ENV])

let wxconfig = {}

// if (VUE_APP_API_ENV == 'pro') {
//     wxconfig = {
//         //(糕妈优选)
//         appId: VUE_APP_APPID || "wx1a3fbd14d1427477",
//         appId_zj:VUE_APP_APPID_ZJ || "wxcc30c759f7fb5f22",//早教
//         appId_gj:VUE_APP_APPID_GJ || "wx63a5be2fa081c8ad",//跨境
//         appId_xy:VUE_APP_APPID_XY || "wx18b28466a68944a4",//年糕妈妈学院
//         appId_cell: VUE_APP_APPID_CELL || 'wx3369d5dc7cd27971', // 年糕妈妈小学堂
//         loginCallbackUrl:`https://callback.${main_hostname}/account/wechatAuth/callback`,
//         authorizeCallbackUrl:`https://callback.${main_hostname}/account/wechatAuth/callback`,
//     }
// } else if (VUE_APP_API_ENV == 'beta') {
wxconfig = {
    // (辅食小店的)微信授权的appid
    appId:"wx8aae36b94fe14a70",
    appId_zj:"wxf292488bb1d28004",
    appId_gj:"wxf292488bb1d28004",//糕妈优选
    appId_xy:"wx8aae36b94fe14a70",//年糕妈妈学院
    appId_cell: 'wx8aae36b94fe14a70',
    loginCallbackUrl:"http://callback.ngmm001.com/account/wechatAuth/callback",
    authorizeCallbackUrl:"http://callback.ngmm001.com/account/wechatAuth/callback",
    logoutUrl: "http://callback.ngmm001.com/account/wechatAuth/logout",
}
// } else if (VUE_APP_API_ENV == 'test') {
//     wxconfig = {
//         //(糕妈优选)
//         appId:"wx1a3fbd14d1427477",
//         appId_gj:"wxf292488bb1d28004",
//         appId_zj:"wx8aae36b94fe14a70",
//         appId_xy:"wxf292488bb1d28004",
//         appId_cell: 'wx83d7bcc9ac31941f',
//         loginCallbackUrl : "",
//         authorizeCallbackUrl : "",
//     }
// } else {
//     wxconfig = {
//         // (辅食小店的)微信授权的appid
//         appId:"wx8aae36b94fe14a70",
//         appId_zj:"wxf292488bb1d28004",
//         appId_gj:"wxf292488bb1d28004",//糕妈优选
//         appId_xy:"wx8aae36b94fe14a70",//年糕妈妈学院
//         appId_cell: 'wx8aae36b94fe14a70',
//         loginCallbackUrl : "http://callback.ngmm001.com/account/wechatAuth/callback",
//         authorizeCallbackUrl : "http://callback.ngmm001.com/account/wechatAuth/callback",
//         logoutUrl: "http://callback.ngmm001.com/account/wechatAuth/logout",
//     }
// }

// 当API_ENV为 local时，URL可以根据第二个参数设置。
function getApiUrl(url, debugEnv) {
    //如果路径已http,https开头的，则不作处理。
    if (/^https?:\/\//.test(url)) {
        return url;
    }

    let ConfigUrls = '';
    if (VUE_APP_API_ENV == 'pro' || VUE_APP_API_ENV == 'beta' || VUE_APP_API_ENV == 'dev') {
        ConfigUrls = config
    } else {
        if (!debugEnv) {
            ConfigUrls = config
        } else {
            ConfigUrls = Object.assign({}, map.base, map[debugEnv])
        }
    }

    var api_url_map = ConfigUrls.api_url_map;
    var match = false;
    var match_base_url = '';
    for (var key in api_url_map) {
        if (url.indexOf(key) == 0) {
            match = true;
            var size = api_url_map[key].length

            match_base_url = api_url_map[key][Math.floor(Math.random() * size)];
            break;
        }
    }
    if (match) {
        return match_base_url + url;
    } else {
        return ConfigUrls.default_base_url + url;
    }
}

export default config

// 线上的常量
// hostname，写在这里，避免到处写域名
let proConstant = {
    main_hostname,
    replaced_main_hostname,
    hostname: `m.${main_hostname}`,
    origin: `https://m.${main_hostname}`,
    hostname1: `m1.${main_hostname}`,
    origin1: `https://m1.${main_hostname}`,
    oiaHostname: `oia.${main_hostname}`,
    oiaOrigin: `https://oia.${main_hostname}`,
}
// 暴露出去
window.proConstant = proConstant
window.config = config;

export {
    wxconfig,
    proConstant,
    getApiUrl,
}
