---
title: JavaScript mark
date: 2016-12-04 00:11:18
tags: JS基础知识
---
### 乘法表
#### 加换行符实现
``` javascript
for(var i = 1;i <= 9;i ++){
    for(j = 1;j <= i;j ++){
        var oSpan = document.createElement("span");
        oSpan.innerHTML = j + "x" + i + "=" + i * j + "&nbsp;&nbsp";
        document.body.appendChild(oSpan);
    }
    document.body.innerHTML += "<br>";
}
```
#### 利用块元素的机制实现
``` javascript
for(var i = 1;i <= 9;i ++){
    var oP = document.createElement("p");
    for(j = 1;j <= i;j ++){
        oP.innerHTML += j + "x" + i + "=" + i * j + "&nbsp;&nbsp";
    }
    document.body.appendChild(oP);
}
```
#### 用字符串拼接的方法实现
``` javascript
var str = "";
str += "<ul>";
for(var i = 1;i <= 9;i ++){
    str += "<li>";
    for(j = 1;j <= i;j ++){
        str += j + "x" + i + "=" + j * i + "&nbsp;&nbsp;";
    }
    str += "</li>";
}
str += "</ul>";
document.body.innerHTML = str;
```
### 打印个正方形
#### 浮动实现
``` javascript
var oWrap = document.createElement("div");
oWrap.style.cssText = "width:400px;height:400px;margin:0 auto;background-color:#eee;";
document.body.appendChild(oWrap);

var arrColor = ["red","green","blue","pink","yellow","#ccc"];
for(var i = 0;i < 100;i ++){
    var oSpan = document.createElement("span");
    oSpan.style.cssText = "width:40px;height:40px;float:left;background-color:"+ arrColor[i%arrColor.length] +"";
    oWrap.appendChild(oSpan);
}
```
#### 两个循环定位实现
``` javascript
var oWrap = document.createElement("div");
oWrap.style.cssText = "width:400px;height:400px;margin:0 auto;background-color:#eee;position:relative;";
document.body.appendChild(oWrap);

var arrColor = ["red","green","blue","pink","yellow","#ccc"];
for(var i = 0;i < 10;i ++){
    for(var j = 0;j < 10;j ++){
        var oSpan = document.createElement("span");
        oSpan.style.cssText = "width:40px;height:40px;float:left;background-color:"+ arrColor[(i * 10 + j)%arrColor.length] +";position:absolute;left:"+ j * 40 +"px;top:"+ i % 10 * 40 +"px;";
        oWrap.appendChild(oSpan);
    }
}
```
#### 一个循环定位实现
``` javascript
var oWrap = document.createElement("div");
oWrap.style.cssText = "width:400px;height:400px;margin:0 auto;background-color:#eee;position:relative;";
document.body.appendChild(oWrap);

var arrColor = ["red","green","blue","pink","yellow","#ccc"];
for(var i = 0;i < 100;i ++){
    var oSpan = document.createElement("span");
    oSpan.style.cssText = "width:40px;height:40px;float:left;background-color:"+ arrColor[i % arrColor.length] +";position:absolute;left:"+ i % 10 * 40 +"px;top:"+ Math.floor(i / 10) * 40 +"px;";
    oWrap.appendChild(oSpan);
}
```
### 倒计时
``` javascript
// 倒计时原理：目标时间 - 当前时间
var oDiv = document.createElement("div");
oDiv.style.textAlign = "center";

// 设定目标时间，把时间格式的字符串转换为标准格式，中杠ie6，7，8不兼容，所以下面用/代替
var tarTime = new Date("2016/12/05 09:30:00");
// 目标时间戳
var tarSpan = tarTime.getTime();

function count(){
    // 获取现在时间
    var nowTime = new Date();
    // 当前时间戳
    var nowSpan = nowTime.getTime();

    // 求时间戳之差
    var diffTime = tarSpan - nowSpan;

    // 计算小时
    var hours = Math.floor( diffTime / 1000 / 60 / 60 );
    // 上面小时占用的毫秒数
    var hoursMs = hours * 60 * 60 * 1000;
    // 剩下的毫秒数
    var halfMs = diffTime - hoursMs;

    // 计算分钟
    var minutes = Math.floor(halfMs / 1000 / 60);
    // 上面分钟占用的毫秒数
    var minutesMs = minutes * 60 * 1000;
    // 剩下的毫秒数
    halfMs = halfMs - minutesMs;

    // 计算秒
    var seconds = Math.floor(halfMs / 1000);

    oDiv.innerHTML = "距离明天上班还有："+ hours +"时"+ minutes +"分"+ seconds +"秒";
}
document.body.appendChild(oDiv);

count();
setInterval(count,1000);
```

### 函数

### 隔N行变色的多种实现思路

### ...

