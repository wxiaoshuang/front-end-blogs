## 实现call, apply, bind函数
### call和apply
+ 这两个函数是函数的方法, 所以应该定义在Function.prototype上
+ 不传入第一个参数，那么默认为 window
+ 改变了调用函数的this指向，让新的对象可以执行该函数。
+ 思路是给新的对象添加一个函数，然后在执行完以后删除这个属性
```javascript
Function.prototype.myCall(context) {
    context = context || window;
    context._func = this;
    let args = [...arguments].slice(1);
    let result = context._func(...args);
    delete  context._func;
    return result;
}
```
```javascript
Function.prototype.myApply(context) {
    context = context || window;
    context._func = this;
    let result;
    if (arguments[1]) {
        result = context._func(...arguments[1])
    } else {
        result = context._func()
    }
    delete  context._func;
    return result;
}
```
实现bind函数，bind会返回一个新函数
```javascript
Function.prototype.myBind(context) {
    context = context || window;
    let args = [...arguments].slice(1)
    let self = this;
    return function() {
        return self.apply(context, args.concat(arguments))
    }
}

```