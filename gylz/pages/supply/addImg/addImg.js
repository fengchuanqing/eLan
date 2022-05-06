import {
  domain,
  uploadFile
} from "../../../../apis/index.js"
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain:domain+'/bsApi',
    imgList: [],
    video_url:'',
    showkelong: false,
    kelong: {
      top: 0,
      left: '',
      id: '2',
      nameIcon: '',
    },
    replace: {
      name: '',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('tp')){
      this.setData({
        imgList:wx.getStorageSync('tp').split(',')
      })
    }
    if(wx.getStorageSync('sp')){
      this.setData({
        video_url:wx.getStorageSync('sp')
      })
    }
  },
  delImg(e) {
    const num = e.currentTarget.dataset.idx;
    const {
      imgList
    } = this.data
    imgList.splice(num, 1)
    this.setData({
      imgList: imgList,
    })
  },
  save(){
    const {
      imgList,
      video_url
    } = this.data
    if (!video_url) {
      Toast('请上传视频!')
      return
    }
    if (imgList.length===0) {
      Toast('请上传图片!')
      return
    }
    wx.setStorageSync('tp', imgList.join(','))
    wx.setStorageSync('sp', video_url)
    wx.navigateBack({
      delta: 1,
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
  chooseVideo(){
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success:(res)=> {
        console.log(res)
        if(res.size>6*1024*1024){
          wx.showToast({
            icon:'none',
            title: '视频不得超过6M',
          })
          return
        }
        wx.showLoading({
          title: '加载中...',
        })
        wx.uploadFile({
          url: uploadFile,
          filePath: res.tempFilePath,
          name: 'file',
          formData: {},
          success:(res)=> {
            const data = JSON.parse(res.data)
            this.setData({
              video_url: data.fileName
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  chooseImg() {
    let that = this;
    let pics = this.data.imgList;
    wx.showLoading({
      title: '加载中...',
    })
    wx.chooseImage({
      count: 6 - pics.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        for (const i in tempFilePaths) {
          wx.uploadFile({
            url: uploadFile,
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {},
            success:(res)=> {
              const data = JSON.parse(res.data)
              pics.push(data.fileName);
              that.setData({
                imgList: pics
              })
            }
          })
        }
        wx.hideLoading()
      },
      fail(){
        wx.hideLoading()
      }
    })
  },
  dragStart: function (e) {
    var that = this
    var kelong = that.data.kelong
    var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.uploadBox').boundingClientRect(function (rect) {
      kelong.top = e.changedTouches[0].clientY - rect.top
      kelong.left = e.changedTouches[0].clientX - rect.left
      kelong.nameIcon = that.data.imgList[i]
      // console.log("dragStart", kelong.top,kelong.left)
      that.setData({
        kelong: kelong,
        showkelong: true
      })
    }).exec();
  },
  dragMove: function (e) {
    var that = this
    // var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    var kelong = that.data.kelong
    // var listnum = that.data.list.length
    // var list = that.data.list
    query.select('.uploadBox').boundingClientRect(function (rect) {
      kelong.top = e.changedTouches[0].clientY - rect.top
      kelong.left = e.changedTouches[0].clientX - rect.left
      // console.log("dragMove",kelong.left,rect.width)
      if (kelong.top < 77) {
        kelong.top = 77
      } else if (kelong.top > rect.height) {
        // console.log("dragMove",kelong.top)
        kelong.top = rect.height
      }
      if (kelong.left < 16) {
        kelong.left = 16
      } else if (kelong.left > (rect.width - 85)) {
        // console.log("dragMove",kelong.top)
        kelong.left = rect.width - 85
      }
      that.setData({
        kelong: kelong,
      })
    }).exec();
  },
  dragEnd: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    var kelong = that.data.kelong
    // var listnum = that.data.list.length
    var list = that.data.imgList
    query.select('.uploadBox').boundingClientRect(function (rect) {
      kelong.top = e.changedTouches[0].clientY - rect.top
      kelong.left = (e.changedTouches[0].clientX - rect.left) > 300 ? 290 : e.changedTouches[0].clientX - rect.left
      // console.log("dragEnd", kelong.left,kelong.top)
      var targetY = parseInt(kelong.top / 75)
      var targetX = parseInt(kelong.left / 75)
      var replace = that.data.replace
      // console.log(targetY,targetX);
      if (targetY >= 0) {
        // 互换位置
        // replace.name = list[target].name
        // list[target].name = list[i].name
        // list[i].name = replace.name

        // 位置下沿
        replace = list.splice(i, 1);
        if (replace.length > 0) {
          list.splice(targetX, 0, replace[0]);
        }
      }
      that.setData({
        imgList: list,
        showkelong: false
      })
    }).exec();
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