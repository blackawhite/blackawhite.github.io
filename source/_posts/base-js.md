---
title: JavaScript mark
date: 2016-12-04 00:11:18
tags: JS基础知识
---
JavaScript学习中一些零碎笔记，持续更新...
<!--more-->
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

### 简单的隔N行变色
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
### ...

### 预解析
``` javascript
var a=2;
function box()
{ 
    alert(a);    // 先预解析弹出undifined，注意这两句的先后顺序！再注意下面的var，由于预解析时找出下面的var，故不向上找啦！
    var a=1;
}
box();
alert(a);         // 弹出2
```
``` javascript
var a=2;
function box()
{ 
    alert(a);  // 函数内预解析找不到var，向上找为2就弹出2.然后向下执行又被修改为1
    a=1;       // 能修改全部变量的a
}
box();
alert(a);     // 所以弹出1
```
``` javascript
var a=2;
function box(a)
{ 
    alert(a);  // 函数内预解析找到参数a，就不向上找了，由于调用时没有传入参数，所以弹出undefined 
    a=1;       // 此时的a为局部变量，并赋值为1，与此函数外面的a没有任何关系啦
}
box();
alert(a);      // 所以弹出2
```
``` javascript
var a=2;
function box(a)  // 参数的本质是个局部变量即var a=2;
{ 
    alert(a);    // 弹出2
    a=1;         // 此时的a之所以不能修改外面的值啦，是因为预解析时函数内已找到参数，此时修改的是函数内a的值
}
box(a);
alert(a);        // 弹出2
```
``` javascript
alert(f2);//undefined
if(true)
{ 
    function f2()
    { 
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
var fn = function a(){
}
fn();
```
``` javascript
// function中return后面的返回值不预解释
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
function fo(){
    var i = 0;
    return function(n){
        return n + i ++;//这里先执行i ++
    };
}
var f = fo();
var a = f(15);
alert(a);// 15，并且上面f()中的i变成了1
var d = f(20);
alert(d);//21
var b = fo()(15);//重新执行了15
alert(b);
var c = fo()(20);//重新执行了20
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

obj.fn1(); // 局部的number驻留内存9 * 3 = 27，此时obj.number已经等于8
alert(window.number);// 8
alert(obj.number);// 8
```
### 作用域
一个function生命周期：
出生：预解释时声明加定义，开辟一个新的内存空间，让函数名存储这个快的地址
生长：函数执行形成私有作用域，里面开始类似window的新一轮与解析
死亡：一般情况下(如果没有返回function)，私有作用域下的代码执行完成后，整个私有作用域就销毁了
``` javascript
function sum(){
    var total = 1 + 12;
    var obj = {
        name: 'yangk'
    };
    console.log(total);
}
sum();// 13
sum();// 13
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
### 随机数
``` javascript
// 找10 - 100之间不重复的整数10个整数并排序
var arr = [];
for(var i = 0;i < 10;i ++){
    // var iNum = Math.round( Math.random() * 90 + 10 );// 在这里定义一旦下面arr[i] == iNum就会陷入死循环
    find();
}
function find(){
    var iNum = Math.round( Math.random() * 90 + 10 );
    for(var i = 0;i < arr.length;i ++){
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
### 节点查找
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

### Array常用方法

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