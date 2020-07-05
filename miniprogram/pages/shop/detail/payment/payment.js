import axios from "../../../../utils/axios";
import {
  formatDate
} from "../../../../utils/utils";
import CryptoJS from 'crypto-js'
Page({
  data: {
    goods: {
      goodsid: '',
      img: '',
      price: '',
      size: ''
    },
    userInfo: {
      openId: '',
    }
  },
  onLoad: function (options) {
    let goodsData = wx.getStorageSync('goToPayData');
    let userData = wx.getStorageSync('userInfo');
    let temp = {};
    temp.goodsid = goodsData.goodsid;
    temp.name = goodsData.name;
    temp.img = goodsData.images.split(',')[0];
    temp.price = goodsData.price;
    temp.size = goodsData.size;
    this.setData({
      goods: temp,
      userInfo: userData
    });
    console.log(this.data);

  },
  encrypted(word) {
    var key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF');
    var iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');
    return CryptoJS.AES.encrypt(JSON.stringify(word), key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  },
  decrypt(word) {
    // 传递一个密文
    var key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF');
    var iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');
    var bytes = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    // 返回明文
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  async goToPay() {
    wx.showLoading({
      title: '正在调起微信支付，请稍等...',
      mask: true,
      duration: 1500,
    });
    if (wx.getStorageSync('token') == undefined)
      return false
    // 购买者基本信息
    let shopper = {
      openId: wx.getStorageSync('userInfo').openid,
      address: this.data.address || '',
      phone: this.data.phone,
      size: this.data.goods.size
    }
    // 加密订单号的内容
    let encryptOrderId = {
      productid: this.data.goods.goodsid, // 商品编号
      shopper: JSON.stringify(shopper), // 买家信息
      price: this.data.goods.price // 订单价格，订单价格!=商品价格，还有优惠折扣之类的，这里只是简单的使用一下
    }
    //  订单加密，返回生成订单
    try {
      var cipherText = await this.encrypted(encryptOrderId);
      let res = await axios({
        method: 'post',
        url: '/order/add',
        data: {
          cipherText: cipherText.toString(),
          time: formatDate("YYYY-mm-dd HH:MM:SS", new Date())
        },
        header: {
          'token': wx.getStorageSync('token')
        }
      })
      if (res.data.orderid) { // // 获取单信息，发起支付请求
        console.log('生成订单成功')
        // 获取单信息，发起支付请求
        let order = await axios({
          url: `/order/get?orderid=${res.data.orderid}`,
          header: {
            'token': wx.getStorageSync('token')
          }
        })
        // 返回的订单号
        console.log(order);
        let orderid = order.data.data[0].orderid; // 返回的订单号
        let payData = await wx.cloud.callFunction({
          name: 'pay',
          data: {
            orderid,
            data: order.data.data[0].productid,
            price: order.data.data[0].price
          }
        })
        console.log(payData)
        wx.requestPayment({
          timeStamp: payData.result.timeStamp,
          nonceStr: payData.result.nonceStr,
          package: payData.result.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
          signType: 'MD5',
          paySign: payData.result.paySign, //签名
          success: async res => {
            console.log('支付成功', res);
            // 修改订单状态为 已支付
            let data = await axios({
              url: `/order/pay`,
              method: 'post',
              data: {
                orderid: orderid
              },
              header: {
                'token': wx.getStorageSync('token')
              }
            })
            console.log('当前订单：', data)
          },
          fail: err => {
            console.log('支付失败', err)
          }
        })
      } else {
        console.log('生成订单失败')
      }
    } catch (err) {
      console.log(err)
    }
    wx.hideLoading();
  }
})
//  功能基本完善