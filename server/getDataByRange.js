const data = "Hello, world".repeat(100);

/**
 * 根据range返回数据的某一部分
 * @param {*} range 
 * @returns 
 */
module.exports = function getDataByRange(range) {
    range = range.trim();
    const [st, en] = range.split('-');
    if(!st && !en) throw new Error('range不能为空');
    if(st && en) {
        // 读取 st ~ en 字节
        return [data.substr(st, en - st + 1), data.length];
    }
    else if(en) {
        // 读取最后 en 个字节
        return [data.substr(data.length - en), data.length];
    }
    else if(st) {
        // 读取 st ~ 终点 个字节
        return [data.substr(st), data.length];
    }
}