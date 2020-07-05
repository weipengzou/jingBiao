var app = getApp();
var common = require('../../utils/data4.js')
import {
  Map
} from "../../utils/utils";
Page({
  data: {
    
    notice: ['2020年竞彪体育少年儿童体育文化事业投资人线上交流会', '与广东省校园足球办共同研发建立幼儿足球师资、课程标准', '2019年9月广东体博会正式组建广东团队'],
    localShow: false,
    localList: [],
    userLocal: "",
	ketang:[
		{url:'http://manager.kenput.cn/static/img/k1.jpg',title:'教练和小朋友们'},
		{url:'http://manager.kenput.cn/static/img/k2.jpg',title:'教练和小朋友们'},
		{url:'http://manager.kenput.cn/static/img/k3.jpg',title:'刻苦练习'},
		{url:'http://manager.kenput.cn/static/img/k4.jpg',title:'刻苦练习'},
		{url:'http://manager.kenput.cn/static/img/k5.jpg',title:'刻苦练习'},
		{url:'http://manager.kenput.cn/static/img/k6.jpg',title:'刻苦练习'}
	]
  },

  onLoad: function (options) {
    this.getBanner(3);
    // this.getLocal();
	let list = common.getTeamList()
	this.setData({
		news:list
	})

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
      // tempArr = tempArr.concat(`https://zwp1.top/images/banner${i}.jpg`)
      tempArr = tempArr.concat(`http://manager.kenput.cn/static/img/0${i}.jpg`)
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
// 跳到非tabbar页面
navigateTo2(e){
  let url = `/pages/${e.currentTarget.dataset.data}/${e.currentTarget.dataset.data}`;
    wx.navigateTo({
      url
    })
},
detailone(){
	wx.navigateTo({
		url:'/pages/daoshi/detail/detail?id=1'
	})
},
detailtwo(){
	wx.navigateTo({
		url:'/pages/daoshi/detail/detail?id=2'
	})
},
goToDetail:function(e){
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:'/pages/news/detail/detail?id=' + id
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