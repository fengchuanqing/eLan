import {getAllType,getAllTown,getAllCountry,getZdcylx,getVarieties,saveZtlx,ckzt,xgzt} from '../../../apis/gylz'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lxColumns: [],
    xzColumns: [],
    cunColumns: [],
    cylxColumns: [],
    zzwColumns: ['杨梅', '枇杷'],
    pupType: '',
    cyList: [{
      zzList: [{
        zzw: '',
        value: ''
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      idCard:userInfo.sfzhm,
      telephone:userInfo.lxdh,
    })
    this.getAllType()
    this.getAllTown()
    this.getZdcylx()
    if(options.id){
      this.setData({
        _id:options.id
      })
      this.getZt(options.id)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  getZt(id) {
    ckzt({
      id
    }).then(res => {
      if (res.code == 200) {
        const {
          secType,
          name,
          contacts,
          idCard,
          telephone,
          townName,
          countryName,
          address,
          map,
          country
        } = res.data
        const {
          lxData
        } = this.data
        let cyList = Object.values(map).map(item => {
          return {
            cylx: item[0].zdcylx,
            zzList: item.map(it=>{
              return{
                zzw:it.varietiesName,
                value:it.mj,
                crop_id:it.cropId
              }
            })
          }
        })
        this.setData({
          ztlx: lxData.find(item => item.XH == secType).QYLXMC,
          ztmc:name,
          lxrmc:contacts,
          idCard,
          telephone,
          ssxz: townName,
          ssc: countryName,
          address,
          cyList,
          country
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  save(){
    const {ztlx,ztmc,lxrmc,ssxz,ssc,address,lxData,idCard,telephone,xzData,cunData,cyList,cylxData,_id} = this.data
    
    if(!ztlx){
      Toast('请选择主体类型')
      return
    }
    if(!ztmc){
      Toast('请输入主体名称')
      return
    }
    if(!lxrmc){
      Toast('请输入联系人名称')
      return
    }
    if(!ssxz){
      Toast('请选择所属乡镇')
      return
    }
    if(!ssc){
      Toast('请选择所属村')
      return
    }
    if(!address){
      Toast('请输入详细地址')
      return
    }
    let map={},varietiesId=null
    let secType=lxData.find(item=>item.QYLXMC==ztlx).XH
    cyList.map((item,idx)=>{
      let arr = item.zzList.map(zz=>{
        if(zz.zzw=='杨梅') varietiesId=100
        return {
          // main_id:secType,
          cropId:zz.crop_id,
          mj:zz.value,
          zdcylxId:cylxData.find(j=>j.text==item.cylx).id 
        }
      })
      map[idx]=arr
    })
    console.log(map)
    const params={
      openid:wx.getStorageSync('thirdSession').openid,
      secType,
      name:ztmc,
      contacts:lxrmc,
      idCard,
      telephone,
      town:xzData.find(item=>item.region_name==ssxz).region_code,
      country:_id?this.data.country:cunData.find(item=>item.region_name==ssc).region_code,
      address,
      map,
      varietiesId,
    }
    if(!_id){
      params.state=3
      saveZtlx(params).then(res=>{
        if(res.code==200){
          Toast({
            type: 'success',
            message: res.msg,
            onClose: () => {
              wx.navigateBack({
                delta: 1,
              })
            },
          });
        }
      })
    }else{
      params.id=_id
      xgzt(params).then(res=>{
        if(res.code==200){
          Toast({
            type: 'success',
            message: res.msg,
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
  addChild(e) {
    const {
      idx,
    } = e.currentTarget.dataset
    console.log(idx)
    const cyList = this.data.cyList
    if (idx || idx === 0) {
      cyList[idx].zzList.push({
        zzw: '',
        value: ''
      })
    } else {
      cyList.push({
        cylx: '',
        zzList: [{
          zzw: '',
          value: ''
        }]
      })
    }

    this.setData({
      cyList
    })
  },
  blurFn(e) {
    const {
      idx,
      child
    } = e.currentTarget.dataset
    const cyList = this.data.cyList
    cyList[idx].zzList[child].value=e.detail.value
    this.setData({
      cyList
    })
  },
  del(e) {
    const {
      idx,
      child
    } = e.currentTarget.dataset
    const cyList = this.data.cyList
    if (!child) {
      cyList.splice(idx, 1)
    } else {
      cyList[idx].zzList.splice(child, 1)
    }
    this.setData({
      cyList
    })
  },
  pupShow(e) {
    const {
      type,
      idx,
      child
    } = e.currentTarget.dataset
    const {
      lxColumns,
      xzColumns,
      cunColumns,
      cylxColumns,
      zzwColumns
    } = this.data
    let columns = []
    switch (type) {
      case 'showLx':
        columns = lxColumns
        break;
      case 'showXz':
        columns = xzColumns
        break;
      case 'showCun':
        columns = cunColumns
        break;
      case 'showCylx':
        columns = cylxColumns
        this.setData({
          parentIndex: idx
        })
        break;
      case 'showZzw':
        let zdcylxId = this.data.cylxData.find(item=>item.text===this.data.cyList[idx].cylx).id
        getVarieties({zdcylxId}).then(res=>{
          if(res.code==1){
            let zzwColumns = res.data.map(item=>{
              return item.varieties_name
            })
            columns = zzwColumns
            this.setData({
              zzwData:res.data,
              parentIndex: idx,
              childIndex: child,
              columns
            })
          }
        })
        break;
      default:
        columns
    }
    this.setData({
      showPup: true,
      pupType: type,
      columns
    })
  },
  onClose(e) {
    this.setData({
      showPup: false
    })
  },
  onConfirm(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    const {
      type,
    } = e.currentTarget.dataset
    const {
      cyList,
      parentIndex,
      childIndex
    } = this.data
    let val = null
    switch (type) {
      case 'showLx':
        val = 'ztlx'
        break;
      case 'showXz':
        val = 'ssxz'
        this.getAllCountry(value)
        break;
      case 'showCun':
        val = 'ssc'
        break;
      case 'showCylx':
        val = "cyList[" + parentIndex + "].cylx"
        break;
      case 'showZzw':
        val = "cyList[" + parentIndex + "].zzList[" + childIndex + "].zzw"
        let crop_id = "cyList[" + parentIndex + "].zzList[" + childIndex + "].crop_id"
        this.setData({
          [crop_id]:this.data.zzwData.find(item=>item.varieties_name===value).id
        })
        break;
      default:
        val
    }
    this.setData({
      [val]: value,
      showPup: false,
    })
  },
  getAllType(){
    getAllType().then(res=>{
      if(res.code==1){
        let lxColumns = res.data.map(item=>{
          return item.QYLXMC
        })
        this.setData({
          lxData:res.data,
          lxColumns
        })
      }
    })
  },
  getAllTown(){
    getAllTown().then(res=>{
      if(res.code==1){
        let xzColumns = res.data.map(item=>{
          return item.region_name
        })
        this.setData({
          xzData:res.data,
          xzColumns
        })
      }
    })
  },
  getAllCountry(val){
    let parent_id = this.data.xzData.find(item=>item.region_name===val).region_code
    getAllCountry({parent_id}).then(res=>{
      if(res.code==1){
        let cunColumns = res.data.map(item=>{
          return item.region_name
        })
        this.setData({
          cunData:res.data,
          cunColumns
        })
      }
    })
  },
  getZdcylx(){
    getZdcylx().then(res=>{
      if(res.code==1){
        let cylxColumns = res.data.map(item=>{
          return item.text
        })
        this.setData({
          cylxData:res.data,
          cylxColumns
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})