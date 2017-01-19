---
title: 捋捋移动端
date: 2017-01-20 01:06:43
tags: 移动端
categories: HTML/CSS
---
写移动端好久了，也是时候来个总结了。
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
### 待更新...