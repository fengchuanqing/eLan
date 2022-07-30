import {
  getXcxUserInfo,
} from '../../../apis/index'
import {
  getAllType,
  ckzt,
} from '../../../apis/gylz'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showEdit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllType()
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
    this.testRz()
  },
  testRz() {
    const param = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    getXcxUserInfo(param).then(res => {
      if (res) {
        const userInfo = res.data
        if (!userInfo.sfzhm) {
          wx.showModal({
            title: '提示',
            content: '请先实名认证',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/studyPlant/attestation/index',
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })
          return
        }
        if (!userInfo.ztid) {
          wx.showModal({
            title: '提示',
            content: '未查询到主体信息，是否申请加入？',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/gylz/pages/addZt/addZt',
                })
              } else if (res.cancel) {

              }
            }
          })
        }
        this.setData({
          showEdit: true,
          ztid:userInfo.ztid
        })
        if (userInfo.ztid) {
          this.getZt(userInfo.ztid)
        }
      }
    })
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
          map
        } = res.data
        const {
          lxData
        } = this.data
        let cyList = Object.values(map).map(item => {
          return {
            zdcylx: item[0].zdcylx,
            zzList: item
          }
        })
        this.setData({
          ztlx: lxData.find(item => item.XH == secType).QYLXMC,
          name,
          contacts,
          idCard,
          telephone,
          ssxz: townName,
          ssc: countryName,
          address,
          cyList
        })
      }
    })
  },
  getAllType() {
    getAllType().then(res => {
      if (res.code == 1) {
        this.setData({
          lxData: res.data,
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