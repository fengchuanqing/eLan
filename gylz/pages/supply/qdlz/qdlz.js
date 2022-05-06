import {
  domain,
  uploadFile
} from "../../../../apis/index.js"
import {wdhyqrlz} from '../../../../apis/gylz.js'
import {
  phoneVerify
} from '../../../../utils/util'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime()-10*365*24*60*60*1000,
    maxDate: new Date().getTime()+30*365*24*60*60*1000,
    currentDate: new Date().getTime(),
    imgList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id:options.id
    })
  },
  submit(){
    if (this.data.mobile&&!phoneVerify(this.data.mobile)) {
      return false
    }
    if(!this.data.time){
      Toast('请选择签订时间！')
      return
    }
    if(!this.data.tdmj){
      Toast('请输入土地面积！')
      return
    }
    if(!this.data.years){
      Toast('请输入流转年限！')
      return
    }
    const params={
      htfj:this.data.imgList.length?this.data.imgList.join(','):'',
      id:this.data._id,
      jyje:this.data.price,
      lznx:this.data.years,
      maijia:this.data.username,
      mjlxfs:this.data.mobile,
      qdsj:this.data.time,
      tdmj:this.data.tdmj,
    }
    wdhyqrlz(params).then(res=>{
      if(res){
        Toast({
          message: '确认成功',
          onClose: () => {
            wx.navigateBack({
              delta: 1,
            })
          },
        });
      }
    })
  },
  chooseImg() {
    let that = this;
    let pics = this.data.imgList;
    wx.showLoading({
      title: '加载中...',
    })
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        for (const i in tempFilePaths) {
          wx.uploadFile({
            url: uploadFile,
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {},
            success:(res)=> {
              const data = JSON.parse(res.data)
              pics.push('/bsApi'+data.fileName);
              that.setData({
                imgList: pics
              })
            }
          })
        }
        wx.hideLoading()
      },
      fail(){
        wx.hideLoading()
      }
    })
  },
  delImg(e) {
    const num = e.currentTarget.dataset.idx;
    const {
      imgList
    } = this.data
    imgList.splice(num, 1)
    this.setData({
      imgList: imgList,
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()<10?'0'+date.getHours():date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}`;
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      time: this.formatDate(event.detail),
      show:false
    });
  },
  onCancel() {
    this.setData({
      show:false
    })
  },
  showColumns(){
    this.setData({
      show:true
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