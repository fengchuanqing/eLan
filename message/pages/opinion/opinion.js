import{fklx,tjfkxx} from '../../../apis/message'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curLx:0,
    lxList:[
      {
        id:0,
        name:'功能建议'
      },
      {
        id:1,
        name:'页面问题'
      },
      {
        id:2,
        name:'操作问题'
      },
      {
        id:3,
        name:'功能问题'
      },
      {
        id:4,
        name:'购买问题'
      },
      {
        id:5,
        name:'其他'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfklx()
  },
  getfklx(){
    fklx().then(res=>{
      if(res){
        this.setData({
          lxList:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit(){
    if(this.data.curLx===0){
      wx.showToast({
        icon:'none',
        title: '请选择问题类型',
      })
      return
    }
    if(!this.data.value){
      wx.showToast({
        icon:'none',
        title: '请输入反馈描述',
      })
      return
    }
    const params={
      fkxx:this.data.value,
      lxId:this.data.curLx
    }
    tjfkxx(params).then(res=>{
      if(res){
        wx.showToast({
          title: '提交成功',
          success(){
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  changeLx(e){
    const idx=e.currentTarget.dataset.idx
    this.setData({
      curLx:idx
    })
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