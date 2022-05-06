// pages/Order/orderDetail/orderdetail.js
// import {myOrderDeatils,myOrderDel,myOrderUpdate,domain} from '../../../utils/api.js'
import Dialog from '@vant/weapp/dialog/dialog';
import {img,Yhddlb,Sjgzm,addressList,updateOrder} from '../../../../apis/specialZone.js'
const areaCode = require('../../../../utils/area-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomLift:getApp().globalData.bottomLift,
    img,
    orderDetail:{},
    show3:false,
    show_img:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.getYhddlb(options.id)
  },
  getAddress() {
    addressList({
      openid: wx.getStorageSync('thirdSession').openid,
      pageNum: 1,
      pageSize: 10,
    }).then(
      (res) => {
        if (res) {
          if (res.data.length > 0) {
            let formData = ""
            for (let i in res.data) {
              if (res.data[i].id ===this.data.orderDetail.address_id) {
                formData = res.data[i]
              }
            }
            console.log(formData);
            const regionCode = formData.region_code ? formData.region_code.split(',') : []
            const province = areaCode.areaList.province_list[regionCode[0]]
            const city = areaCode.areaList.city_list[regionCode[1]]
            const county = areaCode.areaList.county_list[regionCode[2]]
            console.log(province);
            this.setData({
              addressDeatil: formData,
              province,
              city,
              county
            })
          }

        }

      }
    )
  },
  getWx(){
    Sjgzm({
      id:this.data.orderDetail.store_id
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
  getYhddlb(id=''){
    console.log(id);
    Yhddlb({
      page:1,size:7,openid:wx.getStorageSync('thirdSession').openid,orderStatus:'',id
    }).then((res)=>{
      console.log(res);
      if(res){
        let num=0
        res.data[0].goodSizeList.map(item=>{
          item.sptp=item.sptp?.split(',')
          num+=item.num*item.prince
        })
        if(!res.data[0].hdid)res.data[0].order_money=num
        this.setData({
          orderDetail:res.data[0]
        })
        this.getWx()
        this.getAddress()
      }
    })
  },
  confirmOrder(e){
    console.log(e);
    Dialog.confirm({
      title: '我的订单',
      message: '确认收货？',
    })
      .then(() => {
        console.log(111);
        updateOrder({
            orderStatus: '5',
            id:e.target.dataset.id,
            activityId:e.target.dataset.item?.hdid||'',
            goodsId:e.target.dataset.item?.spid||''
          })
        .then( (res) => {
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

        })
     
      .catch(() => {
        // on cancel
      });
  },
  showImg(){
    this.setData({
      show_img:true
    })
  },
  hideImg(){
    this.setData({
      show_img:false
    })
  },
  GoDetail(e) {
    console.log(e);
    if(this.data.orderDetail.dpzt==0){
      wx.showToast({
        title: '该店铺已关闭',
        icon:'error'
      })
    }else if(this.data.orderDetail.spzt==0){
      wx.showToast({
        title: '该商品已下架',
        icon:'error'
      })
    }else if(this.data.orderDetail.evaluation_state=='1'){
      wx.showToast({
        title: '该活动已下架',
        icon:'error'
      })
    }else{
    if(e.currentTarget.dataset.type===1){
      wx.navigateTo({
        url: '/specialZone/pages/activityDeatil/activityDeatil?id='+e.currentTarget.dataset.id
      })
    }else{
      wx.navigateTo({
        url: '/specialZone/pages/shopDetail/shopDetail?id='+e.currentTarget.dataset.id
      })
    }}
  },
  GoPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  },
  GoCopy(){
    wx.setClipboardData({
      data: this.data.orderDetail.wechat,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  delOrder(val){
    console.log(val)
    Dialog.confirm({
      title: '我的订单',
      message: '是否删除？',
    })
    .then(() => {
      updateOrder({
        userDel: '1',
          id:val.target.dataset.id
        })
      .then( (res) => {
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

      })
      .catch(() => {
        // on cancel
      });
  },

  OpenWl(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认收货？',
      success :(res)=> {
        if (res.confirm) {
          wx.request({
            url: myOrderUpdate,
            method:'POST',
            data:{
              orderStatus: '5',
              id:e.target.dataset.id
            },
            success: (res) => {
              if (res.data.code == 200) {
                wx.showToast({
                  title: res.data.msg,
                })
                this.getData(e.target.dataset.id)
              } else {
                wx.showToast({
                  icon: 'error',
                  title: res.data.msg,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getData(id){
    wx.request({
      url: myOrderDeatils,
      method:'get',
      data:{
        id:id
      },
      success:(res)=>{
        if(res.data.code==200){
          const formData = res.data.data[0]
          const regionCode=formData.regionCode?formData.regionCode.split(','):[]
          const province = areaCode.areaList.province_list[regionCode[0]]
          const city = areaCode.areaList.city_list[regionCode[1]]
          const county = areaCode.areaList.county_list[regionCode[2]]
          this.setData({
            orderDetail:formData,
            province,
            city,
            county
          })
        }else{
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },
  OpenWeixin() {
    this.setData({
      show3: true
    })
  },
  onCancel() {
    this.setData({
      show3: false,
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