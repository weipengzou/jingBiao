// miniprogram/pages/shop/detail/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    title: '默认标题',
    content: '默认内容',
    price: '默认价格',
    stock: '默认库存',
    isClickPayBtn: false,
    // 假数据。
    sizeItems: [{
        value: 38,
        name: '38码'
      },
      {
        value: 39,
        name: '39码'
      },
      {
        value: 40,
        name: '40码'
      },
      {
        value: 41,
        name: '41码'
      },
      {
        value: 42,
        name: '42码'
      },
      {
        value: 43,
        name: '43码'
      },
      {
        value: 44,
        name: '44码'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curData = wx.getStorageSync('curGoodsData');
    console.log(curData)
    this.setData({
      banner: curData.images.split(','),
      title: curData.name,
      price: curData.price,
      stock: curData.stock,
      content: curData.content
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ClickPayBtn() {
    this.setData({
      isClickPayBtn: true
    })
  },
  onClose() {
    this.setData({
      isClickPayBtn: false
    })
  },
  sizeChange(e) {
    // console.log("当前选择的是", e.detail.value, "码");
    let temp = wx.getStorageSync('curGoodsData');
    temp.openid = wx.getStorageSync('userInfo').openid;
    temp.size = parseFloat(e.detail.value);
    wx.removeStorageSync('curGoodsData');
    wx.setStorageSync('goToPayData', temp);
  },
  goToPay() {
    if (wx.getStorageSync('token'))
      wx.navigateTo({
        url: '../payment/payment',
        success: (result) => {},
        fail: () => {},
        complete: () => {}
      });
    else
      wx.showToast({
        title: '请先登陆',
        duration: 1500,
        mask: false,
        success: (result) => {},
        fail: () => {},
        complete: () => {}
      });
  }
})