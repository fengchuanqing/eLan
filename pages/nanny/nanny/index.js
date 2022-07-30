// pages/nanny/nanny/index.js
import {
  wbmlx,
  wbm,
  wbmbxk,
  fwd,
  fwdyhxxcx,
  domain
} from "../../../apis/wbm";
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    domain,
    active: 0, // 四个切换
    list: [], //农资店
    PageNum: 1, //页码
    list2: [], //快递点
    tabs: [], //header
  },
  onClose() {
    this.setData({
      showFwd: false
    })
  },
  showTeam(e) {
    console.log('获取用户是否填写基本信息');
    const openid = wx.getStorageSync('thirdSession').openid
    // phone = ""
    fwdyhxxcx(openid).then((res) => {
      if (res) {
        console.log(res.data);
        let yitian = false;
        if (res.data.length > 0) {
          yitian = true
        }
        if (yitian) {
          // 已填写
          Dialog.confirm({
              title: '标题',
              message: '您已填写完信息是否重新填写?',
            })
            .then(() => {
              // on confirm
              // 修改个人信息
              wx.navigateTo({
                url: "../jbxx/index?item=" + JSON.stringify(res.data[0])+'&fwd=' + JSON.stringify(e.currentTarget.dataset.item.dyList),
              })
            })
            .catch(() => {
              this.setData({
                showFwd: true,
                fwdList: e.currentTarget.dataset.item.dyList
              })
            });
        } else {
          // 未填写
          // 新增个人信息
          wx.navigateTo({
            url: "../jbxx/index?item=",
          })
        }
      }
    })
  },
  openXinxi() {
    wx.navigateTo({
      url: "../revie/review",
    })

  },
  goThere(item) {
    console.log(item);
    wx.openLocation({
      longitude: parseFloat(item.currentTarget.dataset.item.jd),
      latitude: parseFloat(item.currentTarget.dataset.item.wd),
      scale: 28,
      name: item.currentTarget.dataset.item.mc,
      address: item.currentTarget.dataset.item.dw,
      success: res => {
        console.log(res)
      }
    })
  },
  // 拨打电话
  openPhone(item) {
    console.log(item.currentTarget.dataset.item.lxfs);
    Dialog.confirm({
        title: '拨打电话?',
        message: item.currentTarget.dataset.item.lxfs,
      })
      .then(() => {
        // on confirm
        wx.makePhoneCall({
          phoneNumber: item.currentTarget.dataset.item.lxfs,
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
    this.setData({
      list: [],
      list2: [],
      PageNum: 1,
      active: event.detail.name
    })
    console.log(event.detail.name);
    if (event.detail.name == 0) {
      this.getList()
    } else if (event.detail.name == 1) {
      this.getList2()
    } else if (event.detail.name == 2) {
      if (!wx.getStorageSync('userInfo').lxdh) {
        this.setData({
          showAuthentication: true,
          authUrl: '/pages/attestation/attestation'
        })
      }
      this.getList3()
    } else if (event.detail.name == 3) {
      this.getList4()
    }
  },
  // 农资店
  getList() {
    let that = this;
    wbm({
      lx: 1,
      pageNum: that.data.PageNum,
      // pageSize:120
    }).then((res) => {
      if (res) {
        wx.showLoading()
        let arr = this.data.list
        res.data.forEach(element => {
          element.tagArr = element.bz?.split(',')
          element.jl = that.distance(that.data.curLat, that.data.curLon, element.wd, element.jd)
          arr.push(element)
        });
        arr.sort(this.compare('jl'))
        that.setData({
          list: arr
        })
        wx.hideLoading()
      }
    })
  },
  compare(property) {
    return (a, b) => {
      return a[property] - b[property]
    }
  },
  // 快递点
  getList2() {
    let that = this;
    wbm({
      lx: 2,
      pageNum: this.data.PageNum
    }).then((res) => {
      if (res) {
        wx.showLoading()
        // let arr = this.data.list2
        let arr = []
        res.data.forEach(element => {
          if (element.wd && element.jd) {
            element.jl = that.distance(that.data.curLat, that.data.curLon, element.wd, element.jd)
            arr.push(element)
          }
        })
        arr.sort(this.compare('jl'))
        that.setData({
          list2: arr
        })
        wx.hideLoading()
      }
    })
  },
  // 服务队
  getList3() {
    let that = this;
    fwd(this.data.PageNum).then((res) => {
      if (res) {
        res.data.forEach(element => {
          element.lxArr = element.lx.split(',')
          that.data.list.push(element)
        })
        that.setData({
          list: that.data.list
        })
      }
    })
  },
  // 保鲜库
  getList4() {
    let that = this;
    wbmbxk(this.data.PageNum).then((res) => {
      if (res) {
        res.data.forEach(element => {
          that.data.list.push(element)
        })
        that.setData({
          list: that.data.list
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  // 计算 两经纬度 距离 km
  distance: function (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  },
  onLoad: function (options) {
    if (options.act) {
      this.setData({
        active: Number(options.act)
      })
    }
    // 获取当前坐标
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          curLat: res.latitude,
          curLon: res.longitude
        })
        if (this.data.active == 0) {
          this.getList() //农资店
        } else if (this.data.active == 1) {
          this.getList2() //快递点
        } else if (this.data.active == 2) {
          this.getList3() //服务队
        } else if (this.data.active == 3) {
          this.getList4() //保鲜点
        }
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
    console.log('触底了');
    this.setData({
      PageNum: this.data.PageNum + 1
    })
    if (this.data.active == 0) {
      // this.getList() //农资店
    } else if (this.data.active == 1) {
      // this.getList2() //快递点
    } else if (this.data.active == 2) {
      this.getList3() //服务队
    } else if (this.data.active == 3) {
      this.getList4() //保鲜点
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})