Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options.query);
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('orderHandle', function (data) {
      console.log(data)
    })
  },
})
// 订单处理页面，如果未支付可以去支付