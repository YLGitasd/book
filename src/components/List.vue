<template>
  <div>
    <MHeader :back="true">列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link v-for="(book,index) in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="index" tag="li">
          <img v-lazy="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <div class="btn-list">
              <button @click.stop="remove(book.bookId)">删除</button>
              <button @click.stop>添加</button>
            </div>

          </div>
        </router-link>
      </ul>
      <div @click="more" class="more">加载更多</div>
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue';
  import {pagination,removeBook} from '../api';
    export default {
        name: "list",
        data() {
            //offset代表的是偏移量  hasMore代表的是是否有更多,如果默认没有，第一次就不能请求了   isLoading默认不是正在加载
            return {books:[],offset:0,hasMore:true,isLoading:false}
        },
      mounted(){
        let scroll = this.$refs.scroll;//获取到要拖拽的元素
        let top = scroll.offsetTop;//顶端高度
        let distance = 0;
        let isMove = false;
        scroll.addEventListener('touchstart',(e)=> { //e为事件源$event
          //滚动条在最顶端的时候  并且当前盒子在顶端时候 才继续走
          if(scroll.scrollTop !=0 && scroll.offsetTop == top) return
          let start = e.touches[0].pageY;//手指点击的开始
          let move = (e)=>{
            isMove = true;
            let current = e.touches[0].pageY;//获取当前的pageY
            distance = current - start;//求的拉动的距离  负的就不要了
            if(distance>0){//如果大于50了 认为就是50像素
              if(distance<=50){
                scroll.style.top = distance + top + 'px';
                // distance = distance;
              }else {
                distance = 50;
                scroll.style.top = top + 50 + 'px'
              }
            }else {
              //如果不在考虑范围内，移除掉move和end事件
              scroll.removeEventListener('touchmove',move);
              scroll.removeEventListener('touchend',end);
            }
          };
          let end = (e)=>{
            if(!isMove) return
            isMove = false;
            clearInterval(this.timer1);
            this.timer1 = setInterval(()=>{//一共distance  每次-1
              if(distance <= 0){
                clearInterval(this.timer1);
                distance = 0;
                scroll.style.top = top +'px';
                console.log('获取数据');
                scroll.removeEventListener('touchmove',move);
                scroll.removeEventListener('touchend',end);

                this.books = [];//先清空数据
                this.offset = 0;
                this.getData();
                return
              }
              distance -= 1;
              scroll.style.top = top + distance + 'px';
            },1);
          };
          scroll.addEventListener('touchmove',move);
          scroll.addEventListener('touchend',end);
        },false);
      },
     /* mounted(){
          this.$refs.scroll.addEventListener('scroll',function () {
            console.log(1)
          })
      },*/
      created(){
        this.getData();
      },
        methods: {
          loadMore(){
            //触发scroll事件 可能触发n次  先进来开一个定时器  下次触发时将上一次的定时器清除掉
            clearTimeout(this.timer);//防抖（节流）
            this.timer = setTimeout( ()=> {
              //卷去的高度  当前可见区域  总高
              let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
              if(scrollTop+clientHeight+20>scrollHeight){
                this.getData();//获取更多
              }
            },60)

          },
          more(){
            this.getData();
          },
          async remove(id){
            await removeBook(id);//删除某一项
            //要删除前台数据,删完页面会自动刷新
            this.books = this.books.filter(item=>item.bookId !== id);
          },
          //getData:async function(){}
          async getData(){
            if (this.hasMore && !this.isLoading){//有更多的时候获取数据
              this.isLoading = true;
              let{hasMore,books} = await pagination(this.offset);
              this.books = [...this.books,...books];//获取的书放到books属性上  [上一页原有的书，新请求获取的书]
              this.hasMore = hasMore;
              this.isLoading = false;//加载完毕
              this.offset = this.books.length;//维护偏移量   就是总书的长度
            }

          }
        },
        computed: {},
        components: {
          MHeader
        }
    }

</script>

<style scoped>
  .content ul{
    padding: 10px;
  }
  .content ul li{
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .content ul li img{
    width: 130px;
    height: 130px;
  }
  .content h4{
    font-size: 20px;
    line-height: 25px;
  }
  .content p{
    color: #2a2a2a;
    line-height: 25px;
  }
  .content b{
    color: red;
    line-height: 25px;
  }
  .content button{
    display: block;
    width: 60px;
    height: 25px;
    background: orange;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
  }
  .more{
    margin: 10px;
    background: #2afedd;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #fff;
  }
  .btn-list{
    display: flex;
    justify-content: space-around;
  }
</style>
