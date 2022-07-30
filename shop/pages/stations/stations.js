import {
  ztdlb,
  tjztd,
  scztd,
  img
} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneXSeries: getApp().globalData.isIPhoneXSeries,
    img,
    selectValue: 2,
    searchValue: '',
    option: [{
        value: 2,
        text: '全部'
      },
      {
        value: 1,
        text: '启用'
      },
      {
        value: 0,
        text: '禁用'
      },
    ],
    staffList: [],
    isReachBottom: true,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  getyglb() {
    const params = {
      pageNum: this.data.pageNum,
      size: 10,
      zt: this.data.selectValue === 2 ? '' : this.data.selectValue,
      mc: this.data.searchValue,
      storeId: wx.getStorageSync('userInfo').storeId,
    }
    ztdlb(params).then(res => {
      if (res.code === 200) {
        const list = res.data
        if (list.length < 10) {
          this.setData({
            isReachBottom: false
          })
        }
        this.setData({
          staffList: [...this.data.staffList, ...list]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isReachBottom: true,
      staffList: [],
      pageNum: 1
    })
    this.getyglb()
  },
  goThere(e) {
    const {
      jd: longitude,
      wd: latitude,
      mc,
      dq,
      xxdz
    } = e.currentTarget.dataset.item
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      name: mc,
      address: dq + xxdz,
      scale: 18
    })
  },
  selectShop(e) {
    this.setData({
      selectValue: e.detail,
      isReachBottom: true,
      staffList: [],
      pageNum: 1
    })
    this.getyglb()
  },
  searchShop(e) {
    this.setData({
      searchValue: e.detail,
      isReachBottom: true,
      staffList: [],
      pageNum: 1
    })
    this.getyglb()
  },
  addStaff() {
    wx.navigateTo({
      url: '/shop/pages/addStations/addStations',
    })
  },
  editStaff(e) {
    const {
      id
    } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/shop/pages/addStations/addStations?id=' + id,
    })
  },
  deleteStaff(e) {
    const {
      id
    } = e.currentTarget.dataset.item
    const {
      staffList
    } = this.data
    const idx = e.currentTarget.dataset.idx
    wx.showModal({
      title: '提示',
      content: '确认删除该自提点吗？',
      success: (res) => {
        if (res.confirm) {
          scztd({
            id
          }).then(res => {
            if (res.code == 200) {
              staffList.splice(idx, 1)
              this.setData({
                staffList
              })
              wx.showToast({
                icon: 'success',
                title: '操作成功！',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onOffStaff(e) {
    const {
      tp,
      mc,
      dq,
      xxdz,
      lxr,
      dh,
      zt,
      jd,
      wd,
      id,
      storeId,
    } = e.currentTarget.dataset.item
    const idx = e.currentTarget.dataset.idx
    const {
      staffList
    } = this.data
    const params = {
      zt: zt === 1 ? 0 : 1,
      tp,
      mc,
      dq,
      xxdz,
      lxr,
      dh,
      jd,
      wd,
      id,
      storeId,
    }
    tjztd(params).then(res => {
      if (res.code == 200) {
        staffList[idx].zt = zt === 1 ? 0 : 1
        this.setData({
          staffList
        })
        wx.showToast({
          icon: 'success',
          title: '操作成功！',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getyglb()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})