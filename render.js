/**
 * 
需求描述
实现一个 render(template, context) 方法，将 template 中的占位符用 context 填充。

要求：
不需要有控制流成分（如 循环、条件 等等），只要有变量替换功能即可
级联的变量也可以展开
被转义的的分隔符 { 和 } 不应该被渲染，分隔符与变量之间允许有空白字符
 */

var obj = { name: { name1: { name2: "二月" } }, age: "15" };
var str = "{{name.name1.name2}}很\{name厉害\}，才{{age}}岁{{name.name1.name2}}";

function render1(tmpl, data) {
    var result = tmpl.replace(/\{\{(.*?)\}\}/g, function (match, key) {
        let keys = [key];
        if (key.indexOf(".")) {
            keys = key.split(".");
        }
        let ret = match;
        let index = 0, len = keys.length;
        let tmp = data;
        while (tmp && index < len) {
            tmp = tmp[keys[index++]];
        }
        if (tmp && index == len) {
            ret = tmp;
        }

        return ret;
    })

    return result;
}

var a = render1(str, obj);
console.log(a)