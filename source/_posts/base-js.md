---
title: JavaScript mark
date: 2016-12-04 00:11:18
tags: JS基础知识
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
    //JS要执行的代码
}
catch(e){//形参一定要写，名字可以随便起，当try中代码报错了，会自动的执行catch中的代码
    //e.message;
    //throw new Error("shit");
    //throw new ReferenceError;// 引用错误
    //throw new TypeError;// 类型错误
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

//把数组中的每一项，当做一个新对象的属性名和属性值存起来，在存储的时候判断当前的属性名是否已经存在，存在就代表数组该项重复了，进行删除，否则则代表不重复，直接存储

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
    //arguments.sort();// 类数组不能直接sort
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
    //arguments.sort();// 类数组不能直接sort
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
    //[].slice.call(arguments,0)// 实例也有slice方法和上面一样的事，0可传可不传
    //[].__proto__.slice.call(...)// ie不兼容
    //[].slice.apply[arguments,[0]]
    
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
### DOM
#### 找一个节点下的子节点
``` javascript
function getChild(oParent,tagName){
    var arr = [];
    var aTag = oParent.childNodes;
    for(var i = 0;i < aTag.length;i ++){
        if(aTag[i].nodeType == 1){// 元素节点
            if(tagName){// 有限定子节点的话
                if(aTag[i].nodeName.toLowerCase() === tagName){
                    arr.push(aTag[i]);
                }
            }
            else{// 那就找出所有的子元素节点
                arr.push(aTag[i]);
            }
        }
    }
    return arr;
}
var oUl = document.querySelector("#ul1");
console.log(getChild(oUl));
```
#### 找上一个元素节点
``` javascript
var oDiv = document.getElementById("div1");
var pre = oDiv.previousSibling;
while(pre && pre.nodeType !== 1){
    pre = pre.previousSibling;
}
console.log(pre);
```
#### 找上N个元素节点
``` javascript
var oDiv = document.getElementById("div1");
var pre = oDiv.previousSibling;
var arr = [];
while(pre){
    if(pre.nodeType === 1){
        arr.push(pre);
    }
    pre = pre.previousSibling;
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

str.split("")//变成数组
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
    //num2 = num2 || 0;// 有真即真，假如传的false这里结果也会是0
    if(typeof num2 === "undefined"){// 改写成这样
        num2 = 0;
    }
    console.log(num2);
}
fn(10,false);
```
``` javascript
function fn(callback){
    //callback && callback();// 同真为真，有假即加，不传值的时候不至于出错
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
### 常用方法封装
#### Array.prototype.slice
``` javascript
function listToArray(likeArr){
    var arr = [];
    try{
        arr = Array.prototype.slice.call(likeArr);// [].slice，ie低版本不兼容
    }
    catch(e){
        for(var i = 0;i < likeArr.length;i ++){
            arr[arr.length] = likeArr[i];
        }
    }
    return arr;
}
```
#### JSON.parse
``` javascript
// 把JSON格式的字符串转换为JSON格式的数组/对象
function toJSON(str){
    return "JSON" in window ? JSON.parse(str) : eval("("+ str +")");
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
//fn();// 85
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
        }//这个匿名方法返回这个函数，fn1最终就是这个函数
    })()//这个匿名函数运行就是一个必包
};
var fn1 = obj.fn1;// NaN
alert(number);// 4
fn1();// 9.........window

obj.fn1(); // 27............obj
alert(window.number);// 8
alert(obj.number);// 8
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