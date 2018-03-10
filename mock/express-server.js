let express = require('express');
let app = express();
// let http = require('http');//需要node模块
let fs = require('fs');//fileSystem文件读取模块
let url = require('url');

//获取轮播图接口  /sliders
let sliders = require('./sliders');

function read(cb) {
  fs.readFile('./book.json','utf8',function (err,data) {
    if(err || data.length == 0){
      cb([]);//如果有错误 或者文件没长度 就是空数组
    }else{
      cb(JSON.parse(data));//将读出来的内容转化为对象
    }
  })
}
// read(function (books) {//books代表所有图书
//   console.log(books);
// });

function write(data,cb) {//写入内容
  fs.writeFile('./book.json',JSON.stringify(data),cb)
}
// write({},function () {
//   console.log('写入成功')
// })

let pageSize = 5;//每页显示5个
// http.createServer((req,res)=>{ //请求，响应
  /*res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") return res.end();/!*让options请求快速返回*!/*/

app.use(function (req,res,next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS")  res.send(200);/*让options请求快速返回*/
  else next();
});

app.get('/',function (req,res) {
  res.sendFile('/index.html',{root:__dirname})
});
  // let {pathname,query} = url.parse(req.url,true);//解析路径,true把query转化为对象
app.use('/page',function (req,res) {


  // if(pathname ==='/page'){
    // let {offset} = query || 0;//取出来offset
    let offset = parseInt(query.offset) || 0;  //拿到当前前端传递过来的值
    // console.log(offset);
    read(function (books) {
      //每次偏移量  在偏移的基础上增加5条
      let result = books.reverse().slice(offset,offset+pageSize);//倒序数据
      let hasMore = true;//默认有更多
      if (books.length<= offset+pageSize){//已经显示的数目  大于了总共条数
        hasMore = false;
      }
      res.setHeader('Content-Type','application/json;charset=utf8');
      res.end(JSON.stringify({hasMore,books:result}));//{1有没有更多，2有多少条}
    });
    return;
  // }
})

app.use('/sliders',function (req,res) {
  // if(pathname === '/sliders'){
    res.setHeader('Content-Type','application/json;charset=utf8');//编码格式，可不写
    return res.end(JSON.stringify(sliders));
  // }
})
app.use('/hot',function (req,res) {
  // if(pathname === '/hot'){
  read(function (books) {
    let hot = books.reverse().slice(0, 9);//reverse倒叙 slice截取
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    setTimeout(() => {
      res.end(JSON.stringify(hot));
    }, 500)

  });
  return
  // }
})
app.use('/book',function (req,res) {
  // if(pathname === '/book'){//对书的增删改查
  let id = parseInt(query.id);//取出的是字符串，要转化为数字，比的时候用===
  switch (req.method) {//?id=1
    case 'GET':
      console.log(typeof id);
      //typeof id !== 'undefined' && !isNaN(id)
      if (!isNaN(id)) {//有id的话  查询一个
        read(function (books) {
          let book = books.find(item => item.bookId === id);
          if (!book) book = {};//如果没找到 则是undefined
          res.setHeader('Content-Type', 'application/json;charset=utf8');
          res.end(JSON.stringify(book));
        });
      } else {//获取所有图书
        read(function (books) {
          res.setHeader('Content-Type', 'application/json;charset=utf8');
          res.end(JSON.stringify(books.reverse()));
        })
      }
      break;
    case 'POST':
      let str = '';
      req.on('data', chunk => {
        str += chunk;
      });
      req.on('end', () => {
        let book = JSON.parse(str);
        read(function (books) {//添加id
          book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;//取最后一项取id加1，否则就是1
          books.push(book);//将数据放到books中，books在内存中
          write(books, function () {
            res.end(JSON.stringify(book));
          })
        })
      })
      break;
    case  'PUT':
      if (id) {//获取了当前要修改的id
        let str = '';
        req.on('data', chunk => {
          str += chunk;
        });
        req.on('end', () => {
          let book = JSON.parse(str);//book要改成什么样子  转对象用parse
          read(function (books) {
            books = books.map(item => {
              if (item.bookId === id) {//找到id相同的那一本书
                return book
              }
              return item;//其他书正常返回即可
            });
            write(books, function () {//将数据写会json中
              res.end(JSON.stringify(book));
            })
          })
        })
      }
      break;
    case 'DELETE':
      // console.log(id);
      read(function (books) {
        // books = books.filter(item=>{
        //   console.log(item.bookId !== id)
        //   });
        books = books.filter(item => item.bookId !== id);
        // console.log(books.length);
        write(books, function () {
          res.end(JSON.stringify({}));//删除返回空对象
        })
      });
      break
  }
  return
  // }
})
  //读取一个路径
  // fs.stat('.'+pathname,function(err,stats){
  //   if(err){
  //     res.statusCode = 404;
  //     res.end('NOT FOUND');
  //     fs.createReadStream('index.html').pipe(res);
  //   }else {
  //     if(stats.isDirectory()){
  //       let p = require('path').join('.'+pathname,'./index.html');
  //       fs.createReadStream(p).pipe(res);//把路径读出来再写回去
  //     }else {
  //       // res.setHeader('Content-Type','application/json;charset=utf8');
  //       fs.createReadStream('.' + pathname).pipe(res);
  //     }
  //   }
  // });

// }).listen(3000);
app.listen('3000',()=>console.log('正在运行3000..'))
