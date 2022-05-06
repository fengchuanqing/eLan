// pages/MerchantCenter/orderManage/index.js
import {
  domain,
  merchantUpdateUserInfo
} from '../../../utils/api.js'
import {
  sjDetail,
  GoodsList,
  hdsplb,
  img,
  getEwm
} from '../../../apis/message.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isByOrder: false,
    inFo: {},
    img,
    domain,
    show5: false,
    show3: false,
    pageSize: 10,
    pageNum: 1,
    orderList: [],
    isReachBottom: true,
    List: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getDp()
  },
  getDp() {
    sjDetail().then(res => {
      // console.log(res);
      if (res.code == 200) {
        this.setData({
          inFo: res.data
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
  },
  // getUser() {
  //   wx.request({
  //     url: merchantUserInfo,
  //     method: 'post',
  //     data: {
  //       account: wx.getStorageSync('userInfo').account || 'zhangxueyou'
  //     },
  //     success: (res) => {
  //       if (res.data.code === 200) {
  //         const formData = res.data.data
  //         this.setData({
  //           userInfo: formData
  //         })
  //       } else {
  //         wx.showToast({
  //           title: res.data.msg,
  //         })
  //       }
  //     }
  //   })
  // },
  getData() {
    hdsplb({
      pageNum: this.data.pageNum,
      order: this.data.isByOrder ? 1 : 2
    }).then(res => {
      if (res.code == 200) {
        let arr = res.data.map(item => {
          if (item.img) {
            item.logo = item.img.split(',')[0]
          }
          if (item.trait) {
            item.traitArr = item.trait.split(',')
          }
          return item
        })
        // arr.map(item => {
        //   item.goodsList[0].trait = item.goodsList[0].trait ? item.goodsList[0].trait.split(',') : []
        //   item.goodsList[0].trait.length > 0 ? item.goodsList[0].trait.splice(item.goodsList[0].trait.length - 1, 1) : []
        // })

        // 分页用
        if (arr.length < 5 || arr.length == 0) {
          // 请求全部 结束
          this.setData({
            isReachBottom: false
          })
        }
        this.setData({
          orderList: [...this.data.orderList, ...arr],
          // List: [...this.data.List, ...arr],
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.data.msg,
        })
      }
    })
  },
  Preservation(e) {
    wx.showLoading({
      title: '图片保存中'
    })
    wx.canvasToTempFilePath({
      canvas: e.currentTarget.dataset.type == 'myStorecavas' ? this.data.myStorecavas : this.data.mycavas, // 使用2D 需要传递的参数
      width: 600,
      height: 640,
      destWidth: 600,
      destHeight: 640,
      fileType: 'jpg',
      quality: 1,
      success: (res) => {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '保存成功',
            })
            // if (e.currentTarget.dataset.type == 'myStorecavas') {
            //   this.updateShare()
            // }
          }
        })
      }
    })
  },
  updateShare() {
    wx.request({
      url: merchantUpdateUserInfo,
      method: 'PUT',
      data: {
        id: wx.getStorageSync('userInfo').id || 1,
        clickNum: this.data.userInfo.clickNum + 1,
        shareNum: this.data.userInfo.shareNum + 1,
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            'userInfo.shareNum': this.data.userInfo.shareNum + 1,
            'userInfo.clickNum': this.data.userInfo.clickNum + 1
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: res.data.msg,
          })
        }
      }
    })
  },
  onClickHide() {
    this.setData({
      show5: false
    })
  },
  OpenHb(e) {
    const item =e.currentTarget.dataset.item
    item.img=item.img.split(',')[0]
    // 商品分享
    this.setData({
      show5: true,
      currentShop: item
    })
    // this.shopCanvas()
    this.getAccessToken(1)
  },
  onShopHide() {
    this.setData({
      show3: false
    })
  },
  OpenShop() {
    // 店铺分享
    this.setData({
      show3: true
    })
    // this.storeCanvas()
    this.getAccessToken(2)
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
  // 商品分享
  shopCanvas() {
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
      this.drawRoundedRect(ctx, 0, 0, canvas.width*2, canvas.height*2, 5)
      this.drawImg(ctx, canvas, _this.data.img + _this.data.currentShop.img, 0, 0, canvas.width, canvas.height / 2)
      ctx.font = "normal 22px '微软雅黑'"
      ctx.fillStyle = '#333'
      ctx.fillText(`【${_this.data.currentShop.name}】`, 20, canvas.height / 2 + 40)
      ctx.font = "normal 16px '微软雅黑'"
      ctx.fillStyle = '#9a9a9a'
      ctx.fillText(_this.data.currentShop.trait, 20, canvas.height / 2 + 75)
      ctx.font = "normal 10px '微软雅黑'"
      ctx.fillStyle = '#666666'
      ctx.fillText('长按或扫一扫打开小程序', 20, canvas.height / 2 + 100)
      _this.drawImg(ctx, canvas, _this.data.ewmImg, canvas.width - 97*2, canvas.height / 2 + 23, 85*2, 85*2)
    })
  },
  storeCanvas() {
    let _this = this
    const query2 = wx.createSelectorQuery()
    query2.select('#storeCanvas').fields({
      node: true,
      size: true
    }).exec((res) => {
      const canvas = res[0].node;
      canvas.width = res[0].width
      canvas.height = res[0].height
      _this.setData({
        myStorecavas: canvas
      })
      const ctx = canvas.getContext('2d');
      this.drawRoundedRect(ctx, 0, 0, canvas.width*2, canvas.height*2, 5)
      this.drawImg(ctx, canvas, _this.data.inFo.dpfm?_this.data.img+_this.data.inFo.dpfm:_this.data.inFo.yhtx, 0, 0, canvas.width, canvas.height / 2) 
      ctx.font = "normal 22px '微软雅黑'"
      ctx.fillStyle = '#333'
      ctx.fillText(`【${_this.data.inFo.full_name}】`, 20, canvas.height / 2 + 40)
      ctx.font = "normal 16px '微软雅黑'"
      ctx.fillStyle = '#9a9a9a'
      ctx.fillText('三品一标|有机化|本地特产', 20, canvas.height / 2 + 75)
      ctx.font = "normal 10px '微软雅黑'"
      ctx.fillStyle = '#666666'
      ctx.fillText('长按或扫一扫打开小程序', 20, canvas.height / 2 + 100)
      _this.drawImg(ctx, canvas, _this.data.ewmImg, canvas.width - 97*2, canvas.height / 2 + 23, 85*2, 85*2)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  getAccessToken(num) {
    // 1商品分享 2店铺分享
    let path = 'specialZone/pages/storeDetail/storeDetail'
    let id = this.data.inFo.storeId
    if (num == 1) {
      path = 'specialZone/pages/shopDetail/shopDetail'
      id = this.data.currentShop.id
    }
    console.log(id);
    getEwm({
      path,
      scene: 'id=' + id
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          ewmImg: res.msg
        })
        if (num == 1) {
          // 商品分享
          this.shopCanvas()
        } else {
          // 2店铺分享
          this.storeCanvas()
        }
      } else {

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getUser()
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
      this.getData()
    }
  },
  ByOrder() {
    let that = this
    that.setData({
      isByOrder: !that.data.isByOrder,
      orderList: [],
      pageNum: 1
    })
    that.getData()
    if (that.data.isByOrder) {
      // let arr = that.data.orderList.sort(that.compare("xds"));
      // 原文链接：https://blog.csdn.net/xiaobing_hope/article/details/68638706
      // 0默认 1降序
      // that.setData({
      //   orderList: JSON.parse(JSON.stringify(that.data.orderList.sort(that.sortBy("dealed", -1)).reverse()))
      // })
    } else {
      // that.setData({
      //   orderList: JSON.parse(JSON.stringify(that.data.List))
      // })
    }
  },
  compare(property) {
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2; // 升序
    }
  },
  //数组根据数组对象中的某个属性值进行排序的方法 
  //使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
  //@param attr 排序的属性 如number属性
  //@param rev true表示升序排列，false降序排序
  sortBy(attr, rev) {
    //第二个参数没有传递 默认升序排列
    if (rev == undefined) {
      rev = 1;
    } else {
      rev = (rev) ? 1 : -1;
    }
    return function (a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '兰农新零售',
      path: '/page/user?id=123'
    }
  }
})