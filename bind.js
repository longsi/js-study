/**
 * 实现bind功能
 */

function LateBloomer() {
    this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function () {
    setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function () {
    console.log('I am a beautiful flower with ' +
        this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后，调用 'declare' 方法


/**
 * 
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * 
 * 如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。
 * 如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。
 */

Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('this must be function');
    }
    let fn = this, args = Array.prototype.slice.call(arguments, 1);

    let fNOP = function () { };
    let fBound = function () {
        let bindArgs = Array.prototype.slice.call(arguments);
        return fn.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = fn.prototype;

    fBound.prototype = new fNOP();
    return fBound;
}


Function.prototype.myCall = function (context) {
    context = context || window;

    context.fn = this;
    var args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push("arguments[" + i + "]");
    }
    let result = eval('context.fn(' + args + ')');
    delete context.fn;
    return result;
}

Function.prototype.myApply = function (context, arr) {
    context = context || window;

    context.fn = this;
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (let i = 1, len = arr.length; i < len; i++) {
            args.push("arr[" + i + "]");
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn;
    return result;
}

let myNew = function () {
    let constructor = Array.prototype.shift.call(arguments);
    let obj = {};
    obj.__proto__ = constructor.prototype;
    let result = constructor.apply(obj, arguments);

    return typeof result === 'object' ? result : obj;
}

function Man(name, age) {
    this.name = name;
    this.age = age;
}
var tom = new Man('tom', 20);
var mike = myNew(Man, 'mike', 30);
console.log(tom instanceof Man, mike instanceof Man);

/**
 * Proxy
 */
const handler = {
    get: function (obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37

/**
 * 节流
 */
function throttle(func, wait) {
    var timeout = null;

    return function () {
        var context = this;
        if (!timeout) {
            var args = Array.prototype.slice(arguments);
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args)
            }, wait);
        }
    }
}
/**
 * 防抖
 */
function debounce(func, wait) {
    var timeout = null;
    return function () {
        var context = this;
        var args = Array.prototype.slice(arguments);
        if (!timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    }
}

/**
 * Promise
 */

class MyPromise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.status == 'pending') {
                this.status = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = reason => {
            if (this.status == 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === 'fulfilled') {
            onFulfilled(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
        if (this.status === 'pending') {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected.push(this.reason);
            })
        }
    }
}

/**
 * 发布订阅者
 */


/**
 * 数据扁平转树结构
 */
function arrayToTree(data) {
    let itemMap = {}
    let result = [];
    for (let item of data) {
        itemMap[item.id] = {
            ...item,
            children: []
        }
    }

    for (let item of data) {
        let id = item.id;
        let pid = item.pid;
        if (pid == 0) {
            result.push(itemMap[id]);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: []
                };
            }

            itemMap[pid].children.push(itemMap[id]);
        }
    }
    return result;
}
let arr = [

    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 1, name: '部门1', pid: 0 },
]
console.log(JSON.stringify(arrayToTree(arr)));


/**
 * json 扁平化
 */
const entry = {
    a: {
        b: {
            e: {
                f: 'tewst'
            }
        },
        c: {
            dd: 'dafa'
        },
        d: {
            ee: 'daf'
        }
    },
    aa: {
        aaa: 'daf'
    }
}
function translateEntry(obj, path = [], output = {}) {
    let keys = Object.keys(obj);
    for (let key of keys) {
        let curPath = path.concat(key);
        if (typeof obj[key] == 'string') {
            output[curPath.join('.')] = obj[key];
        }
        else {
            translateEntry(obj[key], curPath, output);
        }
    }
}
let output = {};

translateEntry(entry, [], output);
console.log(JSON.stringify(output));

/**
 * 字符串转二进制
 */
function strToBinary(str) {
    return str.split("").map(ch => ch.charCodeAt("0").toString(2)).join("");
}

console.log(strToBinary("h"));

function errorFunction() {
    try {
        Promise.reject('error');
    } catch (er) {
        console.log(er);
    }
    console.log("hhhh");
    return Promise.resolve("succ");
}
errorFunction().then((data) => { console.log(data) });