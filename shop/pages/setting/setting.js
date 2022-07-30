// pages/MerchantCenter/setting/setting.js
import {
  domain,
} from '../../../utils/api.js'
import {
  dpqylx,
  uploadFile,
  sjshopDetail,
  updateDetail,
  img
} from '../../../apis/message.js'
const areaList = require('../../../utils/area-data.js')
import {
  phoneVerify
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qsj: "", //起售价格
    uploadFile,
    img,
    fileList: [],
    domain,
    active: 0,
    headPortrait: '',
    name: '',
    subjectName: '',
    fullName: '',
    commodity: '',
    address: '',
    mobile: wx.getStorageSync('userInfo').lxdh||'',
    categoryShow: false,
    categoryColumns: [1, 2],
    addressShow: false,
    areaList: areaList.areaList,
    isAll: 0,
    businessDate: ' ',
    account: '',
    password: '',
    currentStartTime: '09:00',
    currentEndTime: '20:00',
    subjectType: [],
    backData: {},
    skmSrc: [],
    wxhSrc: '',
    fmSrc: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取用户信息
    sjshopDetail().then(res => {
      // console.log(res);
      this.setData({
        backData: res.data,
        address: res.data.address,
        businessDate: res.data.business_date,
        businessHours: res.data.business_hours,
        commodity: res.data.commodity,
        fmSrc: res.data.dpfm,
        fullName: res.data.full_name,
        qsj: res.data.qsj,
        skmSrc: res.data.skm?.split(',')??[],
        wxhSrc: res.data.wechat,
        mobile: res.data.mobile,
        isAll: res.data.is_all ? true : false,
        currentStartTime: res.data.business_hours ? res.data.business_hours.split(',')[0] : '',
        currentEndTime: res.data.business_hours ? res.data.business_hours.split(',')[1] : "",
        account: res.data.account,
        password: res.data.password,
      })
    })
  },
  goCut(){
    wx.navigateTo({
      url: '/micro/pages/cropper/cropper?cuttype=1&isZ=2&fm=1',
    })
  },
  submit() {
    // if (this.data.active === 0) {
    // if (!this.data.headPortrait) {
    //   wx.showToast({
    //     icon: 'error',
    //     title: '头像不可为空',
    //   })
    //   return
    // }
    if (!this.data.commodity) {
      wx.showToast({
        icon: 'error',
        title: '主营商品必填',
      })
      return
    }
    if (this.data.skmSrc.length==0) {
      wx.showToast({
        icon:'none',
        title: '请上传收款码',
      })
      return
    }
    if (!this.data.fmSrc) {
      wx.showToast({
        icon:'none',
        title: '请上传店铺封面',
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        icon:'none',
        title: '请输入手机号',
      })
      return
    }
    if(!phoneVerify(this.data.mobile)) return
    var dot = this.data.qsj.indexOf('.')
    if (dot > -1) {
      if (this.data.qsj.length > (dot + 3)) {
        wx.showToast({
          icon: 'none',
          title: '请输入正确起售价格',
        })
        return
      }
    }
    if (!this.data.wxhSrc) {
      wx.showToast({
        icon:'none',
        title: '请上传微信号',
      })
      return
    }
    let params = {
      account: this.data.account,
      password: this.data.password,
      address: this.data.address, //地址
      businessDate: this.data.businessDate, //营业日期
      businessHours: this.data.isAll ? null : this.data.currentStartTime + ',' + this.data.currentEndTime, //营业时段
      commodity: this.data.commodity, //主营商品
      // dpfm: this.data.fileList, //店铺封面
      dpfm: this.data.fmSrc, //店铺封面
      fullName: this.data.fullName, //店铺全称
      qsj: this.data.qsj, //起售价格
      isAll: this.data.isAll ? 1 : 0, //是否24小时营业 0是 1否
      mobile: this.data.mobile, //手机号
      skm: this.data.skmSrc.join(), //收款码
      wechat: this.data.wxhSrc, //微信号
    }
    updateDetail(params).then(res => {
      if (res.code == 200) {
        wx.navigateBack({
          delta: 1,
        })
      } else {

      }
      wx.showToast({
        icon: 'none',
        title: res.msg,
      })
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.uploadFile({
      url: uploadFile,
      filePath: file.url,
      name: 'file',
      formData: {},
      success: (res) => {
        console.log(JSON.parse(res.data));
        that.setData({
          fileList: [{
            url: that.data.img + JSON.parse(res.data).fileName
          }]
        });
        wx.hideLoading()
      }
    })
  },
  allDayChange({
    detail
  }) {
    console.log(detail);
    this.setData({
      isAll: detail
    });
  },
  confirmArea(e) {
    let name = ''
    for (const item of e.detail.values) {
      name += item.name
    }
    this.setData({
      addressShow: false,
      address: name
    })
  },
  cancelArea() {
    this.setData({
      addressShow: false
    })
  },
  onAddressShow() {
    this.setData({
      addressShow: true
    })
  },
  categoryClose() {
    this.setData({
      categoryShow: false
    })
  },
  categoryChange(e) {
    this.setData({
      category: e.detail.value,
      categoryShow: false
    })
  },
  onCategoryShow() {
    this.setData({
      categoryShow: true
    })
  },
  startTimeShow() {
    this.setData({
      startTimeShow: true
    })
  },
  startTimeClose() {
    this.setData({
      startTimeShow: false
    })
  },
  onStartTimeInput(event) {
    this.setData({
      currentStartTime: event.detail,
      startTime: event.detail,
      startTimeShow: false
    })
  },
  endTimeShow() {
    this.setData({
      endTimeShow: true
    })
  },
  endTimeClose() {
    this.setData({
      endTimeShow: false
    })
  },
  onEndTimeInput(event) {
    this.setData({
      currentEndTime: event.detail,
      endTime: event.detail,
      endTimeShow: false
    })
  },
  onDayShow() {
    this.setData({
      dayShow: true
    })
  },
  onDayClose() {
    this.setData({
      dayShow: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onDayConfirm(event) {
    console.log(event);
    const [start, end] = event.detail;
    this.setData({
      dayShow: false,
      businessDate: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  delImg(e) {
    const num = e.currentTarget.dataset.idx;
    const {
      skmSrc
    } = this.data
    skmSrc.splice(num, 1)
    this.setData({
      skmSrc
    })
  },
  chooseImg() {
    let pics = this.data.skmSrc;
    console.log(pics)
    wx.showLoading({
      title: '加载中...',
    })
    wx.chooseImage({
      count: 5 - pics.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        const tempFilePaths = res.tempFilePaths
        for (let i in tempFilePaths) {
          wx.uploadFile({
            url: uploadFile,
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {},
            success: (resl) => {
              const data = JSON.parse(resl.data)
              pics.push(data.fileName);
              this.setData({
                skmSrc: pics
              })
            }
          })
        }
        wx.hideLoading()
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  OpenUpload(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '上传中...',
        })
        this.uploadImg(e.currentTarget.dataset.index, tempFilePaths[0])
      }
    })
  },
  uploadImg(indedx, data) {
    wx.uploadFile({
      url: uploadFile,
      filePath: data,
      name: 'file',
      formData: {},
      success: (res) => {
        const data = JSON.parse(res.data)
        console.log(data);
        wx.hideLoading()
        if (indedx == 1) {
          // 收款码
          this.setData({
            skmSrc: data.fileName
          })
        } else if (indedx == 2) {
          // 微信二维码
          this.setData({
            wxhSrc: data.fileName
          })
        } else if (indedx == 3) {
          // 店铺封面
          this.setData({
            fmSrc: data.fileName
          })
        }

      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  onChange(event) {
    this.setData({
      active: event.detail.index
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