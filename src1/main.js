// document.body.innerHTML = 'hello';

//vuex 平级组件交互，找共同的父级解决，跨组件交互，eventBus混乱 (发布 订阅)

//vuex 主要借鉴了 flux redux ，vuex只能在vuex中使用（单独为vue开发）

//vuex为了大型项目，主要是（状态）管理，将数据统一管理  多个组件共享的时候
import Vue from 'vue';
import App from './App.vue';
import store from './store';


//计数器
new Vue({
  el:'#app',
  ...App, /*runder*/
  store//store 被注册到了实例上  所有组价都会有一个属性  this.$store
});
