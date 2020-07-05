// miniprogram/pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    coursePageData: [],
    // ['标签1数据','标签2数据']
	active: 0,
  },
	// onChange(event) {
	//     wx.showToast({
	//       title: `切换到标签 ${event.detail.name}`,
	//       icon: 'none',
	//     });
	//   },
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
  activeChange(e) {
    this.setData({
      activeKey: e.detail
    })
  },
  activeKeyChange(e) {
    this.setData({
      activeKey: e.detail.current
    })
  },
  navigationTo(e) {
    // console.log(e.currentTarget.dataset.data)
    wx.navigateTo({
      url: `./detail/courseDetail/courseDetail`,
      success: (res) => {
        console.log("发送数据")
        res.eventChannel.emit('sendData', {
          data: e.currentTarget.dataset.data
        })
        console.log('跳转成功', res)
      },
      fail: err => {
        console.log(err, e.currentTarget.dataset.data)
      }
    })
  },
  goto(){
	  wx.navigateTo({
		  url:'/pages/form/form'
	  })
  }
})