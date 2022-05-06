import {ShopCar,img,updateShopCar,ShopCarOrder,deleteShopCar} from '../../../apis/specialZone'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    isChecked:false,
    allPrice:0,
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  delGoods(e){
    let {goods,idx,index} = e.currentTarget.dataset
    let {shopList} =this.data
    let goodsList = shopList[idx].goodsList
    console.log(goods)
    let form = {
      openid: wx.getStorageSync('thirdSession').openid,
      userId: wx.getStorageSync('userInfo').id || 108,
      storeId: goods.storeId|| 1,
      shopCarList:[goods]
    }
    deleteShopCar(form).then(res=>{
      if(res.code==200){
        wx.showToast({
          icon:'error',
          title: res.msg,
        })
        goodsList.splice(index,1)
        this.setData({
          shopList
        })
      }
    })
  },
  getData(){
    ShopCar({openid:wx.getStorageSync('thirdSession').openid}).then(res=>{
      if(res){
        let keyArr = Object.keys(res.data)
        let shopList=[]
        keyArr.map(item=>{
          res.data[item].map(it=>{
            it.logo=it.img?.split(',')[0]
          })
          shopList.push({
            isChecked:false,
            goodsList:res.data[item]
          })
        })
        this.setData({
          shopList
        })
      }
    })
  },
  onClickButton(){
    if(!this.data.shopList.length) return
    if(this.data.allPrice<=0){
      wx.showToast({
        icon:'error',
        title: '请选择商品',
      })
      return
    }
    const shopList = this.data.shopList
    let arr=[]
    shopList.map(item=>{
      item.goodsList.map(it=>{
        if(it.isChecked){
          arr.push(it)
        }
      })
    })
    wx.setStorageSync('cartData', arr)
    wx.navigateTo({
      url: '/specialZone/pages/cartOrder/cartOrder',
    })
  },
  onAllIn(){
    const shopList = this.data.shopList
    let all=true
    for(let i in shopList){
      if(!shopList[i].isChecked){
        all=false
        break
      }
      const goodsList=shopList[i].goodsList
      for(let k in goodsList){
        const goods=goodsList[k]
        if(!goods.isChecked){
          all=false
          break
        }
      }
    }
    this.setData({
      checked:all
    })
  },
  onTotal(){
    const shopList = this.data.shopList
    let total=0
    for(let i in shopList){
      const goodsList=shopList[i].goodsList
      for(let k in goodsList){
        const goods=goodsList[k]
        if(goods.isChecked){
          total+=goods.unitPrice*goods.num
        }
      }
    }
    this.setData({
      allPrice:total*100
    })
  },
  onNumChange(e){
    const idx = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index
    const shopList = this.data.shopList
    const goods = shopList[idx].goodsList[index]
    goods.num = e.detail
    const params = {
      goodsId:goods.goodsId,
      goodsSizeId:goods.goodsSizeId,
      num:e.detail,
      openid:wx.getStorageSync('thirdSession').openid,
      storeId:goods.storeId
    }
    updateShopCar(params).then(res=>{
      if(res){
        this.setData({
          shopList
        })
        this.onTotal()
      }
    })
  },
  noop(){},
  onShopChange(e){
    const idx = e.currentTarget.dataset.item
    const shopList = this.data.shopList
    const shop = shopList[idx]
    const goodsList = shop.goodsList
    goodsList.map(item=>{
      item.isChecked = e.detail
    })
    shopList.map((item,i)=>{
      if(idx!=i){
        item.isChecked = false
        item.goodsList.map(it=>{
          if(it.isChecked){
            it.isChecked=false
          }
        })
      }
    })
    shop.isChecked=e.detail
    this.setData({
      shopList
    })
    this.onTotal()
    this.onAllIn()
  },
  onGoodsChange(e){
    const idx = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index
    const shopList = this.data.shopList
    shopList.map((item,i)=>{
      if(idx!=i){
        if(item.isChecked){
          item.isChecked=false
        }
        item.goodsList.map(it=>{
          if(it.isChecked){
            it.isChecked=false
          }
        })
      }
    })
    const goodsList=shopList[idx].goodsList
    const goods = shopList[idx].goodsList[index]
    goods.isChecked=e.detail
    const arr = goodsList.filter(item=>{
      return !item.isChecked
    })
    if(arr.length===0){
      shopList[idx].isChecked=true
    }else{
      shopList[idx].isChecked=false
    }
    this.setData({
      shopList
    })
    this.onTotal()
    this.onAllIn()
  },
  onChange(event) {
    const shopList = this.data.shopList
    for(let i in shopList){
      shopList[i].isChecked=event.detail
      const goodsList=shopList[i].goodsList
      for(let k in goodsList){
        goodsList[k].isChecked=event.detail
      }
    }
    this.setData({
      checked: event.detail,
      shopList
    });
    this.onTotal()
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