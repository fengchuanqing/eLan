// pages/MerchantCenter/shopDetail/shopDetail.js
import {
  domain,
  merchantActivityDeatil
} from '../../../utils/api.js'
import {
  img,
  activityDetail,
  updateActivity
} from '../../../apis/message.js'

const areaCode = require('../../../utils/area-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain,
    img,
    form: {
      activityName: '',
      introduction: '',
      imgUrl: '',
      address: '请选择',
      beginTime: '开始日期',
      endTime: '结束日期',
      notice: '',
      telephone: '',
      vx: '',
    },
    shopCoverImg: '/shop/static/icons/icon/canmera.png',
    imgList: ['/shop/static/icons/icon/canmera.png', '/shop/static/icons/icon/canmera.png', '/shop/static/icons/icon/canmera.png'],
    imgPopSrc: '',
    imgShow: false,
    shop_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop_id: options.id
    })
    this.getData()
  },
  getData() {
    activityDetail({
      id: this.data.shop_id
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        const formData = res.data
        // const regionCode = formData.address ? formData.address.split(',') : [];
        // const province = areaCode.areaList.province_list[regionCode[0]]
        // const city = areaCode.areaList.city_list[regionCode[1]]
        // const county = areaCode.areaList.county_list[regionCode[2]]
        // formData.address = province + city + county
        this.setData({
          form: formData,
          imgUrl: formData.img_url,
          imgList: formData.other_img && formData.other_img.split(',')
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    })
    // wx.request({
    //   url: merchantActivityDeatil + this.data.shop_id,
    //   method: 'get',
    //   success: (res) => {
    //     if (res.data.code === 200) {
    //       const formData = res.data.data
    //       const regionCode = formData.address ? formData.address.split(',') : [];
    //       const province = areaCode.areaList.province_list[regionCode[0]]
    //       const city = areaCode.areaList.city_list[regionCode[1]]
    //       const county = areaCode.areaList.county_list[regionCode[2]]
    //       formData.address = province + city + county
    //       this.setData({
    //         form: formData,
    //         imgUrl: formData.imgUrl,
    //         imgList: formData.otherImg && formData.otherImg.split(',')
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //       })
    //     }
    //   }
    // })
  },
  grounding() {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认上架该商品吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateActivity({
            id: this.data.shop_id,
            state: "0"
          }).then(res => {
            if (res.code == 200) {
              this.getData()
            }
            wx.showToast({
              title: res.msg,
            })
          })
          // wx.request({
          //   url: merchantActivityDeatil,
          //   method: 'PUT',
          //   data: {
          //     id: this.data.shop_id,
          //     state: "0"
          //   },
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
          //       })
          //       this.setData({
          //         pageNum: 1,
          //         activityList: [],
          //         showMore: false
          //       })
          //       this.getData()
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
  undercarriage() {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认下架该商品吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateActivity({
            id: this.data.shop_id,
            state: "1"
          }).then(res => {
            if (res.code == 200) {
              this.getData()
            }
            wx.showToast({
              title: res.msg,
            })
          })
          // wx.request({
          //   url: merchantActivityDeatil,
          //   method: 'PUT',
          //   data: {
          //     id: this.data.shop_id,
          //     state: "1"
          //   },
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
          //       })
          //       this.setData({
          //         pageNum: 1,
          //         activityList: [],
          //         showMore: false
          //       })
          //       this.getData()
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

  imgPop(e) {
    this.setData({
      imgShow: true,
      imgPopSrc: e.currentTarget.dataset.item
    })
  },
  onClickHide() {
    this.setData({
      imgShow: false,
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