import {
  checkSession
} from '../../../utils/login'
import {
  Dpxq,
  img,
  Zzfxs,
  Zzlll,
  goodsType
} from '../../../apis/specialZone.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: img,
    active: 0,
    pageNum: 1,
    pageSize: 5,
    isReachBottom: true,
    activityList: [],
    shopList: [],
    searchVal: null,
    navTitle: '杨梅',
    selectValue: 0,
    goodsType:'全部',
    option1: [{
        text: '杨梅',
        value: 0,
      },


    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('thirdSession')) {
      checkSession()
    }
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      let id = scene.split('=')[1]
      this.setData({
        storeId: id
      })
      this.ddd()
    }
    if (options.id) {
      this.setData({
        storeId: options.id,
      })
      this.ddd()
    }
    this.goodsType()
  },
  navTo(){
    wx.navigateTo({
      url: '/specialZone/pages/shopCart/shopCart',
    })
  },
  selectType(e){
    this.setData({
      pageNum:1,
      goodsType:this.data.option1[e.detail].text
    })
    this.ddd()
  },
  goodsType() {
    goodsType().then((res) => {
      console.log(res);
      this.setData({
        option1:[{text:'全部',value:0},...res.data.map((item, i) => {
          return {
            text: item.mc,
            value: i+1,
            id: item.id
          }
        })]
      })

    })
  },
  ddd() {
    Dpxq({
      page: this.data.pageNum,
      size: this.data.pageSize,
      id: this.data.storeId,
      temp: '杨梅',
      type: this.data.goodsType==='全部'?'':this.data.goodsType
    }).then((res) => {
      if (res) {
        let arr = res.data[1]
        arr.map((item) => {
          item.img = item.img.split(',')
        })
        this.setData({
          pf: res.data[0].pf,
          headPortrait: res.data[0].dpfm ? this.data.domain + res.data[0].dpfm : res.data[0].yhtx,
          fullName: res.data[0].full_name ? res.data[0].full_name : res.data[0].name,
          shopList: [...arr]
        })
      }
    })
    Zzlll(Number(this.data.storeId))
  },
  searchShop(e) {
    this.setData({
      searchVal: e.detail,
      shopList: [],
      pageNum: 1,
      isReachBottom: true
    });
    this.getShopData()
  },
  getShopData(temp = '杨梅') {
    let obj = {}
    if (this.data.searchVal) {
      obj = {
        name: this.data.searchVal
      }
    }
    if (this.data.shopList.length >= (this.data.pageNum - 1) * this.data.pageSize) {
      Dpxq({
        page: this.data.pageNum,
        size: this.data.pageSize,
        id: this.data.storeId,
        temp,
        ...obj,
        type: this.data.goodsType==='全部'?'':this.data.goodsType
      }).then((res) => {
        console.log(res);
        if (res) {
          let arr = res.data[1]
          arr.map((item) => {
            if (item.img) {
              item.img = item.img.split(',')
            }
          })
          this.setData({
            shopList: [...this.data.shopList, ...arr]
          })
        }
      })
    }
  },
  changeTabs(event) {
    this.setData({
      active: event.detail.name,
      pageNum: 1,
      isReachBottom: true,
      activityList: [],
      shopList: [],
      navTitle: event.detail.title
    })
    if (event.detail.name === 1) {
      this.getShopData('活动')
    } else {
      this.getShopData()
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
    console.log(1111);
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getShopData(this.data.navTitle)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let {
      storeId,
      headPortrait,
      fullName,
      evaluate
    } = this.data
    Zzfxs(this.data.storeId)
    return {
      title: fullName,
      path: `/pages/shop/shop?storeId=${storeId}&storeName=${fullName}&headPortrait=${headPortrait}&evaluate=${evaluate}`
    }
  }
})