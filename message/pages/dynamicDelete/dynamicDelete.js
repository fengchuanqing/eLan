// message/pages/dynamicDelete/dynamicDelete.js
import Dialog from '@vant/weapp/dialog/dialog';
import {
  wdtz,
  sctz
} from '../../../apis/tycx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    result: [],
    state: 1,
    list: [],
    page: 1,
    endPage: ''
  },
  delete() {
    if (this.data.result.length > 0) {
      Dialog.confirm({
          message: '是否确认删除',
        })
        .then(() => {
          let arr = []
          this.data.result.map((item) => {
            arr.push(sctz({
              zt: Number(item)
            }))
          })
          Promise.all(arr).then((res) => {
            console.log(res);
            if (res[0].code == 200) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                success: () => {
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/countryside/index/index',
                      success: function () {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
                    })
                  }, 2000)
                }
              })

            }
          })
        })
        .catch(() => {
          // on cancel
        });
    } else {
      wx.showToast({
        title: '请至少选择一个删除',
        icon: 'none'
      })
    }
  },
  cansel() {
    wx.navigateBack({
      delta: 1,
    })
  },
  select(zt, pageNum = 1,key=true) {
    if (this.data.list.length >= (pageNum - 1) * 5) {
      wdtz({
        openid: wx.getStorageSync('thirdSession').openid,
        pageNum,
        zt,
      }).then((res) => {
        if (res&&key==true) {
          console.log(res);
          res.data.map((item) => {
            item.fbsj = this.changeTime(item.fbsj)
            item.id = item.id.toString()
          })
          this.setData({
            list: [...this.data.list, ...res.data],
          })
        }
      })
    } else {
      this.setData({
        endPage: pageNum
      })
    }
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
    let currentDay = new Date((new Date).toLocaleDateString()).getTime()
    let cTime = (new Date).getTime()
    let targetTime = new Date(time).getTime()
    let day = 24 * 60 * 60 * 1000
    let delTime = (currentDay + day) - targetTime
    if (0 <= delTime && delTime < day) {
      return '今日' + new Date(time).getHours() + ':' +(new Date(time).getMinutes()<10? '0'+new Date(time).getMinutes():new Date(time).getMinutes())
    } else if (day <= delTime && delTime < day * 2) {
      return '昨天' + new Date(time).getHours() + ':' + (new Date(time).getMinutes()<10? '0'+new Date(time).getMinutes():new Date(time).getMinutes())
    } else if (day * 2 <= delTime && delTime < day * 7) {
      return (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
    } else if (day * 7 <= delTime && delTime < day * 14) {
      return '一周前' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
    } else {
      return time
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      zt: options.id
    })
    this.select(Number(options.id))
  },
  onChange(event) {
    if (event.detail) {
      this.setData({
        list: [],
        result: []
      })
      let arr = []
      for (var i = 1; i < 999; i++) {
        this.select(this.data.zt, i,false)
        arr.push(wdtz({
          openid: wx.getStorageSync('thirdSession').openid,
          pageNum: i,
          zt: this.data.zt,
        }))
        console.log(i);
        if (i == this.data.endPage) break
      }
      Promise.all(arr).then((res) => {
        console.log(res.reduce((acc, cur) => acc.concat(cur.data),[]));
        console.log(res.reduce((acc, cur) => acc.concat(cur.data),[]).reduce((acc, cur) => acc.concat(cur.id), []));
        this.setData({
          list: res.reduce((acc, cur) => acc.concat(cur.data),[]),
          checked: event.detail,
          result: res.reduce((acc, cur) => acc.concat(cur.data),[]).reduce((acc, cur) => acc.concat(cur.id.toString()), [])
        });
      })




    } else {
      this.setData({
        checked: event.detail,
        result: []
      });
    }

  },
  onChange2(event) {
    this.setData({
      result: event.detail,
    });
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
    this.data.page++
    this.select(this.data.active, this.data.page)
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