---
title: Node读书笔记
date: 2016-11-13 18:11:26
tags: Node笔记
categories: Node
---
## FS API的应用
需求：展示当前目录下列表并给出选择，当选择文件时显示内容，选择目录时，显示该目录下文件信息。<!--more-->
### fs.readdir()
读取目录
``` javascript
console.log(fs.readdirSync(__dirname));//同步获取当前目录的文件列表
```
readdir()第一个参数的3种写法
``` javascript
fs.readdir('.',function(err,files){});
```
``` javascript
fs.readdir(__dirname,function(err,files){});
```
``` javascript
fs.readdir(process.cwd(),function(err,files){});
```
### fs.readFile()
读取文件
``` javascript
fs.readFile(filename,utf-8,function(err,data){})
```
### fs.stat()
读取文件或目录的元数据
``` javascript
fs.stat(filename,function(err,stat){})
```
### 代码展示
``` javascript
var fs = require('fs'),
    stdin = process.stdin,//可读流
    stdout = process.stdout;//可写流

//process.cwd()返回运行当前脚本的工作路径
fs.readdir(process.cwd(),function(err,files){
    //输出一个空行，便于阅读
    console.log('');

    if(!files.length){
        //文件不存在直接提示并返回
        return console.log('No files to show!');
    }
    //提示用户选择
    console.log('Select which file or direcrory you want to see\n');
    //后面会多次用到，保存一下
    var stats = [];

    function file(i){
        //filename可能是目录或着文件所以下面要利用fs.stat()作出判断
        var filename = files[i];
        //fs.stat会给出文件或者目录的元数据
        fs.stat(__dirname + '/' + filename,function(err,stat){
            stats[i] = stat;
            //输出目录或文件的名字
            if(stats[i].isDirectory()){//如果是目录
                console.log('目录：' + i + '    ' + filename);
            }
            else{//如果说文件
                console.log('文件：' + i + '    ' + filename); 
            }
            //说明文件或目录输出完毕
            if(++i == files.length){
                //接下来的操作就是让用户输入选择
                read();
            }
            //继续输出
            else{
                file(i);
            }
        });
    }
    function read(){
        console.log('');
        //不换行输出选择提示信息
        stdout.write('Enter your choice:');
        //等待用户输入
        stdin.resume();
        //使支持特殊字符
        stdin.setEncoding('utf8');
        //监听用户输入的信息
        stdin.on('data',option);
    }
    //用户的操作
    function option(data){
        var filename = files[Number(data)]
        if(!filename){
            //若输入的内容不在列出内容之中
            stdout.write('Enter you choice again:');
        }
        else{
            stdin.pause();
            //读取目录或文件，stats数组已经保存了所有文件或目录的元数据
            if(stats[Number(data)].isDirectory()){//若是目录
                //读取目录
                fs.readdir(__dirname + '/' + filename,function(err,files){
                    console.log('');
                    console.log(files.length + 'files');
                    //files是一个数组，里面存的说filename
                    files.forEach(function(file){
                        console.log('    _   ' + file);
                    });
                    console.log('');
                });
            }
            else{//若是文件
                fs.readFile(__dirname + '/' + filename,'utf8',function(err,data){
                    console.log('');
                    //输出内容
                    console.log(data);
                });
            }
        }
    }
    file(0);
});
```
## 一个简单的web服务器
``` javascript
var qs = require('querystring');

require('http').createServer(function(req,res){
    console.log(req.url);
    if('/' == req.url){
        res.writeHead(200,{'Content-Type': 'text/html'});

        res.end([
            '<form method="POST" action="/url">',
            '<h1>My form</h1>',
            '<fieldset>',
            '<label>Personal information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>',
            '</fieldset>',
            '</form>'
        ].join(''));
    }
    else if('/url' == req.url && 'POST' == req.method){
        var body ='';
        req.on('data',function(chunk){
            body += chunk;
        });
        req.on('end',function(){
            res.writeHead(200,{'Content-Type': 'text/html'});
            //res.end('<p>Content-Type:'+ req.headers['content-type'] +'</p>' + '<p>Data:</p><pre>' + body + '</pre>');
            res.end('<p>Your name is <b>'+ qs.parse(body).name +'</b></p>');
        });
    }
    else{
        res.writeHead(404);
        res.end('Not Found');
    }
}).listen(3000)
```
## req.url
``` javascript
const http = require('http');

var server = http.createServer(function(req,res){
    switch(req.url){
        case '/1.html':
            res.write('1.html');
        break;
        case '/2.html':
            res.write('2.html');
        break;
        default:
            res.write('404');
        break;
    }
    res.end();
});

server.listen(8088);
```
## fs.readFile
``` javascript
var fs = require('fs');

fs.readFile('hello.txt',function(arr,data){
    if(arr){
        console.log("读取失败");
    }
    else{
        console.log(data.toString());// 二进制转字符串
    }
});
```
## fs.writeFile
``` javascript
var fs = require('fs');

fs.writeFile('aaa.txt','20170216',function(err){// 这里不加./也没事
    if(err){
        console.log('写入失败');
    }
});
```
## fs.readFile & fs.write
``` javascript
const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req,res){
    var _url = './www' + req.url;
    console.log(_url);//    >>    ./www/index.html
    fs.readFile(_url,function(err,data){// 这里必须要用./
        if(err){
            res.write('404');
        } 
        else{
            res.write(data);
        }
        res.end();
    });
    
});

server.listen(8088);
```
## split
``` javascript
const http = require('http');

var server = http.createServer(function(req,res){
    var _json = {};

    if(req.url.indexOf("?") != -1){
        var arr1 = req.url.split("?");

        var url = arr1[0];// 接口
        var arr1Right = arr1[1];

        var arr2 = arr1Right.split("&");
        for(var i = 0;i < arr2.length;i ++){
            var arr3 = arr2[i].split("=");

            _json[arr3[0]] = arr3[1];
        }
    }
    else{
        url = req.url;
    }
    console.log(url,_json);
    res.write('aaa');
    res.end();
});

server.listen(8088);
```
## querystring.parse
``` javascript
var querystring = require('querystring');

var str = "name=yangk&age=25&sex=man";

var json = querystring.parse(str);

for(var attr in json){
    console.log(attr + ":" + json[attr]);
}
```
## url.parse(req.url,true)
``` javascript
const http = require('http');
const urlLib = require('url');

var server = http.createServer(function(req,res){
    var obj = urlLib.parse(req.url,true);

    var url = obj.pathname;// 接口
    var get = obj.query;

    console.log(url,get);

    res.write("aaa");
    res.end();
});

server.listen(8088);
```
## req.on('data')
``` javascript
// POST数据接收

var http = require('http');

var querystring = require('querystring');// 主要用来解析POST数据

http.createServer(function(req,res){
    // POST > req
    var str = '';
    var i = 0;
    req.on('data',function(data){// 有一段数据到达的时候就发生一次
        console.log(`第${i++}次收到数据`);// ES6语法
        str += data;
    });
    req.on('end',function(){// 数据全部到达的时候发生一次
        // console.log(str);
        var POST = querystring.parse(str);// readFile的数据可以toString
        console.log(POST);
    });
}).listen(8088);
```
## req,res,readFile
``` javascript
const http = require('http');
const urlLib = require('url');// 解析req
const querystring = require('querystring');// 解析res
const fs = require('fs');

var server = http.createServer(function(req,res){
    var obj = urlLib.parse(req.url,true);
    var url = obj.pathname;
    const GET = obj.query;// GET
    console.log('GET:',GET);

    var str = '';
    req.on('data',function(data){
        str += data;
    });
    req.on('end',function(){
        const POST = querystring.parse(str);
        console.log('POST:',POST);// POST
    });

    // 文件请求
    var urlStr = './www' + url;
    fs.readFile(urlStr,function(err,data){
        if(err){
            res.write('404')
        }
        else{
            res.write(data);
        }
        res.end();// 由于readFile是异步的，此end要写在里面
    });
});
server.listen(8088);
```
html
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <form action="http://localhost:8088/index.html" method="post">
        用户名：<input type="text" name="user"><br>
        密码：<input type="password" name="pass"><br>
        <input type="submit" value="提交">
    </form>
</body>

</html>
```
## 用户登录注册
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    用户名：<input type="text" id="user"><br>
    密码：<input type="password" id="pass"><br>
    <input type="button" value="注册" id="reg">
    <input type="button" value="登录" id="login">
    <script src="ajax.js"></script>
    <script>
    var oUser = document.querySelector("#user");
    var oPass = document.querySelector("#pass");
    var oReg = document.querySelector("#reg");
    var oLogin = document.querySelector("#login");

    oReg.onclick = function(){
        ajax({
            url: '/user',
            type: 'get',
            data: {
                act: 'reg',
                user: oUser.value,
                pass: oPass.value
            },
            success: function(str){
                var _json=eval('('+str+')');
                alert(_json.msg);
            },
            error: function(){
                alert("通信失败！");
            }
        });
    };

    oLogin.onclick = function(){
        ajax({
            url: '/user',
            type: 'get',
            data: {
                act: 'login',
                user: oUser.value,
                pass: oPass.value
            },
            success: function(str){
                var _json=eval('('+str+')');
                alert(_json.msg);
            },
            error: function(){
                alert("通信失败！");
            }
        });
    };

    </script>
</body>
</html>
```
``` javascript
const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');

var users = {};// 位置

var server = http.createServer(function(req,res){
    var str = '';
    req.on('data',function(data){
        str += data;
    });
    req.on('end',function(){
        var obj = urlLib.parse(req.url,true);
        var url = obj.pathname;
        var GET = obj.query;// GET
        var POST = querystring.parse(str);// POST
        if(url == "/user"){// 接口

            switch(GET.act){
                case 'reg':
                    if(users[GET.user]){
                        res.write('{ok:true,msg:"用户名已存在！"}');// res.write返回客户端
                    }
                    else{
                        users[GET.user] = GET.pass;
                        res.write('{ok:true,msg:"注册成功！"}');
                    }
                break;
                case 'login':
                    if(users[GET.user]==null){
                        res.write('{ok:false,msg:"此用户不存在"}');
                    }
                    else if(users[GET.user] != GET.pass){
                        res.write('{ok:false,msg:"密码错误！"}');
                    }
                    else{
                        res.write('{ok:true,msg:"登录成功！"}');
                    }
                break;
                default:
                    res.write('{ok:false,msg:"无此接口！"}');
            }
            res.end();
        }
        else{// 文件
            var fileName = './www' + url;
            fs.readFile(fileName,function(err,data){
                if(err){
                    res.write('读取文件失败');
                }
                else{
                    res.write(data);
                }
                res.end();
            });
        }

    });
});

server.listen(8088);
```
## express
express保留了原生的功能，增强了一些新的功能
``` javascript
const express = require('express');

var server = express();

server.listen(8088);

server.use('/a.html',function(req,res){
    res.send({a: 12,b: 5});// send支持json
    res.end();
});

server.use('/b.html',function(req,res){
    res.send('123');// res.write
    res.end();
});

// 监听用户的请求：
// server.get()
// server.post()
// server.use() => 通吃
```
## express-static(读取静态文件)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    用户名：<input type="text" id="user"><br>
    密码：<input type="password" id="pass"><br>
    <input type="button" value="登录" id="login">
    <script src="ajax.js"></script>
    <script>
    var oUser = document.querySelector("#user");
    var oPass = document.querySelector("#pass");
    var oLogin = document.querySelector("#login");

    oLogin.onclick = function(){
        ajax({
            url: '/login',
            type: 'get',
            data: {
                user: oUser.value,
                pass: oPass.value
            },
            success: function(str){
                var _json=eval('('+str+')');
                alert(_json.msg);
            },
            error: function(){
                alert("通信失败！");
            }
        });
    };

    </script>
</body>
</html>
```
``` javascript
const express = require('express');
const expressStatic = require('express-static');// 中间件，用来读取静态文件

var server = express();
server.listen(8088);

// /login?user=xxx&padd=xxx
// =>{ok:true/false,msg:'原因'}

var users = {
    'yangk': 123,
    'sherry': 321
};

server.get('/login',function(req,res){
    var user = req.query['user'];// {user: 'yangk',pass: '123'}
    var pass = req.query['pass'];
    if(users[user] == null){
        res.send({ok: false,msg:'此用户不存在'});
    }
    else if(users[user] != pass){
        res.send({ok: false,msg:'密码不正确'});   
    }
    else{
        res.send({ok: true,msg:'登录成功'});
    }
});

server.use(expressStatic('./www'));// 读取对应目录下的文件

// 测试接口：http://localhost:8088/login?user=yangk&pass=123
```
## body-parser(取POST数据)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost:8088" method="post">
        用户：<input type="text" name="user"><br>
        密码：<input type="text" name="pass"><br>
        <input type="submit" value="提交">
    </form>
</body>
</html>
```
``` javascript
const express = require('express');
const expressStatic = require('express-static');// 中间件
const bodyParser = require('body-parser');// 拿到POST数据

var server = express();
server.listen(8088);

server.use(bodyParser.urlencoded({// 先加工一次，下面才能用req.body
    extended: false,// 扩展模式,false代表普通模式
    limit: 2 * 1024 * 1024// 限制数据的大小为2M
}));

server.use('/',function(req,res){
    // console.log(req.query);// 拿到GET数据
    console.log(req.body);// POST,需要body-parse中间件，先解析再用
});
````
## server.use的链式操作
``` javascript
const express = require('express');
const bodyParser = require('body-parser');

var server = express();
server.listen(8088);

// 链式操作，监听的是同一个请求的地址
server.use('/',function(req,res,next){
    console.log('a');
    next();
});
server.use('/',function(req,res){
    console.log('b');
});
```
## 自定义中间件
预热
``` javascript
const express = require('express');
const querystring = require('querystring');// 解析POST类型的数据
const bodyParser = require('body-parser');

var server = express();
server.listen(8088);

/*server.use(function(req,res,next){// 不写路径是针对所有路径有反应
    // req.a = 12;
    var str = '';
    req.on('data',function(data){// 接收POST型的数据
        str += data;
    });
    req.on('end',function(){
        req.body = querystring.parse(str);// 解析POST类型的数据
        next();// 数据接收完了再执行下一步
    });
});*/

server.use(bodyParser.urlencoded());


server.use('/',function(req,res){// 针对这个路径有反应
    // console.log(req.a);// 底下可以访问上面的req.a
    console.log(req.body);
});
```
html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost:8088" method="post">
        用户：<input type="text" name="user"><br>
        密码：<input type="text" name="pass"><br>
        <input type="submit" value="提交">
    </form>
</body>
</html>
```
正式代码
``` javascript
const express = require('express');
const bodyParser2 = require('./libs/my-body-parser');// my-body-parser输出什么这里是什么

var server = express();
server.listen(8088);

// server.use(bodyParser2);
// server.use(bodyParser2());
server.use(bodyParser2.aaa());

server.use('/',function(req,res){// 针对这个路径有反应
    console.log(req.body);
});
```
中间件
``` javascript
const querystring = require('querystring');// 解析POST类型的数据
/*module.exports = function(req,res,next){
    var str = '';
    req.on('data',function(data){
        str += data;
    });
    req.on('end',function(){
        req.body = querystring.parse(str);
        next();
    });
}*/

/*module.exports = function(){
    return function(req,res,next){
        var str = '';
        req.on('data',function(data){
            str += data;
        });
        req.on('end',function(){
            req.body = querystring.parse(str);
            next();
        });
    }
}*/
module.exports = {
    aaa: function(){
        return function(req,res,next){
            var str = '';
            req.on('data',function(data){
                str += data;
            });
            req.on('end',function(){
                req.body = querystring.parse(str);// 解析成json
                next();
            });
        }
    }
}
```