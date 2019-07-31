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