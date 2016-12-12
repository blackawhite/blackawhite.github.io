---
title: JavaScript Object
date: 2016-12-11 21:45:05
tags:
---
### 封装-单例模式
``` javascript
var person1 = {// 命名空间，起到了分组的作用，也避免了冲突
    "name": "yangk"
};
var person2 = {
    "name": "jiangjun"
};
// 解决上述代码重复的问题
function CreatePerson(name){
    return {
        name: name
    };
}
var person1 = CreatePerson("yangk");
var person1 = CreatePerson("jiangjun");
// 问题：person1和person2之间没有内在的联系，不能反映出它们是同一个原型对象的实例
```
<!--more-->
### 封装-工厂模式
``` javascript
function CreatePerson(name,age){
    // 原料
    var obj = {};
    // 加工
    obj.name = name;
    obj.age = age;
    obj.showName = function(){
        console.log(this.name);
    };
    // 出厂
    return obj;
}
var person1 = CreatePerson("yangk","24");
var person2 = CreatePerson("jiangjun","25");

console.log(person1.showName == person2.showName);// false
```
### 封装-构造函数+原型模式
``` javascript
function CreatePerson(name,age){
    this.name = name;
    this.age = age;
}
CreatePerson.prototype.showName = function(){
    console.log(this.name);
};
var person1 = new CreatePerson("yangk","24");// 不传参时可以把后面的括号省略
var person2 = new CreatePerson("jiangjun","28");
console.log(person1.showName == person2.showName);// true
```
### 继承-call/apply
``` javascript
function CreatePerson(name,sex){
    this.name = name;
    this.sex = sex;
}
CreatePerson.prototype.showName = function(){
    console.log(this.name);
};

function CreateStar(name,sex,job){
    CreatePerson.call(this,name,sex);// this实例对象，继承属性
    this.job = job;
}
CreateStar.prototype = CreatePerson.prototype;// 继承方法，CreateStar.prototype上添加方法会影响父类
CreateStar.prototype.showJob = function(){
    console.log(this.job);
};


var person1 = new CreatePerson('yangk','男');
console.log(person1.showJob);// 有

var person2 = new CreateStar('黄晓明','男','演员');
person2.showName();
```
### 继承-浅拷贝
``` javascript
// 解决上面prototype继承的时候影响父类的问题
function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr] = obj2[attr];
    }
}

function CreatePerson(name,sex){
    this.name = name;
    this.sex = sex;
}
CreatePerson.prototype.showName = function(){
    console.log(this.name);
};

function CreateStar(name,sex,job){
    CreatePerson.call(this,name,sex);// this实例对象，继承属性
    this.job = job;
}
//CreateStar.prototype = CreatePerson.prototype;// 继承方法，CreateStar.prototype上添加方法会影响父类
extend(CreateStar.prototype,CreatePerson.prototype);
CreateStar.prototype.showJob = function(){
    console.log(this.job);
};

var person1 = new CreatePerson('yangk','男');
console.log(person1.showJob);// undefined

var person2 = new CreateStar('黄晓明','男','演员');
person2.showName();
```
### 继承-深拷贝
``` javascript
function extend(Child,Parent){
    for(var attr in Parent){
        Child[attr] = Parent[attr];
    }
}
function deepCopy(Parent,Child){
　　　　var Child = Child || {};
　　　　for(var i in Parent){
　　　　　　if(typeof Parent[i] === 'object'){
　　　　　　　　Child[i] = (Parent[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(Parent[i], Child[i]);
　　　　　　}
        else{
　　　　　　　　Child[i] = Parent[i];
　　　　　　}
　　　　}
　　　　return Child;
　　}
var arrParent = [
    1,
    2,
    [3,4,5]
];
var arrChild = [];
// extend(arrChild,arrParent);
// deepCopy(arrParent,arrChild);
arrChild = deepCopy(arrParent);

arrChild[2][0] = "yangk";
console.log(arrParent[2][0]);// 父元素不变
```
### 继承-空对象中介
``` javascript
function extend(Child,Parent){
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

function CreatePerson(name){
    this.name = name;
}
CreatePerson.prototype.showName = function(){
    console.log(this.name);
};

function CreateStar(name){
    CreatePerson.call(this,name);// 属性还是需要call办法继承
}
// 避免属性继承，只继承showName，画画原型链就明白
// var F = function(){};
// F.prototype = CreatePerson.prototype;
// CreateStar.prototype = new F();
// CreateStar.prototype.constructor = CreateStar;
extend(CreateStar,CreatePerson);

CreateStar.prototype.showYi = function(){// 对父类没影响
    console.log(1);
};

var person1 = new CreateStar("yangk");
person1.showName();
person1.showYi();
```
### 关于类中return要注意的
``` javascript
function Fn(){
    var num = 10;// 这里的num和this.num没有任何关系
    this.x = 100;
    this.getX = function(){
        console.log(this.x);
    };
    //return 100;// 不会有卵用
    //return {name: "yangk"};// 会覆盖默认返回的
}

var f1 = new Fn;
console.log(f1.num);// undefined
console.log(f1);// 默认返回类的实例对象

// instanceof检测实例是否属于某个类
console.log(f1 instanceof Fn);// true
console.log(f1 instanceof Object);// true

// typeof不能细分Object下的数组、正则...，可以用instanceof来细分
```
### 判断是否公有属性/方法
``` javascript
// 检测某一个属性是否属于这个对象
console.log("getX" in f1);
// 检测某一个属性是否属于这个对象的私有属性
console.log(f1.hasOwnProperty("getX"));// f1下的hasOwnProperty属性是通过原型链找到Object上的

function hasPubProperty(obj,attr){// 检测是否是共有
    // 是其属性且不是其私有的
    return (attr in obj) && !obj.hasOwnProperty(attr);// false
}
console.log(hasPubProperty(f1,"getX"));
```
### 理解原型链
```
每一个函数数据类型(普通函数、类、Object)都有一个天生的属性：prototype，并且这个属性是一个对象数据类型的；
prototype上又有一个天生的属性：constructor，属性值是当前函数／类本身，Fn；
每一个对象(普通对象、实例、prototype)数据类型也天生自带属性：__proto__，属性值是当前实例所属类的原型。
``` javascript
function Fn(){
    this.x = 100;
    this.sum = function(){

    };
}
Fn.prototype.getX = function(){
    console.log(this.x);
};
Fn.prototype.sum = function(){

};
var f1 = new Fn;
var f2 = new Fn;
console.log(Fn.prototype.constructor === Fn);// 验证第一二句话
console.log(f1.__proto__ === Fn.prototype);// 验证第三句话

console.log(f1.__proto__.getX === f2.getX);// true
console.log(f1.getX === Fn.prototype.getX);// true

console.log(f1.sum === f2.__proto__.sum);// false，私有和公有，先找私有，找到就不找了，找不到再找公有
console.log(f1.sum === Fn.prototype.sum);

f1.sum = function(){
    // 修改私有的
};
f1.__proto__.sum = function(){
    // 修改公有的，IE不让用
};
Fn.prototype.sum = function(){
    // 修改公有的，这样应对IE
};
```
![](/resources/images/js.jpeg)
### 关于this
``` javascript
function Fn(){
    this.x = 100;// 这里的this是实例
    this.y = 200;
    this.getY = function(){
        console.log(this.y);// 这里的this要看在哪执行的
    };
}
Fn.prototype = {
    constructor: Fn,
    y: 300,
    getX: function(){
        console.log(this.x);// 这里的this要看在哪执行的
    },
    getY: function(){
        console.log(this.y);
    }
};
var f = new Fn();
f.getX();// 私有没有，执行公有的 > 100
// 先确定this指向
// 把this替换成对应的代码
// 按照原型链查找的机制一步步的寻找结果

f.__proto__.getX();// 因为f.__proto__直接指向prototype所以直接执行公有的，但是this是f.__proto__，直接查找公有的prototype，发现并没有，所以undefined

Fn.prototype.getX();// undefined

f.getY();// 执行私有的

Fn.prototype.getY();// 直接执行公有的
```
### 数组去重
``` javascript
Array.prototype.myUnique = function(){
    var obj = {};
    for(var i = 0;i < this.length;i ++){
        if(obj[this[i]] == this[i]){
            // arr.splice(i,1);
            this[i] = this[this.length - 1];
            this.length --;// 删除
            i --;
            continue;
        }
        obj[this[i]] = this[i];
    }
    obj = null;
    return this;// 为了实现链式写法
};
var arr = [1,2,3,1,2,3];
// arr.myUnique();// this > arr
// arr.__proto__.myUnique();// ie不认
// Array.prototype.myUnique();// this > Array.prototype
// sort执行后的返回值是排序后的 数组 ，所以可以用reverse()...
arr.myUnique().sort(function(a,b){
    return a - b;
}).reverse().pop();// pop返回的是被删除的元素
console.log(arr);
```
### 遍历私有属性/方法
``` javascript
for(var key in obj){// 会遍历私有或自己写的公有的
    // if(obj.propertyIsEnumerable(key)){// 可枚举
    //     // 只有私有的了
    //     console.log(obj[key]);
    // }
    if(obj.hasOwnProperty(key)){// 也可以这样判断是否是自己私有的
        console.log(obj[key]);   
    }
}
// 私有属性才可枚举
console.log(obj.propertyIsEnumerable("name"));// true
// 公有属性不可枚举
console.log(obj.propertyIsEnumerable("aaa"));// false
console.log(obj.propertyIsEnumerable("toString"));// false    
```