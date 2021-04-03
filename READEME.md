# 项目介绍

断点续传

## 处理非简单请求

浏览器将CORS请求分成两类：`简单请求（simple request）`和`非简单请求（not-so-simple request）`。

只要同时满足以下两大条件，就属于简单请求:
1. 请求方法是以下三种方法之一: 
    - HEAD
    - GET
    - POST
2. HTTP头部字段只包含以下字段: 
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type: 只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

其余的都属于非简单请求。

我们这里使用到了`Range`字段，因此是非简单请求。

非简单请求会向发送一个preflight（预检请求）。用于询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

预检请求属于Option请求方法，故我们在服务器端需要对Option请求做处理

```js
// 处理预设请求
app.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Range');
    res.send("over");
})
```

## axios响应头字段不全

在使用CORS解决跨域的请求中，默认只能取到

- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

五个response header 值。

如果想获取到其他的值，需要服务器在header中设置
`Access-Control-Expose-Headers : [header-name1, header-name2]`