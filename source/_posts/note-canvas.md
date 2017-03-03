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
### 贝塞尔曲线
``` javascript
oGC.moveTo(100,200);// 起始点

oGC.quadraticCurveTo(100,100,200,100);// 控制点，结束点

oGC.stroke();
```
``` javascript
oGC.moveTo(100,200);// 起始点

oGC.bezierCurveTo(100,100,200,200,200,100);// 控制点1，控制点2，结束点

oGC.stroke();
```
### 变换
``` javascript
oGC.translate(100,100);// 顺序

// 下面两句的旋转会累加
// oGC.rotate(20*Math.PI/180);
// oGC.rotate(25*Math.PI/180);

oGC.rotate(45*Math.PI/180);// 默认左上角为旋转点

oGC.scale(0.5,0.5);

oGC.fillRect(0,0,100,100);
```
选择缩放的矩形
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

var num = 0;
var num2 = 0;
var value = 1;
oGC.translate(100,100);

setInterval(function(){
    num ++;
    oGC.save();
    oGC.clearRect(0,0,oC.width,oC.height);
    if(num2 == 100){// 2倍
        value = -1;
    }
    else if(num2 == 0){
        value = 1;
    }
    num2 += value;
    oGC.scale(num2 * 1 / 50,num2 * 1 / 50);

    oGC.rotate(num * Math.PI / 180);

    oGC.translate(-50,-50);

    oGC.fillRect(0,0,100,100);

    oGC.restore();
},30);
```
### drawImg
``` javascript
var oC = document.querySelector("#c1");
var oGC = oC.getContext('2d');

var yImg = new Image();
yImg.src = 'test.jpg';

yImg.onload = function(){
    draw(this);
};
function draw(obj){
    oGC.drawImage(obj,0,0,200,200);// (图片对象，x轴位置，y轴位置，宽，高)
}
```
图片旋转
<img src="/resources/images/pages/canvas/rotate_img.jpg" alt="">
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
    canvas{
        background-color: #ccc;
    }
    </style>
</head>
<body>
    <input type="button" value="左">
    <input type="button" value="右">
    <div>
        <img src="./test.jpg" alt="" id="img1">
    </div>
    <script>
    var aInput = document.getElementsByTagName("input");
    var oImg = document.getElementById("img1");

    var yImg = new Image();
    yImg.src = oImg.src;

    yImg.onload = function(){
        draw(oImg);
        // draw(this);
    };
    var iNow = 0;
    function draw(obj){
        var oC = document.createElement('canvas');
        var oGC = oC.getContext('2d');

        oC.width = obj.width;
        oC.height = obj.height;

        obj.parentNode.replaceChild(oC,obj);

        oGC.drawImage(obj,0,0);

        aInput[0].onclick = function(){
            if(iNow == 0){
                iNow = 3;
            }
            else{
                iNow --;
            }
            toChange();
        };
        aInput[1].onclick = function(){
            if(iNow == 3){
                iNow = 0;
            }
            else{
                iNow ++;
            }
            toChange();
        };
        function toChange(){
            switch(iNow){
                case 1:
                    oC.width = obj.height;
                    oC.height = obj.width;
                    oGC.rotate(90 * Math.PI / 180);
                    // 旋转后跑出去了
                    oGC.drawImage(obj,0,-obj.height);// 移动y轴(原始)方向距离
                    break;
                case 2:
                    oC.width = obj.width;
                    oC.height = obj.height;
                    // 旋转后依然抛出去了，以左上点为基准的
                    oGC.rotate(180 * Math.PI / 180);
                    oGC.drawImage(obj,-obj.width,-obj.height);
                    break;
                case 3:
                    oC.width = obj.height;
                    oC.height = obj.width;
                    oGC.rotate(270 * Math.PI / 180);
                    // 旋转后跑出去了
                    oGC.drawImage(obj,-obj.width,0);// 移动x轴方向距离
                    break;
                case 0:
                    oC.width = obj.width;
                    oC.height = obj.height;
                    oGC.rotate(0);
                    oGC.drawImage(obj,0,0);
                    break;
            }
        }
    }
    </script>
</body>
</html>
```
### createPattern
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
    canvas{
        background-color: #ccc;
    }
    </style>
</head>
<body>
    <canvas id="c1" width="400" height="400"></canvas>
    <script>
    var oC = document.getElementById("c1");
    var oGC = oC.getContext('2d');

    var yImg = new Image();

    yImg.src = 'test.jpg';
    yImg.onload = function(){
        draw(this);
    };

    function draw(obj){
        var bg = oGC.createPattern(obj,'repeat');

        // oGC.fillStyle = "red";
        oGC.fillStyle = bg;
        oGC.fillRect(0,0,300,300);
    }
    </script>
</body>
</html>
```
### 渐变
createLinearGradient
``` javascript
var oC = document.getElementById("c1");
var oGC = oC.getContext('2d');

var obj = oGC.createLinearGradient(100,100,100,200);// 起点，终点

obj.addColorStop(0,'red');// 起点色
obj.addColorStop(0.5,'yellow');// 中间色
obj.addColorStop(1,'blue');// 终点色

oGC.fillStyle = obj;
oGC.fillRect(100,100,100,100);// x,y,w,h
```
createRadialGradient
``` javascript
var oC = document.getElementById("c1");
var oGC = oC.getContext('2d');

var obj = oGC.createRadialGradient(200,200,100,200,200,150);// 第一个圆的坐标和半径，第二个圆的...

obj.addColorStop(0,'red');// 起点色
obj.addColorStop(0.5,'yellow');// 中间色
obj.addColorStop(1,'blue');// 终点色

oGC.fillStyle = obj;
oGC.fillRect(0,0,oC.width,oC.height);
```
### 文本
``` javascript
var oC = document.getElementById("c1");
var oGC = oC.getContext('2d');

oGC.font = '60px impact';

oGC.textBaseline = 'top';// middle,bottom
oGC.fillText('分期乐',0,0);

oGC.strokeText('分期乐',0,200);// 空心字
```
居中文字
``` javascript
var oC = document.getElementById("c1");
var oGC = oC.getContext('2d');

oGC.font = '60px impact';

oGC.textBaseline = 'top';// middle,bottom

oGC.shadowOffsetX = 5;
oGC.shadowOffsetY = 5;
oGC.shadowColor = "yellow";
oGC.shadowBlue = 5;

var w = oGC.measureText('分期乐').width;

oGC.fillText('分期乐',(oC.width-w)/2,(oC.height-60)/2);
```
居中文字的正确姿势
``` javascript
var oC = document.getElementById("c1");
var oGC = oC.getContext('2d');
oGC.font = '60px Helvetica';

oGC.textBaseline = 'middle'; //设置文本的垂直对齐方式
oGC.textAlign = 'center'; //设置文本的水平对对齐方式

oGC.fillText('分期乐',oC.width/2,oC.height/2);
```
### getImageData
``` javascript
var oC = document.getElementById('c1');
var oGC = oC.getContext('2d');

oGC.fillRect(0,0,100,100);

var oImg = oGC.getImageData(0,0,100,100);//复制位置，复制宽高

// alert( oImg.width );  // 一行的像素个数
// alert( oImg.height );  // 一列的像素个数

console.log(oImg.data.length);// 整体像素的数组集合

// oImg.data[0] // 每一个像素的R，0 - 255 黑色到白色
// oImg.data[1] // 每一个像素的G，0 - 255 黑色到白色 
// oImg.data[2] // 每一个像素的B，0 - 255 黑色到白色 
// oImg.data[3] // 每一个像素的A，0 - 255 透明到不透明
for(var i = 0;i < oImg.width * oImg.height;i ++){
    oImg.data[4 * i] = 255;
    oImg.data[4 * i + 1] = 0;
    oImg.data[4 * i + 2] = 0;
    oImg.data[4 * i + 3] = 100;
}

oGC.putImageData(oImg,100,100);
```
### createImageData
``` javascript
var oC = document.getElementById("c1");
var oGC = oC.getContext('2d');

var oImg = oGC.createImageData(100,100);

for(var i = 0;i < oImg.width * oImg.height;i ++){
    oImg.data[4 * i] = 255;
    oImg.data[4 * i + 1] = 0;
    oImg.data[4 * i + 2] = 0;
    oImg.data[4 * i + 3] = 255;
}
oGC.putImageData(oImg,100,100);
```
### 像素字
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
    canvas{
        background-color: #fff;
    }
    </style>
</head>
<body>
    <canvas id="c1" width="400" height="400"></canvas>
    <script>
    var oC = document.getElementById("c1");
    var oGC = oC.getContext('2d');

    oGC.font = '60px Helvetica';
    oGC.textBaseline = 'middle'; // 设置文本的垂直对齐方式
    oGC.textAlign = 'center'; // 设置文本的水平对对齐方式
    oGC.fillText('分期乐',oC.width/2,oC.height/2);
    // oGC.fillText('分期乐',(oC.width-w)/2,(oC.height-h)/2);
    
    var h = 60;
    var w = oGC.measureText('分期乐').width;// 要放在oGC.font下面获取

    console.log(h,w);
    var oImg = oGC.getImageData((oC.width-w)/2,(oC.height-h)/2,w,h);// get,宽高，坐标
    oGC.clearRect(0,0,oC.width,oC.height);
    
    var arr = randomArr(w*h,w*h/5);
    
    var newImg = oGC.createImageData(w,h);// create,宽高
    
    for(var i=0;i<arr.length;i++){
        newImg.data[4*arr[i]] = oImg.data[4*arr[i]];
        newImg.data[4*arr[i]+1] = oImg.data[4*arr[i]+1];
        newImg.data[4*arr[i]+2] = oImg.data[4*arr[i]+2];
        newImg.data[4*arr[i]+3] = oImg.data[4*arr[i]+3];
    }
    
    oGC.putImageData(newImg,(oC.width-w)/2,(oC.height-h)/2);// put,坐标

    function randomArr(iAll,iNow){
        var arr = [];
        var newArr = [];
        for(var i=0;i<iAll;i++){
            arr.push(i);
        }
        
        for(var i=0;i<iNow;i++){
            newArr.push( arr.splice( Math.floor(Math.random()*arr.length) ,1) );
        }
        return newArr;
    }

    var aaaArr = [[1],[2],[3]];
    console.log(3*aaaArr[2]);// 9
    </script>
</body>
</html>
```
动画像素字
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
    canvas{
        background-color: #fff;
    }
    </style>
</head>
<body>
    <canvas id="c1" width="400" height="400"></canvas>
    <script>
    var oC = document.getElementById("c1");
    var oGC = oC.getContext('2d');

    oGC.font = '60px Helvetica';
    var w = oGC.measureText('分期乐').width;
    oGC.textBaseline = 'middle';
    oGC.textAlign = 'center';
    oGC.fillStyle = 'red';
    oGC.fillText('分期乐',oC.width/2,oC.height/2);

    var h = 60;
    var oImg = oGC.getImageData((oC.width-w)/2, (oC.height-h)/2, w, h);// get,宽高，坐标

    oGC.clearRect(0,0,oC.width,oC.height);

    var arr = randomArr(w*h, w*h/100);
    var newImg = oGC.createImageData(w, h);// create,宽高

    var num = 0;
    var timer = setInterval(function(){
        for(var i=0; i<arr[num].length; i++){
            newImg.data[4*arr[num][i]] = oImg.data[4*arr[num][i]];
            newImg.data[4*arr[num][i] + 1] = oImg.data[4*arr[num][i] + 1];
            newImg.data[4*arr[num][i] + 2] = oImg.data[4*arr[num][i] + 2];
            newImg.data[4*arr[num][i] + 3] = oImg.data[4*arr[num][i] + 3];
        }

        oGC.putImageData(newImg,(oC.width-w)/2,(oC.height-h)/2);// put,坐标
        
        num ++;
        if(num == arr.length){
            console.log('have closed timer');
            clearInterval(timer);
        }
    },30);

    function randomArr(iAll,iNow){
        var arr = [];
        var allArr = [];
        for(var i=0;i<iAll;i++){
            arr.push(i);
        }
        for(var k = 0;k < iAll/iNow;k ++){
            var newArr = [];// 不能在for k外定义，会一直push不是我们想要的
            for(var i=0;i<iNow;i++){
                newArr.push( arr.splice( Math.floor(Math.random()*arr.length) ,1) );// 每次arr会去掉splice，所以newArr push进的不会重复
            }
            allArr.push(newArr);
        }
        return allArr;
    }
    </script>
</body>
</html>
```