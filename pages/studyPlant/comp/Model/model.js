import {
  MxxxTp,
  MxxxXxcs,
  MxxxXxcs2,
  AllNsczlx,
  MxxxTpLB,
  addNsjl,
  domain,
  hqdqsjzq,
  hqdqzqcx,
  getNsjl
} from '../../../../apis/index'
Component({
  data: {
    domain: domain + '/bsApi',
    domain2: domain,
    // 这里是一些组件内部数据
    growthStatus: [],
    curGrowthItem: 0,
    showConfirm: false,
    options: [{
        name: '施肥',
        isCheck: false
      },
      {
        name: '剪枝',
        isCheck: false
      },
      {
        name: '清园',
        isCheck: false
      },
      {
        name: '涂白',
        isCheck: false
      },
      {
        name: '灌溉',
        isCheck: false
      },
    ],
    recodeList: [],
    isConfirm: true,
    jsList: [],
    showDate: false,
    growthList: [],
    curSwiper: 0,
    isGjjs: true,
    swiperH: 600,
  },
  ready() {
    this.getMxxxTp()
    this.getMxxxXxcs()
    this.getMxxxXxcs2()
    this.getAllNsczlx()
    this.getIsConfirm()
    console.log(this.data.isConfirm);
  },
  methods: {
    prevItem() {
      const {
        curSwiper,
        growthList
      } = this.data
      if (curSwiper === 0) {
        this.setData({
          curSwiper: 0,
          curGrowthItem: growthList[0].id
        })
        return
      }
      this.setData({
        curSwiper: curSwiper - 1,
        curGrowthItem: growthList[curSwiper - 1].id
      })
      this.gethqdqzqcx()
    },
    nextItem() {
      const {
        curSwiper,
        growthList
      } = this.data
      if (curSwiper === growthList.length - 1) {
        this.setData({
          curSwiper: growthList.length - 1,
          curGrowthItem: growthList[growthList.length - 1].id
        })
        return
      }
      this.setData({
        curSwiper: curSwiper + 1,
        curGrowthItem: growthList[curSwiper + 1].id
      })
      this.gethqdqzqcx()
    },
    changeZq(e) {
      const {
        growthList
      } = this.data
      this.setData({
        curGrowthItem: growthList[e.detail.current].id
      })
      this.gethqdqzqcx()
    },
    navTolysm(e) {

      if (e.currentTarget.dataset.dz) {
        wx.navigateTo({
          url: '/micro/pages/video/video?dz=' + e.currentTarget.dataset.dz + "&bt=" + e.currentTarget.dataset.bt,
        })
      } else {
        if (e.currentTarget.dataset.lj) {
          wx.navigateTo({
            url: '/micro/pages/zj/zj?url=' + e.currentTarget.dataset.lj,
          })
        }
      }
    },
    openDate() {
      this.setData({
        showDate: !this.data.showDate
      })
    },
    getIsConfirm() {
      getNsjl(wx.getStorageSync('thirdSession').openid).then(res => {
        if (res) {
          if (res.data === 0) {
            this.setData({
              isConfirm: true
            })
          } else {
            this.setData({
              isConfirm: false
            })
          }
        }
      })
    },
    showGjjs() {
      if (!this.data.isGjjs) {
        this.setData({
          swiperH: 600
        })
      } else {
        this.setData({
          swiperH: 880
        })
      }
      this.setData({
        isGjjs: !this.data.isGjjs
      })
    },
    getMxxxTpLB() {
      MxxxTpLB().then((res) => {
        this.setData({
          growthStatus: [res.data[0]],
          growthList: res.data,
          growthItemId: res.data.find(item => this.data.modelTemp1.zq === item.zq).id,
          curGrowthItem: res.data.find(item => this.data.modelTemp1.zq === item.zq).id
        })
        this.gethqdqzqcx()
      })
    },
    getMxxxTp() {
      hqdqsjzq().then((res) => {
        this.setData({
          modelTemp1: res.data
        })
        this.getMxxxTpLB()
      })
    },
    gethqdqzqcx() {
      hqdqzqcx(this.data.curGrowthItem).then((res) => {
        if (res) {
          this.setData({
            jsList: res.data.js
          })
        }
      })
    },
    getAllNsczlx() {
      AllNsczlx().then((res) => {
        res.data.map((item) => {
          item.isCheck = false
        })
        this.setData({
          options: res.data
        })
      })
    },
    getMxxxXxcs2() {
      MxxxXxcs2({
        openid: wx.getStorageSync('thirdSession').openid,
      }).then((res) => {
        this.setData({
          recodeList: res.data
        })
      })
    },
    getMxxxXxcs() {
      MxxxXxcs({
        openid: wx.getStorageSync('thirdSession').openid,
      }).then((res) => {
        const num = Math.floor((res.data.nums / 365) * 100)
        let str = ''
        if (num <= 30) {
          str = '兰农学民'
        } else if (num >= 31 && num <= 70) {
          str = '兰农学霸'
        } else {
          str = '兰农学神'
        }
        this.setData({
          study: {
            grad: str,
            percent: num
          }
        })
      })
    },
    changeGrowth(e) {
      const idx = e.currentTarget.dataset.idx
      this.setData({
        curGrowthItem: idx,
        modelTemp1: this.data.growthStatus.find(item => item.id === idx),
      })
      // this.gethqdqzqcx()
    },
    selectItem(e) {
      const idx = e.currentTarget.dataset.idx
      let change = "options[" + idx + "].isCheck";
      this.setData({
        [change]: !this.data.options[idx].isCheck
      })
    },
    showConfirm() {
      this.setData({
        showConfirm: true
      })
    },
    onCloseWork() {
      this.setData({
        showConfirm: false
      })
    },
    onConfirmWork() {
      let ids = []
      this.data.options.map(item => {
        if (item.isCheck) {
          ids.push(item.id)
        }
      })
      if (!ids.length) return
      const params = {
        openid: wx.getStorageSync('thirdSession').openid,
        nsczlxId: ids
      }
      addNsjl(params).then((res) => {
        if (res) {
          wx.showToast({
            title: '确认成功',
          })
          this.setData({
            showConfirm: false,
            isConfirm: false
          })
        }
      })

    },
  }
})