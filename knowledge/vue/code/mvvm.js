
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
