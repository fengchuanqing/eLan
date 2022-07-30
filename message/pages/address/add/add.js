// pages/Receiving/addaddress/addaddress.js
import {
  xzAddress
} from '../../../../apis/message'
import {
  phoneVerify
} from '../../../../utils/util.js'
const smartAddress = require('../../../../utils/smartAddress')
const areaCode = require('../../../../utils/area-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    username: '',
    phone: '',
    area: '',
    address: '',
    areaList: areaCode.areaList,
    areaShow: false,
    textInfo: ''
  },

  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },
  onAreaShow() {
    this.setData({
      areaShow: true
    })
  },
  onClose() {
    this.setData({
      areaShow: false
    })
  },
  confirmArea(e) {
    let name = '',
      code = ""
    for (const item of e.detail.values) {
      name += item.name
      code += item.code + ','
    }
    code = code.slice(0, code.length - 1)
    this.setData({
      areaShow: false,
      area: name,
      areaCodes: code
    })
  },
  cancelArea() {
    this.setData({
      areaShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit() {
    if (!this.data.username) {
      wx.showToast({
        title: '收货人必填',
      })
      return
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '手机号必填',
      })
      return
    }
    if (!phoneVerify(this.data.phone)) return
    if (!this.data.area) {
      wx.showToast({
        title: '所在地区必填',
      })
      return
    }
    if (!this.data.address) {
      wx.showToast({
        title: '详细地址必填',
      })
      return
    }
    let params = {
      name: this.data.username,
      mobile: this.data.phone,
      regionCode: this.data.areaCodes,
      address: this.data.address,
      isdefault: this.data.checked ? '0' : '1',
      openid: wx.getStorageSync('thirdSession').openid
    }
    xzAddress(params).then(res => {
      if (res) {
        wx.showToast({
          title: '保存成功',
          success: () => {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindTextarea(e){
    this.setData({
      textInfo:e.detail.value
    })
    let result = smartAddress.processAddress(e.detail.value)
    let address = result.address
    if (result.name) {
      this.setData({
        username: result.name
      })
    }
    if (result.phone) {
      this.setData({
        phone: result.phone
      })
    }
    address&&this.handleClipboardAddress(address)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 剪切板（复制）的内容，注意，进入页面后会异步请求定位，然后获取到locatedTown。所以必须延时解析复制的地址，否则解析后
    // 再定位到locatedTown，就会默认选定街道办！！
    let _this = this
    wx.getClipboardData({
      success: (option) => {
        let string = option.data
        if (string && string.length > 1 && string.length < 120) {
          let result = smartAddress.processAddress(string)
          let count = result.count
          // 地址信息超过2部分才自动（弹窗）粘贴，否则让用户自行粘贴（长按输入框粘贴）
          // 有地址，并且确定是地址，需要解析获取地区、街道
          let address = result.address
          if (count > 1 || (address && smartAddress.isAddress(address))) {
            wx.showModal({
              title: '检测到地址信息',
              content: '是否粘贴地址信息？',
              confirmText: '粘贴',
              cancelText: '取消',
              success: function (res) {
                if (res.confirm) {
                  if (result.name) {
                    _this.setData({
                      username: result.name
                    })
                  }
                  if (result.phone) {
                    _this.setData({
                      phone: result.phone
                    })
                  }
                  address&&_this.handleClipboardAddress(address)
                  // 清空剪切板
                  // wx.setClipboardData({
                  //   data: '',
                  // })
                }
              }
            })
          }

        }
      },
    })
  },
  handleClipboardAddress(address) {
    // 获取省名字和code编码
    const {province_list,city_list,county_list} = areaCode.areaList
    let provinceValues = Object.values(province_list)
    let provinceKeys = Object.keys(province_list)
    let provinceObject=null,cityObject=null,countyObject=null;
    for(let i=0;i< provinceValues.length;i++){
      let provinceIndex=address.indexOf(provinceValues[i])
      if(provinceIndex>-1){
        provinceObject={
          name:provinceValues[i],
          code:provinceKeys[i]
        }
        break
      }
    }
    // 获取市编码
    let cityValues = Object.values(city_list)
    let cityKeys = Object.keys(city_list)
    for(let i=0;i< cityValues.length;i++){
      let cityIndex=address.indexOf(cityValues[i])
      if(cityIndex>-1){
        cityObject={
          name:cityValues[i],
          code:cityKeys[i]
        }
        break
      }
    }
    // 获取区编码
    let countyValues = Object.values(county_list)
    let countyKeys = Object.keys(county_list)
    for(let i=0;i< countyValues.length;i++){
      let countyIndex=address.indexOf(countyValues[i])
      if(countyIndex>-1){
        countyObject={
          name:countyValues[i],
          code:countyKeys[i]
        }
        break
      }
    }
    if(!provinceObject){
      wx.showToast({
        icon:'error',
        title: '地址错误',
      })
      return
    }
    console.log(provinceObject,cityObject,countyObject)
    this.setData({
      area: provinceObject.name+cityObject.name+countyObject.name,
      areaCodes:provinceObject.code+','+cityObject.code+','+countyObject.code,
      address: address
    })
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