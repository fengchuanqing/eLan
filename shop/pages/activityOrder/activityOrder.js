var titleList = getApp()
import {
  domain,
  merchantOrderList,
  merchantOrderDeatil,
  merchantOrderUpdate
} from "../../../utils/api.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    domain: domain,
    isPrint: false,
    active1: '活动',
    active: 5,
    show_sx: false,
    show_rl: false,
    // 时间选择
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    // 时间选择以上
    result: ['a', 'b'],
    checkboxItems: [{
        name: '已下单',
        value: '1',
        checked: false,
      },
      {
        name: '待发货',
        value: '2',
        checked: true,
      },
      {
        name: '已验证',
        value: '3',
        checked: false,
      },
      {
        name: '已发货',
        value: '4',
        checked: false,
      },
      {
        name: '已完成',
        value: '5',
        checked: false,
      }
    ],
    orderList: [],
    pageNum: 1,
    pageSize: 10,
    isReachBottom: true,
    show_wl: false,
    expressName: '',
    expressNo: '',
    startTime: '',
    endTime: ''
  },
  orderPrint() {
    this.setData({
      isPrint: true
    })
    this.print()
  },
  print() {
    if (!this.data.deviceId) {
      wx.showToast({
        title: '未连接任何蓝牙设备',
        icon: 'none',
      });
      return;
    }
    const opt = {
      deviceId: this.data.deviceId,
      ...this.character
    };
    sendDataToDevice({
      ...opt,
      value: new Uint8Array([...printCommand.clear, ...GBK.encode(this.data.message), ...printCommand.enter])
        .buffer,
      lasterSuccess: () => {},
    });
  },
  onClose() {
    this.setData({
      show_sx: false,
    });
  },
  timeHide() {
    this.setData({
      show_rl: false,
    });
  },
  OpenTime(e) {
    this.setData({
      show_rl: true,
      isStart: e.currentTarget.dataset.idx
    });
  },
  GetTime(e) {
    var time = new Date(e.detail);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    if (this.data.isStart === 1) {
      this.setData({
        startTime: y + '-' + m + '-' + d
      })
    } else {
      this.setData({
        endTime: y + '-' + m + '-' + d
      })
    }
    this.setData({
      show_rl: false,
      currentDate: e.detail,
    });
  },
  checkboxChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].value) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.data.checkboxItems.forEach(item => {
      if (item.checked) {
        console.log(item)
        // BindWholesaler(item.value, apiDatas.bindWholesaler)
      } else {
        // BindWholesaler(item.value, apiDatas.unbindWholesaler)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ShowSx() {
    this.setData({
      show_sx: true,
    });
  },
  GoDetail(e) {
    wx.navigateTo({
      url: '/pages/Merchant/orderDetail/orderDetail?orderNum=' + e.target.dataset.ordernum
    })
  },
  SxQueren() {
    this.setData({
      show_sx: false,
      orderList: [],
      pageNum: 1,
      pageSize: 10
    });
    this.getData()
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: titleList.titleList.business
    })
  },
  changeOrderTabs(tab) {
    this.setData({
      active1: tab.detail.name,
      orderList: [],
      pageNum:1,
      isReachBottom:true
    }) 
    this.getData()
  },
  changeStatusTabs(tab) {
    this.setData({
      active: tab.detail.name,
      orderList: [],
      pageNum:1,
      isReachBottom:true
    })
    this.getData()
  },
  getData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: merchantOrderList,
      method: 'GET',
      data: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        distribution: this.data.active1,
        storeId: wx.getStorageSync('userInfo').id || 1,
        orderStatus: this.data.active === 0 ? "" : this.data.active,
        beginTime: this.data.startTime,
        endTime: this.data.endTime
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 200) {
          let arr = res.data.rows
          if (this.data.pageNum*this.data.pageSize >= res.data.total) {
            this.setData({
              isReachBottom: false
            })
          }
          this.setData({
            orderList: [...this.data.orderList, ...arr]
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: res.data.msg,
          })
        }
      }
    })
  },
  OpenWl(e) {
    this.setData({
      show_wl: true,
      wl_id: e.target.dataset.ordernum
    })
  },
  onClickHide() {
    this.setData({
      show_wl: false
    })
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
  wlConfirm() {
    if(!this.data.expressName){
      wx.showToast({
        icon:'error',
        title: '快递名称为空',
      })
      return
    }
    if(!this.data.expressNo){
      wx.showToast({
        icon:'error',
        title: '物流单号为空',
      })
      return
    }
    wx.request({
      url: merchantOrderUpdate,
      method: 'post',
      data: {
        id: this.data.wl_id,
        orderStatus: '4',
        logisticsNum: this.data.expressNo,
        logisticsCompany: this.data.expressName,
      },
      success: (res) => {
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
          })
          this.setData({
            pageSize: 10,
            pageNum: 1,
            orderList: [],
            show_wl: false
          })
          this.getData()
        } else {
          wx.showToast({
            icon: 'error',
            title: res.data.msg,
          })
        }
      }
    })
  },
  GoCheck(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认验证？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: merchantOrderUpdate,
            method: 'post',
            data: {
              id: e.target.dataset.ordernum,
              orderStatus: this.data.active1=='快递配送'?'3':'4',
            },
            success: (res) => {
              if (res.data.code == 200) {
                wx.showToast({
                  title: res.data.msg,
                })
                this.setData({
                  pageSize: 10,
                  pageNum: 1,
                  orderList: []
                })
                this.getData()
              } else {
                wx.showToast({
                  icon: 'error',
                  title: res.data.msg,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  delOrder(e) {
    wx.showModal({
      title: '提示',
      content: '是否删除该订单？',
      success:(res)=> {
        if (res.confirm) {
          wx.request({
            url: merchantOrderDeatil + e.target.dataset.orderno,
            method: 'DELETE',
            success: (res) => {
              if (res.data.code == 200) {
                wx.showToast({
                  title: res.data.msg,
                })
                this.setData({
                  pageSize: 10,
                  pageNum: 1,
                  orderList: []
                })
                this.getData()
              } else {
                wx.showToast({
                  icon: 'error',
                  title: res.data.msg,
                })
              }
            }
          })
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
      orderList:[],
      pageNum:1,
      isReachBottom:true
    })
    this.getData()
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
  onPullDownRefresh() {
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