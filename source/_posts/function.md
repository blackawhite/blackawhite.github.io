---
title: 常用方法封装
date: 2016-12-28 23:40:36
tags:
---
### listToArray(likeArr)
``` javascript
// 类数组转数组
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
<!-- more -->
### toJSON(str)
``` javascript
// 把JSON格式的字符串转换为JSON格式的数组/对象
function toJSON(str){
    return "JSON" in window ? JSON.parse(str) : eval("("+ str +")");
}
```
### getChild(oParent,tagName)
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
``` javascript
function getChild(oParent,tagName){
    var arr = [];
    if(!window.getComputedStyle){// ie6,7,8
        var nodeList = oParent.childNodes;
        for(var i = 0;i < nodeList.length;i ++){
            if(nodeList[i].nodeType === 1){
                arr[arr.length] = nodeList[i];
            }
        }
    }
    else{
        arr = Array.prototype.slice.call(oParent.children);// 转数组
    }
    if(typeof tagName === "string"){// 二次筛选
        for(var i = 0;i < arr.length;i ++){// 注意这里的arr.length不能和i一起声明
            if(arr[i].tagName.toLowerCase() !== tagName.toLowerCase()){
                arr.splice(i,1);
                i --;
            }
        }
    }
    return arr;
}
```
### prev(curEle)
``` javascript
function prev(curEle){
    if(curEle.previousElementSibling){
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while(pre && pre.nodeType !== 1){
        pre = pre.previousSibling;
    }
    return pre;
}
```
### next(curEle)
``` javascript
function next(curEle){
    if(curEle.nextElementSibling){
        return curEle.nextElementSibling;
    }
    var next = curEle.nextSibling;
    while(next && next.nodeType !== 1){
        next = next.nextSibling;
    }
    return next;
}
```
### prevAll(curEle)
``` javascript
function prevAll(curEle){
    var arr = [];
    var pre = prev(curEle);// 不能用prev变量会改写prev函数
    while(pre){
        arr.unshift(pre);// 从开头插入
        pre = prev(pre);
    }
    return arr;
}
```
### nextAll(curEle)
``` javascript
function nextAll(curEle){
    var arr = [];
    var nex = next(curEle);
    while(nex){
        arr.push(nex);
        nex = next(nex);
    }
    return arr;
}
```
### sibling(curEle)
``` javascript
function sibling(curEle){
    var arr = [];
    prev(curEle) ? arr.push(prev(curEle)) : null;
    next(curEle) ? arr.push(next(curEle)) : null;
    return arr;
}
```
### siblings(curEle)
``` javascript
function siblings(curEle){
    return prevAll(curEle).concat(nextAll(curEle));
}
```
### index(curEle)
``` javascript
function index(curEle){
    return prevAll(curEle).length;
}
```
### firstChild(curEle)
``` javascript
function firstChild(curEle){
    var aCh = getChild(curEle);
    return aCh.length > 0 ? aCh[0] : null;
}
```
### lastChild(curEle)
``` javascript
function lastChild(curEle){
    var aCh = getChild(curEle);
    return aCh.length > 0 ? aCh[aCh.length - 1] : null;
}
```
### append(oParent,newEle)
``` javascript
function append(oParent,newEle){
    oParent.appendChild(newEle);
}
```
### prepend(oParent,newEle)
``` javascript
// 增加到容器内的开头
function prepend(oParent,newEle){
    var oFirst = firstChild(oParent);
    if(oFirst){
        oParent.insertBefore(newEle,oFirst);
        return;
    }
    // 如果没有子元素
    oParent.appendChild(newEle);
}
```
### insertBefore(newEle,oldEle)
``` javascript
// 插入前面，平行插入
function insertBefore(newEle,oldEle){
    oldEle.parentNode.insertBefore(newEle,oldEle);
}
```
### insertAfter(newEle,oldEle)
``` javascript
function insertAfter(newEle,oldEle){
    var nex = next(oldEle);// 相当于插入其前
    if(nex){
        oldEle.parentNode.insertBefore(newEle,nex);
        return;
    }
    oldEle.parentNode.appendChild(newEle);
}
```
### hasClass(curEle,className)
``` javascript
function hasClass(curEle,className){
    /*if(curEle.className.indexOf(className) > -1){// bg2中也包含bg class不准确
        return true;
    }
    return false;*/
    // / +class +/
    // /^box +/
    // / +border$/
    
    // 字面量创建方式//中所有东西都是元字符
    
    var reg = new RegExp("(^| +)"+ className +"( +|$)");
    return reg.test(curEle.className);
}
```
### addClass(curEle,className)
``` javascript
function addClass(curEle,className){
    // 包含多个class时
    var arr = className.replace(/(^ +| +$)/g,"").split(/ +/g);// 1到多个空格拆分
    for(var i = 0;i < arr.length;i ++){
        if(!hasClass(curEle,arr[i])){
            curEle.className += " " + arr[i];
        }
    }
}
```
### removeClass(curEle,className)
``` javascript
function removeClass(curEle,className){
    var arr = className.replace(/(^ +| +$)/g,"").split(/ +/g);// 1到多个空格拆分
    for(var i = 0;i < arr.length;i ++){
        if(hasClass(curEle,arr[i])){
            var reg = new RegExp("(^| +)"+ arr[i] +"( +|$)","g");
            curEle.className = curEle.className.replace(reg," ");
        }
    }
}
```
### getElementsByClass(oParent,className)
``` javascript
//document.getElementsByClassName("b1 b2")// 同时包含b1和b2，和样式顺序和中间空格的多少无关
function getElementsByClass(oParent,className){
    oParent = oParent || document;
    var classNameArr = className.replace(/(^ +| +$)/g,"").split(/ +/g);
    if(window.getComputedStyle){
        return listToArray(oParent.getElementsByClassName(className));
    }
    // ie6-8
    var arr = [];
    var nodeList = oParent.getElementsByTagName("*");
    for(var i = 0;i < nodeList.length;i ++){
        var curNode = nodeList[i];
        var isOk = true;// 假设curNode中包含
        for(var k = 0;k < classNameArr.length;k ++){
            var reg = new RegExp("(^| +)"+ classNameArr[k] +"( +|$)");
            if(!reg.test(curNode.className)){
                isOk = false;
                break;
            }
        }
        if(isOk){// 拿每一个标签分别和所有样式类名比较之后
            arr.push(curNode);
        }
    }
    return arr;
}
```
### getCss(curEle,attr)
```` javascript
function getCss(curEle,attr){
    var val = null,reg = null;
    //var val = reg = null;// 这样写reg是全局的
    if(window.getComputedStyle){
        val = window.getComputedStyle(curEle,null)[attr];
    }
    else{// ie6-8
        if(attr === "opacity"){
            val = curEle.currentStyle["filter"];// alpha(opacty=10)
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        }
        else{
            val = curEle.currentStyle[attr];
        }
    }
    // 负数、小数、单位可能出现或不出现
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
    return reg.test(val) ? parseFloat(val) : val;
}
````
### setCss(curEle,attr)
``` javascript
function setCss(curEle,attr,value){
    // float
    if(attr === "float"){
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
        return;
    }
    // opacity
    if(attr === "opacity"){
        curEle["style"]["opacity"] = value;
        curEle["style"]["filter"] = "alpha(opacity="+ value * 100 +")";
        return;
    }
    // 如果没有单位，需要加上默认的
    var reg = null;
    reg = /^(width|height|top|right|bottom|left|((margin|padding)(Top|Right|Bottom|Left)?))$/;
    if(reg.test(attr)){
        if(!isNaN(value)){// 传递进来的是否是数字
            value += "px";
        }
    }
    curEle["style"][attr] = value;
}
```
### setGroupCss(curEle,opt)
``` javascript
function setGroupCss(curEle,opt){
    // Object.prototype.toString.call()
    opt = opt || 0;// null 或 undefined
    if(opt.toString() !== "[object Object]"){
        return;
    }
    for(var key in opt){
        if(opt.hasOwnProperty(key)){// ?
            setCss(curEle,key,opt[key]);
        }
    }
}
```
### css(curEle)
``` javascript
// 获取、单独和批量设置
function css(curEle){
    var argTwo = arguments[1];
    if(typeof argTwo === "string"){// 获取或设置
        var argThree = arguments[2];
        if(typeof argThree === "undefined"){// 第三个参数不存在，这样判断!argThree，传0出问题
            // return getCss(curEle,argTwo);
            return getCss.apply(this,arguments);
        }
        setCss.apply(this,arguments);
        /*setCss(curEle,argTwo,argThree);*/
    }
    argTwo = argTwo || 0;
    if(argTwo.toString() === "[object Object]"){
        // 批量设置
        setGroupCss.apply(this,arguments);
    }
}
```
### offset(curEle)
``` javascript
function offset(curEle){
    var totalLeft = 0;
    var totalTop = 0;
    var parent = curEle.offsetParent;
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;
    while(parent){
        // 在标准的ie8中，offsetLeft已经把边框算进去了
        if(navigator.userAgent.indexOf("MSIE 8.0") === -1){// 不是ie8
            totalLeft += parent.clientLeft;// 边框
            totalTop += parent.clientTop;
        }
        totalLeft += parent.offsetLeft;
        totalTop += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        "top": totalTop,
        "left": totalLeft
    };
}
```
### win(attr,value)
``` javascript
function win(attr,value){
    if(typeof value === "undefined"){
        return document.documentElement[attr]||document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
}
```
