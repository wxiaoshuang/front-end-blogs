>题目：使用 ECMAScript（JS）代码实现一个事件类Event，包含下面功能：绑定事件、解绑事件和派发事件。
```javascript
class EventManage {
    constructor() {
        this.cache = {}
    }
    on(type, fn) {
        cache[type] = cache[type] || []
        if(!cache[type].includes(fn)) {
            cache[type].push(fn)
        }
    }
    off(type, fn) {
        if(Array.isArray(cache[type]) && cache[type].length) {
            if(fn) {
                let i = cache[type].indexOf(fn)
                cache[type].splice(i, 1)
            } else {
                cache[type] = []
            }
        }
    }
    emit(type, data) {
        if(Array.isArray(cache[type]) && cache[type].length) {
            for(let fn in cache[type]) {
                fn(data)
            }
        }
    }
```
> Js中typeof能得到哪些类型
```javascript
typeof 1 // 'number'
typeof '2' // 'string'
typeof true // 'boolean'
typeof undfined // 'undefined'
typeof null // 'object'
typeof Symbol() // 'symbol'
typeof function() {} // 'function'
typeof {} // 'object'
typeof [] // 'array'
```
> == 和===的区别
>window.onload和DOMcontentLoaded的区别
>实现一个模块加载器，实现类似require.js的功能
>数组的常见操作，随机排序，打平，升序

> css的盒模型 :标准模型 + IE模型，两种模型的区别，css如何设置这两种模型，JS如何获取盒模型的宽高，边距重叠，BFC
标准模型：width = content, IE: width = border + padding + content
    dom.style.width/height
    dom.currentStyle.width
    window.getComputedStyle(dom).width
    dom.getBoundingClientRect().width

BFC概念，原理作用，如何生成BFC
> 事件 ：冒泡 捕获 自定义事件

> http协议
特点：简单快读，灵活，无连接，无状态
http1.1支持持久连接和管线化
get请求和post请求的对比
> 原型链
> 面向对象 如何实现继承，实现继承的几种方式
> 框架通识


