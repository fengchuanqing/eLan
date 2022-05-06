import {
  areaList
} from '../../../../utils/area-data'
import {
  qylb,
  tdlxlb,
  wdfbxq,
  cxbjxq,
  xqbjxq
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
    minArea: null,
    maxArea: null,
    years: '',
    minPrice: null,
    maxPrice: null,
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
    modeCol: ['求租', '求购'],
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
    this.gettdlxlb()
    if (options.id) {
      this.setData({
        _id:options.id
      })
    }
  },
  submit() {
    let {
      title,
      area,
      minPrice,
      maxPrice,
      landStyle,
      lzfs,
      mobile,
      username,
      minArea,
      maxArea,
      msjs,
      years,
      address,
      wechat
    } = this.data
    if (!landStyle) {
      Toast('请选择需求类型!')
      return
    }
    if (!area) {
      Toast('请选择土地区域!')
      return
    }
    if (!lzfs) {
      Toast('请选择流转方式!')
      return
    }
    if (!minArea||!maxArea) {
      Toast('请补全需求面积!')
      return
    }
    if(Number(maxArea)<Number(minArea)){
      Toast('需求最大面积应大于最小面积')
      return
    }
    if(minPrice&&maxPrice){
      console.log(minPrice,maxPrice);
      if(Number(maxPrice)<Number(minPrice)){
        Toast('最大价格应大于最小价格')
        return
      }
    }
    if (!years) {
      Toast('请输入流转年限!')
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
    if (!phoneVerify(mobile)) {
      return false
    }
    const params = {
      bt: title,
      dqbm: this.data.allAreaCol.find(item => item.region_name === area).region_code,
      jg: (minPrice&&maxPrice)?(minPrice+'-'+maxPrice+'万元'):'面议',
      lxId: this.data.allLandCol.find(item => item.lxmc === landStyle).id,
      mjlxfs: mobile,
      lzfs,
      mjia: username,
      mj: minArea+'-'+maxArea+'亩',
      msjs,
      nx: years,
      openId: wx.getStorageSync('thirdSession').openid,
      // tdqy: address,
      vx: wechat
    }
    if(this.data._id){
      params.id=this.data._id
      cxbjxq(params).then(res => {
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
      wdfbxq(params).then(res => {
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
  getDetails(){
    console.log(this.data.allAreaCol);
    xqbjxq({id:this.data._id}).then(res=>{
      if(res){
        const data=res.data[0]
        const jg = data.jg==='面议'?[]:data.jg.split('-')
        jg[1] = jg[1]?.replace('万元','')
        const mj =data.mj.split('-')
        mj[1] = mj[1]?.replace('亩','')
        this.setData({
          landStyle: this.data.allLandCol.find(item=>item.id===data.lx_id).lxmc,
          area:this.data.allAreaCol.find(item=>item.region_code===data.dqbm).region_name,
          lzfs:data.lzfs,
          minArea:mj[0],
          maxArea:mj[1],
          years:data.nx,
          minPrice:jg[0],
          maxPrice:jg[1],
          title:data.bt,
          msjs:data.msjs,
          wechat:data.vx,
          username:data.mjia,
          mobile:data.mjlxfs,
        })
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
        this.getqylb()
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
        if(this.data._id){
          this.getDetails()
        }
      }
    })
  },
  bindInput(e){
    let value = e.currentTarget.dataset.val
    if (Number(e.detail) >= 0) {
      this.setData({
        [value]: e.detail
      })
    } else {
      this.setData({
        [value]: this.data[value]
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