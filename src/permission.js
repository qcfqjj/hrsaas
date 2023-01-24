import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 路由前置守卫
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  // 是否有token
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
      }
      next() // 放行
    }
    // 如果没有token
  } else {
    // 判断访问的地址是不是白名单
    if (whiteList.indexOf(to.path) > -1) {
      next() // 放行
    } else {
      next('/login') // 回到登录页面
    }
  }
  NProgress.done() // 关闭进度条
})
// 路由后置守卫
router.afterEach(function () {
  NProgress.done() // 关闭进度条
})
