const baseUrl = 'https://zwp1.top:3001';

// 接受一个obj
// 例: axios({method:'post','https://zwp1.top:3000',{id:'1001','price:'1000'}})
const axios = (params) => {
    // 判断有没有输入域名
    if (!params.url.match(/(zwp1.top)/))
        params.url = baseUrl + params.url;

    return new Promise((resolve, resject) => {
        wx.request({
            url: params.url,
            data: params.data || '',
            method: params.method || 'GET',
            timeout: 2000,
            header: {
                'content-type': 'application/json',
                'authentication': '0d34efcd91026f20dcd67ef73fe9d4957579a5bb',
                ...params.header
            },
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                resject({
                    err: err,
                    msg: 'error:'
                })
                // console.log("请求失败", method, url, data, err)
            },
            complete: () => {}
        });
    })
}
export default axios;