---
title: Vue-mark
date: 2017-04-07 14:44:28
tags:
---
Vue学习的一些细节~~~
<!-- more -->
### vue-resource
接收数据
``` javascript
import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// ................................................

new Vue({
    template: `
        <div id="app">
            <input type="button" value="按钮" @click="show">
        </div>
    `,
    methods: {
        show: function(){
            this.$http.get('test.txt').then(function(res){
                // success
                console.log(res.data);
            },function(err){
                // error
                console.log(err.status);
            });
        }
    }
}).$mount('#app');
```
发送数据
``` javascript
import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// ................................................

new Vue({
    template: `
        <div id="app">
            <input type="button" value="按钮" @click="show">
        </div>
    `,
    methods: {
        show: function(){
            this.$http.get('get.php',{
                a: 3,
                b: 2
            }).then(function(res){
                console.log(res.data);
            },function(err){
                console.log(err.status);
            });
        }
    }
}).$mount('#app');
```
POST发送数据
``` javascript
import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// ................................................

new Vue({
    template: `
        <div id="app">
            <input type="button" value="按钮" @click="show">
        </div>
    `,
    methods: {
        show: function(){
            this.$http.post('get.php',{
                a: 3,
                b: 2
            },{
                emulateJSON: true
            }).then(function(res){
                console.log(res.data);
            },function(err){
                console.log(err.status);
            });
        }
    }
}).$mount('#app');
```
JSONP
``` javascript
import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// ................................................

new Vue({
    template: `
        <div id="app">
            <input type="button" value="按钮" @click="show">
        </div>
    `,
    methods: {
        show: function(){
            this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
                wd: 'a'
            },{
                jsonp: 'cb'// 默认callback
            }).then(function(res){
                // 成功
                console.log(res.data.s);
            },function(res){
                // 失败
                console.log('失败：'+res.status);
            });
        }
    }
}).$mount('#app');
```