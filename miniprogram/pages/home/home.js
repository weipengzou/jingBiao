var app = getApp();
import {
  Map
} from "../../utils/utils";
Page({
  data: {
    banner: ['imgUrl1', 'imgUrl2', 'imgUrl3'],
    notice: ['通知通知通知1111', '通知通知通知3333', '通知通知通知333333asdasd333333333333333333'],
    localShow: false,
    localList: [],
    userLocal: ""

  },

  onLoad: function (options) {
    this.getBanner(3);
    this.getLocal();

  },
  onReady: function () {

  },
  navigationToDetail(e) {
    wx.navigateTo({
      url: "../../components/home/about/about",
      success: (res) => {
        // console.log("发送数据")
        res.eventChannel.emit('sendData', {
          data: e.currentTarget.dataset.data
        })
      }
    })
  },
  async getBanner(v) {
    let tempArr = [];
    for (let i = 1; i <= v; i++)
      tempArr = tempArr.concat(`https://zwp1.top/images/banner${i}.jpg`)
    this.setData({
      banner: tempArr
    })
  },
  // 图片和通知的点击事件
  handleClick() {
    console.log('handleClick')
    wx.navigateTo({
      url: '../../components/home/news/news',
      success: (result) => {
        console.log("跳转成功")
      },

      fail: err => console.log("跳转失败", err),
      complete: () => {}
    });
  },
  navigationTo(e) {
    let url = `/pages/${e.currentTarget.dataset.data}/${e.currentTarget.dataset.data}`;
    wx.switchTab({
      url
    })
  },

  // 获取附近的地址
  async getLocal() {
    let res = await Map.search({
      text: '幼儿园',
      number: 20
    });
    let result = [];
    for (let i = 0; i < res.data.length; i++)
      result = result.concat(res.data[i].title);
    this.setData({
      localList: result,
      localShow: true
    })
  },
  onClickHide() {
    console.log("hide")
    this.setData({
      localShow: false
    });
  },
  onSelect(e) {
    this.setData({
      userLocal: e.detail.value
    })
  },
  // 提交地址
  subLocal() {
    console.log('拿到选择的地址：', this.data.userLocal);
    this.setData({
      localShow: false
    })
  },
  noop() {},

})