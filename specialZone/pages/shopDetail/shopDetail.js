import {
  Spxq,
  Sjgzm,
  getEwm,
  addShopCar,
  img
} from '../../../apis/specialZone.js'
import {
  checkSession
} from '../../../utils/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: img,
    show3: false,
    show5: false,
    mycavas: '',
    form: {},
    imgList: [],
    shopShow:false,
    curGg:0,
    cartType:'',
    bottomLift:getApp().globalData.bottomLift
  },
  addCart(){
    const params={
      goodsId:this.data._id,
      goodsSizeId: this.data.form.goodsSizeList[this.data.curGg].id,
      storeId:this.data.form.store_id,
      openid:wx.getStorageSync('thirdSession').openid,
      num:this.data.goodsNum
    }
    addShopCar(params).then(res=>{
      if(res){
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  onNumChange(e){
    this.setData({
      goodsNum:e.detail
    })
  },
  changeGg(e){
    const index = e.currentTarget.dataset.id
    // const goodsSizeList = this.data.form.goodsSizeList
    // goodsSizeList[index]
    this.setData({
      curGg:index,
      goodsNum:1
    })
  },
  showPupop(e){
    this.setData({
      shopShow:true,
      cartType:e.currentTarget.dataset.type,
      goodsNum:1
    })
  },
  onClose(){
    this.setData({
      shopShow:false
    })
  },
  getAccessToken() {
    getEwm({
        path: 'specialZone/pages/shopDetail/shopDetail',
        scene: 'id=' + this.data._id
      })
      .then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.setData({
            ewmImg: res.msg
          })          
        }
      })
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
      phoneNumber: this.data.mobile
    })
  },
  GoCopy() {
    wx.setClipboardData({
      data: this.data.wechat,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('thirdSession')) {
      checkSession()
    }
    if (options.id) {
      this.setData({
        _id: options.id
      })
      this.getData()
    }
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
    Spxq({
      id: this.data._id
    }).then((res) => {
      if (res) {
        const formData = res.data
        this.setData({
          form: formData,
          imgList: formData.img && formData.img.split(',')
        })
        this.getWx()
      }
    })



  },
  getWx() {
    Sjgzm({
      id: this.data.form.store_id
    }).then((res) => {
      console.log(res);
      if (res) {
        this.setData({
          mobile: res?.data.mobile || '暂无',
          wechat: res?.data.wechat || '暂无'
        })
      }
    })
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
    console.log(12222);
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
        console.log(res);
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
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
      validBeginTime
    } = this.data.form
    if (validBeginTime) {
      const myDate = new Date();
      var strtime = validBeginTime.replace("/-/g", "/"); //时间转换
      var date1 = new Date(strtime);
      if (date1 > myDate) {
        wx.showModal({
          title: '提示',
          content: '当前商品还未开始出售',
          showCancel: false
        })
        return
      }
    }

    let url = e.currentTarget.dataset.url
    if (e.currentTarget.dataset.index == '1') {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  goCart(){
    wx.navigateTo({
      url: '/specialZone/pages/shopCart/shopCart',
    })
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
    console.log(_this.data.form);
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
      console.log(_this.data.mycavas);
      const ctx = canvas.getContext('2d');
      _this.drawRoundedRect(ctx, 0, 0, canvas.width*2, canvas.height*2, 5)
      _this.drawImg(ctx, canvas, _this.data.domain + _this.data.imgList[0], 0, 0, canvas.width, canvas.height / 2)
      ctx.font = "normal 22px '微软雅黑'"
      ctx.fillStyle = '#333'
      ctx.fillText(_this.data.form.name, 20, canvas.height / 2 + 40)
      ctx.font = "normal 16px '微软雅黑'"
      ctx.fillStyle = '#9a9a9a'
      ctx.fillText(_this.data.form.trait, 20, canvas.height / 2 + 75)
      ctx.font = "normal 10px '微软雅黑'"
      ctx.fillStyle = '#666666'
      ctx.fillText('长按或扫一扫打开小程序', 20, canvas.height / 2 + 100)
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