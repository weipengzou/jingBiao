import axios from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    hotList: [],
    discountList: [],
    fakeGoods: {
      img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/i1-a7d0d580-e03e-4be7-9f5c-45f73135f2ff/flex-stride-7-brief-%E7%94%B7%E5%AD%90%E8%B7%91%E6%AD%A5%E7%9F%AD%E8%A3%A4-kqFJMp.jpg',
      title: 'Nike Flex Stride',
      desc: '商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容商品内容',
      originPrice: 999,
      price: 299
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getGoods();
    this.goodsSort()
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
  onPullDownRefresh: async function () {
    wx.showLoading({
      title: 'loading',

    });
    await this.getGoods();
    this.goodsSort();
    wx.hideLoading();
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
  // 测试用
  async getGoods() {
    let res = await axios({
      method: 'get',
      url: '/goods/get',
    });
    console.log(res)
    wx.setStorageSync('goodsData', res.data);
  },
  // 商品分类
  goodsSort() {
    let [hotList, newList, discountList] = [
      []
    ];
    let goodsData = wx.getStorageSync('goodsData');
    // 解析图片
    for (let i = 0; i < goodsData.length; i++) {
      goodsData[i].images = goodsData[i].images.split(','); // 字符串转数组
      if (goodsData[i].state == 'hot')
        hotList.push(goodsData[i]);
      if (goodsData[i].state == 'new')
        newList.push(goodsData[i]);
      if (goodsData[i].state == 'discount')
        discountList.push(goodsData[i]);
      continue;
    }
    // console.log(goodsData);
    // return
    this.setData({
      banner: hotList,
      hotList,
      newList,
      discountList
    })
    console.log(this.data);
  },
  async navigationTo(e) {
    console.log('handle click', e.currentTarget.dataset.goodsid);
    let goodsid = e.currentTarget.dataset.goodsid;
    // 获取商品id 然后请求。
    try {
      let res = await axios({
        url: `/goods/get?goodsid='${goodsid}'`,
      })
      wx.setStorageSync('curGoodsData', res.data[0]); // 通过缓存传递数据，不用监听事件获取数据，效率更快一点
      wx.navigateTo({
        url: './detail/goods/goods',
      });
    } catch (error) {
      console.log(error)
    }

    // console.log(data)


  }
})