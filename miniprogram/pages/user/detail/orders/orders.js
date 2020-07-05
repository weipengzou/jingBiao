import axios from "../../../../utils/axios";

Page({
  data: {
    ordersList: {

    },
    fakeList: {
      openid: "ohnhI49pago9ENSsktnEc1gpgGd8",
      orderid: "1a150635b633d2f42af90c194dbfd836",
      price: 1099.01,
      productid: "100003",
      time: "2020-06-19T06:45:08.000Z",
      image: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/nwxyirapijigpcrwqssu/phantom-vision-elite-id.jpg'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // let openid = wx.getStorageSync('userInfo').openid;
    let res = await axios({
      url: `/order/get`,
      header: {
        'token': wx.getStorageSync('token')
      }
    })
    let tempObj = {
      unPaid: [],
      paid: [],
    };
    let resList = res.data.data;
    // 循环解析product 和 shopper,然后赋值到页面上
    for (let i = 0; i < resList.length; i++) {
      console.log('for');
      if (resList[i].state == 'unPaid')
        tempObj.unPaid = tempObj.unPaid.concat(resList[i])
      else if (resList[i].state == 'paid')
        tempObj.paid = tempObj.paid.concat(resList[i])
    }
    this.setData({
      ordersList: tempObj
    })
    console.log('ordersList', this.data.ordersList)
  },
  async goToPay(e) {
    // console.log(e)
    let orderid = e.currentTarget.dataset.orderid;
    let res = await axios({
      url: `/order/get?orderid=${orderid}`
    })
    console.log(res);
    wx.navigateTo({
      url: './ordersHandle/ordersHandle',
      success: (result) => {
        result.eventChannel.emit('orderHandle', {
          state: 'unpaid',
          data: res.data[0]
        })
      },
      fail: () => {},
    });

  }
})