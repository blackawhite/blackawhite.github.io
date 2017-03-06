---
title: ES5/6 Method
date: 2017-03-06 22:16:42
tags:
---
ES5/6新增方法记录
<!-- more -->
### let
``` javascript
// 有代码块的概念
{
    let a = 12;
}
console.log(a);// ReferenceError: a is not defined

// 不允许重复声明
let a = 12;
let a = 5;

// 应用
for(let i=0; i<aLi.length; i++){
    aLi[i].onclick = function(){
        console.log(i);
    };
}
```
### const
``` javascript
// 必须给初始值，且一旦赋值，终身不变
const a = '不允许改变';

// 但是对象的话是可以修改的
const a = {
    name: 'yangk'
};
a.name = 'momo';
console.log(a.name);
```
### 字符串连接
``` javascript
var name = "yangk"
var str = `my name is ${name}`;
```
### 解构赋值
``` javascript
var [a,b,c] = [12,54,74];
console.log(a);
console.log(b);
console.log(c);

// 与顺序无关
var {a,b,c} = {b: 5, c: 7, a: 12}
console.log(a);
console.log(b);
console.log(c);

// 模式匹配
var [a, [b, c], d] = [12, [1, 2], 6];

var [{a, e}, [b, c], d] = [{a: 'haha',e: 'xixi'}, [1, 2], 6];

// 应用：默认值
var {time=12,id=0} = {time:33};
console.log(time);
```
### Array.from
``` javascript
// 复制数组
var arr1 = [1,2,3];
var arr2 = [];
arr2 = arr1;
arr2.pop();
console.log(arr1);// 受影响

for(var i=0; i<arr2.length; i++){
    arr2[i] = arr2[i];
}
arr2.pop();
console.log(arr1);// 不受影响

arr2 = Array.from(arr1);// 不受影响

arr2 = [...arr1];// 不受影响

function show(...args){
    args.push(5);// 直接可以push
    console.log(...args);
}
show(1,2,3,4);


var aDiv = document.getElementsByTagName('div');
// var aEle = [].slice.call(aDiv);
var aEle = Array.from(aDiv);// 类数组转数组
console.log(aEle);

var name = 'yangk';// 字符串转数组
var arrName = Array.from(name);
console.log(arrName);

var arr = Array.of(1,2,3,4,5);// 参数转数组
console.log(arr);// arr
```
### for of
``` javascript
// for of：用来循环数组，map对象，generrator函数
var arr = ['a', 'b', 'c', 'd'];
/*for(var i in arr){
    console.log(i);// 索引：0,1,2,3
}*/
for(var i of arr){
    console.log(i);// 值：a,b,c,d
}

var map = new Map();
map.set('a','apple');
map.set('b','bannana');

map.delete('a');// 删除
console.log(map.get('a'));// 获取：apple

for(var name of map){// 默认map == map.entries()
    console.log(name);// string: b,bannana
}

for(var [key,value] of map){// 也可以这样循环,map = map.entries()
    console.log(key,value);
}

// 也可以单独循环某一个
for(var name of map.keys()){
    console.log(name);// a,b
}
for(var name of map.values()){
    console.log(name);// apple,bannana
}


var arr = ['a','b','c'];

for(var name of arr){// 默认只是值，map默认key和value都有
    console.log(name);
}
/*for(var name of arr.entries()){// 想要索引和值可以这么获得
    console.log(name);// 0,a
}
/*for(var name of arr.keys()){// 这里没有arr.values()了，因为默认打印的就是value
    console.log(name);
}*/
```
### 箭头函数
``` javascript
document.onclick = ()=>{
    // this => window
    document.body.style.background = "red";
};

var json = {
    a: 1,
    b: 2,
    show: ()=>{
        // this => window
        console.log(this.a);
    }
};
json.show();// undefined

// 箭头函数中arguments是不能用的
var show = ()=>{
    console.log(arguments);// arguments is not defined
};
show(1,2,3);

// ES6的简便写法
var name = "yangk";
var age = 18;
var person = {
    name,
    age,
    showName(){
        console.log(this.name);
    }
};
person.showName();
```
### ES6中的类待看...
``` javascript
...
```
### yield待补充...
``` javascript
function* show(){// generrator函数
    yield 'Hello';
    yield 'World';
    return 'Es6';
}
var res = show();
console.log( res.next() );// {value: "Hello", done: false} done:false指的是没有遍历完
console.log( res.next() );// {value: "World", done: false}
console.log( res.next() );// {value: "Es6", done: true}
```
### forEach
``` javascript
// ['a', 'b', 'c', 'd'].forEach(console.log);
['a', 'b', 'c', 'd'].forEach(function(value,index,array){
    console.log(value);
});

$.each([], function(index, value, array) {// jQuery
    // ...
});

// 应用
var sum = 0;
[1, 2, 3, 4].forEach(function(value,index,array){
    // console.log(array[index] == value);
    sum += value;
});
console.log(sum);// 10
```
### map
``` javascript
var arr = [1, 2, 3, 4];
var arrNew = arr.map(function (item) {
    return item * item;// 一般配合return使用
});
console.log(arrNew); // 1, 4, 9, 16
```
