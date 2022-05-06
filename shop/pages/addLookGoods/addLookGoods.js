import {
  domain,
  upload,
  updateLookGoods
} from '../../../utils/api.js'
import {
  uploadFile,
  khxq,
  img,
  xgkh,
  xzcjkh
} from '../../../apis/message.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    domain,
    img,
    name: '',
    message: '',
    type: '视频',
    typeColumns: ['视频', '图片'],
    typeShow: false,
    typeIndex: 0,
    order_id: '',
    shopCoverImg: '',
    videoUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        order_id: options.id
      })
      this.getData()
    }
  },
  formSubmit() {
    this.setData({
      name: this.data.name.replace(/^\s*/, ''),
    })
    if (!this.data.name) {
      wx.showToast({
        icon: 'error',
        title: '名称不可为空',
      })
      return
    }
    if (this.data.order_id) {
      xgkh({
        name: this.data.name,
        message: this.data.message,
        type: this.data.typeIndex,
        url: this.data.typeIndex === 0 ? this.data.videoUrl : this.data.shopCoverImg,
        id: this.data.order_id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: res.msg,
          })
        }
      })
      // wx.request({
      //   url: updateLookGoods,
      //   method: 'put',
      //   data: {
      //     name: this.data.name,
      //     message: this.data.message,
      //     type: this.data.typeIndex,
      //     url: this.data.typeIndex === 0 ? this.data.videoUrl : this.data.shopCoverImg,
      //     id: this.data.order_id
      //   },
      //   success: (res) => {
      //     if (res.data.code == 200) {
      //       wx.showToast({
      //         title: res.data.msg,
      //       })
      //       setTimeout(() => {
      //         wx.navigateBack({
      //           delta: 1
      //         })
      //       }, 1500)
      //     } else {
      //       wx.showToast({
      //         icon: 'error',
      //         title: res.data.msg,
      //       })
      //     }
      //   }
      // })
    } else {
      // 新增
      xzcjkh({
        name: this.data.name,
        message: this.data.message,
        type: this.data.typeIndex, //视频0图片1
        url: this.data.typeIndex === 0 ? this.data.videoUrl : this.data.shopCoverImg,
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {}
        wx.showToast({
          icon: '',
          title: res.msg,
        })
      })
      // wx.request({
      //   url: updateLookGoods,
      //   method: 'post',
      //   data: {
      //     name: this.data.name,
      //     message: this.data.message,
      //     type: this.data.typeIndex,
      //     url: this.data.typeIndex === 0 ? this.data.videoUrl : this.data.shopCoverImg,
      //     storeId: wx.getStorageSync('userInfo').id || 1
      //   },
      //   success: (res) => {
      //     if (res.data.code == 200) {
      //       wx.showToast({
      //         title: res.data.msg,
      //       })
      //       setTimeout(()=>{
      //         wx.navigateBack({
      //           delta: 1
      //         })
      //       },1500)
      //     } else {
      //       wx.showToast({
      //         icon: 'error',
      //         title: res.data.msg,
      //       })
      //     }
      //   }
      // })
    }

  },
  getData() {
    khxq({
      id: this.data.order_id
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          name: res.data.name,
          message: res.data.message,
          typeIndex: res.data.type,
          type: this.data.typeColumns[Number(res.data.type)]
        })
        if (res.data.type === '0') {
          this.setData({
            videoUrl: res.url
          })
        } else {
          this.setData({
            shopCoverImg: res.url
          })
        }
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
    // wx.request({
    //   url: updateLookGoods + this.data.order_id,
    //   method: 'get',
    //   success: (res) => {
    //     if (res.data.code == 200) {
    //       this.setData({
    //         name: res.data.data.name,
    //         message: res.data.data.message,
    //         typeIndex: res.data.data.type,
    //         type: this.data.typeColumns[Number(res.data.data.type)]
    //       })
    //       if (res.data.data.type === '0') {
    //         this.setData({
    //           videoUrl: res.data.data.url
    //         })
    //       } else {
    //         this.setData({
    //           shopCoverImg: res.data.data.url
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         icon: 'error',
    //         title: res.data.msg,
    //       })
    //     }
    //   }
    // })
  },
  OpenImgUpload() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '上传中...',
        })
        this.uploadImg(tempFilePaths[0], 'img')
      }
    })
  },
  uploadImg(data, type) {
    wx.uploadFile({
      url: uploadFile,
      filePath: data,
      name: 'file',
      formData: {},
      success: (res) => {
        const data = JSON.parse(res.data)
        wx.hideLoading()
        if (type === 'img') {
          this.setData({
            shopCoverImg: data.fileName
          })
        } else {
          this.setData({
            videoUrl: data.fileName
          })
        }
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  OpenVideoUpload() {
    wx.chooseVideo({
      sourceType: ['album'],
      maxDuration: 60,
      success: (res) => {
        console.log(res)
        if (res.size > 1024 * 1024 * 10) {
          wx.showModal({
            title: '提示',
            content: '文件大小不能超过10M',
            showCancel: false
          })
          return
        }
        wx.showLoading({
          title: '上传中',
        })
        this.uploadImg(res.tempFilePath)
      }
    })
  },
  onTypeShow() {
    this.setData({
      typeShow: true
    })
  },
  onCancel() {
    this.setData({
      typeShow: false
    })
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      typeShow: false,
      type: value,
      typeIndex: index.toString(),
      shopCoverImg: '',
      videoUrl: ''
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