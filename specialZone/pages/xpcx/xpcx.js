import {
  img,
  Syss,
  Xpcx,
  goodsType,
  Syssgb
} from "../../../apis/specialZone"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    navList:[{
      id:0,
      img:'/specialZone/assets/rxcp.png',
      mc:'热销产品'
    },{
      id:1,
      img:'/specialZone/assets/zxsj.png',
      mc:'最新上架'
    }],
    selectNav:'热销产品',
    otherNavList:[],
    showAll:false,
    curNav:'热销',
    goodsList:[],
    pageNum:1,
    isReachBottom:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goodsType()
    this.getXpcx()
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
  getXpcx(){
    let {goodsList} = this.data
    const params={
      page:this.data.pageNum,
      temp: this.data.selectNav,
      temper:this.data.curNav
    }
    Xpcx(params).then(res=>{
      if(res){
        goodsList=[...goodsList,...res.data]
        if(res.data.length<10){
          this.setData({
            isReachBottom:false
          })
        }
        this.setData({
          goodsList
        })
      }
    })
  },
  goodsType(){
    let {navList,otherNavList} = this.data
    goodsType().then(res=>{
      if(res){
        navList=[...navList,...res.data.slice(0,2)]
        otherNavList=res.data.slice(2,res.data.length)
        this.setData({
          navList,
          otherNavList
        })
      }
    })
  },
  closeAll(){
    this.setData({
      showAll:false
    })
  },
  showAllPop(){
    this.setData({
      showAll:true
    })
  },
  changeType(e){
    const idx = e.currentTarget.dataset.id
    this.setData({
      selectNav:idx,
      showAll:false,
      isReachBottom:true,
      pageNum:1,
      goodsList:[],
      value:''
    })
    this.getXpcx()
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
      sort:this.data.curNav=='热销'?1:2,
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
                goodsList
              })
            }
        })
  },
  changeNav(e){
    const idx = e.currentTarget.dataset.idx
    this.setData({
      curNav:idx,
      isReachBottom:true,
      pageNum:1,
      goodsList:[]
    })
    if(this.data.value){
      this.searchData()
    }else{
      this.getXpcx()
    }
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
    if(this.data.isReachBottom){
      this.setData({
        pageNum:this.data.pageNum+1
      })
      if(this.data.value){
        this.searchData()
      }else{
        this.getXpcx()
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})