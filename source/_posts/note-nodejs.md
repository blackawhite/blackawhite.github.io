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
    }
    // 注意这里的end要和上面的write配套使用，不然会一直响应
    res.end();
});

server.listen(8088);
```
## 读写文件
### fs.readFile
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
### fs.writeFile
``` javascript
var fs = require('fs');

fs.writeFile('aaa.txt','20170216',function(err){// 这里不加./也没事
    if(err){
        console.log('写入失败');
    }
});
```
### fs.readFile & fs.write
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
            // 配合服务器实际上就是先读取对应路径内容然后再返回出去
            res.write(data);
        }
        // 注意end要放在readFile里面，因为readFile是异步的
        res.end();
    });
});

server.listen(8088);
```
## GET数据获取
### split拆分接口和GET形式的数据
``` javascript
const http = require('http');

var server = http.createServer(function(req,res){
    var _json = {};
    if(req.url.indexOf("?") != -1){
        var arr1 = req.url.split("?");// one

        var arr1Left = arr1[0];
        var arr1Right = arr1[1];

        var arr2 = arr1Right.split("&");// two

        for(var i = 0;i < arr2.length;i ++){
            var arr3 = arr2[i].split("=");// three
            _json[arr3[0]] = arr3[1];
        }
    }
    else{
        arr1Left = req.url;
    }

    console.log(arr1Left,_json);

    res.write("唯熟能而");
    res.end();
});

server.listen(8088);
```
### querystring.parse
``` javascript
var querystring = require('querystring');

var str = "name=yangk&age=25&sex=man";

var json = querystring.parse(str);

for(var attr in json){
    console.log(attr + ":" + json[attr]);
}
```
化简上面的two，three
``` javascript
const http = require('http');
const querystring = require('querystring');

var server = http.createServer(function(req,res){
    var _json = {};
    if(req.url.indexOf("?") != -1){
        var arr1 = req.url.split("?");// one

        var arr1Left = arr1[0];
        var arr1Right = arr1[1];

        // "name=yangk&age=25&sex=man"
        _json = querystring.parse(arr1Right);
    }
    else{
        arr1Left = req.url;
    }

    console.log(arr1Left,_json);

    res.write("唯熟能而");
    res.end();
});

server.listen(8088);
```
### url.parse(req.url,true)
再次简化，简直牛逼
``` javascript
const http = require('http');
const urlLib = require('url');

var server = http.createServer(function(req,res){
    var obj = urlLib.parse(req.url,true);

    var url = obj.pathname;// 接口
    var get = obj.query;// 解析GET数据，也可以querystring.parse("name=yangk&age=25")

    console.log(url,get);

    res.write("aaa");
    res.end();
});

server.listen(8088);
```
## POST数据获取
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost:8088" method="post">
        <textarea name="con" id="" cols="30" rows="10"></textarea><br>
        <button type="submit" value="提交">提交</button>
    </form>
</body>
</html>
```
``` javascript
const http = require('http');
const querystring = require('querystring');// 除了用来转换GET类型的数据，还可以用来解析POST数据，不然得到的是数据流

var server = http.createServer(function(req,res){
    var str = '';
    var i = 0;
    req.on('data',function(chunk){// 有一段数据到达的时候就发生一次
        console.log(`第${i++}次接收数据`);// ES6语法
        str += chunk;
    });
    req.on('end',function(){// 数据全部到达的时候发生一次
        var POST = querystring.parse(str);// readFile的数据可以toString，而这里需要querystring.parse
        console.log(POST);
    });
});

server.listen(8088);
```
## req,res,readFile
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
``` javascript
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');// 解析POST数据
const urlLib = require('url');// 解析GET数据

var server = http.createServer(function(req,res){
    // GET数据
    var obj = urlLib.parse(req.url,true);// 注意true
    var _url = obj.pathname;
    const GET = obj.query;
    console.log('GET:',GET);

    // POST数据
    var str = '';
    req.on('data',function(chunk){
        str += chunk;
    });
    req.on('end',function(){
        const POST = querystring.parse(str);
        console.log('POST:',POST);
    });

    // 读取文件
    var _dir = './www' + req.url;
    fs.readFile(_dir,function(err,data){
        if(err){
            res.write("404");
        }
        else{
            res.write(data);
        }
        res.end();
    });
});

server.listen(8088);
```
## 用户登录注册
### HTML/JS
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
### 只要GET数据
``` javascript
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var users = {};// 数据库，注意位置

http.createServer(function(req,res){

    var obj = urlLib.parse(req.url,true);
    var _url = obj.pathname;
    const GET = obj.query;// 得到GET数据
    // req.url会包括后面的GET数据
    if(_url == '/user'){// 接口
        switch (GET.act) {
            case "login":
                if(users[GET.user] == null){
                    res.write('{ok: false,msg: "用户名不存在"}');
                }
                else if(users[GET.user] != GET.pass){
                    res.write('{ok: false,msg: "密码错误"}');
                }
                else{
                    res.write('{ok: true,msg: "登陆成功"}');
                }
                break;
            case "reg":
                if(!GET.user || !GET.pass){
                    res.write('{ok: false,msg: "用户名或密码不能为空"}');
                }
                else if(users[GET.user]){
                    res.write('{ok: false,msg: "用户名已存在"}');
                }
                else{
                    users[GET.user] = GET.pass;
                    res.write('{ok: true,msg: "注册成功"}');
                    console.log(users);// 观察数据库
                }
                break;
            default:
                res.write('{ok: false,msg: "接口不存在"}');
                break;
        }
        res.end();
    }
    else{// 文件
        fs.readFile('./'+req.url,function(err,data){// 这里用相对路径
            if(err){
                res.write("读取失败");
            }
            else{
                res.write(data);
            }
            res.end();
        });
    }
}).listen(8088);
```
### 同时拿到POST数据的写法
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
    // 提交数据方式：
    // 1、直接用ajax
    // 2、form,submit
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
```
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
        return function(req,res,next){// 注意传参的姿势
            var str = '';
            req.on('data',function(data){
                str += data;
            });
            req.on('end',function(){
                req.body = querystring.parse(str);// 解析成json
                next();// 注意next的位置
            });
        }
    }
}
```
## cookie/session
### 介绍
``` text
cookie:保存在客户端，不安全；大小有限(4K)
session:保存在服务器端，相对安全；大小无限
session是基于cookie来实现的，简单说cookie中会有一个sessionId，服务器利用sessionId找到session文件、读取、写入

cookie
    读取：cookie-parser
    发送：
session
    cookie-session
```
### 写
``` javascript
const express = require('express');

var server = express();

// 写入/发送cookie
server.use('/aaa/a.html',function(req,res){
    res.cookie('user','yangk',{// 写入cookie
        path: '/aaa',// 指定只有aaa路径下可以访问
        maxAge: 30 * 24 * 3600 * 1000// 30天后过期
    });// 放在send之前
    res.send('ok');
});

server.listen(8088);
```
### 读
``` javascript
const express = require('express');
const cookieParser = require('cookie-parser');

var server = express();

server.use(cookieParser());// 解析

server.use('/aaa/a.html',function(req,res){
    console.log(req.cookies);// 读取cookie
    res.send('ok');
});

server.listen(8088);

// cookie: 父级可以访问子级的,例如当在('/aaa/a.html')中设置的cookie，use('/')这样指定时是可以访问
```
### 加密/签名
``` javascript
const express = require('express');
const cookieParser = require('cookie-parser');

var server = express();

server.use(cookieParser('wfdfdkfdsf'));// 传参能解析签过名的cookie

// cookie
server.use('/aaa/a.html',function(req,res){
    req.secret = 'wfdfdkfdsf';// 加密,密钥,签名,上面有了这里可以不写会自动加

    res.cookie('user','blue',{// 写入cookie
        signed: true,// 签名
        path: '/aaa',// 只有aaa路径下可以访问
        maxAge: 30 * 24 * 3600 * 1000// 30天后过期
    });// 放在send之前

    // 加密的/签名过的cookie
    console.log(req.signedCookies);
    // 无加密的/没签名的cookie
    // console.log(req.cookies);
    res.send('ok');
});

server.listen(8088);

// decodeURIComponent('加密的值')，还是能看见内容，只能知道是否被篡改
// cookie-encrypter加密cookie
```
### 删
``` javascript
const express = require('express');
const cookieParser = require('cookie-parser');

var server = express();

server.use(cookieParser());

server.use('/',function(req,res){
    res.clearCookie('user');

    res.send('ok');
});

server.listen(8088);
```
### session
``` javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

var server = express();

server.use(cookieParser());// 先解析
server.use(cookieSession({
    name: 'sess',// 修改session的名字
    keys: ['aaa','bbb','ccc'],
    maxAge: 2 * 3600 * 1000// session的有效期2小时
}));

server.use('/',function(req,res){
    if(req.session['count'] == null){
        req.session['count'] = 1;
    }
    else{
        req.session['count'] ++;
    }
    console.log(req.session['count']);

    res.send('ok');
});

server.listen(8088);

// 删除session:delete req.session
```
## jade/ejs
### jade
最基本渲染
``` javascript
const jade = require('jade');

var str = jade.render('html');

console.log(str);
```
jade
``` javascript
const jade = require('jade');

var str = jade.renderFile('./views/1.jade',{// 同步的,调试阶段要加
    pretty: true
});

console.log(str);
```
1.jade
``` jade
html
    head
        style
        script
    body
        div
        ul
            li
        div
```
ejs
``` javascript
const ejs = require('ejs');

ejs.renderFile('./views/1.ejs',{
    name: 'yangk'
},function(err,data){
    if(err){
        console.log('编译失败');
    }
    else{
        console.log(data);
    }
});
```
1.ejs
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <%= name %>
</body>
</html>
```
写入对应文件
``` javascript
const jade = require('jade');
const fs = require('fs');

var str = jade.renderFile('./views/1.jade',{
    pretty: true,
    name: "aaa",
    a: 6,
    b: 7,
    arr: ["a","b","c"],
    content: "<h2>hello world</h2>"
});

fs.writeFile('./build/1.html',str,function(err){
    if(err){
        console.log('写入失败');
    }
    else{
        console.log('写入成功');
    }
});

console.log(str);
```
属性
``` jade
div#div1
script(src="a.js")
link(href="a.css",rel="stylesheet")
input(type="text",id="input1",value="222")
```
内容
``` jade
a(href="http://www.baidu.com") 百度

单行内容原样输出
a
    |abc

里面下一级所有内容原样输出
script.
    window.onload = function(){
        alert(1);
    }

下面这种形式也是直接怼进去
script
    include a.js
```
div里有内容和标签，标签里面又有内容
``` jade
div aaa
    span bbb
```
style/class
``` jade
ul(class="a b c")

ul(class=['a','b','c'])

div(style="width:100px;height:100px;background:red;")

div(style={width: '200px',height: '200px',background: 'red'})
```
普通标签也想用json的形式
``` jade
div&attributes({title: 'aaa',id: "div1"})
```
变量
``` jade
div 我的名字：#{name}

div sum:#{a+b} // 运算

div(style=json) // 直接变量，不需要花括号
div(class=arr)

div(class=arr class="active") // 自动融入自己的
```
代码的标识
``` jade
-var a = 12;
-var b = 5;
div 结果是：#{a+b}
```
=
``` jade
span #{a}
span #{b}

span=a
span=b
```
遍历数组中的内容都对应到每一个标签中
``` jade
-for(var i = 0;i < arr.length;i ++)
    div=arr[i]
```
转义
``` jade
div=content // 转义content
div!=content // 不转义
```
if
``` jade
-var a=12;
-if(a%2==0)
    div(style={background:'red'})
-else
    div(style={background:'green'})

可以省略后面的横杠
-var a=12;
if(a%2==0)
    div(style={background:'red'})
else
    div(style={background:'green'})

```
switch
``` jade
-var a=2;
case a
    when 0
        div aaa
    when 1
        div bbb
    default
        |啥都不是
```
小例子
``` jade
doctype
html
    head
        meta(charset="utf-8")
        title jade测试页面
        style.
            div{width:100px;height:100px;background:red;float:left;margin-top:10px;}
            div.last{clear:left;}
    body
        -var a=0;
        while a<12
            if a%4==0 && a!=0
                div.last #{a++}
            else
                div #{a++}
```
### ejs
基本
``` ejs
<%= name %>
<%= json.arr[0].user %>
```
简单循环
``` ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <% for(var i = 0;i < json.arr.length;i ++){ %>
    <div>用户名:<%= json.arr[i].user %>密码:<%= json.arr[i].pass %></div>
    <% } %>
</body>
</html>
```
避免转义输出
``` ejs
<%
    var str = "<div></div>";
%>
<%- str %>
```
include
``` ejs
<% include a.txt %>

<% for(var i = 0;i < 5;i ++){ %>
<% include a.txt %>
<% } %>
```
判断
``` ejs
// include后面不认变量，需要写死的，需要外面判断来展示不同的情况
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <% if(type=='admin'){ %>
        <% include ../style/admin.css %>
    <%} else{ %>
        <% include ../style/user.css %>
    <% } %>
</body>
</html>
```
## multer
``` javascript
const express = require('express');
const bodyParser = require('body-parser');// 上传文件时只能处理enctype="application/x-www-form-urlencoded"，表单默认
const multer = require('multer');
const pathLib = require('path');
const fs = require('fs');

// base 文件名+扩展名
// ext 扩展名
// dir 路径
// name 文件名

var objMulter = multer({
    dest: './www/upload/'// 存
});

var server = express();

// server.use(objMulter.single('f1'));// 指定
server.use(objMulter.any());// any

server.use(bodyParser.urlencoded({
    extended: false
}));

server.post('/',function(req,res){
    // console.log(req.body);
    // console.log(req.files[0].originalname);

    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,newName,function(err){
        if(err){
            res.end("上传失败");
        }
        else{
            res.end("上传成功");
        }
    });
});

server.listen(8088);

// 'www/upload/d3e3ae68670bfe6197a51352e65ef87b'
// 'www/upload/d3e3ae68670bfe6197a51352e65ef87b.png'
```
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost:8088/" method="post" enctype="multipart/form-data">
        <input type="file" name="f1"><br>
        <input type="submit" value="上传">
    </form>
</body>
</html>
```
## consolidate
``` javascript
const express=require('express');
const static=require('express-static');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const bodyParser=require('body-parser');
const multer=require('multer');
const consolidate=require('consolidate');

var server=express();

server.listen(8088);

//1.解析cookie
server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'));

//2.使用session
var arr=[];
for(var i=0;i<100000;i++){
  arr.push('keys_'+Math.random());
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000}));

//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './views');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/index', function (req, res){
  res.render('1.ejs', {name: '突然的自我'});
});

//4.static数据
server.use(static('./www'));

// http://localhost:8088/index
```
## express.Router
``` javascript
const express=require('express');

var server=express();

//目录1：/user/
var routeUser=express.Router();

routeUser.get('/1.html', function (req, res){   //http://xxx.com/user/1.html
  res.send('user1');
});
routeUser.get('/2.html', function (req, res){   //http://xxx.com/user/2.html
  res.send('user22222');
});

server.use('/user', routeUser);

//目录2：/article/
var articleRouter=express.Router();
server.use('/article', articleRouter);

articleRouter.get('/aaa.html', function (req, res){   //http://xxxx.com/article/10001.html
  res.send('aaa');
});

server.listen(8088);
```
## mysql
``` javascript
const mysql=require('mysql');

//1.连接
//createConnection(哪台服务器, 用户名, 密码, 库)
var db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '20161222'
});

//2.查询
//query(干啥, 回调)
db.query("SELECT * FROM `user_table`;", (err, data)=>{
  if(err)
    console.log('出错了', err);
  else
    console.log('成功了');
    console.log(JSON.stringify(data));
});
```