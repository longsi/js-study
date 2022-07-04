/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度
 * */
var lengthOfLongestSubstring = function (s) {
    let end, start, max = 0, len = s.length;
    for (start = 0, end = 0; end < len; end++) {
        let index = s.substring(start, end).indexOf(s[end]);
        if (index > -1) {
            start = start + index + 1;
        }
        max = Math.max(end - start + 1, max);
    }
    console.log(max);
    return max;
}
lengthOfLongestSubstring('abcabcbb');
lengthOfLongestSubstring('bbbbb');
lengthOfLongestSubstring('pwwkew');

/**
 * 实现一个简单的Stack
 */

function stack() {
    this.items = [];
    this.push = function (i) {
        this.items.push(i);
    }
    this.pop = function () {
        return this.items.pop();
    }

    this.isEmpty = function () {
        return this.items.length === 0
    }
    this.size = function () {
        return this.items.length;
    }
    this.clear = function () {
        this.items = [];
    }
}

/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 */

var MinStack = function () {
    this.items = [];
    this.min = null;
}
MinStack.prototype.push = function (x) {
    if (!this.items.length) this.min = x;
    this.min = Math.min(x, this.min);
    this.items.push(x);
}
MinStack.prototype.pop = function () {
    let num = this.items.pop()
    this.min = Math.min(...this.items);
    return num;
}
MinStack.prototype.top = function () {
    if (!this.items.length) return null;
    return this.items[this.items.length - 1];
}
MinStack.prototype.getMin = function () {
    return this.min;
}

/**
 * 给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。
 */

var isValid = function (s) {
    let stack = [];
    let map = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            stack.push(s[i])
        } else if (s[i] !== map[stack.pop()]) {
            return false;
        }
    }
    return stack.length === 0;
}

/**
 * 数组扁平化
 */
function flatten(arr) {
    return arr.reduce(function (pre, cur) {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, [])
}

let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))