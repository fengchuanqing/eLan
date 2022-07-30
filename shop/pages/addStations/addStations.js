const chooseLocation = requirePlugin('chooseLocation');
import {
  ztdxq,
  uploadFile,
  img,
  tjztd,
} from '../../api'
import {phoneVerify} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    fmSrc: '',
    checked: true,
    name: '',
    _id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        _id: options.id
      })
      this.getData()
    }
    // sjDetail().then(res => {
    //   if (res.code == 200) {
    //     this.setData({
    //       storeId: res.data.storeId
    //     })
    //   }
    // })
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
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if(location){
      this.setData({
        zw:location.address+location.name,
        location
      })
    }
  },
  
  goCut(){
    wx.navigateTo({
      url: '/micro/pages/cropper/cropper?cuttype=1&isZ=2&fm=1',
    })
  },
  getLoaction() {
    const key = 'TQHBZ-KRQY4-O54UD-XZCGV-BZMEZ-WGBN7'; //使用在腾讯位置服务申请的key
    const referer = 'e兰茗果'; //调用插件的app的名称
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const location = JSON.stringify({
          latitude: res.latitude,
          longitude: res.longitude
        });
        wx.navigateTo({
          url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
        });
      }
    })
  },
  submit() {
    let {
      name:mc,
      zw:dq,
      mobile:dh,
      checked,
      fmSrc:tp,
      xxdz,
      lxr,
      _id:id,
      location
    } = this.data
    if (!tp) {
      wx.showToast({
        icon: 'none',
        title: '请上传场景照/门面照',
      })
      return
    }
    if (!mc) {
      wx.showToast({
        icon: 'none',
        title: '请输入自提点名称',
      })
      return
    }
    if (!dq) {
      wx.showToast({
        icon: 'none',
        title: '请选择定位',
      })
      return
    }
    if (!xxdz) {
      wx.showToast({
        icon: 'none',
        title: '请输入详细地址',
      })
      return
    }
    if (!lxr) {
      wx.showToast({
        icon: 'none',
        title: '请输入联系人',
      })
      return
    }
    if (!dh) {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号码',
      })
      return
    }
    if (!phoneVerify(dh)) {
      return false
    }
    let zt = checked ? 1 : 0
    const params = {
      tp,
      mc,
      dq,
      xxdz,
      lxr,
      dh,
      zt,
      jd:location.longitude,
      wd:location.latitude,
      id,
      storeId:wx.getStorageSync('userInfo').storeId,
    }
    wx.showModal({
      title: '提示',
      content: id?'确认修改该自提点吗？':'确认添加该自提点吗？',
      success: (res) => {
        if (res.confirm) {
          tjztd(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                icon: 'success',
                title: '操作成功',
                success: () => {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onStateChange({
    detail
  }) {
    this.setData({
      checked: detail
    });
  },
  getData() {
    ztdxq({
      id: this.data._id
    }).then(res => {
      if (res.code == 200) {
        const {
          tp: fmSrc,
          mc:name,
          xxdz,
          lxr,
          dq:zw,
          dh:mobile,
          zt,
          jd:longitude,
          wd:latitude
        } =  res.data
        let checked = zt === 0 ? false : true
        let location={
          longitude,
          latitude
        }
        this.setData({
          fmSrc,
          xxdz,
          lxr,
          name,
          mobile,
          zw,
          checked,
          location
        })
      }
    })
  },
  upload() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({
          title: '加载中...',
        })
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: uploadFile,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          success: (res) => {
            wx.hideLoading()
            const data = JSON.parse(res.data)
            this.setData({
              fmSrc: data.fileName
            })
          },
          fail() {
            wx.hideLoading()
          }
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