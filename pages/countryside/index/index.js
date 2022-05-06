// pages/countryside/index/index.js
import {
  ztlxlb,
  tzlb,
  pl,
  dz,
  xqpl
} from '../../../apis/tycx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    comment: '',
    show: false,
    curNav: '全部分类',
    page: 1,
    conList: [],
    curId: null,
    listDetailId: '',
  },
  goAdd(){
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo.sf==='微信未授权游客'){
      wx.showModal({
        title: '提示',
        content:'请先微信授权',
        success:(res)=>{
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/countryside/add/add',
    })
  },
  navTo(e) {
    wx.navigateTo({
      url: '/pages/countryside/detail/detail?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  close() {
    this.setData({
      show: false,
      comment: ''
    })
  },
  send() {
    if (this.data.comment) {
      pl({
        openid: wx.getStorageSync('thirdSession').openid,
        hfnr: this.data.comment,
        tzId: this.data.curId,
      }).then((res) => {
        console.log(res);
        this.message(this.data.curId)
        this.setData({
          comment: ''
        })
      })
    } else {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      })
    }
  },
  getCommentList(id, pageNum = 1, key = true) {
    if (this.data.conList.length >= (pageNum - 1) * 5) {
      tzlb({
        ztlx: id == "全部分类" ? '' : id,
        openid: wx.getStorageSync('thirdSession').openid,
        pageNum,
      }).then((res) => {
        if (res) {
          res.data.map((item) => {
            if (item.dz) {
              if (item.lb == '视频') {
                item.dz = item.dz.replace(/.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)/gi, '.jpg').split(',')
              } else {
                item.dz = item.dz.split(',')
              }
              console.log(item.dz);
            }
            item.shsj = this.changeTime(item.shsj)
          })
          console.log(res);
          let arr = res.data
          let oldList = this.data.conList
          if (key) {
            this.setData({
              conList: [...oldList, ...arr],
              curNav: id,
            })
          } else {
            this.setData({
              conList: arr,
              curNav: id,
            })
          }
        }
      })
    }
  },
  message(id, pageNum = 1) {
    xqpl({
      id,
      pageNum,
      openid: wx.getStorageSync('thirdSession').openid
    }).then((res) => {
      console.log(res);
      if (res) {
        let pls = 'conList[' + this.data.index + '].pls'
        let dzs = 'conList[' + this.data.index + '].dzs'
        let sfdz = 'conList[' + this.data.index + '].sfdz'
        this.setData({
          [pls]: res.data.pls,
          [dzs]: res.data.dzs,
          [sfdz]: res.data.sfdz
        })
      }
    })
  },
  bindzan(e) {
    dz({
      openid: wx.getStorageSync('thirdSession').openid,
      tzId: e.currentTarget.dataset.id
    }).then((res) => {
      if (res.code == 200) {
        this.setData({
          index: e.currentTarget.dataset.index
        })
        this.message(e.currentTarget.dataset.id)
      }
    })
  },
  navEnter(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/countryside/detail/detail?id=" + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.changeTime('2021-01-01 15:50:29'));
    // ztlxlb({
    //   openid: wx.getStorageSync('thirdSession').openid
    // }).then((res) => {
    //   if (res) {
    //     this.setData({
    //       navList: [{
    //         lx: '全部分类',
    //         id: ''
    //       }, ...res.data]
    //     })
    //   }
    // })
    // this.getCommentList(this.data.curNav)
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
    ztlxlb({
      openid: wx.getStorageSync('thirdSession').openid
    }).then((res) => {
      if (res) {
        this.setData({
          navList: [{
            lx: '全部分类',
            id: ''
          }, ...res.data]
        })
      }
    })
    this.setData({
      conList: [],
      page:1
    })
    this.getCommentList(this.data.curNav)
  },
  showMsgPop(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id;
    this.setData({
      curId: id,
      show: true,
      index: e.currentTarget.dataset.index
    })
  },
  changeNav(e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      page: 1,
      curNav: id
    })
    this.getCommentList(id, 1, false)
  },
  changeTime(t) {
    let res = wx.getSystemInfoSync()
    let time;

    var isiOS = res.system.match(/ios/i); //ios终端
    if (isiOS) {
      time = t.replace(/-/g, '/')
    } else {
      time = t
    }
    let currentDay = new Date((new Date).toLocaleDateString()).getTime()
    let cTime = (new Date).getTime()
    let targetTime = new Date(time).getTime()
    let day = 24 * 60 * 60 * 1000
    let delTime = (currentDay + day) - targetTime
    if (0 <= delTime && delTime < day) {
      return '今日' + new Date(time).getHours() + ':' + (new Date(time).getMinutes() < 10 ? '0' + new Date(time).getMinutes() : new Date(time).getMinutes())
    } else if (day <= delTime && delTime < day * 2) {
      return '昨天' + new Date(time).getHours() + ':' + (new Date(time).getMinutes() < 10 ? '0' + new Date(time).getMinutes() : new Date(time).getMinutes())
    } else if (day * 2 <= delTime && delTime < day * 7) {
      return (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
    } else if (day * 7 <= delTime && delTime < day * 14) {
      return '一周前' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
    } else {
      return time
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
    ztlxlb({
      openid: wx.getStorageSync('thirdSession').openid
    }).then((res) => {
      if (res) {

        this.setData({
          navList: [{
            lx: '全部分类',
            id: ''
          }, ...res.data]
        })
      }
    })
    this.setData({
      conList: [],
      page: 1
    })
    this.getCommentList(this.data.curNav)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(111);
    this.data.page++
    this.getCommentList(this.data.curNav, this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: 'e兰茗果',
    }
  }
})