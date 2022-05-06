import {
  domain,
  wdgylb,
  wdgysc
} from '../../../../apis/gylz'
import {
  lx
} from '../../../mixins/index.js'
Page({
  behaviors: [lx],
  /**
   * 页面的初始数据
   */
  data: {
    domain,
    option1: [{
      text: '全部区域',
      value: 0
    }],
    option2: [{
      text: '全部类型',
      value: 0
    }],
    option3: [{
        text: '全部状态',
        value: 2
      },
      {
        text: '已流转',
        value: 1
      },
      {
        text: '待流转',
        value: 0
      },
    ],
    option4: [{
        text: '全部',
        value: '全部'
      },
      {
        text: '出租',
        value: '出租'
      },
      {
        text: '转让',
        value: '转让'
      },
      {
        text: '转包',
        value: '转包'
      },
    ],
    value1: 0,
    value2: 0,
    value3: 2,
    value4: '全部',
    nyList: [],
    isReachBottom: true,
    pageSize: 10,
    pageNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getqylb()
    this.gettdlxlb()
  },
  delete(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除该数据吗？',
      confirmColor: '#428ffc',
      success: (res) => {
        if (res.confirm) {
          const id = e.currentTarget.dataset.id
          wdgysc({
            id
          }).then(res => {
            if (res) {
              const list = this.data.nyList
              list.map((item, idx) => {
                if (item.id === id) {
                  list.splice(idx, 1)
                }
              })
              this.setData({
                nyList: list
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  changeCol1(e) {
    console.log(e);
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value1: e.detail
    })
    this.wdfbgy()
  },
  changeCol2(e) {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value2: e.detail
    })
    this.wdfbgy()
  },
  changeCol4(e) {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value4: e.detail
    })
    this.wdfbgy()
  },
  changeCol3(e) {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value3: e.detail
    })
    this.wdfbgy()
  },
  wdfbgy() {
    const params = {
      ydlx: '1',
      czfs: this.data.value4,
      zt: this.data.value3,
      qybm: this.data.value1,
      tdlx: this.data.value2,
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum,
      openId: wx.getStorageSync('thirdSession').openid
      // openId: "o6JSs5Jhw_ZTmYjc8rFyALi25Dr0"

    }
    wdgylb(params).then(res => {
      if (res) {
        const data = res.data;
        data.forEach(item => {
          item.tpOne = item.tp.split(',')[0]
        })
        if (data.length < 10) {
          this.setData({
            isReachBottom: false
          })
        }
        let arr = this.data.nyList
        arr.forEach(item => {
          item.tpOne = item.tp.split(',')[0]
        })
        console.log(arr);
        console.log(data);
        this.setData({
          nyList: [...arr, ...data]
          // nyList: arr
        })
        console.log(this.data.nyList);

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goNext(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/gylz/pages/supply/qdlz/qdlz?id=' + id,
    })
  },
  goEdit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/gylz/pages/supply/add/add?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nyList: [],
      isReachBottom: true,
      pageNum: 1
    })
    this.wdfbgy()
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
      this.wdfbgy()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})