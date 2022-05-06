// pages/countryside/add/add.js

import {
  tyxcUpload,
  xqpl,
  img
} from '../../../apis/tycx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curLb: 0,
    conNum: 0,
    message: '',
    titVal: '',
    fileList: [],
    img,
    errMessage: '',
  },
  checked(e) {
    console.log(e.detail);
    if (e.detail.cursor>15) {
      this.setData({
        errMessage:'15字以内'
      })
    } else {
      this.setData({
        errMessage: ''
      })
    }

  },
  beforeRead(event) {
    console.log(event);
    const {
      file,
      callback
    } = event.detail;
    if (this.data.curLb == 0) {
      callback(file.type === 'image');
    } else {

      callback(file.type === 'video');
    }
  },
  afterReadNjz(event) {
    console.log(event);
    const {
      file
    } = event.detail;
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 3000);
    if (file.size > 524288000) {
      wx.showToast({
        title: '文件过大',
        icon: 'error'
      })
    } else {
      wx.uploadFile({
        url: tyxcUpload,
        filePath: file.url,
        name: 'file',
        formData: {},
        success: (res) => {
          console.log(res);
          console.log(JSON.parse(res.data).fileName);
          if (JSON.parse(res.data).code === 200) {
            that.setData({
              fileList: [...that.data.fileList, {
                url: img + JSON.parse(res.data).fileName,
                deletable: true
              }]
            });
            wx.hideLoading()
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
          }
        },
        fail: (res) => {
          console.log(res);
          if (res) {
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  delete(e) {
    console.log(e);
    let arr = this.data.fileList
    arr.splice(e.detail.index, 1)
    this.setData({
      fileList: arr
    })
  },
  navTo() {
    let {
      curLb,
      message,
      titVal,
      fileList,
      re_fileList,
      errMessage
    } = this.data
    if(errMessage){
    wx.showToast({
      title: '标题应在15字以内',
    icon:'error'
    })
    return
    }
  
    if (titVal != '' || message != '' || fileList.length > 0) {
      let data = {
        openid: wx.getStorageSync('thirdSession').openid,
        lb: curLb ? '视频' : '图片',
        bt: titVal,
        nr: message,
        dz: !this.data.release ? fileList.reduce((acc, cur) => acc.concat(cur.url), []).join() : fileList.length > 0 ? fileList.reduce((acc, cur) => acc.concat(cur.url), []).join() + ',' + re_fileList : re_fileList,
      }
      wx.setStorageSync('tyxcData', data)
      if (this.data.release) {
        wx.navigateTo({
          url: '/pages/countryside/addFinish/addFinish?lx=' + this.data.titleLx,
        })
      } else {
        wx.navigateTo({
          url: '/pages/countryside/addFinish/addFinish',
        })

      }

    } else {
      wx.showToast({
        title: '请至少填写一种内容',
        icon: 'none'
      })
    }


  },
  message(id) {
    xqpl({
      id,
      pageNum: 1,
      openid: wx.getStorageSync('thirdSession').openid
    }).then((res) => {
      console.log(res);
      if (res) {
        this.setData({
          curLb: res.data.lb == '图片' ? 0 : 1,
          titVal: res.data.bt,
          message: res.data.nr,
          fileList: res.data.dz ? res.data.dz.split(',').reduce((acc, cur) => acc.concat({
            url: cur
          }), []) : [],
          re_fileList: res.data.dz ? res.data.dz.split(',').reduce((acc, cur) => acc.concat({
            url: cur
          }), []) : '',
          titleLx: res.data.ztlx
        })
        console.log(this.data.fileList);
        console.log(this.data.re_fileList);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        release: true
      })
      this.message(Number(options.id))
    }
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
  bindText(e) {
    var t_text = e.detail.length;
    if (t_text >= 100) {
      e.detail = e.detail.substr(0, 100)
      t_text = 100
    }
    this.setData({
      conNum: t_text,
      message: e.detail
    })
  },
  changeLb(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({
      curLb: idx
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