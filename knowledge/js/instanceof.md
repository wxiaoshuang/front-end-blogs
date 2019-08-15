# instanceof
可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的prototype
```javascript
function myInstanceOf(left, right) {
    let prototype = right.prototype
    left =left.__proto__
    while(true) {
        if(left === null) {
            return false
        }
        if(prototype === left) {
            return true
        }
        left = left.__proto__
    }
}
```