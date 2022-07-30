// message/pages/spShop/spShop.js
import {
  dpqylx,
  uploadFile,
  img,
  kdzlsqxq
} from '../../../apis/message.js'
import {
  areaList
} from '../../../utils/area-data.js'
import {
  phoneVerify,
  telephoneReg
} from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showLx: false,
    uploadFile,
    dplx: '请选择',
    areaList,
    fileList: [],
    dplxList: [],
    listdNjz: [],
    titleSjlx: '',
    dpmc: '',
    dplx: '',
    szcs: '浙江省-金华市-兰溪市',
    xxdz: '',
    dpdh: '',
    sjhm: wx.getStorageSync('userInfo').lxdh || '',
    img,
    fmSrc: ''
  },
  goCut() {
    wx.navigateTo({
      url: '/micro/pages/cropper/cropper?cuttype=1&isZ=2&fm=1',
    })
  },
  delImg(event) {
    const idx = event.detail.index
    const {
      listdNjz
    } = this.data
    listdNjz.splice(idx, 1)
    this.setData({
      listdNjz
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
  afterReadNjz(event) {
    const {
      file
    } = event.detail;
    console.log(event.detail)
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 10000);
    for (let i in file) {
      wx.uploadFile({
        url: uploadFile,
        filePath: file[i].url,
        name: 'file',
        formData: {},
        success: (res) => {
          console.log(JSON.parse(res.data).fileName);
          that.setData({
            listdNjz: [...that.data.listdNjz, {
              url: that.data.img + JSON.parse(res.data).fileName
            }]
          });
          wx.hideLoading()
        }
      })
    }

  },
  blur(e) {
    console.log(e);
    let key = e.currentTarget.dataset.datakey
    let value = e.detail.value
    if (key == 0 && value == '') {
      this.setData({
        dpmc: ''
      })
    } else if (key == 5 && value != '') {
      phoneVerify(value)
    } else if (key == 4 && value != '') {
      telephoneReg(value)
    }
  },
  showPopupLx() {
    this.setData({
      showLx: true
    });
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onCancel({
    currentTarget: {
      dataset
    }
  }) {
    if (dataset.lx == 'sj') {
      this.setData({
        showLx: false
      });
    }
    this.setData({
      show: false
    });

  },
  onConfirm({
    currentTarget,
    detail
  }) {
    if (currentTarget.dataset.lx == 'sj') {
      this.setData({
        showLx: false,
        dplx: detail.value.text
      });
    } else {
      this.setData({
        show: false,
        szcs: detail.values[0].name + '-' + detail.values[1].name + '-' + detail.values[2].name
      })
    }
  },
  navTo() {
    let {
      dpmc,
      dplx,
      szcs,
      xxdz,
      dpdh,
      sjhm,
      fileList,
      listdNjz,
      fmSrc,
      img
    } = this.data
    fileList = [{
      url: fmSrc
    }]
    if (dpmc == '' || dplx == '' || szcs == '' || xxdz == '' || sjhm == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'error'
      })
    } else {
      if (dplx !== '规模大户' && fileList.length <= 0) {
        wx.showToast({
          title: '请添加门头照',
          icon: 'error'

        })
        return
      }
      if (dplx !== '规模大户' && listdNjz.length < 2) {
        wx.showToast({
          title: '至少两张内景照',
          icon: 'error'
        })
        return
      }
      let shopData = {
        dpmc,
        dplx,
        szcs,
        xxdz,
        dpdh,
        sjhm,
        fileList,
        listdNjz
      }
      if (!phoneVerify(sjhm)) {
        return false
      }
      // if (!telephoneReg(dpdh)) {
      //   return false
      // }

      wx.setStorageSync('shopData', shopData)
      wx.navigateTo({
        url: '/message/pages/shopProve/shopProve',
      })

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dpqylx().then((res) => {
      if (res) {
        console.log(res);
        this.setData({
          dplxList: res.data.reduce((acc, cur) => acc.concat({
            text: cur.lxmc
          }), []),
          titleSjlx: res.data[0].sszt,
          dplx: res.data.reduce((acc, cur) => acc.concat({
            text: cur.lxmc
          }), [])[0].text
        })
      }
    })
    this.kdzlsqxq()
  },
  kdzlsqxq() {
    kdzlsqxq({
      openid: wx.getStorageSync('thirdSession').openid
    }).then(res => {
      if (res.code == 200) {
        let tpList = res.data.tpList
        let fmSrc = '',
          listdNjz = []
        tpList.map(item => {
          if (item.lx == "门头照") {
            fmSrc = item.tplj
          }
          if (item.lx == "内景照") {
            item.tplj && item.tplj.split(',').map(ite => listdNjz.push({
              url: ite
            }))
          }
        })
        let {
          qymc: dpmc,
          lx: dplx,
          dz: szcs,
          xxdz,
          dh: dpdh,
          sjhm
        } = res.data
        console.log(listdNjz)
        this.setData({
          fmSrc,
          listdNjz,
          dpmc,
          dplx,
          szcs,
          xxdz,
          dpdh,
          sjhm
        })
      }
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