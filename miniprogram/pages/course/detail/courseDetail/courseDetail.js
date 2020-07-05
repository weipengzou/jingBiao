// miniprogram/pages/course/detail/courseDetail/courseDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: ['http://sr.yun61.com/attachment/ueditor/image/20170905/1504594929327901.png', 'http://img.mp.itc.cn/upload/20160610/13b26958a13a47329d5aadd6a7afe577_th.JPG', 'http://img.mp.itc.cn/upload/20160610/f3876bd8259f4de3bdbaf202e7ff41bc_th.JPG', 'https://www.yun61.com/attachment/information/201811/1541731581svwnc.jpg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.navigateTo({
      url: '../courseToPay/courseToPay',
      success: (result) => {
        console.log(result)
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {}
    });
  }
})