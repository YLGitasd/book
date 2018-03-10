<template>
  <div>
    <MHeader >首页</MHeader>
    <div class="content">
      <Loading v-if="loading">疯狂加载中</Loading>
      <template v-else>
      <!--swiperSlides前不加:,传的是字符串。加:号传的是对象-->
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="hot in hotBooks">
              <img :src="hot.bookCover">
              <b>{{hot.bookName}}</b>
              <b>价格：<span>{{hot.bookPrice}}</span></b>
            </li>
          </ul>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
//1.引入组件2.注册组件3.使用组件
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/swiper';
  // import {getSliders,getHotBook} from "../api";//结构赋值{}
  import {getAll} from "../api";
  import Loading from '../base/Loading.vue'
export default {
    created(){
      this.getData();
      // this.getSlider();//获取轮播图
      // this.getHot();//获取图书
    },
    data() {
            return {sliders:[],hotBooks:[],loading:true}//默认是空数组
    },
    methods: {//语法糖async  await 这个方法后面跟的是promise实例getSliders
      async getData(){
       let [sliders,hotBooks] = await getAll();//[sliders,books]
        this.sliders = sliders;
        this.hotBooks = hotBooks;
      //  ...轮播图和热门图书已经获取完成
        this.loading = false;
      }
      // async getHot(){
      //   this.hotBooks = await getHotBook();
      // },
      // async getSlider(){
      //   let data = await getSliders(); //获取data,data:sliders给data取一个新名sliders，对象中的属性名字必须和得到的结果名字一致
      //   // console.log(sliders);
      //   this.sliders = data;//把获取到的数据放到data里，取到值赋给sliders
      // }
    },
    computed: {},
    components: {
      MHeader,Swiper,Loading
    },
  }

</script>

<style scoped lang="less">
  h3{color: #999;padding: 5px 0;}
  .container{
    width: 90%;
    margin: 0 auto;
    font-size: 15px;
    ul {
      display:flex;
      flex-wrap:wrap; /*默认不换行*/
      padding-bottom: 10px;
      li {
        width: 33.333333%;
        text-align: center;
        margin: 5px 0;
        img{width: 80%;}
        span{
          font-size: 18px;
          color: #f40;
          font-weight: bolder;
        }
        b{
          display: block;
          font-size: 12px;
        }
      }
    }
  }

</style>
