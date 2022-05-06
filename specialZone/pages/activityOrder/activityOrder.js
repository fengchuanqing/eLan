// pages/Commodity/placeOrder/placeOrder.js
import {
  addOrder,upload,img,Sjgzm
} from '../../../apis/specialZone.js'
import {
  phoneVerify,
  telephoneReg
} from '../../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottomLift:getApp().globalData.bottomLift,
    domain:img,
    columns: ['自提','快递配送'],
    fileList: [],
    show:false,
    type:'自提',
    orderNum:'',
    show1:true,
    show3:false,
    show4:false,
    form:{},
    hideContain:false
  },
  check(e){
    console.log(e.detail.value);
    let value=e.detail.value
    let reg=/^[1-9]\d*|0$/
    let reg2=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/
    if(!reg.test(value)&&!reg2.test(value)) {
      wx.showToast({
        icon: 'none',
        title: '下单数量不能为空且应为数字',
      })
    }
  },
  check2(e){
    console.log(e.detail.value);
    let value=e.detail.value
    let reg4=/^(\d+|\d+\.\d{1,2})$/;
    if(!reg4.test(value)) {
      wx.showToast({
        icon: 'none',
        title: '付款金额不能为空且应为数字，最小单位为分',
      })
    }
  },
  check3(e){
    console.log(e.detail.value);
    let value=e.detail.value
    if(!phoneVerify(value)) {
      wx.showToast({
        icon: 'none',
        title: '手机号码格式错误',
      })
    }
  },
  delFile(e){
    const fileList = this.data.fileList;
    fileList.splice(e.detail.index,1)
    this.setData({
      fileList:fileList,
      imgSrc:''
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    
    const { fileList = [] } = this.data;
    fileList.push({ ...file });
    this.setData({ fileList });
    wx.uploadFile({
      url: upload,
      filePath: file.url,
      name: 'file',
      formData: {},
      success:(res)=> {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        this.setData({
          imgSrc:data.fileName
        })
      }
    })
  },
  confirmUpdate(){
    this.setData({
      show4:false
    })
  },
  GoAddress() {
    wx.navigateTo({
      url: '/pages/Receiving/address/address'
    })
  },
  GoDetail() {
    wx.navigateTo({
      url: '/pages/ymActivityDeatil/ymActivityDeatil?id='+this.data.form.id
    })
  },
  onClickHide(){
    this.setData({
      show3:false,
      show4:false,
      hideContain:false,
    })
  },
  OpenUpload(){
    this.setData({
      show4:true,
      hideContain:true,
    })
  },
  onCancel() {
    this.setData({
      show:false,
      show3:false,
      show4:false,
      hideContain:false,
    })
  },
  OpenEwm() {
    this.setData({
      show3:true,
      hideContain:true,
    })
  },
  getWx(id){
    Sjgzm({
    id,
    }).then((res)=>{
      console.log(res);
      if(res){
        this.setData({
          mobile:res?.data.mobile||'暂无',
          wechat:res?.data.wechat||'暂无',
          skm:res?.data.skm||'暂无'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.type){
      this.setData({
        _type:options.type
      })
    }
    if(options.id){
      this.setData({
        _id:options.id,
        hdfm:options.hdfm,
        full_name:options.full_name,
        hdid:options.hdid,
        introduction:options.introduction
      })
      this.getWx(options.id)
    }
  },

  GoPhone() {
   wx.makePhoneCall({
    phoneNumber: this.data.mobile
    })
  },
  buyShop(){
    let form={}
    if(!this.data.peopleNum){
      wx.showToast({
        icon:'none',
        title: '人数不可为空',
      })
      return
    }
    if(!this.data.username){
      wx.showToast({
        icon:'none',
        title: '姓名不可为空',
      })
      return
    }
    if(!this.data.tel){
      wx.showToast({
        icon:'none',
        title: '联系方式为空',
      })
      return
    }
    if( !phoneVerify(this.data.tel)){
      wx.showToast({
        icon: 'none',
        title: '手机号码格式错误',
      })
      return
    }
    if(!this.data.payMoney){
      wx.showToast({
        icon:'none',
        title: '付款金额为空',
      })
      return
    }
    let reg=/^[1-9]\d*|0$/
    let reg2=/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/
    let reg4=/^(\d+|\d+\.\d{1,2})$/;
    console.log(reg.test(this.data.orderNum));
    if(!reg.test(this.data.peopleNum)&&!reg2.test(this.data.peopleNum)) {
      wx.showToast({
        icon: 'none',
        title: '人数应为阿拉伯数字',
      })
      return
    }
    if(!reg4.test(this.data.payMoney)) {
      wx.showToast({
        icon: 'none',
        title: '付款金额应为阿拉伯数字且最小单位为分',
      })
      return
    }
    // if(this.data._type==='1'){
      form={
        activitiesNumber:this.data.peopleNum,
        nums:this.data.peopleNum,
        receivingName:this.data.username,
        useName:this.data.username,
        useTel:this.data.tel,
        receivingMobile:this.data.tel,
        orderMoney:this.data.payMoney,
        img:this.data.imgSrc,
        activityId:this.data.hdid,
        userId:wx.getStorageSync('userInfo').id||108,
        storeId:this.data._id,
        distribution:'活动',
        serialNum:this.getProjectNum() + Math.random().toString().substr(2,6),
        orderStatus:1,
        openid:wx.getStorageSync('thirdSession').openid
      }
    // }
    console.log(form);
    addOrder({
      ...form
    })
    .then((res) => {
      if (res) {
        wx.showToast({
          title: '下单成功',
          success() {
            wx.redirectTo({
              url: '/message/pages/Order/myorder/myorder',
            })
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
      }
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

  },
  getProjectNum() {
    const projectTime = new Date(); // 当前中国标准时间
    const Year = projectTime.getFullYear(); // 获取当前年份 支持IE和火狐浏览器.
    const Month = projectTime.getMonth() + 1; // 获取中国区月份
    const Day = projectTime.getDate(); // 获取几号
    var CurrentDate = Year;
    if (Month >= 10) {
      // 判断月份和几号是否大于10或者小于10
      CurrentDate += Month;
    } else {
      CurrentDate += "0" + Month;
    }
    if (Day >= 10) {
      CurrentDate += Day;
    } else {
      CurrentDate += "0" + Day;
    }
    return CurrentDate;
  }
})