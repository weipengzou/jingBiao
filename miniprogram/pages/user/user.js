import axios from '../../utils/axios'
// import CryptoJS from 'crypto-js'
// var qqmapsdk;
// const app = getApp();
Page({
  data: {
    isLogin: false,
    userInfo: [],
    test: 'test',
    isFeedBackShow: false
  },
  onLoad: function (options) {
    // 实例化API核心类
    // qqmapsdk = new QQMapWX({
    //   key: '4XUBZ-3GYKP-LLMDP-VHLZ6-N323T-KFBOZ'
    // });
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
  onReady: function () {

  },
  onShow: function () {},
  onHide: function () {

  },
  // 登录   没有token
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
  // 跳转
  navigationTo(e) {
    let curPage = '';
    switch (e.currentTarget.dataset.data) {
      case '购物车':
        curPage = 'shoppingCar';
        break;
      case '余额':
      case '优惠券':
        curPage = 'wallet';
        break;
      case '待付款':
      case '待发货':
      case '待签收':
      case '售后':
        curPage = 'orders';
        break;
      case '精彩瞬间':
        curPage = '';
        break;
      case '绑定手机':
      case '我的资料':
        curPage = 'userInfo';
        break;
      case '我的教练':
        curPage = 'teacher';
        break;
      case '售后':
        curPage = 'orders';
        break;
        // default:
        //   curPage = 'bug';
    }
    console.log(curPage);
    wx.navigateTo({
      // url: `../../components/user/${curPage}/${curPage}`,
      url: `./detail/${curPage}/${curPage}`,
      success: (res) => {
        console.log('跳转成功', res)
      },
      fail: err => {
        console.log(err, e.currentTarget.dataset.data)
      }
    })
  },
  async getUserInfo() {
    // 获取用户信息
    try {
      let res = await axios({
        method: 'get',
        url: `/user/get`,
        header: {
          'token': wx.getStorageSync('token')
        }
      })
      console.log('用户信息', res);
      wx.setStorageSync('userInfo', res.data.data[0]);
      if (res.data.success === true)
        this.setData({
          userInfo: wx.getStorageSync('userInfo'),
          isLogin: true
        })
    } catch (err) {
      console.log(err);
      return;
    }
  },
  feedBack() {
    this.setData({
      isFeedBackShow: !this.data.isFeedBackShow
    })
  },
  call() {
	  wx.makePhoneCall({
		  phoneNumber:'13800000000'
	  })
  }
})