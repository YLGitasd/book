// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
//使用轮播图插件
Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';

//导入图片懒加载插件
import VueLazyload from 'vue-lazyload';
//使用图片懒加载插件
Vue.use(VueLazyload);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://dwz.cn/7z6BrV',
  loading: 'http://d.ifengimg.com/w128/p0.ifengimg.com/pmop/2017/0905/8B13A5EC31E014978FF50F031990847AA4804770_size6_w300_h300.gif',
  attempt: 1
});

//在进入路由之前每一次都会执行此方法,全局钩子,也有拦截的功能
router.beforeEach(function (to,from,next) {
  console.log(to)
  document.title = to.meta.title;
  // if(to.path === '/list'){
  //   next({path:'/add'});
  // }else {
    next();
  // }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
