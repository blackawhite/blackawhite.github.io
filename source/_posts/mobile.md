---
title: 捋捋移动端
date: 2017-01-20 01:06:43
tags: 移动端
categories: HTML/CSS
---
写移动端好久了，也是时候来个总结了...
<!-- more -->
### 关于重置/坑/技巧
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
#### UC的字体渲染问题
此Bug出现极其诡异，那段时间真是怕了UC，因为指不定什么时候就会放大页面，有可能是加一个字，有可能是浮动了一个元素，也有可能是增加一个div...解决如下：
``` html
/* 官方解释：UC浏览器判断到页面上文字居多时，会自动放大字体优化移动用户体验。 */
<meta name="wap-font-scale" content="no">
```
#### body overflow:hidden失效
html,body height 100%,overflow hidden,有相对定位加在body上
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    html {
        height: 100%;
        overflow: hidden;
    }
    body {
        position: relative;
        height: 100%;
        margin: 0;
        overflow: hidden;
    }
    header {
        position: absolute;
        left: 0;
        /* .wrap解决body overflow: hidden 失效的问题 */
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
### Flex
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