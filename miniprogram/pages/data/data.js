import axios from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: []
  },
	goToDetail:function(e){
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:'/pages/daren/detail/detail?id=' + id
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '登陆中...',
      mask: true,
    });
    // token
    if (wx.getStorageSync('userInfo')) {
      console.log('auto login');
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        isLogin: true
      })
    } else if (wx.getStorageSync('token')) {
      this.getUserInfo();
    }
    wx.hideLoading();
  },
  async login(e) {
    wx.showLoading({
      title: '登陆中...',
      duration: 1500,
    });
    try {
      // 获取微信用户openid
      let loginRes = await wx.cloud.callFunction({
        name: 'login',
      });
      let [openid, userInfo] = [loginRes.result.openid, e.detail.userInfo]; // 获取用户信息
      // console.log(userInfo);
      // return;
      let res = await axios({ // 通过openid获取服务器返回的token，以后的用户访问都只用传token判断用户。
        method: 'post',
        url: '/user/login',
        data: { // 判断用户，如果没有该用户就把id，name，avatar等基本信息传入服务器中注册账号
          openid: openid,
          name: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          gender: userInfo.gender
        }
      })
      if (res.data.success === true) {
        // wx.setStorageSync('openid', openid);
        await wx.setStorageSync('token', res.data.token);
        // 登录成功。获取用户信息
        this.getUserInfo();
      } else
        console.log(res)
    } catch (err) {
      console.log(err);
      return;
    }
    wx.hideLoading();
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

  }
})