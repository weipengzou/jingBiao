// import QQMapWX from '../../../../utils/qqmap-wx-jssdk';
import axios from '../../../../utils/axios';
// var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类,用于获取用户地址
    // qqmapsdk = new QQMapWX({
    //   key: '4XUBZ-3GYKP-LLMDP-VHLZ6-N323T-KFBOZ'
    // });
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(this.data.userInfo)
  },

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
  onHide: async function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: async function () {
    // 在组件实例被从页面节点树移除时执行
    if (this.data.isChange) {
      // 调用接口更新用户信息
      let userInfo = wx.getStorageSync('userInfo');
      console.log('调用接口更新用户全部信息', userInfo);
      let res = await axios({
        url: '/user/update',
        method: 'POST',
        data: {
          openid: userInfo.openid,
          name: userInfo.name,
          avatar: userInfo.avatar,
          address: userInfo.address,
          phone: userInfo.phone
        },
        header: {
          'token': wx.getStorageSync('token')
        }
      })
      console.log('更新返回的结果：', res)
      let getUserRes = await axios({
        url: `/user/get?openid=${userInfo.openid}`
      })
      console.log('用户信息', getUserRes)
    } else {
      console.log("无修改")
    }
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
  async getUserAddress() {
    // 这里还需需要再判断是否拒绝过授权 mark
    // let res = await wx.chooseAddress({});
    wx.chooseAddress({
      success: (res) => {
        let temp = wx.getStorageSync('userInfo');
        temp.address = res.provinceName + res.cityName + res.countyName + res.detailInfo;
        wx.setStorageSync('userInfo', temp);
        this.setData({
          userInfo: wx.getStorageSync('userInfo'),
          isChange: true
        })
      },
      fail: () => {
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.address'] === false) {
              wx.showModal({
                title: '重新授权',
                content: '您之前已拒绝授权请重新授权',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (res) => {
                  if (res.confirm)
                    wx.openSetting({});
                  else if (res.cancel)
                    wx.showToast({
                      title: '已取消',
                      duration: 1500
                    })
                },
              });
            } else
              wx.showToast({
                title: '已取消',
                icon: 'success',
                image: '',
                duration: 1500,
                mask: false,
              });
          }
        })
      },
      complete: () => {}
    });
  },
  async getUserPhoneNumber(e) {
    // console.log(e.detail.value)
    let temp = wx.getStorageSync('userInfo');
    // console.log(temp)
    temp.phone = e.detail.value;
    wx.setStorageSync('userInfo', temp);
    this.setData({
      isChange: true
    });
  }
})