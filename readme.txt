1.JSON是window的全局属性，它有两个方法
 JSON.parse()：把JSON格式的字符串，转成JSON格式的对象
 JSON.stringify()：把JSON格式的对象转成json格式的字符串

2.类数组转数组
 两种类数组：1）arguments  2）元素集合nodelist
 通过Array.prototype.slice 转换arguments是完全兼容
 元素集合通过Array.prototype.slice不兼容

浏览器异常捕获
try...catch(e)...finally...
因为无论走try，还是catch，finally中的运距都会执行，所以，一般不会用finally，try...catch(e)... e是错误原因

3.getCss:获取元素的样式值
"getComputedStyle" in window是兼容的情况下，可以直接获取到想要的样式






