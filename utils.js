/*jsonParse:功能是把JSON格式的字符串转成JSON格式的对象*/
function jsonParse(jsonStr) {
    return 'JSON'in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
}





