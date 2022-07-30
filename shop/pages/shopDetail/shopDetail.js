// pages/MerchantCenter/shopDetail/shopDetail.js
import {
  domain,
} from "../../../utils/api.js"
import {
  img,
  GoodsDetail,
  updateGoods
} from '../../../apis/message.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain,
    img,
    items: [{
        value: '1',
        name: '是',
        check: true
      },
      {
        value: '0',
        name: '否',
        check: true
      },
    ],
    form: {
      name: '',
      shopTag: '',
      address: '',
      distributionType: '',
      detailPage: '',
      startDate: '',
      endDate: '',
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      bcsm: '',
      phone: '',
      wechat: '',

    },
    imgList: ['/shop/static/icons/icon/canmera.png', '/shop/static/icons/icon/canmera.png', '/shop/static/icons/icon/canmera.png'],
    imgPopSrc: '',
    imgShow: false,
    order_id: '',
    onState: '1',
    ruleList:[{
      gg:'12',
      jg:11
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      order_id: options.id
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
  onShow: function (options) {
    this.getData()

  },
  getData() {
    let that = this
    GoodsDetail({
      goodId: this.data.order_id
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        const formData = res.data;
        that.data.items.forEach(item => {
          item.check = false
          if (item.value == formData.sfxp) {
            item.check = true
          }
        })
        this.setData({
          'form.name': formData.name,
          'form.shopTag': formData.trait,
          'form.distributionType': formData.distribution_type,
          'form.address': formData.address,
          'form.explain': formData.introduction,
          'form.startDate': formData.valid_begin_time,
          'form.endDate': formData.valid_end_time,
          'form.checkbox1': formData.is_add_wechat,
          'form.checkbox2': formData.is_payment_voucher,
          'form.checkbox3': formData.is_explain,
          'form.checkbox4': formData.is_pay,
          'form.phone': formData.service_phone,
          'form.wechat': formData.wechat,
          'form.type': formData.type,
          'form.bcsm': formData.supplement,
          imgList: formData.img.split(','),
          shopCoverImg: formData.detailPage,
          onState: formData.on_state,
          skmSrc: formData.skm.split(','),
          wxhSrc: formData.wechat,
          items: that.data.items,
          ruleList:formData.goodsSizeList,
          stationList:formData.goodsPickList
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.data.msg,
        })
      }
    })
  },
  grounding() {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认上架该商品吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateGoods({
            id: this.data.order_id,
            onState: "1"
          }).then(res => {
            if (res.code == 200) {
              wx.navigateBack({
                delta: 0,
              })
            }
            wx.showToast({
              title: res.msg,
            })
          })
          // wx.request({
          //   url: merchantGoodsUp,
          //   method: 'PUT',
          //   data: {
          //     id: this.data.order_id,
          //     onState: "1"
          //   },
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
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
          updateGoods({
            id: this.data.order_id,
            onState: "2"
          }).then(res => {
            if (res.code == 200) {
              wx.navigateBack({
                delta: 0,
              })
            }
            wx.showToast({
              title: res.msg,
            })
          })
          // wx.request({
          //   url: merchantGoodsUp,
          //   method: 'PUT',
          //   data: {
          //     id: this.data.order_id,
          //     onState: "2"
          //   },
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
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
  imgPop(e) {
    this.setData({
      imgShow: true,
      imgPopSrc: this.data.img + e.currentTarget.dataset.item
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