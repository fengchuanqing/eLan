import {
  areaList
} from '../../../../utils/area-data'
import {
  wdfbgy,
  qylb,
  tdlxlb,
  gybjxq,
  wdgycxbj
} from '../../../../apis/gylz'
import {
  phoneVerify
} from '../../../../utils/util'
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    landStyle: '',
    area: '',
    address: '',
    lzfs: '',
    tdmj: '',
    years: '',
    price: '',
    title: '',
    msjs: '',
    wechat: '',
    username: '',
    mobile: '',
    // 以上表单
    show: false,
    columns: [],
    landCol: [],
    allLandCol: [],
    modeCol: ['出租', '转让', '转包'],
    areaCol: [],
    allAreaCol: [],
    colKey: 0,
    areaList,
    showArea: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getqylb()
    this.gettdlxlb()
    if (options.id) {
      this.setData({
        _id:options.id
      })
      this.getDetails()
    }
  },
  getDetails(){
    gybjxq({id:this.data._id}).then(res=>{
      if(res){
        const data=res.data[0]
        this.setData({
          landStyle: this.data.allLandCol.find(item=>item.id===data.lx_id).lxmc,
          area:this.data.allAreaCol.find(item=>item.region_code===data.dqbm).region_name,
          address:data.tdqy,
          lzfs:data.lzfs,
          tdmj:data.mj,
          years:data.nx,
          price:data.jg,
          title:data.bt,
          msjs:data.msjs,
          wechat:data.vx,
          username:data.lzr,
          mobile:data.lxfs,
        })
        wx.setStorageSync('tp', data.tp)
        wx.setStorageSync('sp', data.sp)
      }
    })
  },
  // 土地类型列表
  gettdlxlb() {
    tdlxlb().then(res => {
      if (res) {
        const data = res.data;
        let arr = []
        data.map(item => {
          arr.push(item.lxmc)
        })
        this.setData({
          landCol: arr,
          allLandCol: data
        })
      }
    })
  },
  // 区域列表
  getqylb() {
    qylb().then(res => {
      if (res) {
        const data = res.data;
        let arr = []
        data.map(item => {
          arr.push(item.region_name)
        })
        this.setData({
          areaCol: arr,
          allAreaCol: data
        })
      }
    })
  },
  submit() {
    let {
      title,
      area,
      price,
      landStyle,
      lzfs,
      mobile,
      username,
      tdmj,
      msjs,
      years,
      address,
      wechat
    } = this.data
    if (!landStyle) {
      Toast('请选择土地类型!')
      return
    }
    if (!area) {
      Toast('请选择土地区域!')
      return
    }
    if (!address) {
      Toast('请输入详细地址!')
      return
    }
    if (!lzfs) {
      Toast('请选择流转方式!')
      return
    }
    if (!tdmj) {
      Toast('请输入土地面积!')
      return
    }
    if (!years) {
      Toast('请输入流转年限!')
      return
    }
    if (!price) {
      Toast('请输入价格!')
      return
    }
    if (!title) {
      Toast('请输入标题!')
      return
    }
    if (!username) {
      Toast('请输入联系人!')
      return
    }
    if (!mobile) {
      Toast('请输入联系电话!')
      return
    }
    if(!wx.getStorageSync('tp')){
      Toast('请上传图片!')
      return
    }
    if (!phoneVerify(mobile)) {
      return false
    }
    const params = {
      bt: title,
      dqbm: this.data.allAreaCol.find(item => item.region_name === area).region_code,
      jg: price,
      lxId: this.data.allLandCol.find(item => item.lxmc === landStyle).id,
      lxfs: mobile,
      lzfs,
      lzr: username,
      mj: tdmj,
      msjs,
      nx: years,
      openId: wx.getStorageSync('thirdSession').openid,
      sp: wx.getStorageSync('sp'),
      tdqy: address,
      tp: wx.getStorageSync('tp'),
      vx: wechat
    }
    if(this.data._id){
      params.id=this.data._id
      wdgycxbj(params).then(res => {
        if (res) {
          Toast({
            message: '发布成功',
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              })
            },
          });
        }
      })
    }else{
      wdfbgy(params).then(res => {
        if (res) {
          Toast({
            message: '发布成功',
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              })
            },
          });
        }
      })
    }
    
  },
  showAreaColumns() {
    this.setData({
      showArea: true
    })
  },
  onArea(e) {
    console.log(e);
    const arr = e.detail.values;
    let str = ''
    arr.map(item => {
      str += item.name
    })
    this.setData({
      area: str,
      showArea: false,
      title: str + this.data.title
    })
  },
  onCancelArea() {
    this.setData({
      showArea: false
    })
  },
  showColumns(e) {
    const idx = e.currentTarget.dataset.idx
    if (idx === 0) {
      this.setData({
        columns: this.data.landCol
      })
    } else if (idx === 1) {
      this.setData({
        columns: this.data.modeCol
      })
    } else {
      this.setData({
        columns: this.data.areaCol
      })
    }
    this.setData({
      colKey: idx,
      show: true
    })
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    const colKey = this.data.colKey
    if (colKey === 0) {
      this.setData({
        title: this.data.title + value,
        landStyle: value
      })
    } else if (colKey === 1) {
      this.setData({
        title: this.data.title + value,
        lzfs: value
      })
    } else {
      this.setData({
        title: value + this.data.title,
        area: value
      })
    }
    this.setData({
      show: false
    })
  },

  onCancel() {
    this.setData({
      show: false
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
    wx.removeStorageSync('sp')
    wx.removeStorageSync('tp')
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