Component({
  properties: {
    // new | mark | points | coupon1 | money | start | vip | right | sh | dfk | dfh | dsh | chedai | anfu | tongji | yujing | jizhang | zhifu | bingtu | tongzhi1 | chaxun | shenfenshibie | jiagou | VIPka | dengji | jiaxiquan | youhuiquan | jiaoyijilu | zhinan | faxian | qiandao | mingpian | zhangdan2 | dongjie | huangjin | zhuanjia | zunxiangfuwu | huzhu | fangdai | jinrongjie | qianbi | jinrongzhijia | fenxiang | mubiao | zhunquexing | chaopiao | zhiwen | xingpingchanpin | shangsheng | xiajiang | qifu | gongzhang | querendingdan | shijian | daojishi | naozhong | chazhaojilu | xingbie | shenfen | shenfentianxie | tianjiashenfen | renzhengchenggong | renwu | shanchu | tianjia | jianshao | wancheng | sousuo1 | gupiao1 | gouwu1 | tupian1 | jiudian | tuijian | jiacang | jiancang | yaoqing | fankui | gonglve | guanjun | dingqi | huoqi | zhangdanjilu | yue1 | guanlian | tixian | fenlei | zhanshi | yingli | shaixuan | duihuan | mima | quanxian | jiance | quxiao | jindan | cailiao | zhouqi | goutong | youjian | yonghuchaxun | xitong | fengkong | shujutu | zutuan | cunqian | yue | jieqian | huanqian | zhuanzhang | zhangdan | chongzhi | shuidian | ranqi | quanyi | huodong1 | anquan1 | jiankanglicai | kabao | xinyongka | cunkuan | qukuan | gengduo | chazhaogengduo | shouye1 | jinrong | shoucang | zhuanchu | zhuanru | baohusan | wuliao | xiaoxi1 | jinronganquan1 | yiwen | rili1 | kefu | dingwei | yinhang | shengzhi | bianzhi | lishuai | baoxiangui | xinyong | kaihu | jinrongfenxi | renminbi | ouyuan | meiyuan | bitebi | jisuan | biaoqian | fangxiang | hongbao | tianping | jintiao1 | shuaka | qiaoding | saomiao | saoma | shuju | pindao | zhengxin | baosheng | fengxian | fengxianchaxun | shebao | gongjijin | xinpin | gouwuche1 | jisuanqi | gupiao | coupon | category | icon-test | youhuika | youhui | youxi | wendangtijiao | shoujixiazai | huodong | gouwu | zhuanti | tupian | wendang | liwu | jinbi | xiaoxi | bijiben | chuhang | chuhang1 | xiuxian | yinle | xiangji | xuexi | shuqian | duihua | gouwuche | qiye | shezhi | lvhang | geren | weizhi | yunshu | qingchu | lajitong | paiming | shouye | huiyuan | zixun | bofang | zanting | zhengzaijinhang | chenggong | chenggong1 | shibai | jiazaizhong | bianji | chuwu | baocun | wenjian | yasuowenjian | wenjian1 | tishi | kafei | shangyi | ting | huojian | rili | saoyisao | qiche | kanshu | yunshangchuan | yunxiazai | tongzhi | youhuika1 | jintiao | remen | wangguan | yanse | kuazan | chuanshu | anquan | jinronganquan | shujuanquan | deng | zihangche | dianyuan | wangluo | biaochi | fasong | paishe | dengdai | sousuo | shoubiao | yixue | baozhuang | huaxue | kaisuo | jiesuo | yigui | binggui | deng1 | dianshiji | kongtiao | shafa | diban | xiyiji | chuanglian | chuang | xiezitai | gongzuo | xiyu
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 60,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * wx.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 60 / 750 * wx.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
