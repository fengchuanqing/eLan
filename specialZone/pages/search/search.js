import {
  img,
  Syss,
  Syssgb
} from "../../../apis/specialZone"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    jxsjList:[],
    curNav:1,
    goodsList:[],
    pageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onSearch(e){
    this.setData({
      value: e.detail,
      isReachBottom:true,
      pageNum:1,
      goodsList:[]
    });
    this.searchData()
  },
  searchData(){
    const params={
      temp:this.data.value,
      sort:this.data.curNav,
      pageNum:this.data.pageNum
    } 
    Syssgb(params)
        .then((res)=>{
            if(res){
              let {goodsList} = this.data
              if(res.data.sp.length<10){
                this.setData({
                  isReachBottom:false
                })
              }
              goodsList=[...goodsList,...res.data.sp]
              this.setData({
                goodsList,
                jxsjList:res.data.sj
              })
            }
        })
  },
  changeNav(e){
    const idx = e.currentTarget.dataset.idx
    this.setData({
      curNav:idx
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