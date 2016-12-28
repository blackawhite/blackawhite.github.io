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
<!-- more -->
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
    // req.url: "/index.html?name=yangk"
    // pathname: "/index.html"
    // query: {name:'yangk'}

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
### getList
1)获取所有客户信息：http://localhost:3000/getList
``` javascript
var con = null,
    result = null,
    customId = null,
    customPath = "./js/custom.json";

con = fs.readFileSync(customPath,"utf-8");// 首先读取内容
con = JSON.parse(con.length === 0 ? '[]' : con);// JSON.parse("")，防止为空时报错

if(pathname === "/getList"){
    // 按照接口开发
    result = {
        code: 1,
        msg: "获取客户信息失败",
        data: null
    };
    if(con.length > 0){
        result = {
            code: 0,
            msg: "获取客户信息成功",
            data: con
        };
    }
    res.writeHead(200,{
        'content-type': 'application/json;charset=utf-8;'// 重置相应头信息，防止IE乱码
    });
    res.end(JSON.stringify(result));// 返回信息，把对象转为JSON格式的字符串
    return;
}
```
### getInfo
2)根据客户端传递ID获取对应信息
``` javascript
if(pathname === "/getInfo"){
    customId = query["id"];
    result = {
        code: 1,
        msg: "获取客户信息失败",
        data: null
    };
    for(var i = 0;i < con.length;i ++){
        if(con[i].id == customId){
            result = {
                code: 0,
                msg: "获取客户信息成功",
                data: con[i]
            };
            break;// 找到就不用再往下继续找了，提高性能
        }
    }
    res.writeHead(200,{
        'content-type': 'application/json;charset=utf-8;'
    });
    res.end(JSON.stringify(result));
    return;
}
```
### removeInfo
3)根据客户端传递删除对应信息
``` javascript
if(pathname === "/removeInfo"){
    customId = query["id"];
    result = {
        code: 1,
        msg: "删除客户信息失败"
    };
    for(var i = 0;i < con.length;i ++){
        var flag = false;
        if(customId == con[i]["id"]){
            con.splice(i,1);
            flag = true;
            break;// 删除完毕则推出循环
        }
    }
    if(flag){// 说明删除成功了，把con写入
        fs.writeFileSync(customPath,JSON.stringify(con),"utf-8");// 读取进来的是字符串，写入的也是字符串
        result = {
            code: 0,
            msg: "删除客户信息成功"
        };
    }
    res.writeHead(200,{
        'content-type': 'application/json;charset=utf-8;'
    });
    res.end(JSON.stringify(result));
    return;
}
```
### addInfo
4)增加客户信息
``` javascript
if(pathname === "/addInfo"){
    var str = '';
    req.on('data',function(chunk){// 服务器接收post中data传递的内容
        str += chunk;
    });
    req.on('end',function(){
        // str = '{"name":"","age":""}'
        var data = JSON.parse(str);// 转JSON对象
        result = {
            code: 1,
            msg: "增加客户信息失败"
        };
        if(data["name"] == ""){// data["age"]...
            res.writeHead(200,{
                'content-type': 'application/json;charset=utf-8;'
            });
            res.end(JSON.stringify(result));
            return;
        }
        con.length === 0 ? data["id"] = 1 : data["id"] = parseFloat(con[con.length - 1]["id"]) + 1;
        con.push(data);

        fs.writeFileSync(customPath,JSON.stringify(con),"utf-8");
        result = {
            code: 0,
            msg: "增加客户信息成功"
        };
        res.writeHead(200,{
            'content-type': 'application/json;charset=utf-8;'
        });
        res.end(JSON.stringify(result));
    });
    return;// 注意位置！
}
```
### updateInfo
5)修改客户信息
``` javascript
if(pathname === "/updateInfo"){
    var str = '';
    req.on("data",function(chunk){
        str += chunk;
    });
    // 注意：req.on("end",function(){...})和res.end('...')别搞混淆了
    req.on("end",function(){
        var data = JSON.parse(str);// 转JSON对象
        result = {
            code: 1,
            msg: "修改客户信息失败"
        };
        if(data["name"] == ""){// data["age"]...
            res.writeHead(200,{
                'content-type': 'application/json;charset=utf-8;'
            });
            res.end(JSON.stringify(result));
            return;
        }

        var flag = false;
        for(var i = 0;i < con.length;i ++){
            if(data["id"] == con[i]["id"]){
                con[i] = data;// 能改...
                flag = true;
                break;
            }
        }
        if(flag){// 说明修改成功了
            fs.writeFileSync(customPath,JSON.stringify(con),"utf-8");// 写入
            result = {
                code: 0,
                msg: "修改客户信息成功"
            };
        }
        res.writeHead(200,{
            'content-type': 'application/json;charset=utf-8;'
        });
        res.end(JSON.stringify(result));
    });
    return;
}
```
## JavaScript
### index.js
``` javascript
var indexInit = (function(){
    var $list = $("#list"),
        $del = $("#del");
    function addData(){
        $.ajax({
            "url": "/getList",// 相对于根目录
            success: callback
        });
    }
    function callback(jsonData){
        var arr = jsonData.data;
        var str = '';
        for(var i = 0;i < arr.length;i ++){
            str += '<li>';
                str += '<span class="w50">'+ arr[i].id +'</span>';
                str += '<span class="w150">'+ arr[i].name +'</span>';
                str += '<span class="w50">'+ arr[i].age +'</span>';
                str += '<span class="w200">'+ arr[i].phone +'</span>';
                str += '<span class="w200">'+ arr[i].address +'</span>';
                str += '<span class="w150 control">';
                    str += '<a href="add.html?id='+ arr[i].id +'">修改</a>';
                    str += '<a href="javascript:;" id="del" customId="'+ arr[i].id +'">删除</a>';
                str += '</span>';
            str += '</li>';
        }
        $list.html(str);
    }
    function bind(){
        $list.on("click",function(ev){// 这里可能还没加载进来，所以获取删除按钮要用事件委托
            ev = ev || event;
            ev.target = ev.target || ev.srcElement;
            if(ev.target.tagName.toLowerCase() == "a" && ev.target.id == "del"){
                var flag = window.confirm("are you sure?")
                if(flag){
                    $.ajax({
                        url: "/removeInfo?id=" + ev.target.getAttribute("customId"),
                        success: function(jsonData){
                            if(jsonData && jsonData.code == 0){
                                $list[0].removeChild(ev.target.parentNode.parentNode);
                                return;
                            }
                            alert(jsonData.msg);
                        }
                    });
                }
            }
        });

    }
    function init(){
        addData();// 初始化数据
        bind();// 事件绑定
    }
    return {
        init: init
    };
})();
indexInit.init();
```
### add.js
``` javascript
var addInit = (function(){
    var $name = $("#userName"),
        $age = $("#userAge"),
        $phone = $("#userPhone"),
        $address = $("#userAddress"),
        $submit = $("#submit"),
        objData = null;
    function bind(){
        String.prototype.queryURLParameter = function () {
            var obj = {},
                reg = /([^?=&#]+)=([^?=&#]+)/g;
            this.replace(reg, function () {
                var key = arguments[1],
                    value = arguments[2];
                obj[key] = value;
            });
            return obj;
        };
        var urlObj = window.location.href.queryURLParameter(),// {id: 1}
            customId = urlObj["id"],
            isFlag = typeof customId === "undefined" ? false : true;// true代表修改，false代表增加

        // 更新，不应该需要时间触发
        $.ajax({
            url: "/getInfo?id=" + customId,
            success: function(jsonData){
                if(jsonData && jsonData.code == 0){
                    $name.val(jsonData.data["name"]);
                    $age.val(jsonData.data["age"]);
                    $phone.val(jsonData.data["phone"]);
                    $address.val(jsonData.data["address"]);
                }
            }
        });

        // 点击增加
        function addInfo(){
            $.ajax({
                url: "/addInfo",
                type: "post",
                data: JSON.stringify(objData),// 传字符串格式的数据！
                success: addCallback
            });
        }
        function addCallback(jsonData){
            if(jsonData.code == 0){
                window.location.href = "index.html";
                return;
            }
        }
        // 点击修改
        function updateInfo(){

            objData.id = customId;// 因为增加的时候不需要穿ID，所以这里单独存放
            $.ajax({
                url: "/updateInfo",
                type: "post",
                data: JSON.stringify(objData),
                success: updateCallback
            });
        }
        function updateCallback(jsonData){
            if(jsonData && jsonData.code == 0){
                window.location.href= "index.html";
                return;
            }
            alert(jsonData.msg);
        }

        $submit.on("click",function(){// 点击提交的时候是修改或者增加，要区分
            objData = {
                "name": $name.val() || "无",
                "age": $age.val() || "无",
                "phone": $phone.val() || "无",
                "address": $address.val() || "无"
            };
            if(isFlag){// 修改
                updateInfo();
            }
            else{// 增加
                addInfo();
            }
        });
    }
    function init(){
        bind(); 
    };
    return {
        init: init
    };
})();
addInit.init();
```
## 代码下载
[CRM](/resources/files/Node.zip)