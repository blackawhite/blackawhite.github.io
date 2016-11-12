---
title: 适配移动端
date: 2016-11-12 02:36:44
tags: rem
categories: HTML/CSS
---
### 常见方式
固定宽度(320)做法，移动端刚兴起时这么做过一段时间，重构倒是爽了，可是大页面两边有留白，小页面图标文字又会缩的很小，用户体验极其不好<!--more-->

流式布局，其实就是用%，这样宽度倒还好写，高度就麻烦了，所以这种布局一般都是宽度自适应高度写死或者高度也用%，注意高度%是相对于父级宽度来算的，高度写死会显的不协调，高度%比会相对复杂，基本上桌面一直开个计算器是必须的，另外对设计也有很大的限制，复杂点的设计也不易实现

响应式布局，说白了就是利用CSS3中的Media Query（媒介查询），不同设备尺寸对应不同的样式，开始喊的很火，谁用谁知道，简直累死人不要命，个人认为其适用场景更适合页面局部的调整和适配

设置viewport进行缩放：以320宽度为基准，进行缩放，最大缩放为320*1.3 = 416，基本缩放到416都就可以兼容iphone6 plus的屏幕了，例如想下面这样：

``` Html
<meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">
```
利用vh、vw适配：兼容性太差

### rem是什么
rem是一个相对根元素html字体大小的单位，它的大小是由html的fontSize大小决定的。

假如我把html的fontSize设置为10px，此时的1rem就等于10px，假如我把html的fontSize设置为100px，此时的1rem就等于100px，这也正是我们能用rem做移动端适配的根本原因，就是通过不同屏幕下改变根元素fontSize的大小，从而让以rem为单位的各种元素自动随着改变。

### 适配标准
通过下面这句话获得[理想视口](http://www.cnblogs.com/2050/p/3877280.html)（ideal viewport）：
``` Html
<meta name="viewport" content="width=device-width">
```
既然要适配，就要选一个理想视口做基准，然后才能在此基础上等比缩放（这里等比缩放最好不包括文字，后面讲原因），我们一般选择iphone6的375，为什么选它呢？

因为市场上的Android机五花八门（理想视口宽一般在320-480之间），且没有任何一款的占有率能和iphone相比，选取iphone中的iphone6能更好的向下适配iphone5和向上适配iphone6 plus等，关于各机型的理想视口（ideal viewport）详见[VIEWPORT SIZES](http://viewportsizes.com/)
### 设计图
上面说了我们要以iphone6为基准，那么设计图我们做成多大呢？

设计图做成750px宽，因为iphone6的物理像素是750（上面我们说的375是它的设备独立像素，又是理想视口），我们要想做到高清就要1个设计像素对应一个物理像素才成，他们之间的关系见下表：

|                                   | iPhone6 plus | iPhone6 | iPhone5 |
| --------------------------------- | ------------ | ------- | ------- |
| 物理像素(physical pixel)              | 看公式          | 看公式     | 看公式     |
| 设备独立像素(density-independent pixel) | 414x736      | 375×667 | 320x568 |
| 设备像素比(device pixel ratio)         | 3            | 2       | 2       |

设备像素比（dpr），我们可以通过JavaScript获取的办法是：window.devicePixelRatio，用CSS获取的办法是-webkit-device-pixel-ratio，我们可以用-webkit-min-device-pixel-ratio和-webkit-max-device-pixel-ratio进行媒体查询，以达到适配不同dpr的需求。

### 用CSS适配

原理：用媒体查询理想视口（上面我们把width=device-width了，所以查询width即可），不同理想视口设置不同的根元素fontSize。

一张750的设计稿，假如其根元素为100px（为什么是100px而不是其他的呢？），此时我想表示一个750px*100px的div，我只需要写成：

``` css
div{width:7.5rem; height:1rem;}
```

那么问题来了，我在iphone6下把根元素字体设为多大才能让这个div等比显示呢？要想等比显示那么他们之间有这样一个关系：

``` tex
100px / 750 = iphone6 根元素fontSize / iphone6理想视宽（375）
```

根据上面公式算出iphone6 根元素fontSize = 50px，也就是在iphone6下我们只需要改变根元素fontSize为50px就可以做到等比缩放啦~~

那么问题又来了，手机那么多，各种机型的理想宽度也数不胜数（其实大多都在320到480之间，上面有说），那么其对应根元素fontSize我该怎么写呢？

作为一个CSSer，我们最先想到的可能是媒体**断点**查询，例如像下面这样：

``` css
@media screen and (min-width:321px) and (max-width:375px){
　　html{font-size:42px}
}
@media screen and (min-width:376px) and (max-width:414px){
　　html{font-size:50px}
}
@media screen and (min-width:415px) and (max-width:639px){
　　html{font-size:55px}
}
@media screen and (min-width:640px) and (max-width:719px){
　　html{font-size:85px}
}
@media screen and (min-width:720px) and (max-width:749px){
　　html{font-size:95x}
}
@media screen and (min-width:750px) and (max-width:800px){
　　html{font-size:100px}
}
```

上面的缺点一目了然，就是不够精细嘛，例如415-639理想视宽的手机显示的东西却是一样大，对于像素级要求的我们这怎么能成呢？

于是乎我用sass把从320到750全部算一遍不就可以啦，就像下面这样：

``` scss
@media (max-width: 320px){
　　html{ font-size: 266.66667%; }
}
@for $i from 320 through 750 {@media (width:#{$i}px){
　　html{font-size: $i/1.2 * 1%}}
}
@media (min-width: 750px){
　　html{ font-size: 625%; }
}
```

[Sass生成结果（景象过于壮观慎入）](/resources/files/sass-result.css)，大功告成，这样我们不用JavaScript也能实现和其一样的精细效果了。使用时只需在头部引用这样一个CSS文件即可，假如750上你量出的div大小为width:85px;height:100px;，写的时候只需除以100即可，即width:.85rem;height:1rem;你要嫌除的麻烦sublime中可以装这么一个转换[插件](https://github.com/flashlizi/CSSrem)。

这时肯定会有人吐槽性能问题洛，当然这也必定不是好的方式，压缩后的media100px.css大概10几kb的样子，我看了下咱们移动网站的一个普通商品图大概是它的2倍，拿两个东西进行比较是有点不太妥当，具体增加这么些样式会影响多大性能暂未验证。

之所以在750下把根元素设为100而不是其他，是因为方便计算嘛，1rem等于100px，.2rem就等与20px这样多好算啊，有人会问你丫设为10不一样好算啊，话说一般浏览器显示的最小字号是12px，所以就100啦，当然数学好的你用其他值也是可以的。

上面用Sass生成的css根元素字体大小我是用%号表示的，就是100px，我写的是625%，有人可能会问你这干嘛多此一举呢，625%不就是100px嘛，有人给出了下面几个理由，我抄下来共大家参考：

* 一般设备的默认字体大一定是16px，特别是高分辨率的设备，设置成百分比可以按照设备的基准字体大小给编写的网页设置好最适合用户浏览的字体大小
* 这样写是兼容未来趋势的综合考虑，px这个单位的含义已经越来越混乱，几乎无法评估以后的设备是否会像现在这样对网页上的px做兼容处理，但用百分比代表默认字体尺寸基本不会混乱

### 用JavaScript适配

上面直接引用media100px.css的确不是最好的方案，你知道我要说什么啦，那就是用JavaScript适配，其实我们把上面的Sass循环改成用JS写就好了，就像下面这样：

``` javascript
!(function(doc, win) {
　　var docEle = doc.documentElement,
　　evt = "onorientationchange" in window ? "orientationchange" : "resize",//区分Mobile和PC以加载不同的事件
　　fn = function() {
　　　　var width = docEle.clientWidth;
　　　　if( width < 320 ) {
　　　　　　docEle.style.fontSize = 42.6667 + "px";
　　　　}
　　　　else if( width > 750 ) {
　　　　　　docEle.style.fontSize = 100 + "px";
　　　　}
　　　　else {
　　　　　　//以750设计稿宽度为基准设置fontSize:100px;这样保证iPhone6以下是高清
　　　　　　docEle.style.fontSize = 100 * (width / 750) + "px";
　　　　}
　　};
　　win.addEventListener(evt, fn, false);
　　//load事件是在页面所有元素都加载完后触发；
　　//DOMContentLoaded，它是指dom tree加载完就触发,页面引用的样式表和图像文件可能还没有加载完成
　　doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));
```

在使用的时候你可以单独引用这样一段JS （看上面我又不用%而用px啦，测试（chrome模拟手机测试的）后发现%和px最终形成网页效果并无差别），不使用不引用即可；或者把这段JS放在公共JS文件里，而对于不想使用rem的同学只需覆盖JS设置的样式即可，例如像下面这样：

``` html
html{font-size:20px!important;}//这里移动端默认字体大小根据情况自己设置
```

### 注意事项

文字**最好**不要用rem表示，因为：
* 设计师一般希望是文字在移动设备上的显示大小是一样的，也就是我们所说的等比适配（注意是等比适配不包括，不是适配）是不应包括文字的
* 我们用rem后文字会很小（虽然这正是等比缩放的结果），当然这也和设计有关（理论上字体需要等比适配的话750px设计图上是不应该有小于24px字体出现的，既然有也说明字体不应该等比适配），例如我在设计图上量取的文字大小是24px，那么其iphone6下的显示大小就是.24rem*50=12px，而设计图上哪些24以下的字体此时也会显示12px（假如最小字体是12的话），这也会有另外一个问题，就是设计图上明明是不同字体大小表示的文案，在手机上显示的大小却是一样的，起不到设计师想要表达的区分或者强调的作用
* 网上有说会变模糊之类的，我暂时未发现（暴漏了我依然表示字体用rem表示的...）

1px和2px不要写成.01rem和.02rem，因为：
* 以750适配的方案为例，当理想视口为320时，其对应font-size: 266.66667%; 然后乘以默认字体大小16px，最后为42.6666672px，也就是43px，若写为.01rem或.02rem表示分别对应.42px或.96px，在直接取整的浏览器下是显示不出来的。所以对于1像素边框的就不要写.01rem啦


* 当我们写1px时，实际在dpr为2的手机下显示的是2个物理像素，看起来会粗一点，解决方案可以参照淘宝的[flexible](https://github.com/amfe/lib-flexible)，其原理是根据dpr的不同动态设置initial-scale的值，也可以用CSS中transform的属性值scale缩放来实现。

**注：以上JavaScript适配方案是一种思路或者中心思想，在实际使用中会有其他一些问题需要注意，具体可以参考淘宝的**[flexible解决方法](https://github.com/amfe/lib-flexible)**，也是目前我们在使用的。**

### 相关文章参考

[移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)

[移动端高清、多屏适配方案](http://div.io/topic/1092)