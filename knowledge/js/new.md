## new一个对象的时候发生了什么
1. 新生成了一个对象
2. 链接到原型
3. 绑定this，执行构造函数的代码
4. 返回新对象(对象的构造函数返回的不是对象)
## 实现new的功能
```javascript
function create() {
    let obj = new Object()
    let Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    let result = Constructor.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
```
