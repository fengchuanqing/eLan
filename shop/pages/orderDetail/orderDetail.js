var titleList = getApp()
import {
  domain,
  merchantOrderDeatil,
  merchantOrderUpdate
} from "../../../utils/api.js"
import {
  img,
  orderDetail,
  updateOrder
} from '../../../apis/message.js'
const areaCode = require('../../../utils/area-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    domain,
    show_wl: false,
    orderDetail: {},
    show_img: false,
    show_bh: false,
    reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNum,
      state: options.state
    })

    this.getData()
  },
  getData() {
    orderDetail({
      id: this.data.orderNo
    }).then(res => {
      if (res.code == 200) {
        let num=0
        res.data.goodsSizeList?.map(item=>{
          item.img=item.img.split(',')
          num+=item.num*item.prince
        })
        res.data.goodsSizeList&&(res.data.order_money=num)
        // 省市区
        if (res.data.address) {
          this.setData({
            orderDetail: res.data,
            province: res.data.address,
          })
        } else {
          const regionCode = res.data.sjrssq ? res.data.sjrssq.split(',') : []
          const province = areaCode.areaList.province_list[regionCode[0]]
          const city = areaCode.areaList.city_list[regionCode[1]]
          const county = areaCode.areaList.county_list[regionCode[2]]
          this.setData({
            orderDetail: res.data,
            province,
            city,
            county
          })
        }

      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
  },
  showImg() {
    this.setData({
      show_img: true
    })
  },
  hideImg() {
    this.setData({
      show_img: false
    })
  },
  Tihuo() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认提货？',
      success: (res) => {
        if (res.confirm) {
          updateOrder({
            storeId: that.data.orderDetail.store_id,
            id: that.data.orderNo,
            orderStatus: "4",
          }).then(res => {
            // console.log(res);
            if (res.code == 200) {
              that.getData()
            } else {}
            wx.showToast({
              icon: '',
              title: res.msg,
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  delOrder() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该订单？',
      success(res) {
        if (res.confirm) {
          updateOrder({
            storeId: that.data.orderDetail.store_id,
            id: that.data.orderNo,
            storeDel: '1',
          }).then(res => {
            // console.log(res);
            if (res.code == 200) {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 200)
            } else {}
            wx.showToast({
              icon: '',
              title: res.msg,
            })
          })
          // wx.request({
          //   url: merchantOrderDeatil + this.data.orderNo,
          //   method: 'DELETE',
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
          //       })
          //       setTimeout(() => {
          //         wx.navigateBack({
          //           delta: 1
          //         })
          //       }, 200)
          //     } else {
          //       wx.showToast({
          //         icon: 'error',
          //         title: res.data.msg,
          //       })
          //     }
          //   }
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 已下单确认 更新状态
  confirmCheck(e) {
    let that = this
    if (e.currentTarget.dataset.num == 2) {
      // 去驳回
      this.setData({
        show_bh: true
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否确认验证？',
      success: (res) => {
        if (res.confirm) {
          updateOrder({
            storeId: that.data.orderDetail.store_id,
            id: that.data.orderNo,
            orderStatus: e.currentTarget.dataset.num,
          }).then(res => {
            // console.log(res);
            if (res.code == 200) {
              that.getData()
            } else {}
            wx.showToast({
              icon: '',
              title: res.msg,
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  OpenWl() {
    this.setData({
      show_wl: true
    })
  },
  onClickHide() {
    this.setData({
      show_wl: false,
      show_bh: false
    })
  },
  GoDrtail() {
    wx.navigateTo({
      url: '/shop/pages/commodityDetail/commodityDetail'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindInput(e) {
    this.setData({
      expressName: e.detail.value
    })
  },
  bindInputNo(e) {
    this.setData({
      expressNo: e.detail.value
    })
  },
  bindInputBh(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  // 驳回
  bohui() {
    if (!this.data.reason) {
      wx.showToast({
        icon: 'none',
        title: '驳回原因必填',
      })
      return
    }
    updateOrder({
      storeId: this.data.orderDetail.store_id,
      id: this.data.orderNo,
      bhyj: this.data.reason,
      orderStatus: '2',
    }).then(res => {
      // console.log(res);
      if (res.code == 200) {
        this.getData()
      } else {}
      wx.showToast({
        icon: '',
        title: res.msg,
      })
      this.setData({
        show_bh: false
      })
    })
  },
  // 物流单号确认 更新状态
  Squxiao() {
    if (!this.data.expressName) {
      wx.showToast({
        icon: 'none',
        title: '快递名称必填',
      })
      return
    }
    if (!this.data.expressNo) {
      wx.showToast({
        icon: 'none',
        title: '快递编号必填',
      })
      return
    }
    updateOrder({
      id: this.data.orderNo,
      orderStatus: '4',
      logisticsCompany: this.data.expressName,
      logisticsNum: this.data.expressNo
    }).then(res => {
      // console.log(res);
      if (res.code == 200) {
        this.getData()
      } else {}
      wx.showToast({
        icon: '',
        title: res.msg,
      })
      this.setData({
        show_wl: false
      })
    })
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