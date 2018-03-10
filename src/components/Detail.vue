<template>
  <div class="detail">
    <!--{{bid}}-->
    <MHeader :back="true">详情</MHeader>
    <ul>
      <li>
        <label for="bookName">书的名称</label>
        <input type="text" v-model="book.bookName" id="bookName"/>
      </li>
      <li>
        <label for="bookInfo">书的信息</label>
        <input type="text" v-model="book.bookInfo" id="bookInfo"/>
      </li>
      <li>
        <label for="bookPrice">书的价格</label>
        <input type="text" v-model.number="book.bookPrice" id="bookPrice"/>
      </li>
      <button @click="update">确认修改</button>
    </ul>
  </div>
</template>

<script>
import MHeader from '../base/MHeader';
import {findOneBook,updateBook} from '../api';
export default {
    name: "detail",
    data() {
        return {book:{}} //页面一加载把数据拿过来，存放到book中，默认是个对象{}
    },
  watch:{
      $route(){//只要路径变化  重新获取数据
        this.getData();
      }
  },
    created(){//页面一加载 需要根据id 发送请求
      this.getData();
    },
    methods: {
      async update(){//点击修改图书
       await updateBook(this.bid,this.book);
       this.$router.push('/list');//修改完成后跳转页面
      },
      async getData(){//通过id找到某一项后 赋给book
        this.book = await findOneBook(this.bid);
        //如果是空对象 需要跳转到列表页
        // JSON.stringify(this.book) === '{}'
        Object.keys(this.book).length>0?void 0:this.$router.push('/list');
      }
    },
    computed: {
      bid(){
        return this.$route.params.bid;//将路径参数的id映射到bid上
      }
    },
    components: {MHeader},
}

</script>

<style scoped lang="less">
  .detail{
    position: absolute;
    top: 0;
    left: 0;
    bottom:0;
    right: 0;
    background: #fff;
    z-index: 100;
  }
  ul{
    margin:50px 20px 0 10px;
    li{
      lable{
        display: block;
        font-size: 25px;
      }
      input{
        margin: 10px 0;
        height: 25px;
        width: 100%;
      }
    }
  }
  button{
    display: block;
    width: 80px;
    height: 35px;
    background: #2aabd2;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
  }
</style>
<!--/book?id=3-->
<!--{bookName}-->
