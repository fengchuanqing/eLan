import {
  domain,
  merchantActivityList,
  merchantActivityDeatil
} from '../../../utils/api.js'
import {
  img,
  activityList,
  deleteActivity,
  updateActivity
} from '../../../apis/message.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    domain,
    activityList: [],
    active: 0,
    showMore: false,
    isReachBottom: false,
    pageNum: 1,
    pageSize: 10,
    showItem: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getData() {
    activityList({
      pageNum: this.data.pageNum,
      onState: this.data.active, // 状态(0上架1下架)
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let arr = res.data
        if (arr.length < 5 || arr.length == 0) {
          // 请求全部 结束
          this.setData({
            isReachBottom: false
          })
        }
        this.setData({
          activityList: [...this.data.activityList, ...arr]
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
    // wx.request({
    //   url: merchantActivityList,
    //   method: 'GET',
    //   data: {
    //     pageNum: this.data.pageNum,
    //     pageSize: this.data.pageSize,
    //     storeId: wx.getStorageSync('userInfo').id || 1,
    //     state: this.data.active,
    //   },
    //   success: (res) => {
    //     if (res.data.code == 200) {
    //       let arr = res.data.rows
    //       if (this.data.pageNum * this.data.pageSize >= res.data.total) {
    //         this.setData({
    //           isReachBottom: false
    //         })
    //       }
    //       this.setData({
    //         activityList: [...this.data.activityList, ...arr]
    //       })
    //     } else {
    //       wx.showToast({
    //         icon: 'error',
    //         title: res.data.msg,
    //       })
    //     }
    //   }
    // })
  },
  delActivity(e) {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认删除该活动吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateActivity({
            id: e.currentTarget.dataset.id,
            isDelete:1
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            if (res.code == 200) {
              this.setData({
                pageNum: 1,
                activityList: [],
                showMore: false
              })
              this.getData()
            }
          })
          // wx.request({
          //   url: merchantActivityDeatil + e.currentTarget.dataset.id,
          //   method: 'DELETE',
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
  grounding(e) {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认上架该活动吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateActivity({
            id: e.currentTarget.dataset.id,
            state: "0"
          }).then(res => {
            if (res.code == 200) {
              this.setData({
                // pageSize: 10,
                pageNum: 1,
                activityList: []
              })
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
          //     id: e.currentTarget.dataset.id,
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
  undercarriage(e) {
    wx.showModal({
      title: '温馨提示',
      content: '亲，确认下架该活动吗？',
      confirmColor: '#428ffc',
      cancelColor: '#999999',
      success: (res) => {
        if (res.confirm) {
          updateActivity({
            id: e.currentTarget.dataset.id,
            state: "1"
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            this.setData({
              // pageSize: 10,
              pageNum: 1,
              activityList: []
            })
            this.getData()
          })
          // wx.request({
          //   url: merchantActivityDeatil,
          //   method: 'PUT',
          //   data: {
          //     id: e.currentTarget.dataset.id,
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
    this.setData({
      pageNum: 1,
      activityList: [],
      isReachBottom: true
    })
    this.getData()
  },

  onChange(event) {
    console.log(event.detail);
    console.log(event.detail.name);
    this.setData({
      active: event.detail.name,
      pageNum: 1,
      activityList: [],
      showMore: false
    })
    this.getData()
  },
  showMore(e) {
    this.setData({
      showMore: !this.data.showMore,
      showItem: e.currentTarget.dataset.idx
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
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})