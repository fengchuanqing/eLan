// pages/Receiving/editaddress/editaddress.js
import {
  saveAddress,
  scAddress,
  xqAddress
} from '../../../../apis/message'
import {
  phoneVerify
} from '../../../../utils/util.js'
const areaCode = require('../../../../utils/area-data')
import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    username: '',
    phone: '',
    area: '',
    areaList: areaCode.areaList,
    address: '',
    areaShow: false
  },
  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address_id: options.id
    })
    this.getData(options.id)
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
    console.log(e)
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
  getData(xh) {
    xqAddress({
      id: xh
    }).then(res => {
      if (res) {
        const data = res.data
        const regionCode = data.region_code ? data.region_code.split(',') : [];
        const province = areaCode.areaList.province_list[regionCode[0]]
        const city = areaCode.areaList.city_list[regionCode[1]]
        const county = areaCode.areaList.county_list[regionCode[2]]
        this.setData({
          username: data.name,
          phone: data.mobile,
          area: province + city + county,
          areaCodes:data.region_code,
          address: data.address,
          checked: data.isdefault === '0' ? true : false
        })
      }
    })
  },
  Delete() {
    Dialog.confirm({
        title: '我的收货地址',
        message: '是否删除?'
      })
      .then(() => {
        scAddress({
          id: this.data.address_id
        }).then(res => {
          if (res) {
            wx.showToast({
              title: '删除成功',
              success: () => {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  GoBaocun() {
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
      id: this.data.address_id,
      name: this.data.username,
      mobile: this.data.phone,
      regionCode: this.data.areaCodes,
      address: this.data.address,
      isdefault: this.data.checked ? '0' : '1',
      openid: wx.getStorageSync('thirdSession').openid
    }
    saveAddress(params).then(res => {
      if (res) {
        wx.showToast({
          title: '保存成功',
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