import {
  domain,
  indexPageBanner
} from "../../../apis/index.js"
import {
  qylb,
  tdlxlb,
  nyydlb
} from "../../../apis/gylz.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain,
    domain2: domain + '/bsApi',
    swiperList: [{
      img: ''
    }],
    curNav: 1,
    option1: [{
      text: '全部区域',
      value: 0
    }],
    option2: [{
      text: '全部类型',
      value: 0
    }],
    option3: [{
        text: '综合排序',
        value: 'zhpx'
      },
      {
        text: '最近更新',
        value: 'sj'
      },
      {
        text: '面积小-大',
        value: 'mjx'
      },
      {
        text: '面积大-小',
        value: 'mjd'
      },
    ],
    option4: [{
        text: '全部',
        value: '全部'
      },
      {
        text: '出租',
        value: '出租'
      },
      {
        text: '转让',
        value: '转让'
      },
      {
        text: '转包',
        value: '转包'
      },
    ],
    option5: [{
        text: '全部',
        value: '全部'
      },
      {
        text: '出租',
        value: '出租'
      },
      {
        text: '转让',
        value: '转让'
      },
      {
        text: '转包',
        value: '转包'
      },
    ],
    option6: [{
        text: '全部',
        value: '全部'
      },
      {
        text: '求租',
        value: '求租'
      },
      {
        text: '求购',
        value: '求购'
      },
    ],
    value1: 0,
    value2: 0,
    value3: 'zhpx',
    value4: '全部',
    isColumn: false,
    nyList: [],
    pageSize: 10,
    pageNum: 1,
    isReachBottom: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getindexPageBanner()
    this.getqylb()
    this.gettdlxlb()
  },
  changeCol1(e) {
    console.log(e);
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value1: e.detail
    })
    this.getnyydlb()
  },
  changeCol2(e) {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value2: e.detail
    })
    this.getnyydlb()
  },
  changeCol4(e) {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value4: e.detail
    })
    this.getnyydlb()
  },
  changeCol3(e) {
    this.setData({
      pageNum: 1,
      isReachBottom: true,
      nyList: [],
      value3: e.detail
    })
    this.getnyydlb()
  },
  // 用地列表
  getnyydlb() {
    const params = {
      ydlx: this.data.curNav,
      czfs: this.data.value4,
      pxlx: this.data.value3,
      qybm: this.data.value1,
      tdlx: this.data.value2,
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    nyydlb(params).then(res => {
      if (res) {
        const data = res.data;
        if (data.length < 10) {
          this.setData({
            isReachBottom: false
          })
        }
        let arr = data
        arr.forEach(item => {
          item.tpOne = item.tp?.split(',')[0]
        })
        this.setData({
          // nyList: [...arr, ...data]
          nyList: arr
        })

      }
    })
  },
  // 土地类型列表
  gettdlxlb() {
    tdlxlb().then(res => {
      if (res) {
        const data = res.data;
        let arr = []
        data.map(item => {
          arr.push({
            text: item.lxmc,
            value: item.id
          })
        })
        this.setData({
          option2: [...this.data.option2, ...arr]
        })
      }
    })
  },
  // 区域列表
  getqylb() {
    qylb().then(res => {
      if (res) {
        const data = res.data;
        let arr = []
        data.map(item => {
          arr.push({
            text: item.region_name,
            value: item.region_code
          })
        })
        this.setData({
          option1: [...this.data.option1, ...arr]
        })
      }
    })
  },
  // banner
  getindexPageBanner() {
    indexPageBanner().then(res => {
      if (res) {
        this.setData({
          swiperList: res.data.gylzLbt
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
    this.setData({
      pageNum:1,
      isReachBottom:true,
      nyList:[]
    })
    this.getnyydlb()
  },
  changeNav(e) {
    const idx = e.currentTarget.dataset.idx
    if (idx === 2) {
      this.setData({
        option4: this.data.option6
      })
    } else {
      this.setData({
        option4: this.data.option5,
      })
    }
    this.setData({
      value4: '全部',
      curNav: idx,
      pageNum: 1,
      nyList: [],
      isReachBottom: true
    })
    this.getnyydlb()
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
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getnyydlb()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})