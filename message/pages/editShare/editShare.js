const chooseLocation = requirePlugin('chooseLocation');
import {
  phoneVerify
} from '../../../utils/util'
import {
  xzxglk,
  lkxq
} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_step: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      wx.setNavigationBarTitle({
        title: "编辑冷库"
      })
      this.setData({
        _id: options.id
      })
      this.getData()
    }
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
    if (location) {
      this.setData({
        lkwz: location.address + location.name,
        location
      })
    }
  },
  getData() {
    lkxq({
      id: this.data._id
    }).then(res => {
      if (res.code == 200) {
        let {
          dq: lkwz,
          xm,
          lxdh,
          lkmc,
          kgxrl,
          xxdz,
          sfbz,
          lkjs,
          jd: longitude,
          wd: latitude
        } = res.data
        let location = {
          longitude,
          latitude
        }
        this.setData({
          lkwz,
          xm,
          lxdh,
          lkmc,
          kgxrl,
          xxdz,
          sfbz,
          lkjs,
          location
        })
      }
    })
  },
  save() {
    let {
      lkmc,
      kgxrl,
      lkwz: dq,
      xxdz,
      sfbz,
      lkjs,
      xm,
      lxdh,
      _id
    } = this.data
    if (!lkmc) {
      wx.showToast({
        icon: 'none',
        title: '请输入冷库名称',
      })
      return
    }
    if (!kgxrl) {
      wx.showToast({
        icon: 'none',
        title: '请输入可共享容量',
      })
      return
    }
    if (!dq) {
      wx.showToast({
        icon: 'none',
        title: '请选择冷库位置',
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
    let params = {
      lkmc,
      kgxrl,
      dq,
      xxdz,
      sfbz,
      lkjs,
      xm,
      lxdh,
      openid: wx.getStorageSync('thirdSession').openid,
      jd: this.data.location.longitude,
      wd: this.data.location.latitude,
      zt: 1
    }
    if (_id) {
      params.id = _id
    }
    xzxglk(params).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '保存成功',
          success: () => {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      }
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      lkjs: e.detail.value
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
  next() {
    let {
      xm,
      lxdh
    } = this.data
    if (!xm) {
      wx.showToast({
        icon: 'none',
        title: '请输入用户名',
      })
      return
    }
    if (!lxdh) {
      wx.showToast({
        icon: 'none',
        title: '请输入联系电话',
      })
      return
    }
    if (!phoneVerify(lxdh)) return
    this.setData({
      cur_step: 2
    })
  },
  pre() {
    this.setData({
      cur_step: 1
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