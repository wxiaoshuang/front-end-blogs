# Vue
## 什么是MVVM,如何实现一个简易的MVVM
MVVM是Model-View-ViewModel的缩写,　MVVM 由 Model、View、ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI，它负责将数据模型转化成UI展现出来，ViewModel 是一个同步View 和 Model的对象
## 如何实现响应式
```javascript
```
## 模板和指令是怎么解析的
## 模板渲染
# 模拟vue实现一个简易的MVVM框架
>思路，使用Object.defineProperty劫持属性，在get的时候收集依赖，在set的时候触发依赖
```javascript
function update(value) {
    console.log('newVal', value)
}
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
Dep.target = null;
class Watcher{
    constructor(obj, key, cb) {
        Dep.target = this
        this.cb = cb
        this.obj = obj
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }
    update() {
        // 获取新值
        this.value = this.obj[this.key]
        this.cb(this.value)
    }
}
function observe(obj) {
    if(!obj || typeof obj !== 'object') {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
function defineReactive(obj, key, val) {
    // 递归子属性
    observe(val)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log('get value')
            // 将 Watcher 添加到订阅
            if(Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set: function reactiveSetter(newVal) {
            console.log('changeVal')
            val = newVal
            // 执行 watcher 的 update 方法
            dep.notify()
        }
    })

}
var data = {name: 'hello'}
observe(data)
new Watcher(data,'name', update)
data.name = 'yyy'
data.name = 'xxx'
```
Object.defineProperty 虽然已经能够实现双向绑定了，但是他还是有缺陷的。

1. 只能对属性进行数据劫持，所以需要深度遍历整个对象
2. 对于数组不能监听到数据的变化