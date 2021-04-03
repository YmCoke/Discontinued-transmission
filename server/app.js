const express = require('express');
const getDataByRange = require('./getDataByRange');

const app = express();

app.get('/', (req, res) => {
    const range = req.headers['range'];
    try {
        const [data, total] = getDataByRange(range);
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Accept-Range', 'bytes');
        res.setHeader('Content-Range', `bytes ${range}/${total}`);
        // 在使用CORS解决跨域的请求中，axios默认只能取到五个基本数据，需要由服务器额外暴露响应头字段
        res.setHeader('Access-Control-Expose-Headers', ['Content-Range'])

        res.send(data);
    } catch(err) {
        res.send(err);
    }
})

// 处理预设请求
app.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Range');
    res.send("over");
})

app.listen(4014, () => {
    console.log('正在监听4014端口')
})