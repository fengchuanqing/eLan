// pages/MerchantCenter/addShop/addShop.js
import {
  domain,
  merchantGoodsDeatil,
  merchantGoodsUp,
  upload,
} from "../../../utils/api.js"
import Dialog from '@vant/weapp/dialog/dialog';


import {
  addGoods,
  uploadFile,
  img,
  sjDetail,
  GoodsDetail,
  updateGoods,
  getImgSize,
  goodsType
} from '../../../apis/message.js'
const areaList = require('../../../utils/area-data.js')
import {
  phoneVerify
} from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sjShow: true,
    shopCoverImg: '',
    Processing: '1',
    items: [{
        value: '1',
        name: '是',
        check: true
      },
      {
        value: '0',
        name: '否',
        check: false
      },
    ],
    uploadFile,
    img,
    domain,
    form: {
      name: '',
      shopTag: '',
      address: '请选择',
      detailPage: '未添加',
      startDate: '开始日期',
      endDate: '结束日期',
      checkbox1: 0,
      checkbox2: 0,
      checkbox3: 0,
      checkbox4: 0,
      bcsm: '',
      phone: '',
      wechat: '',
    },
    imgList: [],
    showkelong: false,
    kelong: {
      top: 0,
      left: '',
      id: '2',
      nameIcon: '',
    },
    replace: {
      name: '',
    },
    tagShow: false,
    tagColumns: [{
        name: '温度适宜',
        checked: false
      },
      {
        name: '质量过关',
        checked: false
      }, {
        name: '环境优美',
        checked: false
      },
    ],
    type_act: '1',
    addressShow: false,
    areaList: areaList.areaList,
    showDate: false,
    shopName: '',
    order_id: '',
    lx_act: '温度适宜',
    ruleList: [{
      sizeName: '',
      prince: ''
    }],
    sizeTrue: true,
    columns:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        order_id: options.id
      })
      this.getData()
    } else {
      // 获取商铺信息
      sjDetail().then(res => {
        console.log(res);
        if (res.data.skm && res.data.wechat && res.data.xm) {
          this.setData({
            skmSrc: res.data.skm, //收款码
            wxhSrc: res.data.wechat, //微信二维码
            xm: res.data.xm, //客服姓名
          })
        } else {
          // 非编辑 请求 店铺信息
          Dialog.confirm({
              message: '请您先完善店铺信息',
            })
            .then(() => {
              // on confirm
              wx.navigateBack()
              wx.navigateTo({
                url: '/shop/pages/setting/setting',
              })
              // this.setData({
              //   sjShow: false
              // })
            })
            .catch(() => {
              // on cancel
              // this.setData({
              //   sjShow: false
              // })
              wx.navigateBack()
            });
        }
      })
    }
    this.goodsType()
  },
  goodsType(){
    goodsType().then(res=>{
      if(res){
        const arr = res.data.map(item=>{
          return item.mc
        })
        this.setData({
          columns:arr
        })
      }
    })
  },
  addRule() {
    const ruleList = this.data.ruleList
    ruleList.push({
      sizeName: '',
      prince: ''
    })
    this.setData({
      ruleList
    })
  },
  addGg(e) {
    let index = e.target.dataset.id;
    let ruleList = this.data.ruleList;
    ruleList[index].sizeName = e.detail.trim();
    this.setData({
      ruleList
    })
  },
  addJg(e) {
    console.log(typeof e.detail)
    let index = e.target.dataset.id;
    let ruleList = this.data.ruleList;
    if (e.detail > 0) {
      ruleList[index].prince = e.detail.trim();
    } else {
      ruleList[index].prince = '';
    }
    this.setData({
      ruleList
    })
  },
  jjTo(e) {
    console.log(e.detail)
    let index = e.target.dataset.id;
    let ruleList = this.data.ruleList;
    if (e.detail.value > 0) {
      ruleList[index].prince = Number(e.detail.value.trim()).toFixed(2);
    } else {
      ruleList[index].prince = '';
    }
    this.setData({
      ruleList
    })
  },
  // 编辑 请求
  getData() {
    GoodsDetail({
      goodId: this.data.order_id
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        const formData = res.data;
        this.data.items.forEach(item => {
          item.check = false
          if (item.value == formData.sfxp) {
            item.check = true
          }
        })
        this.setData({
          'form.name': formData.name,
          'form.shopTag': formData.trait,
          'form.distributionType': formData.distributionType,
          'form.address': formData.address,
          'form.explain': formData.introduction,
          'form.startDate': formData.valid_begin_time,
          'form.endDate': formData.valid_end_time,
          'form.checkbox1': formData.is_add_wechat,
          'form.checkbox2': formData.is_payment_voucher,
          'form.checkbox3': formData.is_explain,
          'form.checkbox4': formData.is_pay,
          'form.phone': formData.service_phone,
          'form.wechat': formData.wechat,
          'form.type': formData.type,
          imgList: formData.img.split(','),
          shopCoverImg: formData.detailPage,
          onState: formData.onState,
          skmSrc: formData.skm,
          wxhSrc: formData.wechat,
          Processing: formData.sfxp,
          items: this.data.items,
          ruleList: formData.goodsSizeList
        })

      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
    // wx.request({
    //   url: merchantGoodsDeatil + this.data.order_id,
    //   method: 'GET',
    //   success: (res) => {
    //     if (res.data.code === 200) {
    //       const formData = res.data.data;
    //       this.setData({
    //         'form.name': formData.name,
    //         'form.shopTag': formData.trait,
    //         type_act: formData.distributionType,
    //         'form.address': formData.address,
    //         'form.explain': formData.introduction,
    //         'form.startDate': formData.validBeginTime,
    //         'form.endDate': formData.validEndTime,
    //         'form.checkbox1': formData.isAddWechat,
    //         'form.checkbox2': formData.isPaymentVoucher,
    //         'form.checkbox3': formData.isExplain,
    //         'form.checkbox4': formData.isPay,
    //         'form.bcsm': formData.supplement,
    //         'form.phone': formData.servicePhone,
    //         'form.wechat': formData.wechat,
    //         imgList: formData.img.split(','),
    //         shopCoverImg: formData.detailPage,
    //         onState: formData.onState
    //       })
    //     } else {
    //       wx.showToast({
    //         icon: 'error',
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
  bcsmInput(event) {
    this.setData({
      'form.bcsm': event.detail
    })
  },
  explainInput(event) {
    this.setData({
      'form.explain': event.detail
    })
  },
  nameInput(event) {
    this.setData({
      'form.name': event.detail
    })
  },
  tagInput(event) {
    this.setData({
      shopName: event.detail.value
    })
  },
  changeLxTag(e) {
    let temp_check = `tagColumns[${e.currentTarget.dataset.idx}].checked`;
    let tag = this.data.form.shopTag
    console.log(tag);
    const newArr = tag && tag.split(',')
    if (newArr.indexOf(e.currentTarget.dataset.item.name) > -1) {
      newArr.map((item, idx) => {
        if (item === e.currentTarget.dataset.item.name) {
          newArr.splice(idx, 1)
        }
      })
    }
    this.setData({
      [temp_check]: !e.currentTarget.dataset.item.checked,
      'form.shopTag': newArr && newArr.join(',')
    })
  },
  confirm() {
    let str = ""
    this.data.tagColumns.map(item => {
      if (item.checked) {
        str += item.name + ','
        item.checked = false
      }
    })
    console.log(this.data.form.shopTag);
    if (this.data.form.shopTag) {
      str += this.data.form.shopTag
    }
    if (this.data.shopName) {
      str += this.data.shopName + ','
    }

    this.setData({
      'form.shopTag': str,
      tagShow: false,
      shopName: '',
    })
  },
  // 新品状态 
  radioChange(e) {
    console.log(e.detail);
    this.setData({
      Processing: e.detail.value
    })
  },
  formSubmit() {
    console.log(this.data.ruleList)
    const formData = this.data.form
    if (!formData.name) {
      wx.showToast({
        icon: 'error',
        title: '商品名称为空！',
      })
      return
    }
    if (!this.data.ruleList[0].sizeName || !this.data.ruleList[0].prince) {
      wx.showToast({
        icon: 'error',
        title: '请完善商品规格',
      })
      return
    }
    if (!this.data.type_act) {
      wx.showToast({
        icon: 'error',
        title: '配送类型为空！',
      })
      return
    }
    if(!formData.type){
      wx.showToast({
        icon: 'error',
        title: '商品分类为空！',
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
    if (this.data.imgList.length == 0) {
      wx.showToast({
        icon: 'error',
        title: '请添加主图！',
      })
      return
    }
    if (!phoneVerify(formData.phone)) return
    console.log(this.data.imgList);
    const imgListStr = this.data.imgList.join(',')

    // 编辑
    if (this.data.order_id) {
      this.data.ruleList.map(item => {
        item.goodsId = this.data.order_id
      })
      let params = {
        "onState": 1,
        id: this.data.order_id,
        sfxp: this.data.Processing,
        name: formData.name,
        type: formData.type,
        img: imgListStr,
        trait: formData.shopTag.slice(0, formData.shopTag.length - 1),
        logo: this.data.imgList[0],
        introduction: formData.explain,
        validBeginTime: formData.startDate === '开始日期' ? null : formData.startDate,
        validEndTime: formData.endDate === '结束日期' ? null : formData.endDate,
        isAddWechat: formData.checkbox1,
        isPay: formData.checkbox4,
        supplement: formData.bcsm,
        servicePhone: formData.phone,
        // wechat: formData.wechat,
        distributionType: this.data.type_act,
        detailPage: this.data.shopCoverImg,
        isPaymentVoucher: formData.checkbox2,
        isExplain: formData.checkbox3,
        storeId: wx.getStorageSync('userInfo').id || 1,
        goodsSizeList: this.data.ruleList
      }
      console.log('编辑');
      updateGoods(params).then(res => {
        if (res.code == 200) {
          // wx.navigateTo({
          //   url: '/shop/pages/shopManage/shopManage',
          // })
          wx.navigateBack({
            delta: 1,
          })
        }
        wx.showToast({
          icon: '',
          title: res.msg,
        })
      })
    } else {
      let params = {
        sfxp: this.data.Processing,
        name: formData.name,
        type: formData.type,
        img: imgListStr,
        trait: formData.shopTag.slice(0, formData.shopTag.length - 1),
        logo: this.data.imgList[0],
        introduction: formData.explain,
        validBeginTime: formData.startDate === '开始日期' ? null : formData.startDate,
        validEndTime: formData.endDate === '结束日期' ? null : formData.endDate,
        isAddWechat: formData.checkbox1,
        isPay: formData.checkbox4,
        supplement: formData.bcsm,
        servicePhone: formData.phone,
        // wechat: formData.wechat,
        distributionType: this.data.type_act,
        detailPage: this.data.shopCoverImg,
        isPaymentVoucher: formData.checkbox2,
        isExplain: formData.checkbox3,
        storeId: wx.getStorageSync('userInfo').id || 1,
        goodsSizeList: this.data.ruleList
      }
      // 新增
      addGoods(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          wx.showToast({
            icon: '',
            title: '添加成功',
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }

    // if (this.data.order_id) {
    //   wx.request({
    //     url: merchantGoodsUp,
    //     method: 'PUT',
    //     data: {
    //       name: formData.name,
    //       img: imgListStr,
    //       trait: formData.shopTag,
    //       logo: this.data.imgList[0],
    //       introduction: formData.explain,
    //       validBeginTime: formData.startDate,
    //       validEndTime: formData.endDate,
    //       isAddWechat: formData.checkbox1,
    //       isPay: formData.checkbox4,
    //       supplement: formData.bcsm,
    //       servicePhone: formData.phone,
    //       wechat: formData.wechat,
    //       distributionType: this.data.type_act,
    //       detailPage: this.data.shopCoverImg,
    //       isPaymentVoucher: formData.checkbox2,
    //       isExplain: formData.checkbox3,
    //       id: this.data.order_id,
    //       onState: "1"
    //     },
    //     success: (res) => {
    //       if (res.data.code === 200) {
    //         wx.showToast({
    //           icon: 'none',
    //           title: '操作成功',
    //         })
    //         setTimeout(() => {
    //           wx.navigateBack({
    //             delta: 2
    //           })
    //         }, 1500)
    //       } else {
    //         wx.showToast({
    //           icon: 'error',
    //           title: res.data.msg,
    //         })
    //       }
    //     }
    //   })
    // } else {
    //   wx.request({
    //     url: merchantGoodsUp,
    //     method: 'POST',
    //     data: {
    //       name: formData.name,
    //       img: imgListStr,
    //       trait: formData.shopTag,
    //       logo: this.data.imgList[0],
    //       introduction: formData.explain,
    //       validBeginTime: formData.startDate === '开始日期' ? '' : formData.startDate,
    //       validEndTime: formData.endDate === '结束日期' ? '' : formData.endDate,
    //       isAddWechat: formData.checkbox1,
    //       isPay: formData.checkbox4,
    //       supplement: formData.bcsm,
    //       servicePhone: formData.phone,
    //       wechat: formData.wechat,
    //       distributionType: this.data.type_act,
    //       detailPage: this.data.shopCoverImg,
    //       isPaymentVoucher: formData.checkbox2,
    //       isExplain: formData.checkbox3,
    //       storeId: wx.getStorageSync('userInfo').id || 1
    //     },
    //     success: (res) => {
    //       if (res.data.code === 200) {
    //         wx.showToast({
    //           icon: 'none',
    //           title: '操作成功',
    //         })
    //         setTimeout(() => {
    //           wx.navigateBack({
    //             delta: 1
    //           })
    //         }, 1500)
    //       } else {
    //         wx.showToast({
    //           icon: 'error',
    //           title: res.data.msg,
    //         })
    //       }
    //     }
    //   })
    // }
  },
  onChange4(event) {
    this.setData({
      'form.checkbox4': event.detail ? 1 : 0,
    });
  },
  onChange3(event) {
    this.setData({
      'form.checkbox3': event.detail ? 1 : 0,
    });
  },
  onChange2(event) {
    console.log(event);
    this.setData({
      'form.checkbox2': event.detail ? 1 : 0,
    });
  },
  onChange(event) {
    this.setData({
      'form.checkbox1': event.detail ? 1 : 0,
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
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
  changeType(e) {
    this.setData({
      type_act: e.currentTarget.dataset.type
    })
  },
  onAddressClose() {
    this.setData({
      addressShow: false
    })
  },
  confirmArea(e) {
    let name = ''
    for (const item of e.detail.values) {
      name += item.name
    }
    this.setData({
      addressShow: false,
      'form.address': name,
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
  onTagClose() {
    this.setData({
      tagShow: false
    })
  },
  onTagChange(e) {
    this.setData({
      'form.shopTag': e.detail.value,
      tagShow: false
    })
  },
  onFlShow() {
    this.setData({
      flShow: true
    })
  },
  onFlClose() {
    this.setData({
      flShow: false
    })
  },
  onFlConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(value)
    this.setData({
      'form.type': value,
      flShow: false
    })
  },
  onTagShow() {
    this.setData({
      tagShow: true
    })
  },
  OpenUpload() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: uploadFile,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: (res) => {
            const data = JSON.parse(res.data)
            that.setData({
              shopCoverImg: data.fileName
            })
          }
        })
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
      sizeTrue:true
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.chooseImage({
      count: 6 - pics.length,
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
        //           that.uploadList(tempFilePaths)
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
  dragStart: function (e) {
    var that = this
    var kelong = that.data.kelong
    var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.uploadBox').boundingClientRect(function (rect) {
      kelong.top = e.changedTouches[0].clientY - rect.top
      kelong.left = e.changedTouches[0].clientX - rect.left
      kelong.nameIcon = that.data.imgList[i]
      // console.log("dragStart", kelong.top,kelong.left)
      that.setData({
        kelong: kelong,
        showkelong: true
      })
    }).exec();
  },
  dragMove: function (e) {
    var that = this
    // var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    var kelong = that.data.kelong
    // var listnum = that.data.list.length
    // var list = that.data.list
    query.select('.uploadBox').boundingClientRect(function (rect) {
      kelong.top = e.changedTouches[0].clientY - rect.top
      kelong.left = e.changedTouches[0].clientX - rect.left
      // console.log("dragMove",kelong.left,rect.width)
      if (kelong.top < 77) {
        kelong.top = 77
      } else if (kelong.top > rect.height) {
        // console.log("dragMove",kelong.top)
        kelong.top = rect.height
      }
      if (kelong.left < 16) {
        kelong.left = 16
      } else if (kelong.left > (rect.width - 85)) {
        // console.log("dragMove",kelong.top)
        kelong.left = rect.width - 85
      }
      that.setData({
        kelong: kelong,
      })
    }).exec();
  },
  dragEnd: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index
    var query = wx.createSelectorQuery();
    var kelong = that.data.kelong
    // var listnum = that.data.list.length
    var list = that.data.imgList
    query.select('.uploadBox').boundingClientRect(function (rect) {
      kelong.top = e.changedTouches[0].clientY - rect.top
      kelong.left = (e.changedTouches[0].clientX - rect.left) > 300 ? 290 : e.changedTouches[0].clientX - rect.left
      // console.log("dragEnd", kelong.left,kelong.top)
      var targetY = parseInt(kelong.top / 75)
      var targetX = parseInt(kelong.left / 75)
      var replace = that.data.replace
      // console.log(targetY,targetX);
      if (targetY >= 0) {
        // 互换位置
        // replace.name = list[target].name
        // list[target].name = list[i].name
        // list[i].name = replace.name

        // 位置下沿
        replace = list.splice(i, 1);
        if (replace.length > 0) {
          list.splice(targetX, 0, replace[0]);
        }
      }
      that.setData({
        imgList: list,
        showkelong: false
      })
    }).exec();
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