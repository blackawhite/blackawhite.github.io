---
title: JavaScript mark
date: 2016-12-04 00:11:18
tags: JS基础知识
categories: JS
---
JavaScript学习中一些零碎笔记，持续更新...
<!--more-->
### 数据类型
``` javascript
基本：
    number、string、boolean、null、undefined
引用：
    object:{}、[]、/^$/、Date
    function
```
### 比较的奥秘
``` javascript
switch中case的比较是===

!：首先将值转换为布尔类型的，然后再取反

!!：将其他数据类型转换为布尔类型，相当于Boolean()

1、对象和对象比较永远不想等，例如[]==[],{}=={}

2、对象和字符串比较，先调用toString()方法先将对象转换为字符串，然后再进行比较，例如[] == ""为true，{}转换为字符串是"[object object]"，所以{} == ""为false

3、对象和布尔类型比较，对象先转化为字符串(toString)，然后转换为数字(Number)，布尔类型也转换为数字(1或0)，Number("")是0，例如[] == false是true

4、对象和数字比较，同上...例如[] == 1为false

5、布尔和数字比较，布尔转换为数字(1或0)

6、字符串和数字，字符串转换为数字

7、字符串和布尔，都转换为数字

9、null == undefined是true，除此之外null或undefined和其他任何数据类型的比较都不相等

10、JS中==是值比较，===是值和类型都比较
```
### 预解析
同一次预解析只发生在一个(script)脚本块中
``` javascript
// 带var会进行预解析，结果undefined，不加报错则不会预解析，报错
console.log(num1);// undefined
var num1 = 12;
console.log(num2);// 报错
num2 = 12
```
``` javascript
var a=2;
function box(){ 
    alert(a);// 先预解析弹出undifined，注意这两句的先后顺序！再注意下面的var，由于预解析时找出下面的var，故不向上找啦！
    var a=1;
}
box();
alert(a);// 弹出2
```
``` javascript
var a=2;
function box(){ 
    alert(a);// 函数内预解析找不到var，向上找为2就弹出2.然后向下执行又被修改为1
    a=1;// 能修改全部变量的a
}
box();
alert(a);// 所以弹出1
```
``` javascript
var a=2;
function box(a){ 
    alert(a);// 函数内预解析找到参数a，就不向上找了，由于调用时没有传入参数，所以弹出undefined 
    a=1;// 此时的a为局部变量，并赋值为1，与此函数外面的a没有任何关系啦
}
box();
alert(a);// 所以弹出2
```
``` javascript
var a=2;
function box(a){// 参数的本质是个局部变量即var a=2;
    alert(a);// 弹出2
    a=1;// 此时的a之所以不能修改外面的值啦，是因为预解析时函数内已找到参数，此时修改的是函数内a的值
}
box(a);
alert(a);// 弹出2
```
``` javascript
alert(f2);// undefined
if(true){ 
    function f2(){ 
        var b=2;
        alert(b);
    }
}
```
``` javascript
// 带var和不带var的区别：有没有预解析，undefined和报错的区别
console.log(a);// undefined
var a = 12;

console.log(b);// 报错，没有var预解析，找不到b
b = 12;
```
``` javascript
// 带var的先声明默认赋值undefined，预解析只发生在当前作用域
// 带function的声明并定义完成，即开辟内存空间并存储完成
alert(n);// undefined
var n = 9;// 
function fn(){
    alert(n);// undefined
    n = 7;// 私有作用域变成7
    var n = 6;// 私有作用域变成6
}
fn();
alert(n);// 9
```
``` javascript
var n = 9;
var s = "yangk";
function fn(){
    console.log(n);// undefined
    s = 'jiangjun';
    n = 7;
    var n = 6;
    console.log(s);// jiangjun
}
fn();
console.log(n);// 9
console.log(s);// jiangjun
```
``` javascript
// 发现相重的，不重复声明，但可以重复定义赋值，而函数预解析时声明并定义赋值
console.log(a);// function a(){ console.log(2); }
var a;
console.log(a);// function a(){ console.log(2); }
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}
console.log(a);// function a(){ console.log(2); }
var a = 3;// 重新赋值为3
console.log(a);// 3
```
``` javascript
// 预解析是不管条件语句的
if(!("a" in window)){
    var a = 12;
    console.log(1);
}
else{
    console.log(2);// √
}

console.log(a);// undefined
if(1 != 1){
    var a = 12;
}
```
``` javascript
// 只预解释=左边的，右边不解释
console.log(fn);// undefined
console.log(a);// 报错
var fn = function a(){};
fn();
```
``` javascript
// function中return 下面 的代码虽然不执行了，但是会预解析，后面 返回值不预解释
// 预解释发生在一个(script)脚本块中，不同的脚本块中不预解释
function fn(){
    console.log(b);// undefined
    console.log(a);// 报错
    return function a(){};
    var b = 12;
}
fn();
```
``` javascript
// 自执行函数在全局作用域下是不尽兴预解释的，当代码执行到这里的时候定义和执行一起完成
(function(){})();
~(function(){})();
!(function(){})();
+(function(){})();
-(function(){})();
```
``` javascript
// JS中如果变量的名字和函数的名字一样其实是一个东西，会重复，会冲突
// 预解释的时候如果名字已经声明过了，则不需要重新的声明，但是需要重新的赋值
// var fn = 13;
// function fn(){
//     console.log("ok");
// }

// 注意函数的预解释是声明加定义
fn();// 2
function fn(){// 声明 + 定义(赋值)，由于一开始就声明+定义了，这里不会对再经过的代码起作用（声明／定义）
    console.log(1);
}
fn();// 2
var fn = 10;// 再此经过时会重新定义
fn();// 10()会报错
function fn(){// 定义
    console.log(2);
}
fn();
```
``` javascript
function fo(){
    var i = 0;
    return function(n){
        return n + i ++;// 这里先执行i ++
    };
}
var f = fo();
var a = f(15);
alert(a);// 15，并且上面f()中的i变成了1
var d = f(20);
alert(d);// 21
var b = fo()(15);// 重新执行了15
alert(b);
var c = fo()(20);// 重新执行了20
alert(c);
```
``` javascript
var number = 2;
var obj = {
    number: 4,
    fn1: (function(){// 一上来自执行
        this.number *= 2;// this是window
        number = number * 2;// undefined * 2
        console.log(number);// NaN
        var number = 3;
        return function(){
            this.number *= 2;
            number *= 3;
            alert(number);
        }
    })()
};
var fn1 = obj.fn1;// 这里只是return的函数，上面的console.log(number)不会再输出了
alert(number);// 全局的number等于4
fn1();// 局部的number等于9，此时全局的number已经变成8

obj.fn1();// 局部的number驻留内存9 * 3 = 27，此时obj.number已经等于8
alert(window.number);// 8
alert(obj.number);// 8
```
### try catch
语法
``` javascript
try{
    // JS要执行的代码
}
catch(e){// 形参一定要写，名字可以随便起，当try中代码报错了，会自动的执行catch中的代码
    // e.message;
    // throw new Error("shit");
    // throw new ReferenceError;// 引用错误
    // throw new TypeError;// 类型错误
    throw new RangeError("ss");// 范围错误
}
finally{// 不管try是否报错这里都会执行
    // 一般不加
}
```
作用1：不让浏览器控制台报错，继续执行后面的JS代码
``` javascript
try{
    console.log(num);
}
catch(e){
    console.log(e.message);
}
console.log(1);// 我会继续执行
```
作用2：既要捕获错误信息，也可手动定义错误内容，又要下面的代码不执行
``` javascript
try{
    console.log(num);
}
catch(e){
    throw new Error("shit");
}
console.log(1);// 我会继续执行
```
作用3：处理浏览器的兼容性...
### 查找上级作用域
``` javascript
// 如何查找当前作用域的上一级作用域：看当前函数是在哪个作用域下定义的，和函数在哪执行的无关
var num = 12;
function fn(){
    var num = 120;
    return function(){// return后的不预解释，直接在这里定义，返回函数的内存地址。函数是在这里定义的
        console.log(num);
    };
}
var f = fn();// fn()执行后返回一个函数，执行函数会形成一个私有作用域
f();// 形成私有作用域，num不是私有的，往上找...

~function(){
    var num = 1200;
    f();
}();
// 上面将形成3个栈内存，2个堆内存，画图理解
```
### 点击计数
#### 利用全局变量
``` javascript
// 利用全局作用域不销毁的原理，弊端：不销毁且容易冲突
var oDiv = document.createElement("div");
oDiv.innerHTML = 0;
oDiv.style.cssText = "border: 1px solid red;height: 40px;line-height: 40px;text-align: center;font-size: 20px;cursor: pointer;";
document.body.appendChild(oDiv);
var num = 0;
oDiv.onclick = function(){
    num ++;
    oDiv.innerHTML = num;
};
```
#### 利用私有作用域
``` javascript
// 弊端：有一个不销毁的私有作用域，占一丢丢内存
var oDiv = document.createElement("div");
oDiv.innerHTML = 0;
oDiv.style.cssText = "border: 1px solid red;height: 40px;line-height: 40px;text-align: center;font-size: 20px;cursor: pointer;";
document.body.appendChild(oDiv);
~function(){
    var num = 0;
    oDiv.onclick = function(){
        num ++;
        oDiv.innerHTML = num;
    };
}();
```
函数执行形成一个私有作用域，保护里面的私有变量不受外界干扰，我们把这种机制叫做闭包
``` javascript
function fn(){
    var n = 12;
    return function(){// 销毁不了
        n ++;
        console.log(n);
    }
}
var f = fn();
f();// 13 >> 驻留内存
f();// 14
```
``` javascript
var oDiv = document.createElement("div");
oDiv.innerHTML = 0;
oDiv.style.cssText = "border: 1px solid red;height: 40px;line-height: 40px;text-align: center;font-size: 20px;cursor: pointer;";
document.body.appendChild(oDiv);

// oDiv.onclick = function(){
//     var i = 0;
//     return function(){
//         i ++;
//         oDiv.innerHTML = i;
//     };
// }();

oDiv.onclick = (function(){
    var i = 0;
    return function(){
        i ++;
        oDiv.innerHTML = i;
    };
})();
```
#### 利用innerHTML
``` javascript
// 弊端：重新渲染
var oDiv = document.createElement("div");
oDiv.innerHTML = 0;
oDiv.style.cssText = "border: 1px solid red;height: 40px;line-height: 40px;text-align: center;font-size: 20px;cursor: pointer;";
document.body.appendChild(oDiv);
oDiv.onclick = function(){
    // oDiv.innerHTML = parseInt(oDiv.innerHTML) + 1;
    oDiv.innerHTML ++;// 有默认的转换机制
};
```
#### 利用自定义属性
``` javascript
var oDiv = document.createElement("div");
oDiv.innerHTML = 0;
oDiv.style.cssText = "border: 1px solid red;height: 40px;line-height: 40px;text-align: center;font-size: 20px;cursor: pointer;";
document.body.appendChild(oDiv);
oDiv.num = 0;// 既不是全局变量也不是私有变量，是自定义属性
oDiv.onclick = function(){
    this.innerHTML = ++ this.num;
};
```
### 内存释放／垃圾回收(待续，高程3...)
``` javascript
// 堆内存：存放引用类型的值
// 对象数据类型或者函数数据类型在定义的时候都会先开辟一个堆内存，堆内存有一个引用地址，当堆内存被占用(引用)的情况下数销毁不了的

var obj1 = {// 开一个堆内存，假如地址是xxxfff000，obj1指向该堆内存
    name: "yangk"
};
var obj2 = obj1;// obj2也指向xxxfff000

// 当堆内存没人引用时，浏览器将在空闲的时候将其回收，所以销毁堆内存时我们只需要把引用他的变量赋值为null即可
obj1 = null;// 空对象指针，谁都不指
obj2 = null;
```
``` javascript
// 栈内存(作用域)
// 全局作用域和私有作用域

// 全局作用域：只有当页面关闭的时候其才销毁
// 私有作用域：函数执行会产生私有作用域，当私有作用域中的代码执行完成后，当前作用域会进行释放和销毁(闭包除外)

// 当私有作用域中的部分内容被占用的情况下是不能被销毁的

// 不销毁情况：
// 函数执行返回了一个引用数据类型值，并且被外面一个东西给接受了
function fn(){
    var num = 100;
    return function(){
        num ++;
        console.log(num);
    };
}
var f = fn();
f();// 101
f();// 102
fn()();// 这种情况fn返回的函数没有被占用，但是还需要执行一次，暂时不销毁，当返回的函数执行完成后，浏览器会在空闲的时候将其销毁
// 私有作用域中给DOM元素的事件绑定方法一般也不销毁
var oDiv = document.getElementById("div1");// 通过DOM方法获取的元素都是对象数据类型的值
~function(){
    oDiv.onclick = function(){

    };
}();
```
### 定时器
setTimeout配合递归模拟setInterval
``` javascript
var num = 0;
function go(){
    console.log(num++);
    if(num === 5){
        return;
    }
    var timer = setTimeout(go,1000);
}
go();
```
### 事件
``` javascript
var oDiv = document.querySelector("#div1");
oDiv.onclick = function(ev){
    ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;// 事件源
    // ev.pageY = ev.pageY || ev.clientY + win("scrollTop");// 兼容IE6-8
    ev.preventDefault ? ev.preventDefault() : ev.returnValue = true;// 阻止默认行为
    return false;

    ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;// 阻止冒泡
};
```
### 关于this
看方法名前面是否有点，有的话点前面是谁this就是谁
``` javascript
function fn(){
    console.log(this);
}
var obj = {
    fn:fn
};
fn();// this > window,严格模式下undefined
obj.fn();// this > obj
```
``` javascript
function Person(){
    this.name = "yangk";
}
Person.prototype.showName = function(){
    console.log(this.name);
};
var p1 = new Person;
p1.showName();// this > p1
p1.__proto__.showName();// this > p1.__proto__
Person.prototype.showName();// this > p1.prototype
```
自执行函数中的this永远是window，严格模式下是undefined
``` javascript
(function(){
    console.log(this);// this > window
})();
~function(){
    console.log(this);// this > window
}();
```
元素的某一个行为绑定一个方法，this > 元素
``` javascript
function fn(){
    console.log(this);
}
oDiv.onclick = fn;
oDiv.onclick = fn();// 注意这里是执行的返回结果返回！！！！！！undefined

oDiv.onclick = function(){
    fn();// this  >  window
};
```
使用call/apply强制改变this
``` javascript
var obj = {
    fn: function(){
        console.log(this);
    }
};
obj.fn();// this > obj
obj.fn.call(12);// this > 12
```
``` javascript
function sum(){
    
}
sum.call(100,100...)// 第一个参数是this，后面对应接受的形参，没有undefined

sum.call();//在非严格模式下，call的第一个参数不写或者写null/undefined，默认的this都是window，严格模式下写谁就是谁，写null就是null，不写是undefined

apply(obj,[...]);
```
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
注意星期
``` javascript
var oDate = new Date();
week = "日一二三四五六".charAt(oDate.getDay());
console.log(week);
```
### 函数
一个function生命周期：出生，预解释时声明加定义，开辟一个新的内存空间，让函数名存储这个快的地址；生长，函数执行形成私有作用域，里面开始类似window的新一轮与解析，死亡：一般情况下(如果没有返回function)，私有作用域下的代码执行完成后，整个私有作用域就销毁了。
#### 简单的隔N行变色
``` javascript
var aLi = document.getElementsByTagName("li");
var arrColor = ["red","green","yellow","pink"];
function changeBg(num){
    for(var i = 0;i < aLi.length;i ++){
        aLi[i].style.backgroundColor = arrColor[i % num];

        var oldColor = "";
        aLi[i].onmouseover = function(){
            oldColor = this.style.backgroundColor;
            this.style.backgroundColor = "#ccc";
        };
        aLi[i].onmouseout = function(){
            this.style.backgroundColor = oldColor;
        };
    }
}
changeBg(2);
```
#### 简单的求和
``` javascript
function sum(){
    var total = 0;
    for(var i = 0;i <arguments.length;i ++){
        var num = Number(arguments[i]);// 两种情况：NaN或者数字
        if(isNaN(num)){
            continue;
        }
        total += num;
    }
    console.log(total);
}
sum(1,2,"a","3","4");
```
#### 简单的变色
``` javascript
var num = 0;
var arr = ["red","green","blue","white"];

document.onclick = function(){
    this.body.style.backgroundColor = arr[num++%arr.length];
};
```
#### 函数的3种角色
``` javascript
// 函数的3中角色互不相关
function Fn(){
    var num = 500;
    this.x = 100;
}
Fn.prototype.getX = function(){
    console.log(this.x);
};
Fn.aaa = 1000;// 当做一个普通对象来使用
var f = new Fn;
var res = Fn();// undefined

console.log(f.num);// undefined
console.log(f.aaa);// undefined
console.log(Fn.aaa);// 1000
```

### 随机数
#### 找n-m间不重复的随机数
``` javascript
// 找10 - 100之间不重复的整数10个整数并排序
var arr = [];
for(var i = 0;i < 10;i ++){
    // var iNum = Math.round( Math.random() * 90 + 10 );// 在这里定义一旦下面arr[i] == iNum就会陷入死循环
    find();
}
function find(){
    var iNum = Math.round( Math.random() * 90 + 10 );
    for(var i = 0;i < arr.length;i ++){// push之前检查一遍
        if(arr[i] == iNum){
            find();
            return false;
        }
    }
    arr.push(iNum);
}

arr.sort(function(num1,num2){
    return num1 - num2;
});
console.log(arr);
```
#### 简单验证码
``` javascript
var codeStr = 'abcdefghijklmnokqrstuvwxyzABCDEFGHIJKLMNOKQRSTUVWXYZ0123456789';
var oDiv = document.createElement("div");
oDiv.style.cssText = "width:80px;text-align:center;line-height:40px;background-color:#000;margin:50px auto;cursor:pointer;color:#fff;-webkit-user-select:none;";
var iNum = 0;

function getRandom(n,m){
    n = Number(n);// 数字或NaN
    m = Number(m);
    if(isNaN(n) || isNaN(m)){
        return Math.random();
    }
    if(n > m){
        var temp = n;
        n = m;
        m = temp;
    }
    return Math.round( Math.random() * (m - n) + n );
}

function rand(){
    var str = "";
    for(var i = 0;i < 4;i ++){
        iNum = getRandom(0,61);
        str += codeStr.charAt(iNum);
    }
    oDiv.innerHTML = str;
}
rand();

document.body.appendChild(oDiv);

oDiv.onclick = function(){
    rand();
};
```
### 数组去重
#### 删除相同的
``` javascript
var arr = [1,2,1,3,3,2,4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7];
// 1 [2,1,3,3,2,4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7]
// 2 [1,3,3,2,4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7]
// 1 [3,3,2,4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7]
// 3 [3,2,4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7]
// 3 [2,4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7]
// 2 [4,6,2,6,5,7,4,4,6,2,9,9,8,3,2,7]

for(var i = 0;i < arr.length;i ++){
    for(var j = i + 1;j < arr.length;j ++){
        if(arr[i] == arr[j]){
            arr.splice(j,1);// 原有数组变化了
            j --;// 上面删除以后，后面的索引项都往前提了一位，这会影响我们的计算，所以这里要处理，解决数组塌陷问题
        }
    }
}
console.log(arr);
```
#### 根据对象属性名不能等
``` javascript
var arr = [1,2,1,3,3,3,2,4,6,2,6,6,7,4,4,6,2,9,9,8,3,2,7,"yangk","yangk"];

// 把数组中的每一项，当做一个新对象的属性名和属性值存起来，在存储的时候判断当前的属性名是否已经存在，存在就代表数组该项重复了，进行删除，否则则代表不重复，直接存储

var obj = {};
for(var i = 0;i < arr.length;i ++){
    if(obj[arr[i]] == arr[i]){// 如果有就删除且跳出
        arr.splice(i,1);
        i --;
        continue;// 跳出本次循环，也提高了查询次数提高性能
    }
    obj[arr[i]] = arr[i];
}
obj = null;

console.log(arr);
```
#### push非重复的
``` javascript
// arr[0] : arr[1]，相当退出内循环，此时j = false
// arr[1] : arr[2]，arr[1] : arr[3]，发现相等又退出内循环，此时j = false
// arr[2] : arr[3]，arr[2] : arr[4]，arr[2] : arr[5]发现一切正常，此时i等于2故push: arr[2]，此时j = 6
// arr[3] : arr[4]，arr[3] : arr[5]，发现相等又退出内循环，此时j = false
// arr[4] : arr[5]，无异常，push: arr[4]，此时j = 6
// arr[5] 此时j等于6，push: arr[5]，此时j = 6
var arr=[5,5,4,5,2,5];
function jiayou(arr)
{ 
    var newArr = [];
    for(var i = 0;i < arr.length;i ++)
    { 
        for(var j = i + 1;j < arr.length;j ++)
        { 
            if(arr[i] === arr[j])
            { 
                j = false;// 与后面比较完再看j的值
                break;// 直接退出循环
            }
        }
        console.log(i + ":" + j);
        if(j)
        { 
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
console.log(jiayou(arr));
```
### 找数组最大/最小值
#### 排序后掐头去尾法
``` javascript
var arr = [33,73,23,13,9];
arr.sort(function(a,b){
    return a - b;
});
var min = arr[0];
var max = arr[arr.length - 1];
console.log(min,max);
```
#### 假设法
``` javascript
var arr = [33,73,23,13,9];
// 假设法：先假设一个是最小值，然后和数组后面的每一项进行比较，如果比我们的当前值还要小，说明假设错误，把当前值赋值给假设值，最大值同理！
var min = max = arr[0];
for(var i = 1; i < arr.length;i ++){
    arr[i] < min ? min = arr[i] : null;
    arr[i] > max ? max = arr[i] : null;
}
console.log(min,max);
```
#### eval()法
``` javascript
var arr = [33,73,23,13,9];

/*var aaa = arr.toString();// 数组转字符串，也可以用join转
var bbb = eval(aaa);// 字符串转表达式，保留的是最后一项的结果还是不行
// 括号表达式：一个括号中放多项值，中间用逗号隔开，最后获取的只有最后一项，例如(33,73,23,13,9)返回的结果是9
console.log(Math.max(bbb));// 结果是9，所以这种方式行不通*/

var min = eval("Math.min("+ arr.toString() +")");
var max = eval("Math.max("+ arr.toString() +")");
console.log(min,max);
```
关于括号表达式
``` javascript
function fn(){
    console.log(this);
}
var obj = {};
obj.fn = fn;
(fn,obj.fn)();// 一个括号中出现多项内容中间用逗号隔开，取最后，是直接把内容复制一份一模一样的放进来(理解this)，所以这里的this是window
(obj.fn)();// 只有一项时，this是obj，只有一项加不加小括号无所谓
```
#### Math.max.apply()法
``` javascript
// apply，虽然传递的是一个数组，但是也相当于一个个传递参数，利用这个原理：
var max = Math.max.apply(null,arr);
console.log(max);
```
### 平均数
#### 一般写法
``` javascript
function avgFn(){
    // arguments.sort();// 类数组不能直接sort
    var arr = [];
    for(var i = 0;i < arguments.length;i ++){
        arr[arr.length] = arguments[i];
    }
    arr.sort(function(a,b){
        return a - b;
    });

    arr.shift();// 删头
    arr.pop();// 删尾

    var total = 0;
    for(var i = 0;i < arr.length;i ++){
        total += arr[i];
    }

    return (total / arr.length).toFixed(2);
}
var res = avgFn(10,10,9,8,1);

console.log(res);
```
#### 求和优化
``` javascript
function avgFn(){
    // arguments.sort();// 类数组不能直接sort
    var arr = [];
    for(var i = 0;i < arguments.length;i ++){
        arr[arr.length] = arguments[i];
    }
    arr.sort(function(a,b){
        return a - b;
    });

    arr.shift();
    arr.pop();

    return (eval(arr.join("+")) / arr.length).toFixed(2);// 求和
}
var res = avgFn(10,10,9,8,1);

console.log(res);
```
#### 类数组转数组优化
``` javascript
// Array.prototype.slice = function(){
//     var arr = [];
//     // this就是我们想要操作的那个数组
//     for(var i = 0;i < this.length;i++){
//         arr[arr.length] = this[i];
//     }
//     // 让this变成arguments就实现arguments转数组了
//     // for(var i = 0;i < arguments.length;i ++){
//     //     arr[arr.length] = arguments[i];
//     // }
//     return arr;
// };
// [12,23,34].slice();

function avgFn(){
    var arr = Array.prototype.slice.call(arguments);
    // [].slice.call(arguments,0)// 实例也有slice方法和上面一样的事，0可传可不传
    // [].__proto__.slice.call(...)// ie不兼容
    // [].slice.apply[arguments,[0]]
    
    arr.sort(function(a,b){
        return a - b;
    }).shift();

    arr.length --;

    return (eval(arr.join("+")) / arr.length).toFixed(2);// 求和
}
var res = avgFn(10,10,9,8,1);

console.log(res);
```
#### 换个姿势
``` javascript
// arguments可以通过下面方式使用数组中的所有方法
function avgFn(){
    [].sort.call(arguments,function(a,b){
        return a - b;
    });
    [].shift.call(arguments);
    [].pop.call(arguments);
    
    return (eval([].join.call(arguments,"+")) / arguments.length).toFixed(2);
}
var res = avgFn(10,10,9,8,1);

console.log(res);
```
### 插入数据的几种方法
回流（重排）：结构改变（增加，删除，位置改变）
重绘：部分样式改变，浏览器只需要重新渲染当前元素即可
``` javascript
// 原始内容
var oUl = document.getElementById("ul1");
var aLi = oUl.getElementsByTagName("li");
for(var i = 0;i < aLi.length;i ++){
    aLi[i].onmouseover = function(){
        this.style.backgroundColor = "orange";
    };
    aLi[i].onmouseout = function(){
        this.style.backgroundColor = "";
    };
}
var arr = [
    "水电费水电费的是否",
    "fgdgdfg规范的身高大概",
    "个梵蒂冈法规的",
    "就换个价格"
];
```
#### 字符串拼接
优：对原来内容的事件绑定有影响，劣：1次回流，模板引擎数据绑定的原理就是字符串拼接
``` javascript
var str = "";
for(var i = 0;i < arr.length;i ++){
    str += "<li>" + arr[i] + "</li>";
}
// oUl.innerHTML = oUl.innerHTML + str;// 之前的变成字符串...
// 一拿一放一渲染的方式（之前）的li的所有事件都会消失的
oUl.innerHTML += str;
```
``` javascript
var str = "";
for(var i = 0;i < arr.length;i ++){
    str += "<li>";
    str += "<span>"+ (i + 4) +"</span>";
    str += arr[i].title;
    str += "</li>";
}
// 先把之前的3个li以字符串拿出来，再以字符串添加，再重新渲染，原来的事件会消失
oUl.innerHTML += str;
```
#### 动态创建
优：对原来无影响，劣：添加一次回流一次...
``` javascript
for(var i = 0;i < arr.length;i ++){
    var oLi = document.createElement("li");
    oLi.innerHTML = arr[i];
    oUl.appendChild(oLi);// 向末尾增加，不会影响之前的元素
}
```
#### 文档碎片
文档碎片：JS中用来临时存储元素的容器
``` javascript
var frg = document.createDocumentFragment();
for(var i = 0;i < arr.length;i ++){
    var oLi = document.createElement("li");
    oLi.innerHTML = arr[i];
    frg.appendChild(oLi);
}
oUl.appendChild(frg);
frg = null;// 手动释放容器
```
### DOM元素宽高距离
``` javascript
// clientHeight：height + padding，真实内容高度，和父级是否隐藏无关
// clientTop：上边框的宽度
// offsetHeight：clientHeight + clientTop + clientBottom，height + padding + border
// offsetTop：当前元素的外边框距离有定位父级的内边框的距离
// offsetParent：当前元素有定位的父级

// scrollHeight：同clientHeight
// document.documentElement.scrollHeight：文档高
// document.documentElement.clientHeight：窗口高
// document.documentElement.scrollTop：滚动高

// window.getComputedStyle(obj,null)["height"]
// obj.currentStyle["height"]
```
### 关于运动
#### 根据步长
``` javascript
var oDiv = document.getElementById("div1");
var maxLeft = utils.win("clientWidth") - oDiv.offsetWidth;
var duration = 2000;
var step = (maxLeft / duration) * 10;// 步长
var oDivLeft = 0;

var timer = setInterval(function(){
    oDivLeft = utils.css(oDiv,"left");
    if(oDivLeft >= maxLeft){
        clearInterval(timer);
        return;
    }
    oDivLeft += step;
    utils.css(oDiv,"left",oDivLeft);
},10);
```
临界点判断
``` javascript
var oDiv = document.getElementById("box");
var maxLeft = utils.win("clientWidth") - oDiv.offsetWidth;// 目标值
var step = 5;
var curLeft = 0;

var timer = setInterval(function(){
    curLeft = utils.css(oDiv,"left");
    if(curLeft + step >= maxLeft){// 再进行边界判断的时候加上步长
        utils.css(oDiv,"left",maxLeft);// 如果上面不加，有种被拉回来的感觉会闪一次
        clearInterval(timer);
        return;
    }
    curLeft += step;// 也可以直接写上面这样边界判断的时候就不用加步长了
    utils.css(oDiv,"left",curLeft);
},10);
```
setTimeout 递归模拟
``` javascript
var oDiv = document.getElementById("box");
var maxLeft = utils.win("clientWidth") - oDiv.offsetWidth;// 目标值
var step = 5;
var timer = null;
function move(){
    clearTimeout(timer);// 定时器清除后timer的值是什么呢？
    var curLeft = utils.css(oDiv,"left");
    if(curLeft + step >= maxLeft){
        utils.css(oDiv,"left",maxLeft);
        return;
    }
    curLeft += step;
    utils.css(oDiv,"left",curLeft);
    timer = setTimeout(move,10);
    console.log(timer);// 还是不同的数字呢??
}
move();
```
#### 限制时间
``` javascript
var oDiv = document.getElementById("box");
var target = utils.win("clientWidth") - oDiv.offsetWidth;// 目标值
var begin = utils.css(oDiv,"left");// 起始值
var change = target - begin;// 总距离
var duration = 2000;
var time = null;

// time(当前时间),begin(初始值),change(变化量),duration(持续时间)
function Linear(t,b,c,d){
    return c * t / d + b;
}

var timer = setInterval(function(){
    time += 10;
    console.log(time);
    if(time >= duration){
        utils.css(oDiv,"left",target);
        clearInterval(timer);
        return;
    }
    var curPos = Linear(time,begin,change,duration);
    utils.css(oDiv,"left",curPos);
},10);
```
#### 解决作用域累计的问题
``` javascript
var oDiv = document.getElementById("box");
var minLeft = 0;
var maxLeft = utils.win("clientWidth") - oDiv.offsetWidth;
var timer = null;

function move(target){
    _move();
    function _move(){
        clearTimeout(timer);// !!!!!!!!!!!
        var curLeft = utils.css(oDiv,"left");
        if(curLeft < target){// 向右
            if(curLeft + 5 >= target){// 边界判断要加目标值
                utils.css(oDiv,"left",target);
                return;
            }
            curLeft += 5;
            utils.css(oDiv,"left",curLeft);
        }
        else if(curLeft > target){// 向左
            if(curLeft - 5 <= target){
                utils.css(oDiv,"left",target);
                return;
            }
            curLeft -= 5;
            utils.css(oDiv,"left",curLeft);
        }
        else{
            return;
        }
        // timer = setTimeout(function(){// 每次都需要先执行匿名函数，形成一个私有作用域，这样写性能不好
        //     move(target);
        // },10);
        // timer = setTimeout(move(),10);// 这样写是返回结果，也不对
        timer = setTimeout(_move,10)
    }
}
document.getElementById("left").onclick = function(){
    move(minLeft)
};
document.getElementById("right").onclick = function(){
    move(maxLeft)
};
```
#### 自定义timer
``` javascript
// 边界判断
// 清除没有用的定时器
// _move避免作用域的累积
// 把定时器的返回值放在自定义属性上，防止全局和一个元素做多个事情
var oDiv = document.getElementById("box");
var minLeft = 0;
var maxLeft = utils.win("clientWidth") - oDiv.offsetWidth;
//var timer = null; // 放在全局下用的都是同一个timer，但放在全局下又不好，解决之道是自定义属性
function move(target){
    //var timer = null;// 放在这里，当向一边还没走完时向右走哆嗦，又向左右向右
    _move();
    function _move(){
        clearTimeout(oDiv.timer);// !!!!!!!!!!!
        var curLeft = utils.css(oDiv,"left");
        if(curLeft < target){// 向右
            if(curLeft + 5 >= target){// 边界判断要加目标值
                utils.css(oDiv,"left",target);
                return;
            }
            curLeft += 5;
            utils.css(oDiv,"left",curLeft);
        }
        else if(curLeft > target){// 向左
            if(curLeft - 5 <= target){
                utils.css(oDiv,"left",target);
                return;
            }
            curLeft -= 5;
            utils.css(oDiv,"left",curLeft);
        }
        else{
            return;
        }
        oDiv.timer = setTimeout(_move,10)
    }
}
document.getElementById("left").onclick = function(){
    move(minLeft)
};
document.getElementById("right").onclick = function(){
    move(maxLeft)
};
```
#### 水平垂直都动
``` javascript
var oDiv = document.getElementById("box");
var beginLeft = utils.css(oDiv,"left");
var beginTop = utils.css(oDiv,"top");
var targetLeft = 1000;
var targetTop = 500;
var changeLeft = targetLeft - beginLeft;
var changeTop = targetTop - beginTop;
var duration = 1000;
var time = 0;// 走了多长时间了

oDiv.timer = setInterval(function(){
    time += 10;
    if(time >= duration){
        utils.css(oDiv,{
            left: targetLeft,
            top: targetTop
        });
        clearInterval(oDiv.timer);
        return;
    }
    var curLeft = Linear(time,beginLeft,changeLeft,duration);
    var curTop = Linear(time,beginTop,changeTop,duration);
    utils.css(oDiv,{
        left: curLeft,
        top: curTop
    });
},10);

function Linear(t,b,c,d){
    return c * t / d + b;
}
```
#### 封装
``` javascript
// 使用
var oDiv = document.getElementById("box");
run(oDiv,{
    left: 300
},1000,["Bounce","easeIn"],function(){
    this.style.backgroundColor = "pink";
});
```
``` javascript
// 方法
~function(){
    var move = {
        Linear: function(t,b,c,d){// 此种动画形式的彻底研究
            return t * c / d + b;
        },
        Quad: {//二次方的缓动（t^2）；
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            }
        },
        Cubic: {//三次方的缓动（t^3）
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            }
        },
        Bounce: {//指数衰减的反弹缓动。
            easeIn: function(t,b,c,d){
                return c - move.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOut: function(t,b,c,d){
                if (t < d/2) return move.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                else return move.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        }
    };
    move.Linear();
    // 多方向的运动
    function run(curEle,target,duration,effect,callBack){
        // 数字
        // 数组
        // 不传
        var tempEffect = move.Linear;
        if(typeof effect === "number"){
            switch(effect){
                case 0:
                    tempEffect = move.Quad.easeIn;
                    break;
                case 1:
                    tempEffect = move.Cubic.easeIn;
                    break;
                case 2:
                    tempEffect = move.Bounce.easeIn;
                    // ...
            }
        }
        else if(effect instanceof Array){// ["Bounce","easeIn"]
            tempEffect = effect.length >= 2 ? move[effect[0]][effect[1]] : move[effect[0]].easeIn;// 默认...
        }
        else if(effect === "function"){// 相当于effect没传
            callBack = effect;// tempEffect还是默认的
        }

        clearInterval(curEle,curEle.timer);
        var begin = {};
        var change = {};
        for(var key in target){
            if(target.hasOwnProperty(key)){// 私有，非原型
                begin[key] = utils.css(curEle,key);
                change[key] = target[key] - begin[key];
            }
        }
        // 运动...
        var time = 0;
        curEle.timer = setInterval(function(){
            time += 10;
            if(time >= duration){
                utils.css(curEle,target);// 批量设置目标值
                clearInterval(curEle.timer);
                typeof callBack === "function" ? callBack.call(curEle) : null;
                //callBack && callBack();
                return;
            }
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var curPos = tempEffect(time,begin[key],change[key],duration);// !!!
                    utils.css(curEle,key,curPos);
                }
            }
        },10);
    }
    window.run = run;
}();
```
### 图片懒加载
#### 首屏
给对应区域一张尽量小默认图，当真实内容加载陈功时再加载真实图片
``` javascript
var oDiv = document.querySelector("#div1");
var oImg = oDiv.getElementsByTagName("img")[0];
var timer = null;

timer = setTimeout(function(){
    var loadImg = new Image();
    loadImg.src = oImg.getAttribute("data-src");
    loadImg.onload = function(){
        oImg.src = this.src;
        oImg.style.display = "block";
        loadImg = null;// 注意这里释放别搞错了...

        console.log("加载完成！");// 里面处理完成的
        var time2 = new Date();
        console.log(time2 - time1);// 加载时间
    };
    var time1 = new Date();
    console.log("正在加载中...");// 外面处理loading的
},500);
```
#### 其他屏
出现在屏幕中时开始加载真实图片
``` javascript
var oDiv = document.querySelector("#div1");
var oImg = oDiv.getElementsByTagName("img")[0];

window.onscroll = function(){
    if(oImg.isLoad)return;
    var A = utils.offset(oDiv).top + oDiv.offsetHeight;// 这里不能用oImg，oImg藏起来获取有问题
    var B = utils.win("scrollTop") + utils.win("clientHeight");
    if(A < B){
        var loadImg = new Image();
        loadImg.src = oImg.getAttribute("data-src");
        loadImg.onload = function(){
            console.log("ok");
            oImg.src = this.src;
            oImg.style.display = "block";
            loadImg = null;
        };
        oImg.isLoad = true;// 不管是否加载成功进入后就不再重新加载了，JS定义的属性控制台上看不见的
    }
};
```
#### 案例
<a href="javascript">连接</a>
补充：数据异步加载一般是开始把前两屏的数据加载进来，当页面滚动到对应区域时再加载渲染数据
### 兼容性处理举例
try catch:不管是什么都要走try中的代码，不好
``` javascript
function getStyle(ele,attr){
    try{
        return getComputedStyle(ele,null)[attr];
    }
    catch(e){
        return ele.currentStyle[attr];
    }
}
```
判断是否存在此属性
``` javascript
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return getComputedStyle(ele,null)[attr];
    }
    else{
        return ele.currentStyle[attr];
    }
}
```
``` javascript
function getStyle(ele,attr){
    if("getComputedStyle" in window){
        return getComputedStyle(ele,null)[attr];
    }
    else{
        return ele.currentStyle[attr];
    }
}
```
``` javascript
function getStyle(ele,attr){
    if(typeof window.getComputedStyle === "function"){
        return getComputedStyle(ele,null)[attr];
    }
    else{
        return ele.currentStyle[attr];
    }
}
```
navigator.userAgent
``` javascript
function getStyle(ele,attr){
    if(/MSIE(6|7|8)/.test(navigator.userAgent)){
        return ele.currentStyle[attr];
    }
    else{
        return getComputedStyle(ele,null)[attr];
    }
}
```
对单位的处理
``` javascript
function getStyle(ele,attr){
    var val = null,reg = null;
    // var val = reg = null;// 这样写reg是全局的
    if(window.getComputedStyle){
        val = window.getComputedStyle(ele,null)[attr];
    }
    else{// ie6-8
        if(attr === "opacity"){
            val = ele.currentStyle["filter"];// alpha(opacty=10)
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        }
        else{
            val = ele.currentStyle[attr];
        }
    }
    // 负数、小数、单位可能出现或不出现
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
    return reg.test(val) ? parseFloat(val) : val;
}
```
### String常用方法
``` javascript
var str = 'yangkkk';

str.length;

str.charAt(0);// 获取指定索引对应的字符

str.charCodeAt(0);// 索引位置字符对应的ASCII码值

str.substr(n,m);// 索引n(包括n)开始截取 m个 字符

str.substring(n,m);// 从索引n找到m(不包括m)处

str.slice(n,m);// 和substring()一样，支持负数作为索引，例如splice(-10)

str.indexOf(字符);// 获取指定字符在对应字符串中第一次出现的索引和charAt()相反

lastIndexOf(字符);// 获取字符在字符串中最后一次出现的位置，如果没有返回-1

str.toLowerCase();

toUpperCase();

str.replace(旧字符，新字符);// 配合正则使用较好
str.replace('k',"o").replace('k',"o").replace('k',"o");
str.replace(/k/g,"o");

str.split("")// 变成数组
```
#### 时间转换
主要用到String的split()方法
``` javascript
var time = "2016-12-10 12:45:3";// 转成：2016年12月10日 12时45分03秒

var arr = time.split(" ");// 字符串按空格拆分成数组
var arrLeft = arr[0].split("-");// 数组中的字符串按-拆分成数组
var arrRight = arr[1].split(":");

var leftStr = "";
var rightStr = "";

var l = "";
var r = "";
for(var i = 0;i < arrLeft.length;i ++){
    switch(i){
        case 1:
            l = "年";
        break;
        case 2:
            l = "月";
        break;
        default:
            l = "日";
    }
    leftStr += arrLeft[i] + l;
}
for(var i = 0;i < arrRight.length;i ++){
    switch(i){
        case 1:
            r = "时";
        break;
        case 2:
            r = "分";
        break;
        default:
            r = "秒";
    }
    rightStr += arrRight[i] + r;
}
console.log(leftStr + " " + rightStr);
```
#### str.replace()
``` javascript
var str = "20151213";
var arr = ["零","一","二","三","四","五","六","七","八","九"];

str = str.replace(/\d/g,function(){
    // var num = arguments[0];
    // var str = arr[num];
    // return str;
    // ["2", 0, "20151213"]// 数字，索引，str
    return arr[arguments[0]];
});
console.log(str);
```
### Array常用方法
``` javascript
// push:返回新数组的长度，原来数组改变
// unshift:数组开头增加，返回改变后的长度，原来数组改变
// pop:不穿参数，删除数组最后一个，返回删除的内容，返回类型和删除内容类型一样，原来数组改变
// shift:不传参数，删除数组第一个，返回删除的内容，返回类型和删除内容类型一样，原来数组改变

// splice(n,0,x):向数组中索引为n的前面添加新的内容，返回空数组，原来数组改变
// splice(n,m):从索引n（包含n）开始删除m个元素，把删除的内容当作新的数组返回，原来数组改变
// splice(n,m,x):从索引n开始删除m个元素，用x替换删除的，把删除的内容当作新的数组返回，原来数组改变

// splice(0,0,x)   >>  unshift
// splice(arr.length,0,x)  >>  push
// splice(arr.length-1,1)  >>  pop
// splice(0,1) >>  shift
// 注意以上虽然功效一样，但返回的内容是不一样的

// slice(n,m):从索引n（包含n）开始，找到索引m处（不含m），找到内容作为一个新数组返回，原有数组不变
// slice(n):从n找到末尾
// slice(0)或slice():将原来数组原封不动的复制一份

// concat:数组与数组的拼接，例如arr1.concat(arr2)

// toString:将对象转换为字符串，把数组中每一项拿出来用逗号隔开拼接为一个字符串，原有数组不变

// join(分隔符):将对象转换为字符串，把数组中每一项拿出来用逗号隔开拼接为一个字符串，原有数组不变
// 例如实现数组所有数字相加：eval(arr.join("+"))

// reverse:返回反转后的数组，原有数组改变

// sort:排序，直接写sort只能处理10以内的数字，处理所有的传参数，是利用冒泡排序的思想实现的

// 常用但不兼容的几个方法(待续)：
// indexOf()
// forEach()
// map()
// ...
```
### 冒泡排序
``` javascript
// 冒泡排序：当前项和后一项进行比较，如果当前项 > 后一项，两者交换位置

var arr = [12,10,13,8,4];

// [10,12,13,8,4]
// [10,12,13,8,4]
// [10,12,8,13,4]
// [10,12,8,4,13]

// [10,12,8,4,13]
// [10,8,12,4,13]
// [10,8,4,12,13]

// [8,10,4,12,13]
// [8,4,10,12,13]

// [4,8,10,12,13]

// 每一轮都将最大的放在后面，比较arr.length - 1轮，每一轮又比较arr.length - 1 - i次

function sortArr(arr,type){
    for(var i = 0;i < arr.length - 1;i ++){
        for(var j = 0;j < arr.length - 1 - i;j ++){
            if(arr[j] > arr[j + 1]){
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    type == 1 ? arr.reverse() : void 0;
}

sortArr(arr,1);

console.log(arr);
```
### 内容排序原理
``` javascript
var oUl = document.querySelector("#ul1");
var aLi = document.querySelectorAll("li");

// 类数组转数组
var newAli = [].slice.call(aLi);
// 排序数组
newAli.sort(function(a,b){
    return parseInt(a.innerHTML) - parseInt(b.innerHTML);
});
// appendChild
for(var i = 0;i < newAli.length;i ++){
    oUl.appendChild(newAli[i]);
}
```
### 数据类型检测的4种方式
#### typeof
typeof返回的都是字符串，字符串中包含了对应的数据类型，例如"number"、"string"、"boolean"、"undefined"、"function"、"object"，局限性：不能细分正则、数组、null，常见应用如下：
``` javascript
// 实现num2不传的时候默认0
function fn(num1,num2){
    // num2 = num2 || 0;// 有真即真，假如传的false这里结果也会是0
    if(typeof num2 === "undefined"){// 改写成这样
        num2 = 0;
    }
    console.log(num2);
}
fn(10,false);
```
``` javascript
function fn(callback){
    // callback && callback();// 同真为真，有假即加，不传值的时候不至于出错
    typeof callback === "function" ? callback() : null;
}
fn(function(){
    console.log('hello world');
});
```
#### instanceof
问题1：只能区分实例创建出来的结果是有区别的，对于字面量创建的无法判断，严格意义上来讲只有实例创建出来的结果才是标准的对象
``` javascript
console.log(1 instanceof Number);// false
console.log("" instanceof String);// false
console.log(true instanceof Boolean);// false

console.log( new Number(1) instanceof Number );
console.log( new String(1) instanceof String );
console.log( new Boolean(true) instanceof Boolean );
```
问题2：结果未必准确
``` javascript
var arr = [];
console.log(arr instanceof Array);// true
console.log(arr instanceof Object);// true

function Fn(){}
Fn.prototype = new Array;
var f = new Fn;
console.log(f instanceof Array);// true
```
问题3：对于特殊的数据类型，例如null和undefined所属的类是Null和undefined，但是浏览器把这两个类保护起来了，不允许我们外部访问使用
``` javascript
console.log(null instanceof Null);// 报错
console.log(undefined instanceof Undefined);
```
#### constructor
``` javascript
var obj = [];
console.log(obj.constructor);// function Array(){ ... }

var num = 1;
console.log(num.constructor === Number);// true

var reg = /^$/;
console.log(reg.constructor === RegExp);
console.log(reg.constructor === Object);// false
```
问题：发生继承时检测失败
``` javascript
function Fn(){}
Fn.prototype = new Array;
var f = new Fn();
console.log(f.constructor);// Array，检测失败
```
#### Object.prototype.toString.call()
解释：执行Object.prototype.toString方法并改变this指向
作用1：对于Number、String、Boolean、Array、RegExp、Date、Function原型上的toString方法都是把当前的数据类型转为字符串
``` javascript
console.log(typeof (1).toString());// Number.prototype.toString
console.log(typeof ('1').toString());// String.prototype.toString
console.log(typeof (true).toString());
console.log(typeof ([]).toString());
console.log(typeof (/^$/).toString());
console.log(typeof (new Date()).toString());
console.log(typeof (new Function()).toString());
```
作用2：进制转换
``` javascript
console.log((128).toString(2));
console.log((128).toString(8));
console.log((128).toString(10));
```
作用3：返回当前方法的执行主体（this）所属类的详细信息
``` javascript
// 例如下面：执行主体是{name:"yangk"}，所属类的详细信息"[object Object]"，第一个小写的object代表当前对象是对象数据类型的，第二个Object代表的是obj是Object这个类的一个实例，即obj所属的类是Object
var obj = {name:"yangk"};
console.log( obj.toString() );
console.log( Math.toString() );// "[object Math]"，toString中的this是谁，返回的就是谁所属类的信息"[object Math]"
```
案例实战
``` javascript
var arr = [];
console.log(Object.prototype.toString.call(arr));// [object Array]

console.log({}.toString.call(1));// 这种写法和上面一样,{}找到也是Object.prototype.toString
console.log({}.toString.call(null));
console.log({}.toString.call(undefined));

if(Object.prototype.toString.call(arr) === "[object Array]"){ ... }
```
``` javascript
var arr = [];
var reg = /^\[object Array\]$/;
if(reg.test(Object.prototype.toString.call(arr))){
    console.log('这是一个数组！');
}
```
### 枚举
``` javascript
// 无区别
var obj = {};
var obj = new Object();

// 有区别
var num = 1;// 基本，nun instanceof Number >> false
var num = new Number(1);// 对象，num instanceof Number >> true

Object.prototype.aaa = function(){
    console.log("bbb");
};
var obj = {
    name: "aaa"
};
obj.aaa();// obj.__proto__.aaa();

for(var key in obj){// 能遍历私有和自己写的公有的
    console.log(obj[key]);
}

// 是否可枚举，私有true，公有false
console.log(obj.propertyIsEnumerable("name"));// true
console.log(obj.propertyIsEnumerable("aaa"));// false

for(var key in obj){
    // if(obj.propertyIsEnumerable(key)){
    //     console.log(key + "...");
    // }
    if(obj.hasOwnProperty(key)){
        console.log(key + "...");
    }
}
```
### JSON
JSON是一种数据格式，主要用于前后台交互时作为数据的载体
``` javascript
var arr = [
    {"name":"yangk"},
    {"age":"24"}
];
// 把JSON格式的数组转换为JSON格式的字符串
var str = window.JSON.stringify(arr);// 转为JSON格式的字符串，window可不加

// 把JSON格式的字符串转换为JSON格式的数组/对象
var jsonArr = JSON.parse(str);
console.log(jsonArr);// 数组格式的

// ie6-7不兼容JSON，可以下面方法实现
var str = '[{"name":"yangk"},{"age":"24"}]';
var jsonArr = eval("("+ str +")");
console.log(jsonArr instanceof Array);
```
### AJAX
一个基本的AJAX
``` javascript
var xhr = new XMLHttpRequest();
xhr.open("get","data.txt",true);
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = xhr.responseText;
        document.body.innerHTML = data;
    }
};
xhr.send();
```
关于JSONP
``` javascript
// 1、JSONP需要获取数据的服务器端做支持
// 2、原理：利用script标签的特性
// 3、把当前页面中的一个函数当作参数传递给服务器(url?callback=fn)，服务器返回'fn([{"name":"aaa"}])'
// 4、客户端让fn执行，fn中的参数就是我们想要的数据
function fn(data){
    console.log(data);
}
<script src="http://matchweb.sports.qq.com/kbs/calendar?columnId=100000&callback=fn"></script>
```
关于JQUERY中的AJAX
``` javascript
$.ajax({
    url: "data.txt",
    type: "get",
    dataType: "json",
    data: null,// post方式传输时放数据
    async: true,// 异步
    cache: false,// 不要缓存，自动会在请求地址的url末尾加参数，默认走缓存
    timeout: 3000,// 超过3秒不成功走error
    success: function(data){
        console.log(data);// 不指定dataType的情况下是string
    },
    error: function(){

    }
});
```
JQUERY中的JSONP：都是GET和异步请求
``` javascript
$.ajax({
    url: "http://matchweb.sports.qq.com/kbs/calendar?columnId=100000",
    jsonpCallback: "fn",// 指定函数名fn，不指定就是随机的
    jsonp: "cb",// cb代替callback
    dataType: "jsonp",
    success: function(data){
        console.log(data);
    }
});
```
### 表单事件
``` javascript
<input type="number" disabled id="number" value="15">
<input type="range" id="range" min="0" max="65" step="1" value="15">
var oRange = document.getElementById("range");
var oNumber = document.getElementById("number");
oRange.oninput = function(){
    number.value = this.value;
};
```
``` javascript
var submit = document.getElementById("submit");
var sexMan = document.getElementById("sexMan");
var sexWoman = document.getElementById("sexWoMan");
submit.onclick = function(){
    var sexType = 0;
    !sexMan.checked ? sexType = 1 : null;// 默认sexman.checked为true，选中女时sexMan.checked为false
    
};
/*sexMan.onclick = sexWoman.onclick = function(){
    console.log(this.value);
};*/
sexMan.onchange = sexWoman.onchange = function(){// 表单事件的正确姿势
    console.log(this.value);
};
```
### 存储
#### cookie
``` javascript
// 把信息存储到客户端浏览器中，服务器端也可以获取到
document.cookie = "age=7";
escape(str);// 编码
unescape(str);// 解码

// cookie常用在：记住用户名密码；用户的部分信息，例如登陆信息；购物车；少量信息且对浏览器兼容要求高的...
localStorage常用在：某一个JS或CSS的源代码；一些不需要经常更新的数据，存储的时候可以设置一个时间，刷新页面时，判断当前时间是否超过页面设置的时间，若超过，重新获取，没超则使用本地的。

// 本地存储都是明文存储，需要加密
```
#### session
``` javascript
// 把信息存储到服务器上
```
#### localStorage
``` javascript
// 永久存储到本地
localStorage.setItem('age',7);// 存，是字符串格式的
localStorage.setItem('person1',JSON.stringify({name: "yangk"}));
localStorage.getItem('person1');// 取，返回的也是字符串类型的
localStorage.removeItem('age');// 删对应
localStorage.clear();// 当前资源下所有的存储记录都移除掉
localStorage.length;// 存储的条数
localStorage.key(0);// 获取索引为0的那一条
```
#### sessionStorage
``` javascript
// 会话窗口关闭时消失
```
### 中文排序
``` javascript
var arr = [
    {name: "菜花",age: 24},
    {name: "狗蛋",age: 30},
    {name: "美丽",age: 21},
    {name: "郑红",age: 38},
    {name: "拴住",age: 17}
];
arr.sort(function(a,b){
    return a.name.localeCompare(b.name);
});
```
### JS中的异步
同步：没有完成之前，绝对不会做下一件事情
``` javascript
while(1){

}
console.log("ok");// 永远都不会执行
```
常见异步形式：定时器、事件绑定、Ajax读取数据的时候一般设置为异步、回调函数
例一：
``` javascript
var n = 0;
window.setTimeout(function(){
    n ++;
    console.log(n);// 再1
},1000);
console.log(n);// 先0
```
例二：
``` javascript
// 浏览器对于定时器都有一个最小等待时间，如果设置时间小于等待时间则设置时间不起作用
var n = 0;
window.setTimeout(function(){
    n ++;
    console.log(n);// 再1
},0);
console.log(n);// 先0
```
例三：
``` javascript
var n = 0;
window.setTimeout(function(){
    n ++;
    console.log(n);// 下面没结束这里永远不执行
},0);
// 定时器设置的时间不一定就是等待执行的时间，如果定时器之后还有其他的事情等待处理，不管定时器的时间有没有到，都是不会执行定时器的
console.log(n);// 输出一次0，下面就卡死了
while(1){
    n ++;
}
console.log(n);// 不执行
```
例四：
``` javascript
// 谁时间短执行谁，时间一样按先后顺序
var n = 0;
window.setTimeout(function(){
    n += 2;
    console.log(n);// 7第四次
},7);

window.setTimeout(function(){
    n += 5;
    console.log(n);// 5第三次
},5);

console.log(n);// 0第一次
for(var i = 0;i < 10000000;i++){// 即便这里执行时间大于7毫秒也不会先执行上面的

}
console.log(n);// 0第二次
```
例五：
``` javascript
for(var i = 0;i <aLi.length;i++){
    aLi[i].onclick = function(){
        // 异步编程：一点上面的就循环完了，爱我所爱不等待
    }
}
```
### 题目/技巧
#### 求值
``` javascript
for(var i = 0;i < 5;i ++){
    if(i <= 5){
        i += 1;
        continue;
    }
    else{
        break;
        i += 2;
    }
}
console.log(i);
```
``` javascript
var j = 0;
while(j < 5){
    if(j <= 5){
        j += 1;
        j ++;
        continue;
    }
    else{
        break;
        j += 2;
    }
}
console.log(j);
```
``` javascript
for(var i = 0;i < 10;i ++){// 5 ++
    if(i <= 5){
        i += 2;
        continue;
    }
    i += 3;
    break;
}
console.log(i);
```
``` javascript
function fn(){
    var i = 10;
    return function(n){
        console.log(n + (++ i));
    };
}
var f = fn();
f(10);// 21
f(20);// 32
fn()(10);// 21
fn()(20);// 31
```
``` javascript
function fn(i){
    return function(n){
        console.log(n + i ++);// 先执行i ++
    };
}
var f = fn(13);
f(12);// 25
f(14);// 28
fn(15)(12);// 27
fn(16)(13);// 29
```
``` javascript
var num = 20;
var obj = {
    num: 30,
    fn: (function(num){// fn是自执行函数的返回结果，即return后面的函数
        this.num *= 3;// 自执行函数的this永远是window，所以window下的num = 60
        num += 15;// 35
        var num = 45;// 形参已经有了就不重新声明了，直接等于45
        return function(){
            this.num *= 4;// this是window，结果是240
            num += 20;// 上级作用域45 + 20 = 65
            console.log(num);
        };
    })(num)// 20
};
var fn = obj.fn;// return的函数
fn();// 65
// fn();// 85
obj.fn();// 85，这里执行后上面this.num *= 4结果是120
console.log(window.num,obj.num);// 240,120
```
``` javascript
var number = 2;
var obj = {
    number: 4,
    fn1: (function(){
        this.number *= 2;// 闭包形式的this >> window
        number = number * 2;// 只声明没定义undefined * 2
        console.log(number);// NaN
        var number = 3;
        return function(){// return 给fn1，必包有return不销毁
            this.number *= 2;// this >> window 8
            number *= 3;// 找没有销毁的必包中的变量 9
            alert(number);// 
        }// 这个匿名方法返回这个函数，fn1最终就是这个函数
    })()// 这个匿名函数运行就是一个必包
};
var fn1 = obj.fn1;// NaN
alert(number);// 4
fn1();// 9.........window

obj.fn1(); // 27............obj
alert(window.number);// 8
alert(obj.number);// 8
```
``` javascript
// 注意1和2位置切换后的结果是不一样的
function Person(){
}
Person.prototype = {// 1
    constructor: Person,
    name: "yangk",
    showName: function(){
        console.log(this.name);
    }
};
var person1 = new Person();// 2
person1.showName();
```
#### typeof
``` javascript
console.log(typeof typeof typeof []);
```
#### 三目运算符
``` javascript
num > 0 ? console.log("yes") : void 0;// 不符合条件又没内容返回时可以这样写就是返回undefined
```
#### for in循环顺序问题
for in循环的顺序问题：首先循环数字的属性名(从小到大)，再按我们写的顺序循环其他的
``` javascript
var obj = {
    name: "yangk",
    age: 25,
    1: 10086
};
for(var key in obj){
    console.log(obj[key]);
}
```
#### JS中的6个假值
``` javascript
false、null、undefined、0、""、NaN
```