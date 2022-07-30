import {
  zwlb,
  ygxq,
  uploadFile,
  img,
  xzyg,
  xgyg
} from '../../api'
import {
  sjDetail,
} from '../../../apis/message.js'
import {phoneVerify} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    columns: [],
    headPortrait: '',
    showZw: false,
    zwList: [],
    radio: '男',
    checked: true,
    name: '',
    _id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getzwlb()
    if (options.id) {
      this.setData({
        _id: options.id
      })
    }
    sjDetail().then(res => {
      if (res.code == 200) {
        this.setData({
          storeId: res.data.storeId
        })
      }
    })
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

  },
  submit() {
    let {
      name,
      radio: sex,
      zw,
      mobile,
      checked,
      headPortrait,
      _id
    } = this.data
    if (!headPortrait) {
      wx.showToast({
        icon: 'none',
        title: '头像不可为空',
      })
      return
    }
    if (!name) {
      wx.showToast({
        icon: 'none',
        title: '姓名不可为空',
      })
      return
    }
    if (!mobile) {
      wx.showToast({
        icon: 'none',
        title: '手机号不可为空',
      })
      return
    }
    if (!phoneVerify(mobile)) {
      return false
    }
    let positionId = this.data.zwList.find(item => item.name == zw).id
    let state = checked ? '0' : '1'
    const params = {
      name,
      sex,
      mobile,
      headPortrait,
      positionId,
      state
    }
    if (_id) {
      params.id = _id
      wx.showModal({
        title: '提示',
        content: '确认修改该员工吗？',
        success: (res) => {
          if (res.confirm) {
            xgyg(params).then(res => {
              if (res.code == 1) {
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
    } else {
      params.storeId = this.data.storeId
      wx.showModal({
        title: '提示',
        content: '确认添加该员工吗？',
        success: (res) => {
          if (res.confirm) {
            xzyg(params).then(res => {
              if (res.code == 1) {
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
    }

  },
  onStateChange({
    detail
  }) {
    this.setData({
      checked: detail
    });
  },
  onSexChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  showPopup() {
    this.setData({
      showZw: true
    })
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      zw: value,
      showZw: false
    })
  },
  onCancel() {
    this.setData({
      showZw: false
    })
  },
  getData() {
    ygxq({
      id: this.data._id
    }).then(res => {
      if (res.code == 1) {
        const obj = res.data[0]
        const {
          head_portrait: headPortrait,
          position_id,
          name,
          sex: radio,
          mobile,
          state
        } = obj
        let zw = this.data.zwList.find(item => item.id == position_id).name
        let checked = state == "1" ? false : true
        this.setData({
          headPortrait,
          name,
          mobile,
          radio,
          zw,
          checked
        })
      }
    })
  },
  getzwlb() {
    zwlb().then(res => {
      if (res.code === 1) {
        let arr = res.data.map(item => {
          return item.name
        })
        this.setData({
          columns: arr,
          zwList: res.data
        })
        if (this.data._id) {
          this.getData()
        }
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
              headPortrait: data.fileName
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