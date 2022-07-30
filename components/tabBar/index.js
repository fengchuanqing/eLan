// pages/Components/tabBar/index.js
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    tabOfficerActive: {
      type: Boolean,
      defalut: true
    },
    tabWorkbenchActive: {
      type: Boolean,
      defalut: false
    }
  },
  data: {
    show: false,
    isIPhoneXSeries:getApp().globalData.isIPhoneXSeries,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  methods: {
    onClickShow() {
      // this.setData({
      //   show: true
      // });
      wx.navigateTo({
        url: '/shop/pages/orderManage/index',
      })
    },
    onClickHide() {
      this.setData({
        show: false
      });
    },
    Preservation() {
      wx.showLoading({
        title: '图片保存中'
      })
      wx.canvasToTempFilePath({
        canvas: this.data.mycavas, // 使用2D 需要传递的参数
        success(res) {
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
    drawImg(ctx,canvas,img,dx,dy,dwidth,dheight){
      const image = canvas.createImage()
      image.src = img
      image.onload=function(){
        ctx.drawImage(image,dx,dy,dwidth,dheight)
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
      ctx.fillStyle='#fff'
      ctx.fill()
    },
  },


  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ready: function () {
    // let _this=this
    // const query = wx.createSelectorQuery().in(this)
    // query.select('#shopCanvas').fields({
    //   node: true,
    //   size: true
    // }).exec((res) => {
    //   console.log(res)
    //   const canvas = res[0].node;
    //   canvas.width = res[0].width
    //   canvas.height = res[0].height
    //   _this.setData({
    //     mycavas:canvas
    //   })
    //   const ctx = canvas.getContext('2d');
    //   this.drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 5)
    //   this.drawImg(ctx, canvas, '/shop/static/icons/home/shangpinimg1.png', 0, 0, canvas.width, canvas.height / 2)
    //   ctx.font = "normal 12px '微软雅黑'"
    //   ctx.fillStyle = '#333'
    //   ctx.fillText('【xxx的店铺】', 10, canvas.height / 2 + 20)
    //   ctx.font = "normal 8px '微软雅黑'"
    //   ctx.fillStyle = '#9a9a9a'
    //   ctx.fillText('三品一标|有机化|本地特产', 10, canvas.height / 2 + 40)
    //   ctx.font = "normal 6px '微软雅黑'"
    //   ctx.fillStyle = '#666666'
    //   ctx.fillText('长按或扫一扫打开小程序', 10, canvas.height / 2 + 50)
    //   this.drawImg(ctx, canvas, '/shop/static/icons/me/xcx-ewm.png', canvas.width - 85, canvas.height / 2+3, 83, 83)
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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
  onShareAppMessage: function (res) {

  }
})