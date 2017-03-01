---
title: Canvas
date: 2017-02-28 22:55:08
tags:
---
Canvas mark.
<!-- more -->
### 画矩形
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    body{
        background-color: #333;
    }
    #c1{
        background-color: #fff;
    }
    </style>
</head>
<body>
    <!-- 300 * 150 -->
    <canvas id="c1" width="400" height="400">
        <span>该浏览器不支持canvas</span>
    </canvas>
    <script>
    var oC = document.querySelector("#c1");
    var oGC = oC.getContext('2d');// webgl:搞3D的

    // 设置绘图
    oGC.fillStyle = "red";// 对oGC.stroke()是无效的喔
    oGC.strokeStyle = "blue";
    oGC.lineWidth = 10;

    // 边界样式
    oGC.lineJoin = 'round';// 圆角，bevel(斜角)，miter(默认)
    
    // 绘制方块
    oGC.fillRect(50,50,100,100);// L,T,W,H,默认黑色，#1

    // oGC.strokeRect(50,50,100,100);// 从中间开始往左0.5，往右0.5
    oGC.strokeRect(50.5,50.5,100,100);// 解决，#2

    // #1，#2的顺序会影响最终的效果
    </script>
</body>
</html>
```
### 画线
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

// oGC.lineCap = 'square';// 一条直线的端点样式：butt(默认)，round(圆角)，square(高度多出为宽的一半)

oGC.beginPath();// 这里是为了更好的使用下面的closePath

oGC.moveTo(100,100);// 点一点
oGC.lineTo(200,200);// 再点一点
oGC.lineTo(300,200);// 继续点

oGC.closePath();// 闭合

oGC.stroke();// 连点成线

// ........

oGC.beginPath();

oGC.moveTo(100,200);// 点一点
oGC.lineTo(200,300);// 再点一点
oGC.lineTo(300,300);// 继续点

oGC.closePath();// 闭合

oGC.fill();// 连点成面
```
### rect
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

oGC.beginPath();

oGC.rect(100,100,100,100);

oGC.stroke();// 连点成线

oGC.clearRect(0,0,oC.width,oC.height);// 清除画布
```
### save/restore
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

oGC.save();

oGC.fillStyle = "red";// 默认会作用于下面的所有，使用save,restore控制

// .......
oGC.beginPath();

oGC.moveTo(100,100);
oGC.lineTo(200,200);
oGC.lineTo(300,200);

oGC.closePath();
oGC.fill();

oGC.restore();
// .......

oGC.beginPath();

oGC.moveTo(100,200);
oGC.lineTo(200,300);
oGC.lineTo(300,300);

oGC.closePath();
oGC.fill();
```
### 鼠标画线
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

oC.onmousedown = function(ev) {
    var oEvent = ev || event;
    oGC.moveTo(oEvent.clientX - oC.offsetLeft,oEvent.clientY - oC.offsetTop);

    document.onmousemove = function(ev) {
        var oEvent = ev || event;
        oGC.lineTo(oEvent.clientX - oC.offsetLeft,oEvent.clientY - oC.offsetTop);
        oGC.stroke();
    };
    document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
    };
};
```
### 运动
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

var num = 0;
oGC.fillRect(0,0,100,100);

setInterval(function() {
    num ++;

    oGC.clearRect(0,0,oC.width,oC.height);// 清画布

    oGC.fillRect(num,num,100,100);
},30);
```
### style中的宽高
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    body{
        background-color: #333;
    }
    #c1{
        background-color: #fff;
        width: 600px;
        height: 150px;
    }
    /* 样式中的宽高是相对于默认300*150等比例缩放 */
    </style>
</head>
<body>
    <canvas id="c1">
        <span>该浏览器不支持canvas</span>
    </canvas>
    <script>
    var oC = document.querySelector("#c1");
    var oGC = oC.getContext('2d');

    oGC.fillRect(0,0,100,100);
    </script>
</body>
</html>
```
### arc
``` javascript
var oC = document.getElementById('c1');
var oGC = oC.getContext('2d');

oGC.moveTo(200,200);

// 弧度 = 角度*Math.PI/180
oGC.arc(200,200,150,0,90*Math.PI/180,true);// true逆时针

oGC.stroke();
```
<a href="/resources/demo/exercise/demo34/index.html" target="_blank">时钟</a>
### arcTo
<a href="http://www.365mini.com/page/html5-canvas-arcto.htm">参考原文</a>
``` javascript
var oC = document.getElementById('c1');
var oGC = oC.getContext('2d');

// 指定绘制路径的起始点
oGC.moveTo(50, 50);
// 绘制一条到坐标(150,50)的水平直线，此点就是绘制弧线时的当前端点
oGC.lineTo(150, 50);

// 端点1
var p1 = {
    x : 200,
    y : 50
};
// 端点2
var p2 = {
    x : 200,
    y : 100         
};
// 绘制与当前端点、端点1、端点2三个点所形成的夹角的两边相切并且半径为50px的圆的一段弧线
oGC.arcTo(p1.x, p1.y, p2.x, p2.y, 50);

// 设置线条颜色为蓝色
oGC.strokeStyle = "blue";
// 按照上述绘制路径绘制弧线
oGC.stroke();
```
