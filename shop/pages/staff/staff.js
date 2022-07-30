import {
  zwlb,
  yglb,
  xyjyzt,
  scyg,
  img
} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    selectValue: 1,
    searchValue: '',
    option: [],
    staffList: [],
    isReachBottom: true,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getzwlb()
  },
  getyglb(){
    const params={
      page:this.data.pageNum,
      size:10,
      position_id:this.data.selectValue,
      params:this.data.searchValue,
      storeId:wx.getStorageSync('userInfo').storeId
    }
    yglb(params).then(res=>{
      if(res.code===1){
        const {list} =res.data
        if(list.length<10){
          this.setData({
            isReachBottom:false
          })
        }
        list.map(item=>{
          item.zw=this.data.option.find(it=>it.value==item.position_id).text
        })
        this.setData({
          staffList:[...this.data.staffList,...list]
        })
      }
    })
  },
  getzwlb() {
    zwlb().then(res => {
      if (res.code === 1) {
        let arr = res.data.map(item => {
          return {
            text: item.name,
            value: item.id,
          }
        })
        this.setData({
          option:arr
        })
        this.getyglb()
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
    this.setData({
      isReachBottom: true,
      staffList: [],
      pageNum:1
    })
    this.getzwlb()
  },

  selectShop(e) {
    this.setData({
      selectValue: e.detail,
      isReachBottom: true,
      staffList: [],
      pageNum:1
    })
    this.getyglb()
  },
  searchShop(e) {
    this.setData({
      searchValue: e.detail,
      isReachBottom: true,
      staffList: [],
      pageNum:1
    })
    this.getyglb()
  },
  addStaff() {
    wx.navigateTo({
      url: '/shop/pages/addStaff/addStaff',
    })
  },
  editStaff(e) {
    const {
      id
    } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/shop/pages/addStaff/addStaff?id=' + id,
    })
  },
  deleteStaff(e) {
    const {
      id
    } = e.currentTarget.dataset.item
    const {staffList} = this.data
    const idx = e.currentTarget.dataset.idx
    wx.showModal({
      title: '提示',
      content: '确认删除该员工吗？',
      success: (res) => {
        if (res.confirm) {
          scyg({id}).then(res=>{
            if(res.code==1){
              staffList.splice(idx,1)
              this.setData({
                staffList
              })
              wx.showToast({
                icon:'success',
                title: '操作成功！',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onOffStaff(e) {
    const {
      id,
      state
    } = e.currentTarget.dataset.item
    const idx = e.currentTarget.dataset.idx
    const {staffList} = this.data
    const params={
      state:state==='1'?'0':'1',
      id
    }
    xyjyzt(params).then(res=>{
      if(res.code==1){
        staffList[idx].state=state==='1'?'0':'1'
        this.setData({
          staffList
        })
        wx.showToast({
          icon:'success',
          title: '操作成功！',
        })
      }
    })
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
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getyglb()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})