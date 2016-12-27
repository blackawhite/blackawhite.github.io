---
title: 用Node搭建简易CRM系统
date: 2016-12-27 21:44:56
tags:
---
## 需求文档
``` javascript
/**
 * 1、查：打开页面时，获取所有用户信息
 * 2、增：新增客户
 * 3、改：先获取指定客户ID的信息，再更新其信息
 * 4、删：删除指定客户ID的信息
 */
```
## 接口文档
``` javascript
/**
 * 1、获取所有客户的信息
 * URL: "/getList"    >    GET
 * 参数: {客户端传递给服务器的内容}    >    无
 * 返回: {服务器返回给客户端的内容}
 * '{
 *      "code": 0,// 返回结果标识，0代表成功，1代表失败(没用任何客户的信息)
 *      "msg": "获取成功",// 返回结果标识的说明信息
 *      "data": {
 *          "id": **,
 *          "name": **,
 *          "age": **,
 *          "phone": **,
 *          "address": **
 *      }
 * }'
 *
 * ........................................................
 * 
 * 2、获取具体的某一个客户的信息
 * URL: "/getInfo"    >    GET
 * 参数: ?id=**，客户ID传递给服务器
 * 返回:
 * '{
 *      "code": 0,
 *      "msg": "获取成功",
 *      "data": {
 *          "id": **,
 *          "name": **,
 *          "age": **,
 *          "phone": **,
 *          "address": **
 *      }
 * }'
 *
 * ........................................................
 *
 * 3、增加客户信息
 * URL: "/addInfo"    >    POST
 * 参数: '{"name":"","age":"","phone":"","address":""}'，ID是服务器有规律生成的，不用传
 * 返回: 
 * '{
 *      "code": 0,
 *      "msg": "增加成功"
 * }'
 *
 * ........................................................
 *
 * 4、修改客户信息(点提交后需要把修改的内容传递过去)
 * URL: "/updateInfo"
 * 参数: '{"name":"","age":"","phone":"","address":""}'
 * 返回:
 * '{
 *      "code": 0,
 *      "msg": ""
 * }'
 *
 * ........................................................
 *
 * 5、删除客户信息
 * URL: "/removeInfo"
 * 参数: ?id=**
 * 返回:
 * '{
 *      "code": 0,
 *      "msg": ""
 * }'
 */
```
## Server
### Server1.0
server.js
``` javascript
// 前端路由：根据客户端请求的内容不同，服务器返回不同的内容
var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
    //->req.url: "/index.html?name=yangk"
    //->pathname: "/index.html"
    //->query: {name:'yangk'}

    var urlObj = url.parse(req.url,true);// true返回的query是json格式
    var pathname = urlObj.pathname;

    if(pathname === "/index.html"){
        var con = fs.readFileSync("./index.html","utf-8");// 同步读取
        res.write(con);
        res.end();
    }
});

server.listen(3000,function(){
    console.log('3000 port is starting...');
});
```
index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    my name is aaa.
</body>
</html>
```
### Server1.1
server.js
``` javascript
var http = require("http"),
    url = require("url"),
    fs = require("fs");

var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    /*if(pathname === "/index.html"){
        var con = fs.readFileSync("./index.html","utf-8");// 同步
        res.end(con);// 返回并结束
        return;
    }

    if(pathname === "/css/index.css"){
        con = fs.readFileSync("./css/index.css","utf-8");
        res.end(con);
        return;
    }

    if(pathname === "/js/index.js"){
        con = fs.readFileSync("./js/index.js","utf-8");
        res.end(con);
        return;
    }*/

    // 简化上面代码
    try{
        var con = fs.readFileSync("." + pathname,"utf-8");
        res.end(con)
    }
    catch(e){
        // 防止客户端请求的资源文件不存在而报错，例如：favicon.ico
        res.end("request file is not find!");
    }
});

server.listen(3000,function(){
    console.log('3000 port is starting...');
});
```
index.js
``` javascript
var oDiv = document.querySelector("#div1");
oDiv.onclick = function(){
    this.style.color = "red";
};
```
index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    <div id="div1">aaa</div>
    <script src="js/index.js"></script>
</body>
</html>
```
### Server1.2
server.js
``` javascript
var http = require("http"),
    url = require("url"),
    fs = require("fs");

var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true),
        pathname = urlObj.pathname,// "/index.html"
        query = urlObj.query;// {name:'yangk'}

    // 处理静态资源文件
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO)/i;
    if(reg.test(pathname)){
        // [".html","html",index:6,input:'/index.html']
        var suffix = reg.exec(pathname)[1].toUpperCase();// 后缀

        // 根据请求文件的后缀名获取当前文件的MIME类型
        var suffixMIME = "text/plain";
        switch(suffix){
            case "HTML":
                siffixMIME = "text/html";
                break;
            case "CSS":
                siffixMIME = "text/css";
                break;
            case "JS":
                siffixMIME = "text/javascript";
                break;
            case "JSON":
                siffixMIME = "application/json";
                break;
            case "ICO":
                siffixMIME = "application/octet-stream";
                break;
        }
        try{
            var conFile = fs.readFileSync("." + pathname,"utf-8");
            res.writeHead(200,{// 重写响应头信息，chrome不加也问题不大，这里主要针对IE的
                "content-type": siffixMIME + ";charset=utf-8"
            });
            res.end(conFile);
        }
        catch(e){
            res.writeHead(404,{
                "content-type": suffixMIME
            });
            res.end(conFile);
        }
    }
});

server.listen(3000,function(){
    console.log('3000 port is starting...');
});
```
## 编写接口
