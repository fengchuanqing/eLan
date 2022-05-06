// pages/countryside/detail/detail.js
import {
  pl,
  xqpl,
  dz,
  dzsx
} from '../../../apis/tycx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: 0,
    show: false,
    comment: '',
    page: 1,
    plList: [],
    hfdj:1,
  },
  answer() {
    this.setData({
      show: true,
      zplid: null,
      plsjId: null,
      hfdj:1,
      comment: '',
      hint: '写回复',
    })
  },
  close() {
    this.setData({
      show: false,
      comment: '',
    })
  },
  send() {
    if (this.data.comment) {
      pl({
        openid: wx.getStorageSync('thirdSession').openid,
        hfnr: this.data.comment,
        tzId: this.data.curId,
        plsjId: this.data?.plsjId || '',
        zplId: this.data?.zplid || '',
      }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          if(this.data.hfdj==2){
            dzsx({
              id: this.data.curId,
              openid: wx.getStorageSync('thirdSession').openid,
              zplId: this.data.zplid,
            }).then((res) => {
              if (res.code == 200) {
                console.log(this.data.index);
                let fpl = 'plList[' + this.data.index + '].fpl'
                this.setData({
                  [fpl]: res.data.fpl,
                })
              }
            })
          }else{
          res.data.sj = this.changeTime(res.data.sj)
          this.setData({
            plList: [res.data, ...this.data.plList]
          })
          xqpl({
            id: this.data.curId,
            pageNum: 1,
            openid: wx.getStorageSync('thirdSession').openid
          }).then((res) => {
            if (res) {
              let pls = 'plData.pls'
              this.setData({
                [pls]: res.data.pls
              })
            }
          })  }
          // for (var i = 1; i < this.data.page; i++) {
          //   arr.push(xqpl({
          //     id: this.data.curId,
          //     pageNum:i,
          //     openid: wx.getStorageSync('thirdSession').openid
          //   }))
          // }
          // Promise.all(arr).then((res)=>{
          //   console.log(res);
          // })

        }
      })
    } else {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      })
    }
  },
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.list // 需要预览的图片http链接列表
    })
  },
  changeTime(t) {
    let res= wx.getSystemInfoSync()
    let time;
    var isiOS =res.system.match(/ios/i); //ios终端
    if(isiOS){
       time=t.replace(/-/g,'/')
    }else{
       time= t
    }
    console.log(time);
    let currentDay = new Date((new Date).toLocaleDateString()).getTime()
    let cTime = (new Date).getTime()
    let targetTime = new Date(time).getTime()
    let min = 60 * 1000
    let hour = 60 * 60 * 1000
    let day = 24 * 60 * 60 * 1000
    let delTime = (currentDay + day) - targetTime
    console.log(cTime+'---------'+targetTime+'-------'+(cTime - targetTime));
    if ((cTime - targetTime)>=0 && (cTime - targetTime) < min) {
      console.log('秒'+(cTime - targetTime));
      return ((cTime - targetTime) / 1000).toFixed(0) + '秒之前'
    } else if (min <= (cTime - targetTime) && (cTime - targetTime) < hour) {
      console.log('分'+(cTime - targetTime));
      return ((cTime - targetTime) / min).toFixed(0) + '分钟之前'
    } else if (hour <= (cTime - targetTime) && (cTime - targetTime) < day && delTime < day) {
      return ((cTime - targetTime) / hour).toFixed(0) + '小时之前'
    } else if (day <= delTime && delTime < day * 2) {
      return '昨天' + new Date(time).getHours() + ':' +(new Date(time).getMinutes()<10? '0'+new Date(time).getMinutes():new Date(time).getMinutes())
    } else if (day * 2 <= delTime && delTime < day * 7) {
      return (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
    } else if (day * 7 <= delTime && delTime < day * 14) {
      return '一周前' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
    } else {
      return time
    }
  },
  message(pageNum = 1, key = true) {
    if (this.data.plList.length >= (pageNum - 1) * 5) {
      xqpl({
        id: this.data.curId,
        pageNum,
        openid: wx.getStorageSync('thirdSession').openid
      }).then((res) => {
        console.log(res);
        if (res) {
          res.data.pl.map((item) => {
            item.sj = this.changeTime(item.sj)
          })
          if (key) {
            this.setData({
              plData: res.data,
              list: res.data.dz ? res.data.dz.split(',') : res.data.dz,
              plList: res.data.pl
            })
          } else {
            this.setData({
              plList: [...this.data.plList, ...res.data.pl]
            })
          }
        }
      })
    }
  },
  bindzan() {
    dz({
      openid: wx.getStorageSync('thirdSession').openid,
      tzId: this.data.curId
    }).then((res) => {
      if (res.code == 200) {
        xqpl({
          id: this.data.curId,
          pageNum: 1,
          openid: wx.getStorageSync('thirdSession').openid
        }).then((res) => {
          if (res) {
            let dzs = 'plData.dzs'
            let sfdz = 'plData.sfdz'
            this.setData({
              [dzs]: res.data.dzs,
              [sfdz]: res.data.sfdz
            })
          }
        })
      }
    })
  },
  bindzanpl(e) {
    dz({
      openid: wx.getStorageSync('thirdSession').openid,
      plhfId: e.currentTarget.dataset.id
    }).then((res) => {
      if (res.code == 200) {
        dzsx({
          id: this.data.curId,
          openid: wx.getStorageSync('thirdSession').openid,
          zplId: e.currentTarget.dataset.id
        }).then((res) => {
          if (res.code == 200) {
            let dzs = 'plList[' + e.currentTarget.dataset.index + '].dzs'
            let sfdz = 'plList[' + e.currentTarget.dataset.index + '].sfdz'
            this.setData({
              [sfdz]: res.data.sfdz,
              [dzs]: res.data.dzs
            })
          }
        })
      }
    })
  },
  reply(e) {
    console.log(e.currentTarget.dataset);
    if(e.currentTarget.dataset.hfdj==2&&e.currentTarget.dataset.lj==3){
      console.log(2222);
      this.setData({
        show: true,
        hfdj:e.currentTarget.dataset.hfdj,
        zplid: e.currentTarget.dataset.item.id,
        index:e.currentTarget.dataset.index,
        plsjId: e.currentTarget.dataset.it.id,
        hint: `回复:${e.currentTarget.dataset.it.mc}`
      })
    }else{
      this.setData({
        show: true,
        hfdj:e.currentTarget.dataset.hfdj,
        zplid: e.currentTarget.dataset.item.id,
        index:e.currentTarget.dataset.index,
        plsjId: e.currentTarget.dataset.item.id,
        hint: `回复:${e.currentTarget.dataset.item.xm?e.currentTarget.dataset.item.xm:e.currentTarget.dataset.item.nc}`
      })
    }
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(this.changeTime('2022-01-07 18:02:31'));
    this.setData({
      curId: options.id
    })
    this.message()
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
    this.data.page++
    this.message(this.data.page, false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'e兰茗果',
      path: '/pages/countryside/detail/detail?id=' + this.data.curId,
    }
  }
})