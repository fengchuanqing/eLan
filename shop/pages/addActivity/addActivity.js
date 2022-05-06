// pages/MerchantCenter/addShop/addShop.js
import {
  domain,
  upload,
  merchantActivityDeatil
} from '../../../utils/api.js'
const areaList = require('../../../utils/area-data.js')
import {
  phoneVerify
} from "../../../utils/util.js"
import {
  uploadFile,
  img,
  addActivity,
  activityDetail,
  updateActivity,
  getImgSize
} from '../../../apis/message.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img,
    domain,
    form: {
      name: '',
      address: '请选择',
      startDate: '开始日期',
      endDate: '结束日期',
      gmxz: '',
      phone: '',
      wechat: '',
      content: ''
    },
    imgList: [],
    addressShow: false,
    areaList: areaList.areaList,
    showDate: false,
    sizeTrue: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        act_id: options.id
      })
      this.getData()
    }
  },
  getData() {
    activityDetail({
      id: this.data.act_id
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        const formData = res.data
        this.setData({
          'form.name': formData.activity_name,
          'form.explain': formData.introduction,
          // 'form.address': formData.address,
          'form.area': formData.address,
          shopCoverImg: formData.img_url,
          imgList: formData.other_img && formData.other_img.split(','),
          'form.startDate': formData.begin_time,
          'form.endDate': formData.end_time,
          'form.gmxz': formData.notice,
          'form.phone': formData.telephone,
          'form.wechat': formData.vx,
          content: formData.content, //内容说明
        })
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    })
    // wx.request({
    //   url: merchantActivityDeatil + this.data.act_id,
    //   method: 'get',
    //   success: (res) => {
    //     if (res.data.code === 200) {
    //       const formData = res.data.data
    //       const regionCode = formData.address ? formData.address.split(',') : [];
    //       const province = areaList.areaList.province_list[regionCode[0]]
    //       const city = areaList.areaList.city_list[regionCode[1]]
    //       const county = areaList.areaList.county_list[regionCode[2]]
    //       this.setData({
    //         'form.name': formData.activityName,
    //         'form.explain': formData.introduction,
    //         'form.address': formData.address,
    //         'form.area': province + city + county,
    //         shopCoverImg: formData.imgUrl,
    //         imgList: formData.otherImg && formData.otherImg.split(','),
    //         'form.startDate': formData.beginTime,
    //         'form.endDate': formData.endTime,
    //         'form.gmxz': formData.notice,
    //         'form.phone': formData.telephone,
    //         'form.wechat': formData.vx,
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //       })
    //     }
    //   }
    // })
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

  formSubmit() {
    console.log(this.data.form);

    const formData = this.data.form
    if (!formData.name) {
      wx.showToast({
        icon: 'error',
        title: '活动名称为空！',
      })
      return
    }
    if (!this.data.shopCoverImg) {
      wx.showToast({
        icon: 'error',
        title: '主图不可为空',
      })
      return
    }
    if (!formData.address) {
      wx.showToast({
        icon: 'error',
        title: '店铺地址为空！',
      })
      return
    }
    if (!formData.phone) {
      wx.showToast({
        icon: 'error',
        title: '客服电话为空！',
      })
      return
    }
    if (!phoneVerify(formData.phone)) return
    if (!formData.wechat) {
      wx.showToast({
        icon: 'error',
        title: '微信号为空！',
      })
      return
    }
    const imgListStr = this.data.imgList.length > 0 ? this.data.imgList.join(',') : ''
    // 修改
    if (this.data.act_id) {
      // 修改
      let params = {
        id: this.data.act_id,
        state: 0,
        imgUrl: this.data.shopCoverImg, //主图
        otherImg: imgListStr, //其他图片
        activityName: formData.name, //活动名称
        address: formData.area,
        beginTime: formData.startDate === "开始日期" ? null : formData.startDate,
        endTime: formData.endDate === "结束日期" ? null : formData.endDate,
        notice: formData.gmxz, //购买须知
        introduction: formData.explain, //活动说明
        content: formData.content, //内容说明
        telephone: formData.phone, //客服电话
        vx: formData.wechat, //vx
      }
      updateActivity(params).then(res => {
        if (res.code === 200) {
          wx.showToast({
            icon: 'none',
            title: '操作成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        } else {
          wx.showToast({
            icon: 'error',
            title: res.msg,
          })
        }
      })
      // wx.request({
      //   url: merchantActivityDeatil,
      //   method: 'PUT',
      //   data: {
      //     activityName: formData.name,
      //     otherImg: imgListStr,
      //     imgUrl: this.data.shopCoverImg,
      //     introduction: formData.explain,
      //     beginTime: formData.startDate,
      //     endTime: formData.endDate,
      //     address: formData.area,
      //     notice: formData.gmxz,
      //     telephone: formData.phone,
      //     vx: formData.wechat,
      //     id: this.data.act_id,
      //     state: "0"
      //   },
      //   success: (res) => {
      //     if (res.data.code === 200) {
      //       wx.showToast({
      //         icon: 'none',
      //         title: '操作成功',
      //       })
      //       setTimeout(() => {
      //         wx.navigateBack({
      //           delta: 1
      //         })
      //       }, 1500)
      //     } else {
      //       wx.showToast({
      //         icon: 'error',
      //         title: res.data.msg,
      //       })
      //     }
      //   }
      // })
    } else {
      // 新增
      let params = {
        imgUrl: this.data.shopCoverImg, //主图
        otherImg: imgListStr, //其他图片
        activityName: formData.name, //活动名称
        address: formData.area,
        beginTime: formData.startDate === "开始日期" ? null : formData.startDate,
        endTime: formData.endDate === "结束日期" ? null : formData.endDate,
        notice: formData.gmxz, //购买须知
        introduction: formData.explain, //活动说明
        content: formData.content, //内容说明
        telephone: formData.phone, //客服电话
        vx: formData.wechat, //vx
      }
      addActivity(params).then(res => {
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1
          })
        }
        wx.showToast({
          icon: '',
          title: res.msg,
        })
      })
      // wx.request({
      //   url: merchantActivityDeatil,
      //   method: 'POST',
      //   data: {
      //     activityName: formData.name,
      //     otherImg: imgListStr,
      //     imgUrl: this.data.shopCoverImg,
      //     introduction: formData.explain,
      //     beginTime: formData.startDate === "开始日期" ? '' : formData.startDate,
      //     endTime: formData.endDate === "结束日期" ? '' : formData.endDate,
      //     address: formData.address,
      //     notice: formData.gmxz,
      //     telephone: formData.phone,
      //     vx: formData.wechat,
      //     storeId: wx.getStorageSync('userInfo').id || 1
      //   },
      //   success: (res) => {
      //     if (res.data.code === 200) {
      //       wx.showToast({
      //         icon: 'none',
      //         title: '操作成功',
      //       })
      //       setTimeout(() => {
      //         wx.navigateBack({
      //           delta: 1
      //         })
      //       }, 1500)
      //     } else {
      //       wx.showToast({
      //         icon: 'error',
      //         title: res.data.msg,
      //       })
      //     }
      //   }
      // })
    }
  },
  nameInput(event) {
    this.setData({
      'form.name': event.detail
    })
  },
  explainInput(event) {
    this.setData({
      'form.explain': event.detail
    })
  },
  contentInput(event) {
    this.setData({
      'form.content': event.detail
    })
  },
  gmxzInput(event) {
    this.setData({
      'form.gmxz': event.detail
    })
  },
  phoneInput(event) {
    this.setData({
      'form.phone': event.detail
    })
  },
  wechatInput(event) {
    this.setData({
      'form.wechat': event.detail
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    // if (this.data.isStart === 0) {
    //   if (this.data.form.endDate != '结束日期') {
    //     if (event.detail < new Date(this.data.form.endDate)) {
    //       this.setData({
    //         showDate: false,
    //         'form.startDate': this.formatDate(event.detail),
    //       });
    //     } else {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '开始日期不可大于结束日期',
    //       })
    //     }
    //   } else {
    //     this.setData({
    //       showDate: false,
    //       'form.startDate': this.formatDate(event.detail),
    //     });
    //   }
    // } else {
    //   if (this.data.form.startDate != '开始日期') {
    //     if (event.detail > new Date(this.data.form.startDate)) {
    //       this.setData({
    //         showDate: false,
    //         'form.endDate': this.formatDate(event.detail),
    //       });
    //     } else {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '结束日期不可小于开始日期',
    //       })
    //     }
    //   } else {
    //     this.setData({
    //       showDate: false,
    //       'form.endDate': this.formatDate(event.detail),
    //     });
    //   }
    // }
    if (this.data.isStart === 0) {
      this.setData({
        showDate: false,
        'form.startDate': this.formatDate(event.detail),
      });
    } else {
      this.setData({
        showDate: false,
        'form.endDate': this.formatDate(event.detail),
      });
    }
  },
  onClose() {
    this.setData({
      showDate: false
    });
  },
  onDisplay(e) {
    this.setData({
      showDate: true,
      isStart: e.currentTarget.dataset.type
    });
  },
  onAddressClose() {
    this.setData({
      addressShow: false
    })
  },
  confirmArea(e) {
    let name = '',
      code = ""
    for (const item of e.detail.values) {
      name += item.name
      code += item.code + ','
    }
    code = code.slice(0, code.length - 1)
    this.setData({
      addressShow: false,
      'form.area': name,
      'form.address': code
    })
  },
  onAddressShow() {
    this.setData({
      addressShow: true
    })
  },
  OpenUpload() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        wx.showLoading({
          title: '加载中...',
        })
        const tempFilePaths = res.tempFilePaths
        that.uploadImg(tempFilePaths[0])
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
  chooseImg() {
    let that = this;
    let pics = this.data.imgList;
    this.setData({
      sizeTrue: true
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.chooseImage({
      count: 5 - pics.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.uploadList(tempFilePaths)
        // for (const i in tempFilePaths) {
        //   wx.uploadFile({
        //     url: getImgSize,
        //     filePath: tempFilePaths[i],
        //     name: 'file',
        //     formData: {},
        //     success: (res) => {
        //       const data = JSON.parse(res.data)
        //       if (data.data.width != data.data.height) {
        //         that.setData({
        //           sizeTrue: false
        //         })
        //       }
        //       if (i == tempFilePaths.length - 1) {
        //         if (that.data.sizeTrue) {
        //         } else {
        //           wx.showModal({
        //             title: '提示',
        //             content: '上传图片的尺寸不合格，请重新上传',
        //             showCancel: false
        //           })
        //         }
        //       }
        //     }
        //   })
        // }
        wx.hideLoading()
      },
      fail() {
        wx.hideLoading()
      }
    })
  },

  uploadList(lists) {
    let pics = this.data.imgList;
    for (let i in lists) {
      wx.uploadFile({
        url: uploadFile,
        filePath: lists[i],
        name: 'file',
        formData: {},
        success: (res) => {
          const data = JSON.parse(res.data)
          pics.push(data.fileName);
          this.setData({
            imgList: pics
          })
        }
      })
    }
  },
  uploadImg(datas) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.uploadFile({
      url: uploadFile,
      filePath: datas,
      name: 'file',
      formData: {},
      success: (res) => {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        this.setData({
          shopCoverImg: data.fileName
        })
      },
      fail() {
        console.log(uploadFile,data)
        wx.hideLoading()
      }
    })
    return
    wx.uploadFile({
      url: getImgSize,
      filePath: datas,
      name: 'file',
      formData: {},
      success: (res) => {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        if (data.data.width != data.data.height) {
          wx.showModal({
            title: '提示',
            content: '上传图片的尺寸不合格，请重新上传',
            showCancel: false
          })
        } else {
          wx.showLoading({
            title: '加载中...',
          })
          wx.uploadFile({
            url: uploadFile,
            filePath: datas,
            name: 'file',
            formData: {},
            success: (res) => {
              wx.hideLoading()
              const data = JSON.parse(res.data)
              this.setData({
                shopCoverImg: data.fileName
              })
            },
            fail() {
              console.log(uploadFile,data)
              wx.hideLoading()
            }
          })
        }
      },
      fail() {
        wx.hideLoading()
      }
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