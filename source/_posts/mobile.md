---
title: 捋捋移动端
date: 2017-01-20 01:06:43
tags: 移动端
categories: HTML/CSS
---
### 关于重置/坑/技巧
#### UC的字体渲染问题
此Bug出现极其诡异，那段时间真是怕了UC，因为指不定什么时候就会放大页面，有可能是加一个字，有可能是浮动了一个元素，也有可能是增加一个div...解决如下：
``` html
/* 官方解释：UC浏览器判断到页面上文字居多时，会自动放大字体优化移动用户体验。 */
<meta name="wap-font-scale" content="no">
```
<!-- more -->
#### 闪屏
消除transition闪屏的两种方法，注意是给运动的元素增加
``` css
/* 设置内嵌的元素在3D空间如何呈现：保留3D */
-webkit-transform-style: preserve-3d;
```
``` css
/* 设置进行转换元素的背面在面对用户时隐藏（动画闪白问题的修复方案） */
-webkit-backface-visibility: hidden;
```
#### 横竖屏字体改变
``` css
/* IOS浏览器横屏时会重置字体大小，设置text-size-adjust为none可以解决IOS上的问题，但桌面端Safari的字体缩放功能会失效，因此设置text-size-adjust:100%最佳 */
/* Chrome27之前的版本设置-webkit-text-size-adjust属性可以设置并显示小于12px的字体，之后取消了此属性，要想现实小于12px字体可以使用：transform: scale()方法 */
/* 碰到过微信中字体渲染的一个bug，既给不同地方的文字设置相同字号，显示的结果却不一样，解决办法也是设置-webkit-text-size-adjust: 100% */
html{
    -webkit-text-size-adjust: 100%;
}
```
#### 去除点击高亮
``` css
a,input,button{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
```
#### 去除IOS默认样式
``` css
input,button{
    outline-style: none;
    -webkit-appearance: none;
    border-radius: 0;
}
```
#### 禁止选中文本
``` css
html,body{
    -webkit-user-select: none;
    user-select: none;
}
```
#### 怪异盒模型
``` css
/* 适用于使用怪异盒模型较多的情况，较少时还是单独设置最好，下面这样使用的好处是能实现继承 */
html{
    box-sizing: border-box;
}
*,*:before,*:after{
    box-sizing: inherit;
}
```
#### 硬件加速
``` css
/* 有时候想开启硬件加速，但又不想对其他的功能造成影响 */
.box{
    transform: translateZ(0);
    /* 或... */
    transform: translate3d(0,0,0);
}
```
#### 禁止长按弹出菜单
``` css
a,img{
    -webkit-touch-callout: none;
}
```
#### body overflow:hidden失效
解决：给body加相对定位
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    html,body {
        height: 100%;
        overflow: hidden;
    }
    body {
        margin: 0;
        position: relative;
    }
    header {
        position: absolute;
        left: 0;
        width: 200%;
        height: 40px;
        line-height: 40px;
        background-color: rgba(0, 0, 0, .4);
        color: #fff;
        text-align: center;
    }
    section {
        padding-top: 40px;
    }
    #wrap {
        height: 100%;
        /* -webkit-overflow-scrolling: touch;会导致header相对于body的定位失效 */
        overflow-y: scroll;
    }
    </style>
</head>

<body>
    <div id="wrap">
        <header>我是头部</header>
        <section>
            1我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容1
        </section>
    </div>
</body>

</html>
```
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    html{
        height: 100%;
        overflow: hidden;
        /* position: relative; */
    }
    body{
        height: 100%;
        margin: 0;
        overflow: hidden;
        position: relative;
    }
    section{
        padding-top: 40px;
        height: 100%;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
    }
    header{
        position: absolute;
        left: 0;
        width: 200%;/* 左右滚动条 */
        height: 40px;
        line-height: 40px;
        background-color: rgba(0,0,0,.4);
        color: #fff;
        text-align: center;
    }
    </style>
</head>
<body>
    <header>我是头部</header>
    <section>
        1我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>2我是内容<br>
    </section>
</body>
</html>
```
#### 事件绑定
``` javascript
oDiv.ontouchstart = function(){// 传统方式绑定，Chrome中模拟有时不灵
    // ...  
};
oDiv.addEventListener("touchstart",function(){// 采用标准的绑定方式
    // ...
});
```
### Fixed问题
软键盘唤起后页面中的fixed元素失效或变成absolute的特性
解决1：isScroll.js
解决2：滚动页面中的main
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    header,footer,main {
        display: block;
    }
    header {
        /* 注意 */
        width: 200%;
        /* absolute 时 body overflow:hidden失效，外面可以包一层解决 */
        position: fixed;
        height: 50px;
        left: 0;
        right: 0;
        top: 0;
        background-color: red;
    }
    footer {
        position: fixed;
        height: 34px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: pink;
    }
    main {
        position: absolute;
        top: 50px;
        right: 0;
        bottom: 34px;
        left: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    </style>
</head>

<body>
    <!-- fixed定位的头部 -->
    <header> </header>
    <!-- 可以滚动的区域 -->
    <main>
        <div class="container">
            1我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容<br>我是内容
            <br>我是内容<br>我是内容<br>我是内容<br>我是内容1
        </div>
    </main>
    <!-- fixed定位的底部 -->
    <footer>
        <input type="text" placeholder="Footer..." />
        <button class="submit">提交</button>
    </footer>
</body>

</html>
```
### 缩放适配
统一限定一个目标宽，根据不同设备的screen.width去做缩放处理
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> -->
    <title>Document</title>
    <script>
    (function(){
        var w = window.screen.width;
        // var w2 = document.documentElement.getBoundingClientRect().width;// 980
        var targetW = 750;
        var scale = w /  targetW;
        var meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = "user-scalable=no, initial-scale="+ scale +", maximum-scale="+ scale +", minimum-scale="+ scale +"";
        document.head.appendChild(meta);
    })();
    </script>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    li{
        list-style-type: none;
    }
    .wrap{
        padding-right: 12px;
        padding-left: 12px;
    }
    .wrap ul{
        margin-right: -7px;
    }
    .wrap li{
        margin-top: 7px;
        margin-right: 7px;
        width: 176px;
        height: 168px;
        background-color: red;
        float: left;
    }
    </style>
</head>
<body>
    <div class="wrap">
        <ul>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
            <li>
                <img src="aa.jpg" height="168" width="176" alt="">
            </li>
        </ul>
    </div>
</body>
</html>
```
### REM适配
等分deviceWidth的结果设置为根节点的fontSize，用REM适配，和淘宝的flexible同理
``` html
<meta name="viewport" content="width=device-width, user-scalable=no">
<script>
(function(){
    var html = document.documentElement;
    var hWidth = html.getBoundingClientRect().width;// device = device-width
    html.style.fontSize = hWidth / 15 + "px";// 说明15rem怼满，750设计稿的话除以50
})();
</script>
```
### Flex布局
#### 语法
``` css
/* 旧 */
display: -webkit-box;
-webkit-box-orient: horizontal;/* 设置主轴方向为水平方向(默认) */
-webkit-box-direction: reverse;/* 只反序不靠右，一般需要配合-webkit-box-orient使用 */
-webkit-box-pack: start;/* 管理富裕空间：元素在主轴开始位置，富裕空间在主轴结束位置，老版相对新版缺失justify属性 */
-webkit-box-align: end;/* 侧轴富裕空间管理：主轴侧轴和-webkit-box-orient有关 */

-webkit-box-flex: 1;
-webkit-box-ordinal-group: 3;/* 老版，最小值是1，比1小的也会处理成1 */
/* 新 */
display: flex;
flex-direction: row;/* 设置主轴方向为水平方向(默认) */
flex-direction: row-reverse;/* 主轴元素排列方向(row-reverse:主轴为水平靠右并反序) */
justify-content: flex-start;/* 管理富裕空间：元素在主轴开始位置，富裕空间在主轴结束位置 */
align-items: flex-start;/* 侧轴富裕空间管理：主轴侧轴和flex-direction有关 */

flex-grow: 1;
order: 3;/* 序号越小越靠前，支持0和负值 */
```
#### 上下垂直居中
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    #box{
        height: 200px;
        border: 1px solid #333;
        /* 新版 */
        display: flex;
    }
    #box div{
        width: 50px;
        height: 50px;
        background-color: green;
        margin: auto;/*配合父级display:flex;*/
    }
    </style>
</head>
<body>
    <div id="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</body>
</html>
```
#### 实战
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Document</title>
    <script>
    (function(){
        var html = document.documentElement;
        var hWidth = html.getBoundingClientRect().width;// device width
        html.style.fontSize = hWidth / 15 + "px";// 15rem怼满，除以50，1rem=50px
    })();
    </script>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    .rows{
        display: -webkit-box;
        display: flex;
        padding: .4rem .5rem 0;
    }
    .rows div{
        /* 受内容长度的影响，解决width:0; */
        width: 0;
        -webkit-box-flex: 1;
        flex-grow: 1;
    }
    .rows div a{
        font-size: 0.44rem;
        color: #666;
        text-align: center;
        text-decoration: none;
        line-height: 1.04rem;
        display: block;
    }
    .rows div a:before{
        content: "";
        display: block;
        margin: 0 auto;
        width: 1.72rem;
        height: 1.72rem;
        background-color: #f00;
        border-radius: 50%;
        background: url(icon.png) no-repeat;
        /* 整图的大小 */
        background-size: 9rem 3.6rem;
    }
    .rows div:nth-of-type(1) a:before{
        background-position: 0 0;
    }
    .rows div:nth-of-type(2) a:before{
        background-position: -1.8rem 0;
    }
    .rows div:nth-of-type(3) a:before{
        background-position: -3.6rem 0;
    }
    .rows div:nth-of-type(4) a:before{
        background-position: -5.4rem 0;
    }
    .rows div:nth-of-type(5) a:before{
        background-position: -7.2rem 0;
    }
    .rows:nth-of-type(2) div:nth-of-type(1) a:before{
        background-position: 0 -1.8rem;
    }
    .rows:nth-of-type(2) div:nth-of-type(2) a:before{
        background-position: -1.8rem -1.8rem;
    }
    .rows:nth-of-type(2) div:nth-of-type(3) a:before{
        background-position: -3.6rem -1.8rem;
    }
    .rows:nth-of-type(2) div:nth-of-type(4) a:before{
        background-position: -5.4rem -1.8rem;
    }
    .rows:nth-of-type(2) div:nth-of-type(5) a:before{
        background-position: -7.2rem -1.8rem;
    }
    </style>
</head>
<body>
    <div class="rows">
        <div>
            <a href="javascript:;">天猫</a>
        </div>
        <div>
            <a href="javascript:;">聚划算</a>
        </div>
        <div>
            <a href="javascript:;">天猫</a>
        </div>
        <div>
            <a href="javascript:;">天猫</a>
        </div>
        <div>
            <a href="javascript:;">天猫</a>
        </div>
    </div>
    <div class="rows">
        <div>
            <a href="javascript:;">天猫</a>
        </div>
        <div>
            <a href="javascript:;">聚划算</a>
        </div>
        <div>
            <a href="javascript:;">天猫</a>
        </div>
        <div>
            <a href="javascript:;">天猫</a>
        </div>
        <div>
            <a href="javascript:;">天猫</a>
        </div>
    </div>
</body>
</html>
```
### 媒介查询
``` css
@media all and (min-width:500px){/* 大于等于 */
    <!-- ... -->
}
```
### 阻止默认(ev.preventDefault())
#### 点透问题
移动端的点透：当上层元素发生点击行为，下层元素也有点击特性，在300ms之内，如果上层元素消失或者隐藏，目标点也会漂移到下层元素身上，就会触发点击行为。
解决1：下层不要使用点击(焦点)特性的元素。
解决2：阻止默认事件，a链接被阻止了，不能跳转，需要人工跳转，解决IOS10 Safari下禁止缩放失效。
``` javascript
document.addEventListener('touchstart',function(ev){
    ev.preventDefault();
});
var oDiv = document.getElementById("div1");
oDiv.addEventListener("touchend",function(){
    this.style.display = "none";
});
var oA = document.getElementById("a");
oA.addEventListener('touchend',function(){
    window.location.href = "http://www.baidu.com";
    // window.open
});
```
#### 缩放问题
``` javascript
IOS10下禁止缩放失效
```
#### html overflow:hidden失效
``` javascript
IOS下body,html overflow:hidden失效
```
#### 上下橡皮筋回弹效果
``` javascript
禁止上下橡皮筋回弹效果
```
#### 系统默认行为
``` javascript
禁止长按选中文字，选中图片，系统默认菜单等
```
### Transform
#### rotate()
``` javascript
document.addEventListener("touchstart",function(e){
    e.preventDefault();
});
window.onload = function(){
    var oDiv = document.querySelector("#div");
    oDiv.addEventListener("touchend",function(){
        oDiv.style.WebkitTransform = oDiv.style.transform = "rotate(90deg)";
    });
};
```
#### skew()
``` javascript
document.addEventListener("touchstart",function(e){
    e.preventDefault();
});
window.onload = function(){
    var oDiv = document.querySelector("#div");
    oDiv.addEventListener("touchend",function(){
        // 默认x轴
        oDiv.style.WebkitTransform = oDiv.style.transform = "skew(40deg)";
    });
};
```
#### scale()
``` javascript
document.addEventListener("touchstart",function(e){
    e.preventDefault();
});
window.onload = function(){
    var oDiv = document.querySelector("#div");
    oDiv.addEventListener("touchend",function(){
        // 默认x和y都缩放
        oDiv.style.WebkitTransform = div.style.transform = "scale(2)";
    });
};
```
#### translate()
``` javascript
document.addEventListener("touchstart",function(e){
    e.preventDefault();
});
window.onload = function(){
    var oDiv = document.querySelector("#div");
    oDiv.addEventListener("touchend",function(){
        // 只写一个参数x位移
        oDiv.style.WebkitTransform = oDiv.style.transform = "translate(50px,50px)";
        // 默认transform-origin: center center;
    });
};
```
#### translate执行顺序问题
先写后执行
``` javascript
var oDiv = document.querySelector("#div1");
oDiv.style.cssText = "width: 100px;height: 100px;transition: 1s;background-color: red;";

oDiv.addEventListener("touchend",function(){
    // transform: translateX(500px) scale(.5);
    // 先写后执行，下面这种写法scale也会把translateX也缩放了一半
    oDiv.style.WebkitTransform = oDiv.style.transform = "scale(.5) translateX(500px)";
});
```
先位移/缩放在矩阵中的不同实现
``` css
div{
    transform: scaleX(.5) translate(100px,50px);
    transform: matrix(.5,0,0,1,50,50);
    
    transform: translate(100px,50px) scaleX(.5);
    transform: matrix(.5,0,0,1,100,50);
}
```
#### translate模拟滑屏
方法1：elTranslateY = offsetTop + disPoint;
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    body{
        margin: 0;
    }
    html,body{
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    header{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background-color: #ccc;
    }
    #wrap{
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
    }
    #list{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #list li{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #000;
        text-indent: 20px;
    }
    </style>
    <script>
    document.addEventListener("touchstart",function(e){
        e.preventDefault();
    });
    function setListInner(){
        var list = document.querySelector("#list");
        var inner = "";
        for(var i = 0;i < 100;i ++){
            inner += "<li>"+ i +"</li>";
        }
        list.innerHTML = inner;
    }
    window.onload = function(){
        setListInner();
        
        var oWrap = document.querySelector("#wrap");
        var oList = document.querySelector("#list");

        oList.addEventListener("touchstart",start);
        oList.addEventListener("touchmove",move);

        var startPoint = 0;
        var movePoint = 0;
        var disPoint = 0;

        var offsetTop = 0;
        var elTranslateY = 0;

        function start(e){
            startPoint = e.changedTouches[0].pageY;

            offsetTop = elTranslateY;
        }
        function move(e){
            movePoint = e.changedTouches[0].pageY;
            disPoint = movePoint - startPoint;

            elTranslateY = offsetTop + disPoint;// mark

            oList.style.WebkitTransform = oList.style.transform = "translateY("+ elTranslateY +"px)";
        }
    };
    </script>
</head>
<body>
    <header>滑屏</header>
    <div id="wrap">
        <ul id="list">
            
        </ul>
    </div>
</body>
</html>
```
方法2：startPoint = ev.changedTouches[0].pageY - offsetTop;
``` javascript
document.addEventListener("touchstart",function(e){
    e.preventDefault();
});
function setListInner(){
    var list = document.querySelector("#list");
    var inner = "";
    for(var i = 0;i < 100;i ++){
        inner += "<li>"+ i +"</li>";
    }
    list.innerHTML = inner;
}
window.onload = function(){
    setListInner();
    
    var oWrap = document.querySelector("#wrap");
    var oList = document.querySelector("#list");

    oList.addEventListener("touchstart",start);
    oList.addEventListener("touchmove",move);

    var startPoint = 0;
    var movePoint = 0;
    var offsetTop = 0;
    var disY = 0;

    function start(ev){
        startPoint = ev.changedTouches[0].pageY - offsetTop;
    }
    function move(ev){
        movePoint = ev.changedTouches[0].pageY;
        disY = movePoint - startPoint;
        offsetTop = disY;
        oList.style.transform = "translateY("+ disY +"px)";
    }
};
```
#### 获取transform
##### 问题
``` javascript
oDiv.style.WebkitTransform = oDiv.style.transform = "scale(.5) translateX(100px)";
console.log(getComputedStyle(oDiv)["transform"]);// 矩阵：matrix(0.5, 0, 0, 0.5, 50, 0)
console.log(oDiv.style.transform);// 字符串：scale(0.5) translateX(100px)
```
##### 解决
由于没有办法根据获取的matrix反推出角度，可以通过JS设置/获取
``` javascript
function cssTransform(element,attr,val){
    if(!element.transform){// 不存在
        element.transform = {};
    }
    // {translateX: 100, translateY: 50}
    // 获取
    if(typeof val == "undefined"){
        var val = element.transform[attr];
        if(!element.transform[attr]){// undefined的话，代表没有设置
            switch(attr){
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    element.transform[attr] = 100;
                break;
                default:// 旋转，位移，斜切
                    element.transform[attr] = 0;
            }
        }
        return element.transform[attr];// 只能获取JS设置的，css中直接设置的获取不到，统一通过该方法设置和获取
    }
    // 设置
    else{
        element.transform[attr] = val;
        // element.style.WebkitTransform = element.style.transform = attr + "("+ val +"deg)";
        var transformVal = "";
        for(var s in element.transform){
            // console.log(s);
            switch(s){
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    transformVal += " " + s + "("+ element.transform[s] / 100 +")";// 高级浏览器会自动加空格，这里不能再用val了
                    break;
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "skewX":
                case "skewY":
                    transformVal += " " + s + "("+ element.transform[s] +"deg)";
                    break;
                default:// 位移
                    transformVal += " " + s + "("+ element.transform[s] +"px)";
            }
        }
        element.style.WebkitTransform = element.style.transform = transformVal;
    }
}
```
##### 使用
现炒现卖：实现每次点击旋转30deg
``` javascript
var oDiv = document.querySelector("#div");
oDiv.addEventListener("touchend",function(e){
    var deg = cssTransform(this,"rotate");
    deg += 30;
    cssTransform(this,"rotate",deg);
});
```
#### 关于矩阵
matrix(a,b,c,d,e,f)，默认是matrix(1,0,0,1,0,0)
``` html
位移：
    x轴：
        e + x
    y轴：
        f + y

缩放：
    x轴：
        a = a * x(倍数)
        c = c * x
        e = e * x
    y轴：
        b = b * x
        d = d * x
        f = f * x

斜切：
    x轴：
        c = Math.tan(deg * Math.PI / 180)// 接收的参数是弧度
    y轴：
        b = Math.tan(deg * Math.PI / 180)

旋转：
    a = Math.cos(deg * Math.PI / 180)
    b = Math.sin(deg * Math.PI / 180)
    c = - Math.sin(deg * Math.PI / 180)
    d = Math.cos(deg * Math.PI / 180)
```
举例
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    div{
        width: 100px;
        height: 100px;
        background-color: red;
    }
    </style>
    <script>
    document.addEventListener("touchstart",function(e){
        e.preventDefault();
    });
    window.onload = function(){
        var a = 1;
        var b = 0;
        var c = 0;
        var d = 1;

        var oDiv = document.getElementById("div1");
        deg = 45;

        // c = Math.tan(deg * Math.PI / 180)
        // oDiv.style.WebkitTransform = oDiv.style.transform = "skewX(45deg)";
        // oDiv.style.WebkitTransform = oDiv.style.transform = "matrix("+ a +","+ b +","+ c +","+ d +",0,0)";

        a = Math.cos(deg * Math.PI / 180);
        b = Math.sin(deg * Math.PI / 180);
        c = - Math.sin(deg * Math.PI / 180);
        d = Math.cos(deg * Math.PI / 180);
        // oDiv.style.WebkitTransform = oDiv.style.transform = "rotate(45deg)";
        oDiv.style.WebkitTransform = oDiv.style.transform = "matrix("+ a +","+ b +","+ c +","+ d +",0,0)";
    };
    </script>
</head>
<body>
    <div id="div1"></div>
</body>
</html>
```
#### perspective
一般加在父级上，例如rotateX，rotateY需要加上景深才能看到效果
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    #wrap{
        width: 100px;
        height: 100px;
        padding: 50px;
        /* 景深 */
        -webkit-perspective: 200px;
        border: 1px solid #ccc;
    }
    #div1{
        width: 100px;
        height: 100px;
        background-color: red;
        transition: 1s;
    }
    </style>
    <script>
    document.addEventListener("touchstart",function(e){
        e.preventDefault();
    });
    window.onload = function(){
        // rotate3d()
        // translate3d()
        var oDiv = document.getElementById("div1");
        var oWrap = document.getElementById("wrap");
        oWrap.addEventListener("touchend",function(){
            // rotateX和rotateY要加景深才能看到效果
            oDiv.style.WebkitTransform = oDiv.style.transform = "rotateY(60deg)";
        });
    };
    </script>
</head>
<body>
    <div id="wrap">
        <div id="div1"></div>
    </div>
</body>
</html>
```
#### transform-style
![](/resources/images/transform-style.png)
元素在做3d变换时，是否保留子元素的3d变换
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    #wrap{
        width: 100px;
        height: 100px;
        padding: 50px;
        /* 景深 */
        -webkit-perspective: 200px;        
        border: 1px solid #ccc;
    }
    #div1{
        width: 100px;
        height: 100px;
        background-color: red;
        transition: 3s;
        /* transform-style: flat; */
        transform-style: preserve-3d;
    }
    #div1 span{
        width: 100px;
        height: 100px;
        background-color: yellow;
        display: block;
        transform: rotateX(60deg);
    }
    </style>
    <script>
    document.addEventListener("touchstart",function(e){
        e.preventDefault();
    });
    window.onload = function(){
        var oDiv = document.getElementById("div1");
        var oWrap = document.getElementById("wrap");
        oWrap.addEventListener("touchend",function(){
            oDiv.style.WebkitTransform = oDiv.style.transform = "rotateY(360deg)";
        });
    };
    </script>
</head>
<body>
    <div id="wrap">
        <div id="div1">
            <span></span>
        </div>
    </div>
</body>
</html>
```
#### perspective-origin
视角方向，默认perspective-origin: center center;从中间看
#### transform-origin
变换基准点
#### backface-visibility
隐藏背面：和父级角度相对的元素就是背面，例如一个元素transform: rotateY(180deg);
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    #wrap{
        width: 100px;
        height: 100px;
        padding: 50px;
        -webkit-perspective: 200px;
        perspective: 200px;
        border: 1px solid #ccc;
    }
    #div1{
        width: 100px;
        height: 100px;
        transition: 3s;
        /* transform-style: flat; */
        transform-style: preserve-3d;
        position: relative;
    }
    #div1 span{
        position: absolute;
        font-size: 50px;
        text-align: center;
        color: #fff;
        /* 同时隐藏了两个span旋转180deg时的情况 */
        backface-visibility: hidden;
    }
    #div1 span:nth-of-type(1){
        top: 25px;
        left: 25px;
        width: 50px;
        height: 50px;
        background-color: red;
    }
    #div1 span:nth-of-type(2){
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        line-height: 100px;
        background-color: green;
        transform: rotateY(180deg);
    }
    </style>
    <script>
    document.addEventListener("touchstart",function(e){
        e.preventDefault();
    });
    window.onload = function(){
        
        var oDiv = document.getElementById("div1");
        var oWrap = document.getElementById("wrap");
        oWrap.addEventListener("touchend",function(){
            oDiv.style.WebkitTransform = oDiv.style.transform = "rotateY(360deg)";
        });
    };
    </script>
</head>
<body>
    <div id="wrap">
        <div id="div1">
            <span>正</span>
            <span>反</span> 
        </div>
    </div>
</body>
</html>
```
#### 旋转小Demo
![](/resources/images/rotate.png)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    #wrap{
        margin: 50px auto;
        width: 100px;
        height: 100px;
        padding: 50px;
        border: 1px solid #333;
        perspective: 200px;
    }
    #box{
        width: 100px;
        height: 100px;
        position: relative;
        transition: 10s;
        /* 元素在做3d变换时，保留子元素的3d变换 */
        transform-style: preserve-3d;
    }
    #box span{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        line-height: 100px;
        text-align: center;
        font-size: 50px;
        color: #fff;
        backface-visibility: hidden;
        /* 元素在做3d变换时，保留子元素的3d变换 */
        transform-style: preserve-3d;
    }
    #box span:nth-of-type(1){
        background-color: green;
    }
    #box span:nth-of-type(2){
        background-color: red;
        transform: rotateY(180deg);
    }
    #box em{
        display: block;/* 必须 */
        font-style: normal;
        /* 往前走 */
        transform: translateZ(20px);
    }
    </style>
</head>
<body>
    <div id="wrap">
        <div id="box">
            <span><em>正</em></span>
            <span><em>反</em></span>
        </div>
    </div>
    <script>
    var oWrap = document.querySelector("#wrap");
    var oBox = document.querySelector("#box");
    oWrap.addEventListener("touchend",function(){
        oBox.style.WebkitTransform = oBox.style.transform = "rotateY(720deg)";
    });
    </script>
</body>
</html>
```
#### MTween的使用
回调
``` javascript
var oDiv = document.getElementById("box");
fn1();
function fn1(){
    MTween({
        el: oDiv,
        target: {
            scale: 0,// 先旋转再缩放
            rotate: 720
        },
        time: 2000,
        type: "easeOut",
        callBack: fn2
    });
}
function fn2(){
    MTween({
        el: oDiv,
        target: {
            scale: 100,
            rotate: 0
        },
        time: 2000,
        type: "easeOut",
        callBack: fn1
    });
}
```
综合运用
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    html,body{
        height: 100%;
    }
    #wrap{
        height: 100%;
        position: relative;
        perspective: 200px;
    }
    #wrap div{
        /* 元素3d变换时子元素也拥有 */
        transform-style: preserve-3d;
        position: absolute;
        width: 40%;
        top: 40%;
        left: 30%;
        display: none;
        /* 不能加在这里，因为后面这里用到transform:translateZ，和css中的冲突 */
        /* animation: rotate 2s linear infinite; */
    }
    #wrap img{
        width: 100%;
        position: absolute;
        animation: move 1.5s linear infinite;
    }
    @keyframes move{
        0%{
            transform: rotateY(0);
        }
        100%{
            transform: rotateY(360deg);
        }
    }
    </style>
</head>
<body>
    <div id="wrap">
        <div id="img1">
            <img src="./logo2.png" alt="">
        </div>
        <div id="img2">
            <img src="./logo3.png" alt="">
        </div>
    </div>
    <script src="m.Tween2.js"></script>
    <script>
    var oImg1 = document.querySelector("#img1");
    var oImg2 = document.querySelector("#img2");
    css(oImg1,"translateZ",-1000);// -1000是number类型的而非字符串
    css(oImg2,"translateZ",-1000);
    fn1();
    function fn1(){
        oImg2.style.display = "none";
        oImg1.style.display = "block";
        MTween({
            el: oImg1,
            target: {
                translateZ: 0
            },
            time: 240,
            type: "easeIn",
            callBack: fn2
        });
    }
    function fn2(){// 收
        setTimeout(function(){
            MTween({
                el: oImg1,
                target: {
                    translateZ: -1000
                },
                time: 1500,
                type: "easeOut",
                callBack: fn3
            });
        },2000);
    }
    function fn3(){
        oImg1.style.display = "none";
        oImg2.style.display = "block";
        MTween({
            el: oImg2,
            target: {
                translateZ: 0
            },
            time: 240,
            type: "easeIn",
            callBack: fn4
        });
    }
    function fn4(){// 收
        setTimeout(function(){
            MTween({
                el: oImg2,
                target: {
                    translateZ: -1000
                },
                time: 1500,
                type: "easeOut",
                callBack: fn1
            });
        },2000);
    }
    </script>
</body>
</html>
```
### 模拟滑屏
#### 布局
上中下分别绝对定位
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    body,html{
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    header{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background-color: #000;
    }
    footer{
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        background-color: #000;
        color: #fff;
        text-align: center;
        font-size: 20px;
    }
    #wrap{
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 40px;
        left: 0;
    }
    #list{
        list-style: none;
    }
    #list li{
        height: 30px;
        line-height: 30px;
        text-indent: 30px;
        font-size: 16px;
        border-bottom: 1px solid #333;
    }
    </style>
</head>
<body>
    <header id="header">好好学习</header>
    <section id="wrap">
        <ul id="list">
        </ul>
    </section>
    <footer id="footer">天天向上</footer>
    <script>
    function createList(){
        var list = document.querySelector("#list");
        var inner = "";
        for(var i = 0;i < 100;i ++){
            inner += "<li>这是第"+ i +"个</li>";
        }
        list.innerHTML = inner;
    }
    createList();
    </script>
</body>
</html>
```
#### 动起来
``` javascript
var list = document.querySelector("#list");

var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop

css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop
});
list.addEventListener("touchmove",function(e){
    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值加差值是移动距离
    css(list,"translateY",translateY);
});
```
#### 滑屏缓冲
``` javascript
var list = document.querySelector("#list");

var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop

var lastDis = 0;
var lastY = 0;
var lastTime = 0;// 上一次时间
var lastTimeDis = 0;// 时间差

css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");

    lastY = startEl;
    lastTime = new Date().getTime();
    lastDis = 0;
    lastTimeDis = 0;
});
list.addEventListener("touchmove",function(e){
    var nowTime = new Date().getTime();

    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值减差值是移动距离
    css(list,"translateY",translateY);

    lastDis = translateY - lastY;// 距离
    lastY = translateY;
    lastTimeDis = nowTime - lastTime;// 时间
    lastTime = nowTime;
});
list.addEventListener("touchend",function(e){
    // console.log(lastDis,lastTimeDis);
    // 速度 = 距离 / 时间
    var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
    var target = Math.round(speed * 30 + css(list,"translateY"));
    // console.log(target);
    MTween({
        el: list,
        target: {
            translateY: target
        },
        time: Math.abs(parseInt(target * 1.5)),
        type: "easeOut"
    });
});
```
#### 解决按下再抬起不动
``` javascript
var list = document.querySelector("#list");

var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop
var lastDis = 0;
var lastY = 0;
var lastTime = 0;// 上一次时间
var lastTimeDis = 0;// 时间差

css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop

    lastY = startEl;
    lastTime = new Date().getTime();
    lastDis = 0;
    lastTimeDis = 0;
});
list.addEventListener("touchmove",function(e){
    var nowTime = new Date().getTime();

    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值减差值是移动距离
    css(list,"translateY",translateY);

    lastDis = translateY - lastY;// 距离
    lastY = translateY;
    lastTimeDis = nowTime - lastTime;// 时间
    lastTime = nowTime;
});
list.addEventListener("touchend",function(e){
    // console.log(lastDis,lastTimeDis);
    // 速度 = 距离 / 时间
    var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
    speed = lastTimeDis <= 0 ? 0 : speed;// 负的时间差
    
    var target = Math.round(speed * 30 + css(list,"translateY"));
    console.log(target);// 按下再抬起时这里是NaN，一个数除以了0，0/0是NaN，1/0是无限制
    console.log(target);// 所以按下再抬起时这里也是NaN
    MTween({
        el: list,
        target: {
            translateY: target
        },
        time: Math.abs(parseInt(target * 1.5)),
        type: "easeOut"
    });
});
```
#### 限制范围
``` javascript
var wrap = document.querySelector("#wrap");
var list = document.querySelector("#list");

var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop
var lastDis = 0;
var lastY = 0;
var lastTime = 0;// 上一次时间
var lastTimeDis = 0;// 时间差
var maxTranslate = wrap.clientHeight - list.offsetHeight;
css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    maxTranslate = wrap.clientHeight - list.offsetHeight;// start时可能添加内容进去，重新来一次
    clearInterval(list.timer);

    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop

    lastY = startEl;
    lastTime = new Date().getTime();
    lastDis = 0;
    lastTimeDis = 0;
});
list.addEventListener("touchmove",function(e){
    var nowTime = new Date().getTime();

    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值减差值是移动距离
    css(list,"translateY",translateY);

    lastDis = translateY - lastY;// 距离
    lastY = translateY;
    lastTimeDis = nowTime - lastTime;// 时间
    lastTime = nowTime;
});
list.addEventListener("touchend",function(e){
    var type = "easeOut";
    // console.log(lastDis,lastTimeDis);
    // 速度 = 距离 / 时间
    var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
    speed = lastTimeDis <= 0 ? 0 : speed;// 负的时间差
    
    var target = Math.round(speed * 30 + css(list,"translateY"));
    console.log(target);// 按下再抬起时这里是NaN，一个数除以了0，0/0是NaN，1/0是无限制
    console.log(target);// 所以按下再抬起时这里也是NaN
    if(target > 0){// 超出了
        target = 0;
        type = "backOut";// 回弹
    }
    else if(target < maxTranslate){
        target = maxTranslate;
        type = "backOut";
    }
    MTween({
        el: list,
        target: {
            translateY: target
        },
        time: Math.round(Math.abs(target - css(list,"translateY")) * 1.5),//
        type: type
    });
});
```
#### 添加滚动条
``` javascript
var wrap = document.querySelector("#wrap");
var list = document.querySelector("#list");

var scrollBar = document.createElement("div");
var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop
var lastDis = 0;
var lastY = 0;
var lastTime = 0;// 上一次时间
var lastTimeDis = 0;// 时间差
var maxTranslate = wrap.clientHeight - list.offsetHeight;
scrollBar.style.cssText = "width:6px;background:rgba(0,0,0,.5);position:absolute;top:0;right:0;border-radius:3px;height:100px;opacity:0;transition:.3s opacity;";
wrap.appendChild(scrollBar);

css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    maxTranslate = wrap.clientHeight - list.offsetHeight;// start时可能添加内容进去，重新来一次
    clearInterval(list.timer);

    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop

    lastY = startEl;
    lastTime = new Date().getTime();
    lastDis = 0;
    lastTimeDis = 0;

    scrollBar.style.opacity = 1;
});
list.addEventListener("touchmove",function(e){
    var nowTime = new Date().getTime();

    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值减差值是移动距离
    css(list,"translateY",translateY);

    lastDis = translateY - lastY;// 距离
    lastY = translateY;
    lastTimeDis = nowTime - lastTime;// 时间
    lastTime = nowTime;
});
list.addEventListener("touchend",function(e){
    var type = "easeOut";
    // console.log(lastDis,lastTimeDis);
    // 速度 = 距离 / 时间
    var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
    speed = lastTimeDis <= 0 ? 0 : speed;// 负的时间差
    
    var target = Math.round(speed * 30 + css(list,"translateY"));
    console.log(target);// 按下再抬起时这里是NaN，一个数除以了0，0/0是NaN，1/0是无限制
    console.log(target);// 所以按下再抬起时这里也是NaN
    if(target > 0){// 超出了
        target = 0;
        type = "backOut";// 回弹
    }
    else if(target < maxTranslate){
        target = maxTranslate;
        type = "backOut";
    }
    MTween({
        el: list,
        target: {
            translateY: target
        },
        time: Math.round(Math.abs(target - css(list,"translateY")) * 1.5),//
        type: type,
        callBack: function(){
            scrollBar.style.opacity = 0;
        }
    });
});
```
#### 运动滚动条
``` javascript
var wrap = document.querySelector("#wrap");
var list = document.querySelector("#list");

var scrollBar = document.createElement("div");
var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop
var lastDis = 0;
var lastY = 0;
var lastTime = 0;// 上一次时间
var lastTimeDis = 0;// 时间差
var maxTranslate = wrap.clientHeight - list.offsetHeight;
var scale = wrap.clientHeight / list.offsetHeight;

scrollBar.style.cssText = "width:6px;background:rgba(0,0,0,.5);position:absolute;top:0;right:0;border-radius:3px;opacity:0;transition:.3s opacity;";
wrap.appendChild(scrollBar);

css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    maxTranslate = wrap.clientHeight - list.offsetHeight;// start时可能添加内容进去，重新来一次
    scale = wrap.clientHeight / list.offsetHeight;// 会变化重新取一下
    scrollBar.style.height = wrap.clientHeight * scale + "px";

    clearInterval(list.timer);

    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop

    lastY = startEl;
    lastTime = new Date().getTime();
    lastDis = 0;
    lastTimeDis = 0;

    scrollBar.style.opacity = 1;
});
list.addEventListener("touchmove",function(e){
    var nowTime = new Date().getTime();

    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值减差值是移动距离
    css(list,"translateY",translateY);
    css(scrollBar,"translateY",- translateY * scale);

    lastDis = translateY - lastY;// 距离
    lastY = translateY;
    lastTimeDis = nowTime - lastTime;// 时间
    lastTime = nowTime;
});
list.addEventListener("touchend",function(e){
    var type = "easeOut";
    // console.log(lastDis,lastTimeDis);
    // 速度 = 距离 / 时间
    var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
    speed = lastTimeDis <= 0 ? 0 : speed;// 负的时间差
    
    var target = Math.round(speed * 30 + css(list,"translateY"));
    console.log(target);// 按下再抬起时这里是NaN，一个数除以了0，0/0是NaN，1/0是无限制
    console.log(target);// 所以按下再抬起时这里也是NaN
    if(target > 0){// 超出了
        target = 0;
        type = "backOut";// 回弹
    }
    else if(target < maxTranslate){
        target = maxTranslate;
        type = "backOut";
    }
    MTween({
        el: list,
        target: {
            translateY: target
        },
        time: Math.round(Math.abs(target - css(list,"translateY")) * 1.5),//
        type: type,
        callBack: function(){
            scrollBar.style.opacity = 0;
        },
        callIn: function(){
            var translateY = css(list,"translateY");
            css(scrollBar,"translateY",- translateY * scale);
        }
    });
});
```
#### 解决内容不满一屏时的问题
``` javascript
var wrap = document.querySelector("#wrap");
var list = document.querySelector("#list");

var scrollBar = document.createElement("div");
var startPoint = 0;
var startEl = 0;// 元素按下时的坐标，即offsetTop
var lastDis = 0;
var lastY = 0;
var lastTime = 0;// 上一次时间
var lastTimeDis = 0;// 时间差
var maxTranslate = wrap.clientHeight - list.offsetHeight;
var scale = wrap.clientHeight / list.offsetHeight;
list.style.minHeight = "100%";

scrollBar.style.cssText = "width:6px;background:rgba(0,0,0,.5);position:absolute;top:0;right:0;border-radius:3px;opacity:0;transition:.3s opacity;";
wrap.appendChild(scrollBar);

css(list,"translateZ",0.01);// 开启硬件加速

list.addEventListener("touchstart",function(e){
    maxTranslate = wrap.clientHeight - list.offsetHeight;// start时可能添加内容进去，重新来一次
    if(maxTranslate >= 0){
        scrollBar.style.display = "none";
    }
    else{
        scrollBar.style.display = "block";
    }
    scale = wrap.clientHeight / list.offsetHeight;// 会变化重新取一下
    scrollBar.style.height = wrap.clientHeight * scale + "px";

    clearInterval(list.timer);

    startPoint = e.changedTouches[0].pageY;
    startEl = css(list,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop

    lastY = startEl;
    lastTime = new Date().getTime();
    lastDis = 0;
    lastTimeDis = 0;

    scrollBar.style.opacity = 1;
});
list.addEventListener("touchmove",function(e){
    var nowTime = new Date().getTime();

    var nowPoint = e.changedTouches[0].pageY;
    var dis = nowPoint - startPoint;
    var translateY = startEl + dis;// 元素初始值减差值是移动距离
    css(list,"translateY",translateY);
    css(scrollBar,"translateY",- translateY * scale);

    lastDis = translateY - lastY;// 距离
    lastY = translateY;
    lastTimeDis = nowTime - lastTime;// 时间
    lastTime = nowTime;
});
list.addEventListener("touchend",function(e){
    var type = "easeOut";
    // console.log(lastDis,lastTimeDis);
    // 速度 = 距离 / 时间
    var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
    speed = lastTimeDis <= 0 ? 0 : speed;// 负的时间差
    
    var target = Math.round(speed * 30 + css(list,"translateY"));
    console.log(target);// 按下再抬起时这里是NaN，一个数除以了0，0/0是NaN，1/0是无限制
    console.log(target);// 所以按下再抬起时这里也是NaN
    if(target > 0){// 超出了
        target = 0;
        type = "backOut";// 回弹
    }
    else if(target < maxTranslate){
        target = maxTranslate;
        type = "backOut";
    }
    MTween({
        el: list,
        target: {
            translateY: target
        },
        time: Math.round(Math.abs(target - css(list,"translateY")) * 1.5),//
        type: type,
        callBack: function(){
            scrollBar.style.opacity = 0;
        },
        callIn: function(){
            var translateY = css(list,"translateY");
            css(scrollBar,"translateY",- translateY * scale);
        }
    });
});
```
#### 封装
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    body,html{
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    header{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background-color: #000;
    }
    footer{
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 40px;
        line-height: 40px;
        background-color: #000;
        color: #fff;
        text-align: center;
        font-size: 20px;
    }
    #wrap{
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 40px;
        left: 0;
        overflow: hidden;
    }
    #list{
        list-style: none;
    }
    #list li{
        height: 30px;
        line-height: 30px;
        text-indent: 30px;
        font-size: 16px;
        border-bottom: 1px solid #333;
    }
    </style>
</head>
<body>
    <header id="header">好好学习</header>
    <section id="wrap">
        <ul id="list">
        </ul>
    </section>
    <footer id="footer">天天向上</footer>
    <script src="m.Tween2.js"></script>
    <script>
    document.addEventListener("touchstart",function(e){
        e.preventDefault();
    });
    function createList(){
        var list = document.querySelector("#list");
        var inner = "";
        for(var i = 0;i < 30;i ++){
            inner += "<li>这是第"+ i +"个</li>";
        }
        list.innerHTML = inner;
    }
    createList();
    var wrap = document.querySelector("#wrap");
    mScroll({
        el: wrap,
        offBar: true
    });

    function mScroll(init){
        if(!init.el){
            return;
        }
        var wrap = init.el;
        var inner = init.el.children[0];
        // css(inner,"translateY",100);//cssTransform()
        // console.log(css(inner,"translateY"));
        
        var scrollBar = document.createElement("div");
        var startPoint = 0;
        var startEl = 0;// 元素按下时的坐标，即offsetTop
        var lastDis = 0;
        var lastY = 0;
        var lastTime = 0;// 上一次时间
        var lastTimeDis = 0;// 时间差
        var maxTranslate = wrap.clientHeight - inner.offsetHeight;
        if(!init.offBar){
            var scale = wrap.clientHeight / inner.offsetHeight;
            inner.style.minHeight = "100%";

            scrollBar.style.cssText = "width:6px;background:rgba(0,0,0,.5);position:absolute;top:0;right:0;border-radius:3px;opacity:0;transition:.3s opacity;";
            wrap.appendChild(scrollBar);
        }

        css(inner,"translateZ",0.01);// 开启硬件加速

        inner.addEventListener("touchstart",function(e){
            maxTranslate = wrap.clientHeight - inner.offsetHeight;// start时可能添加内容进去，重新来一次
            if(!init.offBar){
                if(maxTranslate >= 0){
                    scrollBar.style.display = "none";
                }
                else{
                    scrollBar.style.display = "block";
                }
                scale = wrap.clientHeight / inner.offsetHeight;// 会变化重新取一下
                scrollBar.style.height = wrap.clientHeight * scale + "px";
            }

            clearInterval(inner.timer);

            startPoint = e.changedTouches[0].pageY;
            startEl = css(inner,"translateY");// 元素的初始位置，相当于pc端拖拽时获取的offsetTop

            lastY = startEl;
            lastTime = new Date().getTime();
            lastDis = 0;
            lastTimeDis = 0;

            (init.offBar) || (scrollBar.style.opacity = 1);// false时执行，true && ..
        });
        inner.addEventListener("touchmove",function(e){
            var nowTime = new Date().getTime();

            var nowPoint = e.changedTouches[0].pageY;
            var dis = nowPoint - startPoint;
            var translateY = startEl + dis;// 元素初始值减差值是移动距离
            css(inner,"translateY",translateY);
            init.offBar || css(scrollBar,"translateY",- translateY * scale);

            lastDis = translateY - lastY;// 距离
            lastY = translateY;
            lastTimeDis = nowTime - lastTime;// 时间
            lastTime = nowTime;
        });
        inner.addEventListener("touchend",function(e){
            var type = "easeOut";
            // console.log(lastDis,lastTimeDis);
            // 速度 = 距离 / 时间
            var speed = Math.round(lastDis / lastTimeDis * 10);// 乘以10可以放到下面直接乘300吗
            speed = lastTimeDis <= 0 ? 0 : speed;// 负的时间差
            
            var target = Math.round(speed * 30 + css(inner,"translateY"));
            console.log(target);// 按下再抬起时这里是NaN，一个数除以了0，0/0是NaN，1/0是无限制
            console.log(target);// 所以按下再抬起时这里也是NaN
            if(target > 0){// 超出了
                target = 0;
                type = "backOut";// 回弹
            }
            else if(target < maxTranslate){
                target = maxTranslate;
                type = "backOut";
            }
            MTween({
                el: inner,
                target: {
                    translateY: target
                },
                time: Math.round(Math.abs(target - css(inner,"translateY")) * 1.5),//
                type: type,
                callBack: function(){
                    (init.offBar) || (scrollBar.style.opacity = 0);
                },
                callIn: function(){
                    var translateY = css(inner,"translateY");
                    init.offBar || css(scrollBar,"translateY",- translateY * scale);// 函数执行不必()
                }
            });
        });
    }
    </script>
</body>
</html>
```
### 陀螺仪
#### devicemotion
``` html
window.addEventListener("devicemotion",function(e){
    var motion = e.accelerationIncludingGravity;
    // iOS 负 Andriod 正
    var x = Math.round(motion.x);
    var y = Math.round(motion.y);
    var z = Math.round(motion.z);
});
```
#### iOS or Android
``` javascript
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
console.log(isiOS);
```
#### 统一motion
``` javascript
window.addEventListener("devicemotion",function(e){
    var motion = e.accelerationIncludingGravity;
    var x = Math.round(motion.x);
    var y = Math.round(motion.y);
    var z = Math.round(motion.z);// ios 负,安卓正
    if(getAdr()){
        x = - x;
        y = - y;
        z = - x;
    }
});
function getAdr(){
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
}
```
#### 根据motion控制盒子位置
``` javascript
var box = document.querySelector("#box");
css(box,"translateX",0);
window.addEventListener("devicemotion",function(e){
    var motion = e.accelerationIncludingGravity;
    var x = Math.round(motion.x);
    var tX = css(box,"translateX");
    if(getAdr()){
        x = - x;
    }
    css(box,"translateX",tX + x);
});
function getAdr(){
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
}
```
#### 摇一摇
``` javascript
var lastX;
var lastY;
var lastZ;
var maxRang = 80;
var minRang = 10;
var isShake = false;
// 记录上一次的加速度和当前次的加速度相减，差值大于一定幅度的时候就可以认定用户在进行摇一摇

window.addEventListener("devicemotion",function(e){
    var motion = e.accelerationIncludingGravity;
    var x = Math.round(motion.x);
    var y = Math.round(motion.y);
    var z = Math.round(motion.z);
    if(typeof lastX == "undefined"){
        lastX = x;// 上一次等于当前
        lastY = y;
        lastZ = z;
        return;
    }

    var dis = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
    
    if(dis > maxRang){// 有过大的摇动
        isShake = true;
    }
    if(dis < minRang && isShake){// 停下来了
        isShake = false;
        // 执行摇一摇之后要操作的内容
        alert("你摇一摇了");
    }
    
    lastX = x;
    lastY = y;
    lastZ = z;
});
```
#### 横竖屏检测
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style type="text/css">
    html,body{
        margin: 0;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    #box{
        width: 100%;
        height: 100%;
        font-size: 20px;
        position: relative;
    }
    #div{
        width: 100px;
        height: 100px;
        background-color: red;
    }
    #pop{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        color: #fff;
        line-height: 200px;
        text-align: center;
        font-size: 30px;
    }
    </style>
</head>
<body>
    <div id="box">请保持竖屏观看
        <div id="div"></div>
    </div>
    <div id="pop">请不要横屏浏览页面</div>
    <script type="text/javascript">
    setChange();// 一上来就是横屏
    window.addEventListener("orientationchange",function(e){
        // window.orientation
        // 横屏：90 -90
        // 竖屏：0 180
        setChange();
    });
    function setChange(){
        var pop = document.querySelector("#pop");
        if(window.orientation == 90 || window.orientation == -90){
            pop.style.display = "block";
        }
        else{
            pop.style.display = "none";
        }
    }
    </script>
</body>
</html>
```
#### 检测手机角度
``` javascript
var box = document.querySelector("#box");
window.addEventListener("deviceorientation",function(e){
    var motion = e.accelerationIncludingGravity;
    var x = Math.round(e.beta);
    var y = Math.round(e.gamma);
    var z = Math.round(e.alpha);
});
```
#### 手机旋转场景切换
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    html,body{
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    #view{
        height: 100%;
        overflow: hidden;
        perspective: 300px;
    }
    #box{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1024px;
        height: 768px;
        margin-top: -384px;
        margin-left: -512px;
        transform-style: preserve-3d;
        transition: .3s;/* 防卡的感觉 */
    }
    #box div{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: center center no-repeat;
        background-size: cover;
    }
    #box div:nth-of-type(1){
        background-image: url(img/img.jpg);
    }
    #box div:nth-of-type(2){
        background-image: url(img/img2.jpg);
    }
    #box div:nth-of-type(3){
        background-image: url(img/img3.jpg);
    }
    #box div:nth-of-type(4){
        background-image: url(img/img4.jpg);
    }
    </style>
</head>
<body>
    <div id="view">
        <div id="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <script src="m.Tween2.js"></script>
    <script>
    // 3d盒子练习
    (function(){
        var box = document.querySelector("#box");
        var divs = box.querySelectorAll("div");
        var start;
        var last;
        // css(box,"translateZ",-2000);// 往后移
        css(box,"rotateY",0);
        for(var i = 0;i < divs.length;i ++){
            css(divs[i],"rotateY",i * 90);
            css(divs[i],"translateZ",-512);
        }
        // MTween({
        //     el: box,
        //     target: {
        //         rotateY: 360
        //     },
        //     time: 2000,
        //     type: "linear"
        // });
        window.addEventListener("deviceorientation",function(e){
            var motion = e.accelerationIncludingGravity;
            var y = Math.round(e.gamma);
            if(typeof start == "undefined"){// 第一次进入画面
                start = y;
                last = start;
                return;
            }
            y = y - start;// 一上来就是0，手机一打开不能保证就是正的，让画面一开始是正的
            if(Math.abs(y - last) > 5){// 解决轻微的晃动
                css(box,"rotateY",y);
                last = y;
            }
        });
    })();
    </script>
</body>
</html>
```