import {
  getDwByLx
} from '../../../apis/micro'
import {
  distance
} from '../../../utils/util'
import {
  records
} from '../../assets/ymczx'
var timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: {},
    dateTime: '',
    menuList: [{
        id: 0,
        name: '园区介绍',
        url: '/micro/assets/icon_yqjs.png',
        url_act: '/micro/assets/icon_act_yqjs.png',
      },
      {
        id: 1,
        name: '景点',
        url: '/micro/assets/icon_jd.png',
        url_act: '/micro/assets/icon_act_jd.png',
      },
      {
        id: 2,
        name: '采摘线',
        url: '/micro/assets/icon_czd.png',
        url_act: '/micro/assets/icon_act_czd.png',
      },
      {
        id: 3,
        name: '餐饮',
        url: '/micro/assets/icon_cy.png',
        url_act: '/micro/assets/icon_act_cy.png',
      },
      {
        id: 4,
        name: '出入口',
        url: '/micro/assets/icon_crk.png',
        url_act: '/micro/assets/icon_act_crk.png',
      },
      {
        id: 5,
        name: '厕所',
        url: '/micro/assets/icon_cs.png',
        url_act: '/micro/assets/icon_act_cs.png',
      },
      {
        id: 6,
        name: '停车场',
        url: '/micro/assets/icon_tcc.png',
        url_act: '/micro/assets/icon_act_tcc.png',
      },
    ],
    cur_menu: 0,
    markers: [{
      id: 'd',
      latitude: 29.29,
      longitude: 119.6,
      width: '39rpx',
      height: '54rpx',
      iconPath: '/micro/assets/marker_3.png',
    }],
    curMarkers: {},
    // 园区介绍
    yqjsShow: false,
    // 采摘线
    cur_czxTab: '附近'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        cur_menu: Number(options.type),
      })
      if (Number(options.type) === 2) {
        this.setData({
          czxShow: true
        })
      }
      if (Number(options.type) == 0) {
        this.setData({
          yqjsShow: true,
        })
      }
      this.getDwByLx(Number(options.type))
    }
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      let type = scene.split('=')[1]
      this.setData({
        cur_menu: Number(type),
        czxShow: true
      })
      this.getDwByLx(Number(type))
    }
    this.setData({
      dateTime: this.getNowTime()
    })
    timer = setInterval(() => {
      this.setData({
        dateTime: this.getNowTime()
      })
    }, 1000)
    // 获取当前坐标
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          curLat: res.latitude,
          curLon: res.longitude
        })
      }
    })
    this.getWd()
    this.getKq()
    this.getJy()
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

  getNear() {
    const nearList = []
    records.map(item => {
      item.jl = distance(this.data.curLat, this.data.curLon, item.latitude, item.longitude)
      if (item.jl <= 6) {
        nearList.push(item)
      }
    })
    this.setData({
      czyList: nearList,
      nearList
    })
  },
  getFar() {
    const farList = []
    records.map(item => {
      item.jl = distance(this.data.curLat, this.data.curLon, item.latitude, item.longitude)
      farList.push(item)
    })
    this.setData({
      farList
    })
  },
  getJy() {
    wx.request({
      url: 'https://szsn.lx.gov.cn/lxAqi/api/getAqi/1469',
      method: 'get',
      success: (res) => {
        if (res) {
          this.setData({
            'today.jy': res.data.tips
          })
        }
      }
    })
  },
  getWd() {
    wx.request({
      url: 'https://szsn.lx.gov.cn/bsAPI/atmosphere/temperatureList',
      method: 'get',
      success: (res) => {
        if (res) {
          this.setData({
            'today.wd': res.data.data[0].Ftemp
          })
        }
      }
    })
  },
  getKq() {
    wx.request({
      url: 'https://szsn.lx.gov.cn/bsAPI/atmosphere/airQuality',
      method: 'get',
      success: (res) => {
        if (res) {
          this.setData({
            'today.kqzs': res.data.data.quality
          })
        }
      }
    })
  },
  changeCzxTab(e) {
    const {
      item
    } = e.currentTarget.dataset
    if (item == '附近') {
      this.setData({
        czyList: this.data.nearList
      })
    } else {
      this.setData({
        czyList: this.data.farList
      })
    }
    this.setData({
      cur_czxTab: item
    })
  },
  callouttap(e) {
    if (this.data.cur_menu !== 2) return
    const markers = this.data.markers
    let mc = markers.find(item => item.id === e.markerId).mc
    let curMarkers = markers.find(item => item.id === e.markerId)
    let curCzyList = records.filter(item => {
      return item.xlmc === mc
    })
    // curMarkers.jl=distance(this.data.curLat, this.data.curLon, curMarkers.latitude, curMarkers.longitude)
    this.setData({
      jdShow: true,
      czxShow: false,
      curMarkers,
      curCzyList
    })
  },
  markertap(e) {
    console.log('@@@ markertap', e)
    if (e.markerId === 900000001) return
    if (this.data.cur_menu == 2) return
    let curMarkers = {}
    const markers = this.data.markers
    markers.map(item => {
      if (item.id === e.markerId) {
        item.iconPath = item.iconPath3
        item.callout.bgColor = '#f7295e'
        curMarkers = item
      } else {
        if (item.id != 'd') {
          item.iconPath = item.iconPath2
          if (item.callout) item.callout.bgColor = '#428ffc'
        }
      }
    })
    curMarkers.jl = distance(this.data.curLat, this.data.curLon, curMarkers.latitude, curMarkers.longitude)
    this.setData({
      markers,
      jdShow: true,
      curMarkers
    })
  },
  onClose(e) {
    const {
      type
    } = e.currentTarget.dataset
    this.setData({
      [type]: false
    })
  },
  // 拨打电话
  openPhone(item) {
    wx.makePhoneCall({
      phoneNumber: item.currentTarget.dataset.item.lxdh,
    })
  },
  goThere(e) {
    const item = e.currentTarget.dataset.item
    wx.openLocation({
      longitude: parseFloat(item.longitude),
      latitude: parseFloat(item.latitude),
      scale: 28,
      name: item.xlmc?item.xlmc:(item.callout.content + (this.data.cur_menu === 2 ? '号采摘线' : '')),
      address: item.js,
      success: res => {
        console.log(res)
      }
    })
  },
  changeMenu(e) {
    const {
      idx
    } = e.currentTarget.dataset
    if (idx === 0) {
      this.setData({
        yqjsShow: true,
        czxShow: false,
        jdShow: false
      })
    } else if (idx === 2) {
      this.setData({
        czxShow: true,
        yqjsShow: false,
        jdShow: false
      })
    } else {
      this.setData({
        yqjsShow: false,
        czxShow: false,
        jdShow: false
      })
    }
    this.setData({
      cur_menu: idx,
      markers: [{
        id: 'd',
        latitude: 29.29,
        longitude: 119.6,
        width: '39rpx',
        height: '54rpx',
        iconPath: '/micro/assets/marker_3.png',
      }]
    })
    this.getDwByLx(idx)
  },
  getDwByLx(idx) {
    let name = this.data.menuList.find(item => item.id === idx).name
    if (idx == 3) {
      name = '农家乐'
    }
    if (idx == 5) {
      name = '洗手间'
    }
    // let 
    wx.request({
      url: 'https://szsn.lx.gov.cn' + getDwByLx,
      data: {
        lx: name
      },
      method: 'get',
      success: (res) => {
        if (res.data.code === 1) {
          const resl = res.data.data
          let markers;
          if (idx === 2) {
            markers = resl.map(item => {
              return {
                id: item.id,
                latitude: item.wd,
                longitude: item.jd,
                width: '38rpx',
                height: '42rpx',
                iconPath: 'https://szsn.lx.gov.cn/' + item.tb,
                iconPath2: 'https://szsn.lx.gov.cn/' + item.tb,
                js: item.js,
                lxdh: item.lxdh,
                mc: item.mc,
                sort: item.sort,
                callout: {
                  content: item.sort,
                  bgColor: 'transparent',
                  color: '#fff',
                  fontSize: '23rpx',
                  display: 'ALWAYS',
                  anchorY: 27,
                  padding: 6
                },
              }
            })
          } else {
            markers = resl.map(item => {
              return {
                id: item.id,
                latitude: item.wd,
                longitude: item.jd,
                width: '38rpx',
                height: '42rpx',
                iconPath: 'https://szsn.lx.gov.cn/' + item.tb,
                iconPath2: 'https://szsn.lx.gov.cn/' + item.tb,
                iconPath3: 'https://szsn.lx.gov.cn/' + item.tb2,
                logo: 'https://szsn.lx.gov.cn/' + item.logo,
                js: item.js,
                lxdh: item.lxdh,
                dz: item.dz,
                callout: {
                  content: item.mc,
                  bgColor: '#428ffc',
                  color: '#fff',
                  fontSize: '15rpx',
                  display: 'ALWAYS',
                  anchorY: 40,
                  padding: 5
                },
              }
            })
          }
          this.setData({
            markers: [...markers, ...this.data.markers]
          })
          this.getNear()
          this.getFar()
        }
      }
    })
  },
  //获取当前时间
  getNowTime: function () {
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    var year = date.getFullYear(); //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    var month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
    // 周
    var week = "日一二三四五六".charAt(date.getDay())
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();
    var time = year + '年' + this.addZero(month) + '月' + this.addZero(day) + '日  星期' + week + ' ' + this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
    return time;
  },
  //小于10的拼接上0字符串
  addZero: function (s) {
    return s < 10 ? ('0' + s) : s;
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
    clearInterval(timer)
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