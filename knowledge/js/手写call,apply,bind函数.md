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
>bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用 -MDN
```javascript
Function.prototype.myBind(context) {
    context = context || window;
    let args = [...arguments].slice(1);
    let self = this;
    return function() {
        let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }
}

```
>一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效

```javascript
Function.prototype.myBind2 = function(context) {
    if (typeof this !== 'function') {
        throw new Error('调用 bind 的不是函数')
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1)
    var fNOP = function() {}
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fBound ? this : context , args.concat(bindArgs))
    }
    // 绑定原型
    if(this.prototype) { 
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;

}
```