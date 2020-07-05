const cloud = require('wx-server-sdk')
cloud.init()

// 1.引入依赖
const tenpay = require('tenpay');
// 2.参数配置
const config = {
  appid: 'wxe4f65fd9f5a232f9',
  mchid: '1591932261',
  partnerKey: '0d34efcd91026f20dcd67ef73fe9d495',
  notify_url: 'www.baidu.com',
  spbill_create_ip: '127.0.0.1'
};



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // 3.初始化
  const api = await tenpay.init(config);
  // 4.获取支付参数
  try {
    let result = await api.getPayParams({
      out_trade_no: `${event.orderid}`, // 商户内部订单
      body: `${event.data}`, // 商品信息
      // total_fee: `${event.price * 100}`, // 付款金额，单位分
      total_fee: 1, // 付款金额,测试阶段为1分钱
      openid: `${wxContext.OPENID}` // 付款用户的openid
    });
    return result;
  } catch (err) {
    return 'errmsg:' + err 
  }
}