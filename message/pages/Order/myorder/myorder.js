// pages/Order/myorder/myorder.js
import {
  img,
  Yhddlb,
  updateOrder
} from '../../../../apis/specialZone.js'
import Dialog from '@vant/weapp/dialog/dialog';
// import {myOrderList,myOrderUpdate,myOrderDel,domain} from '../../../utils/api.js'
// import {addEvaluation} from '../../../utils/userApi.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pic: img,

    active: '0',
    pageNum: 1,
    pageSize: 10,
    orderList: [],
    describeVal: '默认值',
  },
  getYhddlb(page = 1, size = 7, orderStatus = '', orderType = '', id = '') {
    if (this.data.orderList.length >= (page - 1) * size)
      Yhddlb({
        page,
        size,
        openid: wx.getStorageSync('thirdSession').openid,
        orderStatus,
        id,
        orderType
      }).then((res) => {
        console.log(res);
        if (res) {
          res.data.map((item) => {
            item.goodSizeList.map(it=>{
              it.sptp = it.sptp?.split(',')
            })
          })
          this.setData({
            orderList: [...this.data.orderList, ...res.data]
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.selectComponent('#tabs').resize();
    if (options.active) {
      this.setData({
        active: options.active
      })
    }
    // this.getYhddlb()
  },
  goEvaluate(e) {
    console.log(e.currentTarget.dataset.item);
    this.setData({
      showEvaluate: true,
      currentShop: e.currentTarget.dataset.item,
      describeVal: "请输入"
    }, () => {
      let timeout = setTimeout(() => {
        this.setData({
          describeVal: ""
        })
        clearTimeout(timeout)
      }, 50)
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      describeVal: e.detail.value
    })
  },
  submitEvaluate() {
    if(!this.data.evaluateVal){
      wx.showToast({
        icon:'error',
        title: '请先评分！',
      })
      return
    }
    updateOrder({
        score: this.data.evaluateVal.toString(),
        evaluation: this.data.describeVal,
        evaluationState: '1',
        id: this.data.currentShop.id,
      })
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
          })
          this.setData({
            showEvaluate: false,
            isReachBottom: true,
            evaluateVal: 0,
            pageNum: 1,
            orderList: []
          })
          if (this.data.active == 0) {
            this.getYhddlb()
          } else {
            this.getYhddlb(1, 7, this.data.active)
          }

        } else {
          wx.showToast({
            icon: 'error',
            title: res.msg,
          })
        }
      })
  },
  closeDialog() {
    this.setData({
      showEvaluate: false
    })
  },
  onChange(event) {
    console.log('当前值：' + event.detail);
    this.setData({
      evaluateVal: event.detail
    })
  },
  GoDetail(val) {
    wx.navigateTo({
      url: '/message/pages/Order/orderDetail/orderdetail?id=' + val.target.dataset.id
    })
  },
  delOrder(val) {
    console.log(val)
    Dialog.confirm({
        title: '我的订单',
        message: '是否删除？',
      })
      .then(() => {
        updateOrder({
            userDel: '1',
            id: val.target.dataset.id
          })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              wx.showToast({
                title: res.msg,
              })
              this.setData({
                showEvaluate: false,
                isReachBottom: true,
                pageNum: 1,
                orderList: []
              })
              if (this.data.active == 0) {
                this.getYhddlb()
              } else {
                this.getYhddlb(1, 7, this.data.active)
              }

            } else {
              wx.showToast({
                icon: 'error',
                title: res.msg,
              })
            }
          })

      })
      .catch(() => {
        // on cancel
      });
  },
  confirmOrder(e) {
    Dialog.confirm({
        title: '我的订单',
        message: '确认收货？',
      })
      .then(() => {
        updateOrder({
            orderStatus: '5',
            id: e.target.dataset.id,
            activityId:e.target.dataset.item?.hdid||'',
            goodsId:e.target.dataset.item?.spid||''
          })
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              wx.showToast({
                title: res.msg,
              })
              this.setData({
                showEvaluate: false,
                isReachBottom: true,
                pageNum: 1,
                orderList: []
              })
              if (this.data.active == 0) {
                this.getYhddlb()
              } else {
                this.getYhddlb(1, 7, this.data.active)
              }

            } else {
              wx.showToast({
                icon: 'error',
                title: res.msg,
              })
            }
          })

      })

      .catch(() => {
        // on cancel
      });
  },
  getData() {
    wx.request({
      url: myOrderList,
      method: 'get',
      data: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        orderStatus: this.data.active === '0' ? '' : this.data.active,
        userId: wx.getStorageSync('userInfo').id || 108
      },
      success: (res) => {
        if (res.data.code == 200) {
          let arr = res.data.rows
          if (this.data.pageNum * this.data.pageSize >= res.data.total) {
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
  changeTabs(tab) {
    console.log(tab);
    this.setData({
      active: tab.detail.name,
      title: tab.detail.title,
      pageNum: 1,
      orderList: [],
      isReachBottom: true
    })
    if (tab.detail.title == '全部') {
      this.getYhddlb()
    } else if (tab.detail.title == '已发货') {
      console.log(this.data.orderList);
      this.getYhddlb(1, 7, tab.detail.name, 1)
    } else if (tab.detail.title == '待收（提）货') {
      console.log(this.data.orderList);
      this.getYhddlb(1, 7, tab.detail.name, 0)
    } else {
      this.getYhddlb(1, 7, tab.detail.name)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      pageNum: 1,
      orderList: [],
      isReachBottom: true
    })
    if (this.data.active == 0) {
      this.getYhddlb()
    } else {
      this.getYhddlb(1, 7, this.data.active)
    }
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
      // this.getData()
      if (this.data.active == 0) {
        this.getYhddlb(this.data.pageNum, 7)
      } else if (this.data.active == 4) {
        if (this.data.title == '已发货') {
          this.getYhddlb(this.data.pageNum, 7, this.data.active, 1)

        } else {
          this.getYhddlb(this.data.pageNum, 7, this.data.active, 0)

        }
      } else {
        this.getYhddlb(this.data.pageNum, 7, this.data.active)

      }

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})