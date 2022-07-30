import {
  addOrder,
  Spxq,
  addressList,
  upload,
  img,
  Sjgzm,
  deleteShopCar
} from '../../../apis/specialZone.js'
import {
  phoneVerify
} from '../../../utils/util.js'
const areaCode = require('../../../utils/area-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    columns: ['自提', '快递配送'],
    fileList: [],
    show: false,
    type: '自提',
    orderNum: '',
    show1: true,
    show3: false,
    show4: false,
    form: {},
    hideContain: false,
    imgShow:false,
  },
  showImg(e){
    this.setData({
      imgShow:true,
      curImg:e.currentTarget.dataset.img
    })
  },
  hideImg(){
    this.setData({
      imgShow:false,
    })
  },
  check(e){
    let value=e.detail.value
    let reg=/^[1-9]\d*|0$/
    let reg2=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/
    if(!reg.test(value)&&!reg2.test(value)) {
      wx.showToast({
        icon: 'none',
        title: '下单数量不能为空且应为数字',
      })
    }
  },
  check2(e){
    let value=e.detail.value
    let reg4=/^(\d+|\d+\.\d{1,2})$/;
    if(!reg4.test(value)) {
      wx.showToast({
        icon: 'none',
        title: '付款金额不能为空且应为数字，最小单位为分',
      })
    }
  },
  check3(e){
    let value=e.detail.value
    if(!phoneVerify(value)) {
      wx.showToast({
        icon: 'none',
        title: '手机号码格式错误',
      })
    }
  },
  delFile(e) {
    const fileList = this.data.fileList;
    fileList.splice(e.detail.index, 1)
    this.setData({
      fileList: fileList,
      imgSrc: ''
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;

    const {
      fileList = []
    } = this.data;
    fileList.push({
      ...file
    });
    this.setData({
      fileList
    });
    wx.uploadFile({
      url: upload,
      filePath: file.url,
      name: 'file',
      formData: {},
      success: (res) => {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        this.setData({
          imgSrc:data.fileName
        })
      }
    })
  },
  confirmUpdate() {
    this.setData({
      show4: false
    })
  },
  GoAddress() {
    wx.navigateTo({
      url: '/message/pages/address/index/index'
    })
  },
  GoDetail(e) {
    wx.navigateTo({
      url: '/specialZone/pages/shopDetail/shopDetail?id=' + e.currentTarget.dataset.id
    })
  },
  onClickHide() {
    this.setData({
      show3: false,
      show4: false,
      hideContain: false,
    })
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      type: value
    })
  },
  OpenUpload() {
    this.setData({
      show4: true,
      hideContain: true,
    })
  },
  onCancel() {
    this.setData({
      show: false,
      show3: false,
      show4: false,
      hideContain: false,
    })
  },
  OpenEwm() {
    this.setData({
      show3: true,
      hideContain: true,
    })
  },
  onConfirm(e) {
    let that = this
    this.setData({
      type:e.detail.value
    })
    if (that.data.type == "快递配送") {
      that.setData({
        show1: false,
      })
    } else if (that.data.type == "自提") {
      that.setData({
        show1: true,
      })
    }
    that.setData({
      show: false,
      fileList: []
    })
  },
  getWx(id) {
    Sjgzm({
      id,
    }).then((res) => {
      if (res) {
        this.setData({
          mobile: res?.data.mobile || '暂无',
          wechat: res?.data.wechat || '暂无',
          skm: res?.data.skm.split(',') || '暂无'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    console.log(options.stationId)
    if(options.stationId){
      this.setData({
        stationId:options.stationId
      })
    }
  },
  getAddress() {
    addressList({
      openid: wx.getStorageSync('thirdSession').openid,
      pageNum: 1,
      pageSize: 10,
    }).then(
      (res) => {
        if (res) {
          if (res.data.length > 0) {
            let formData = ""
            for (let i in res.data) {
              if (res.data[i].isdefault === '0') {
                formData = res.data[i]
              }
            }
            console.log(formData);
            const regionCode = formData.region_code ? formData.region_code.split(',') : []
            const province = areaCode.areaList.province_list[regionCode[0]]
            const city = areaCode.areaList.city_list[regionCode[1]]
            const county = areaCode.areaList.county_list[regionCode[2]]
            console.log(province);
            this.setData({
              addressDeatil: formData,
              province,
              city,
              county
            })
          }

        }

      }
    )
  },
  getData() {
    let data = wx.getStorageSync('cartData')
    let payMoney =0
    data.map(item=>{
      payMoney+=item.num*item.unitPrice
    })
    let colu = data[0].distribution_type=='1'?['快递配送']:data[0].distribution_type=='2'?['自提']:['自提','快递配送']
    this.setData({
      goodsList:data,
      payMoney,
      columns:colu,
      type:colu[0],
      show1:colu[0]=='自提'?true:false
    })
    this.getWx(data[0].storeId)
  },
  OpenCheck() {
    this.setData({
      show: true
    })
  },
  goStations(){
    console.log(this.data.stationId)
    wx.navigateTo({
      url: '/specialZone/pages/selectStations/selectStations?stationId='+(this.data.stationId?this.data.stationId:''),
    })
  },
  GoPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  },
  buyShop() {
    let form = {}
    if (this.data.show1 && !this.data.username) {
      wx.showToast({
        icon: 'none',
        title: '姓名不可为空',
      })
      return
    }
    if (this.data.show1 && !this.data.tel) {
      wx.showToast({
        icon: 'none',
        title: '联系方式为空',
      })
      return
    }
    if(this.data.show1 && !phoneVerify(this.data.tel)){
      wx.showToast({
        icon: 'none',
        title: '手机号码格式错误',
      })
      return
    }
    // if (!this.data.orderNum) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '下单数量为空',
    //   })
    //   return
    // }
    let reg=/^[1-9]\d*|0$/
    let reg2=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/
    let reg3=/^[1-9]\d*\.[0-9]{0,2}|0\.[0-9]{0,2}|0$/
    let reg4=/^(\d+|\d+\.\d{1,2})$/;
    // if(!reg.test(this.data.orderNum)&&!reg2.test(this.data.orderNum)) {
    //   wx.showToast({
    //     icon: 'none',
    //     title: '下单数量应为数字',
    //   })
    //   return
    // }
    if (!this.data.payMoney) {
      wx.showToast({
        icon: 'none',
        title: '付款金额为空',
      })
      return
    }
    if(!reg4.test(this.data.payMoney)) {
      wx.showToast({
        icon: 'none',
        title: '付款金额应为数字且最小单位为分',
      })
      return
    }
    if (!this.data.imgSrc) {
      wx.showToast({
        icon: 'none',
        title: '付款凭证为空',
      })
      return
    }
    if (this.data.type=='自提' && !this.data.stations) {
      wx.showToast({
        icon: 'none',
        title: '请选择自提点',
      })
      return
    }
    if (!this.data.show1 && !this.data.province) {
      wx.showToast({
        icon: 'none',
        title: '请填写地址',
      })
      return
    } 
    form = {
      openid: wx.getStorageSync('thirdSession').openid,
      useName: this.data.username,
      useTel: this.data.tel,
      distribution: this.data.type,
      orderMoney: this.data.payMoney,
      img: this.data.imgSrc,
      userId: wx.getStorageSync('userInfo').id || 108,
      storeId: this.data.goodsList[0].storeId|| 1,
      serialNum: this.getProjectNum() + Math.random().toString().substr(2, 6),
      orderStatus: 1,
      nums: this.data.goodsNum,
      addressId: this.data.addressDeatil?.id,
      shopCarList:this.data.goodsList,
      templateIdList:['5HD-XrMbh_0ynv0c1lgS0KBRvX51Or9LeEgcl5R6GH8'],
      // pickId:this.data.type=='自提'?this.data.stations.id:''
    }
    addOrder({
        ...form
      })
      .then((res) => {
        if (res) {
          deleteShopCar(form).then(res=>{})
          wx.showToast({
            title: '下单成功',
            success() {
              wx.redirectTo({
                url: '/message/pages/Order/myorder/myorder',
              })
            }
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
          })
        }
      })
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
    this.getAddress()
    const curStation = wx.getStorageSync('curStation')
    curStation&&this.setData({stations:curStation})
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
    wx.removeStorageSync('curStation')
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
  getProjectNum() {
    const projectTime = new Date(); // 当前中国标准时间
    const Year = projectTime.getFullYear(); // 获取当前年份 支持IE和火狐浏览器.
    const Month = projectTime.getMonth() + 1; // 获取中国区月份
    const Day = projectTime.getDate(); // 获取几号
    var CurrentDate = Year;
    if (Month >= 10) {
      // 判断月份和几号是否大于10或者小于10
      CurrentDate += Month;
    } else {
      CurrentDate += "0" + Month;
    }
    if (Day >= 10) {
      CurrentDate += Day;
    } else {
      CurrentDate += "0" + Day;
    }
    return CurrentDate;
  }
})