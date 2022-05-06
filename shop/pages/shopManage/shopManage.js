// pages/MerchantCenter/shopManage/shopManage.js
import {
  domain,
  merchantGoodsList,
  merchantGoodsDeatil,
  merchantGoodsUp
} from "../../../utils/api.js"
import {
  img,
  GoodsList,
  updateGoods,
  deleteGoods
} from '../../../apis/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    domain,
    shopList: [
      //   {
      //   id: '1',
      //   active: 0,
      //   time: '2021',
      //   name: '商品1',
      //   trait: '商品1',
      // }
    ],
    active: 0,
    showMore: false,
    screenPop: false,
    lx_act: 0,
    zt_act: 0,
    pageNum: 1,
    pageSize: 10,
    shopName: '',
    onState: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      shopList: []
    })
    this.getGoodsList()
    // this.getData()
  },
  shopNameInput(e) {
    this.setData({
      shopName: e.detail.value
    })
  },
  navigate1() {

  },
  getGoodsList() {
    GoodsList({
      pageNum: this.data.pageNum,
      name: this.data.shopName,
      onState: this.data.active + 1,
    }).then(res => {
      if (res.code == 200) {
        // this.setData({
        //   shopList: res.data.map(item => {
        //     item.logo = item.img.split(',')[0]
        //     return item
        //   })
        // })
        let arr = res.data.map(item => {
          item.logo = item.img.split(',')[0]
          item.jg=item.goodsSizeList[0].prince
          return item
        })
        if (arr.length < 5 || arr.length == 0) {
          // 请求全部 结束
          this.setData({
            isReachBottom: false
          })
        }
        this.setData({
          shopList: [...arr, ...this.data.shopList]
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.data.msg,
        })
      }
    })
  },
  // getData() {
  //   wx.request({
  //     url: merchantGoodsList,
  //     method: 'GET',
  //     data: {
  //       pageNum: this.data.pageNum,
  //       pageSize: this.data.pageSize,
  //       name: this.data.shopName,
  //       storeId: wx.getStorageSync('userInfo').id || 1,
  //       onState: this.data.active + 1,
  //     },
  //     success: (res) => {
  //       if (res.data.code == 200) {
  //         let arr = res.data.rows
  //         if (this.data.pageNum * this.data.pageSize >= res.data.total) {
  //           this.setData({
  //             isReachBottom: false
  //           })
  //         }
  //         this.setData({
  //           shopList: [...this.data.shopList, ...arr]
  //         })
  //       } else {
  //         wx.showToast({
  //           icon: 'error',
  //           title: res.data.msg,
  //         })
  //       }
  //     }
  //   })
  // },
  onChange(event) {
    this.setData({
      active: event.detail.index,
      zt_act: event.detail.index,
      shopList: [],
      pageSize: 10,
      pageNum: 1,
      showItem: 0
    })
    this.getGoodsList()
    // this.getData()
  },
  showMore(e) {
    this.setData({
      showMore: !this.data.showMore,
      showItem: e.currentTarget.dataset.idx
    })
  },
  showPopup() {
    this.setData({
      screenPop: true
    });
  },
  onClose() {
    this.setData({
      screenPop: false
    });
  },
  changeLxTag(e) {
    this.setData({
      lx_act: e.currentTarget.dataset.type
    })
  },
  changeZtTag(e) {
    this.setData({
      zt_act: e.currentTarget.dataset.type
    })
  },
  confirm() {
    this.setData({
      screenPop: false,
      shopList: [],
      pageSize: 10,
      pageNum: 1
    })
    // this.getData()
    this.getGoodsList()
  },
  grounding(e) {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认上架该商品吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateGoods({
            id: e.currentTarget.dataset.id,
            onState: "1"
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            this.setData({
              // pageSize: 10,
              pageNum: 1,
              shopList: []
            })
            this.getGoodsList()
          })
          // wx.request({
          //   url: merchantGoodsUp,
          //   method: 'PUT',
          //   data: {
          //     id: e.currentTarget.dataset.id,
          //     onState: "1"
          //   },
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
          //       })
          //       this.setData({
          //         pageSize: 10,
          //         pageNum: 1,
          //         shopList: []
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
  undercarriage(e) {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认下架该商品吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateGoods({
            id: e.currentTarget.dataset.id,
            onState: "2"
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            this.setData({
              // pageSize: 10,
              pageNum: 1,
              shopList: []
            })
            this.getGoodsList()
          })
          // wx.request({
          //   url: merchantGoodsUp,
          //   method: 'PUT',
          //   data: {
          //     id: e.currentTarget.dataset.id,
          //     onState: "2"
          //   },
          //   success: (res) => {
          //     if (res.data.code == 200) {
          //       wx.showToast({
          //         title: res.data.msg,
          //       })
          //       this.setData({
          //         pageSize: 10,
          //         pageNum: 1,
          //         shopList: []
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
  delete(e) {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认删除该商品吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateGoods({
            id: e.currentTarget.dataset.id,
            isDelete: 1,
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            this.setData({
              // pageSize: 10,
              pageNum: 1,
              shopList: []
            })
            this.getGoodsList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  sortClick(e) {
    wx.showModal({
      title: '商品排序',
      placeholderText: '请输入排序号如：1',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      editable: true,
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(res);
          updateGoods({
            id: e.currentTarget.dataset.id,
            sort: Number(res.content)
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            this.setData({
              // pageSize: 10,
              pageNum: 1,
              shopList: []
            })
            this.getGoodsList()
            // wx.request({
            //   url: merchantGoodsUp,
            //   method: 'PUT',
            //   data: {
            //     id: e.currentTarget.dataset.id,
            //     sort: Number(res.content)
            //   },
            //   success: (res) => {
            //     if (res.data.code == 200) {
            //       wx.showToast({
            //         title: res.data.msg,
            //       })
            //       this.setData({
            //         pageSize: 10,
            //         pageNum: 1,
            //         shopList: []
            //       })
            //       this.getData()
            //     } else {
            //       wx.showToast({
            //         icon: 'error',
            //         title: res.data.msg,
            //       })
            //     }
            //   }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})