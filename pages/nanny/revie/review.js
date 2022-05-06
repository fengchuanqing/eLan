// pages/nanny/revie/review.js
import {
  fwdyhsfpj,
  fwdlb,
  fwdyhpj
} from "../../../apis/wbm";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 3, //星级
    t_length: 0, //文字长度
    PageNum: 1, //页数
    show: false, //服务队 弹窗
    show2: false, //服务类型 弹窗
    show3: false, //时间 弹窗
    columns: [], //服务队下拉
    columns2: [], //服务类型 下拉
    list: [], //服务队暂存
    activeFwd: '请选择服务队', //选中服务队
    fwdid: "", //选中服务队id
    activeType: '', //选中服务类型
    activeTime: '2021-12-21', //选中时间
    pj: '', //评价
    currentDate: new Date().getTime(), //当前时间
    minDate: new Date(2020, 1, 1).getTime(), //最小日期
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, '');
  },
  onInput(event) {
    let date = this.getLocalTime(event.detail).split('/')
    this.setData({
      activeTime: date[0] + '-' + date[1] + '-' + date[2].split(' ')[0],
      currentDate: event.detail,
      show3: false
    });
  },
  bindText: function (e) {
    var t_text = e.detail.value.length;
    this.setData({
      pj: e.detail.value,
      t_length: t_text
    })
  },
  onChangeStar(event) {
    this.setData({
      value: event.detail,
    });
  },
  // 弹框
  openFwd() {
    this.setData({
      show: true,
      columns: this.data.list
    })
  },
  onClose() {
    this.setData({
      show: false,
      show2: false,
      show3: false,
    });
  },
  openType() {
    if (this.data.columns2.length == 0) {
      Toast('请先选择服务队');
    } else {
      this.setData({
        show2: true,
      });
    }
  },
  Pingjia() {
    if (this.data.fwdid != "" && this.data.activeType != "" && this.data.activeTime != "" && this.data.value != "" && this.data.pj != "") {
      fwdyhpj({
        fwdid: this.data.fwdid,
        fwlx: this.data.activeType,
        fwsj: this.data.activeTime,
        pf: this.data.value,
        pj: this.data.pj,
        openid: wx.getStorageSync('thirdSession').openid
      }).then((res) => {
        if (res) {
          if (res.code == 200) {
            Toast('评价成功');
            const num = getCurrentPages().length
            if (num === 3) {
              wx.navigateBack({
                delta: 1,
              })
            } else {
              wx.navigateBack({
                delta: 2,
              })
            }
          }
        }
      })
    } else {
      Toast('格式错误')
    }

  },
  onChange(event) {
    fwdyhsfpj({
      fwdid: event.detail.value.id,
      openid: wx.getStorageSync('thirdSession').openid
    }).then((res) => {
      if (res) {
        let arr = event.detail.value.value
        this.setData({
          show: false,
          fwdid: event.detail.value.id,
          activeFwd: event.detail.value.name,
          activeType: "",
          columns2: arr
        })
      }
    })
  },
  openTime() {
    this.setData({
      show3: true,
    })
  },
  onChange2(event) {
    this.setData({
      show2: false,
      activeType: event.detail.value,
    })
  },
  // 服务队
  getList3() {
    let that = this;
    fwdlb().then((res) => {
      if (res) {
        let arr = []
        res.data.forEach(element => {
          element.lxArr = element.lx.split(',')
          arr.push({
            name: element.mc,
            value: element.lxArr,
            id: element.id
          })
          that.data.list = arr
        })
        that.setData({
          list: that.data.list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList3()
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