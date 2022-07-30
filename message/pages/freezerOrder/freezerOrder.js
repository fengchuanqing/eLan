import {
  lkxq,
  lkxdq
} from '../../api'
import {
  phoneVerify
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    yyyh:wx.getStorageSync('userInfo').xm,
    mobile:wx.getStorageSync('userInfo').lxdh,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    if(options.page){
      this.setData({
        delta:options.page
      })
    }
    this.setData({
      _id:options.id
    })
    this.getData(options.id)
  },

  getData(id){
    lkxq({id}).then(res=>{
      if(res.code==200){
        let freezer = res.data
        this.setData({
          freezer
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  submit(){
    let {delta,yyyh,mobile:lxdh,xcwp,wptj,startTime:yykssj,yysj,bz,_id}=this.data
    if(!yyyh){
      wx.showToast({
        icon:'none',
        title: '请输入预约用户',
      })
      return
    }
    if(!lxdh){
      wx.showToast({
        icon:'none',
        title: '请输入联系电话',
      })
      return
    }
    if (!phoneVerify(lxdh)) return
    if(!xcwp){
      wx.showToast({
        icon:'none',
        title: '请输入需存物品',
      })
      return
    }
    if(!wptj){
      wx.showToast({
        icon:'none',
        title: '请输入物品体积',
      })
      return
    }
    if(!yykssj){
      wx.showToast({
        icon:'none',
        title: '请选择预约开始时间',
      })
      return
    }
    if(!yysj){
      wx.showToast({
        icon:'none',
        title: '请输入预约时间',
      })
      return
    }
    const params={
      yyyh,lxdh,xcwp,wptj,yykssj,yysj,bz,coldId:_id,
      openid:wx.getStorageSync('thirdSession').openid
    }
    lkxdq(params).then(res=>{
      if(res.code==200){
        wx.showToast({
          icon:'none',
          title: '预约成功，请等待服务主体确认',
          success:()=>{
            setTimeout(()=>{
              wx.navigateBack({
                delta: Number(delta)||1,
              })
            },1500)
          }
        })
      }
    })
  },
  bindTextAreaBlur(e){
    this,this.setData({
      bz:e.detail.value
    })
  },
  onDisplay(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      startTime: this.formatDate(event.detail),
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})