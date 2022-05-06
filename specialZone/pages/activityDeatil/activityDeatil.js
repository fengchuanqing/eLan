// pages/Commodity/commodityDetail/commodityDetail.js

import {
  areaList
} from "../../../utils/area-data"
import {Hdxq,Sjgzm,getEwm,img} from '../../../apis/specialZone.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomLift:getApp().globalData.bottomLift,
    domain:img,
    show3: false,
    show5: false,
    mycavas: '',
    form: {},
    imgList: []
  },
  getAccessToken() {
    getEwm(
      {
        path: 'specialZone/pages/activityDeatil/activityDeatil',
        scene:'id='+this.data._id
      })
    .then( (res) => {
        if (res.code===200) {
          console.log(res);
          this.setData({
            ewmImg: res.msg
          })
        }
      }
    )
  },
  onCancel() {
    this.setData({
      show3: false,
    })
  },
  onClickHide() {
    this.setData({
      show5: false
    })
  },
  GoPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.form.telephone
    })
  },
  GoCopy() {
    wx.setClipboardData({
      data: this.data.form.vx,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  getWx(){
    Sjgzm({
      id:this.data.form.store_id
    }).then((res)=>{
      console.log(res);
      if(res){
        this.setData({
          mobile:res?.data.mobile||'暂无',
          wechat:res?.data.wechat||'暂无'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        _id: options.id
      })
      this.getData()
    }
    console.log(options);
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      let id = scene.split('=')[1]
      this.setData({
        _id: id
      })
      this.getData()
    }
    this.getAccessToken()
  },
  getData() {
    Hdxq({id:this.data._id})
     .then ((res) => {
        if (res) {
          const formData = res.data
          // const regionCode = formData.address ? formData.address.split(',') : [];
          // const province = areaList.province_list[regionCode[0]]
          // const city = areaList.city_list[regionCode[1]]
          // const county = areaList.county_list[regionCode[2]]
          // formData.address = province + city + county
          this.setData({
            form: formData,
            imgList: formData.img_url && formData.img_url.split(',')
          })
          this.getWx()
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    )
  },
  OpenHb() {
    if(!this.data.ewmImg){
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(()=>{
        wx.hideLoading({
          success: (res) => {
            this.setData({
              show5: true
            })
            this.drawCanvas()
          },
        })
      },3000)
      return
    }
    this.setData({
      show5: true
    })
    this.drawCanvas()
  },
  Preservation(e) {
    wx.showLoading({
      title: '图片保存中'
    })
    console.log(this.data.mycavas)
    wx.canvasToTempFilePath({
      canvas: this.data.mycavas, // 使用2D 需要传递的参数
      width: 600,
      height: 640,
      destWidth: 600,
      destHeight: 640,
      fileType: 'jpg',
      quality: 1,
      success(res) {
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      }
    })
  },
  OpenWeixin() {
    this.setData({
      show3: true
    })
  },
  Godetail(e) {
    console.log(e.currentTarget.dataset)
    const {
      beginTime
    } = this.data.form
    if(beginTime){
      const myDate = new Date();
      var strtime = beginTime.replace("/-/g", "/"); //时间转换
      var date1 = new Date(strtime);
      if (date1 > myDate) {
        wx.showModal({
          title: '提示',
          content: '当前活动还未开始',
          showCancel: false
        })
        return
      }
    }
    
    let url = e.currentTarget.dataset.url
    if (e.currentTarget.dataset.index == '1') {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  drawImg(ctx, canvas, img, dx, dy, dwidth, dheight) {
    const image = canvas.createImage()
    image.src = img
    image.onload = function () {
      ctx.drawImage(image, dx, dy, dwidth, dheight)
    }
  },
  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    ctx.lineTo(width - radius + x, y);
    ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    ctx.lineTo(width + x, height + y - radius);
    ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    ctx.lineTo(radius + x, height + y);
    ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    ctx.closePath();
    ctx.fillStyle = '#fff'
    ctx.fill()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  drawCanvas() {
    let _this = this
    const query = wx.createSelectorQuery()
    query.select('#shopCanvas').fields({
      node: true,
      size: true
    }).exec((res) => {
      const canvas = res[0].node;
      canvas.width = res[0].width
      canvas.height = res[0].height
      _this.setData({
        mycavas: canvas
      })
      const ctx = canvas.getContext('2d');
      _this.drawRoundedRect(ctx, 0, 0, canvas.width*2, canvas.height*2, 5)
      _this.drawImg(ctx, canvas, _this.data.domain + _this.data.imgList[0], 0, 0, canvas.width, canvas.height/2)
      ctx.font = "normal 22px '微软雅黑'"
      ctx.fillStyle = '#333'
      ctx.fillText(_this.data.form.activity_name, 20, canvas.height / 2 +40)
      // ctx.font = "normal 8px '微软雅黑'"
      // ctx.fillStyle = '#9a9a9a'
      // ctx.fillText('三品一标|有机化|本地特产', 10, canvas.height / 2 + 40)
      ctx.font = "normal 10px '微软雅黑'"
      ctx.fillStyle = '#666666'
      ctx.fillText('长按或扫一扫打开小程序', 20, canvas.height / 2 + 70)
      _this.drawImg(ctx, canvas, _this.data.ewmImg, canvas.width - 97*2, canvas.height / 2 + 23, 85*2, 85*2)
    })
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