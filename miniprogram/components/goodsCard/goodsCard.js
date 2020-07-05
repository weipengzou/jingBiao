Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    imgSrc: String,
    title: String,
    desc: String,
    price: String,
    originPrice: String,
  },

  data: {

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },
  methods: {

  }
})