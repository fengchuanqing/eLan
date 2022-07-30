import * as echarts from '../../../../components/ec-canvas/echarts';
let chartLine;

import {
  XlycXlbblb,
  updateXlbb,
  XlycXlcs,
  Qxzxx,
  Cqjczxx,
  domain,
  xlbbzxb,
  Zjdqxz
} from '../../../../apis/index'

function getOption(xData, unit, data_cur, data_up, data_down) {
  let seriesData = data_up ? [{
      type: 'line',
      data: data_down,
      symbolSize: 0,
      color: '#00b578',
      markLine: {
        label: {
          formatter: '{b}',
          color: '#00b578'
        },
        data: [{
          type: 'min',
          name: '下限'
        }]
      }
    },
    {
      type: 'line',
      color: '#e63633',
      symbolSize: 0,
      data: data_up,
      markLine: {
        label: {
          formatter: '{b}',
          color: '#e63633'
        },
        data: [{
          type: 'max',
          name: '上限'
        }]
      }
    }
  ] : [{
      type: 'line',
      data: [],
      symbolSize: 0,
      color: '#00b578',
      markLine: {
        label: {
          formatter: '{b}',
          color: '#00b578'
        },
        data: [{
          type: 'min',
          name: '下限'
        }]
      }
    },
    {
      type: 'line',
      color: '#e63633',
      symbolSize: 0,
      data: [],
      markLine: {
        label: {
          formatter: '{b}',
          color: '#e63633'
        },
        data: [{
          type: 'max',
          name: '上限'
        }]
      }
    }
  ]
  var option = {
    grid: {
      top: '20%',
      left: '1%',
      right: '8%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData
    },
    yAxis: {
      name: unit,
      type: 'value',
    },
    series: [{
      type: 'line',
      data: data_cur,
    }, ...seriesData]
  };
  return option;
}
Component({
  properties: {
    farmRz: {
      type: Boolean,
      value: false
    },
    mainMessage: {
      type: Object,
      value: {}
    }
  },
  data: {
    // 这里是一些组件内部数据
    img: domain,
    qxcmc: '',
    tabList: [],
    information: {},
    forecastActive: 1,
    curYear: 1,
    selectVal: '产量预测',
    columns: ['产量预测', '虫情预测'],
    bbShow: false,
    bbList: [],
    weatherActive: 0,
    czsl:0,
    ecLine: {
      onInit: function (canvas, width, height) {
        //初始化echarts元素，绑定到全局变量，方便更改数据
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);
      }
    },
    cqList: [{
        img: '',
        name: '卷叶蛾',
        num: 1,
        time: '2021-11-20  13:00'
      },
      {
        img: '',
        name: '卷叶蛾',
        num: 1,
        time: '2021-11-20  13:00'
      },
    ],
    grad: 1,
    jcList: [{
        name: '全氮',
        val: '【1.52】g/kg',
        grad: 1
      },
      {
        name: '速效磷',
        val: '【23.30】mg/gk',
        grad: 1
      },
      {
        name: '速效钾',
        val: '【75.80】mg/gk',
        grad: 1
      },
      {
        name: '有机质',
        val: '【21.52】g/kg',
        grad: 1
      },
    ],
  },
  ready() {
    if (this.properties.farmRz) {
      this.Zjdqxz()
      this.Cqjczxx()
    }
  },
  methods: {
    Zjdqxz(){
      Zjdqxz({
        openid:wx.getStorageSync('thirdSession').openid
      }).then(res=>{
        // if(res)
        this.getQxzxx()
      })
    },
    Cqjczxx() {
      Cqjczxx({
        openid:wx.getStorageSync('thirdSession').openid
        // openid:'o6JSs5AHrQqEvKm8D5v-3g40RGkE'
      }).then((res) => {
        if (res) {
          if(res.code!=200){
            wx.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false
            })
            return
          }
          this.setData({
            cqList: res.data.cbdxx,
            cbddz:res.data.cbddz,
            czsl:res.data.czsl
          })
        }
      })
    },
    getQxzxx() {
      Qxzxx({
        // lxdh: wx.getStorageSync('userInfo').lxdh || 15666666666,
        openid:wx.getStorageSync('thirdSession').openid
        // openid:'o6JSs5ExBT-2vFxLGDWiEC60SGM8'
        // lxdh:15666666666
      }).then((res) => {
        if (res) {
          if(res.code!=200){
            wx.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false
            })
            return
          }
          let arr = []
          arr.push(res.data.qxzxx.reduce((acc, cur) => acc.concat(cur.kqwd), []))
          arr.push(res.data.qxzxx.reduce((acc, cur) => acc.concat(cur.kqsd), []))
          arr.push(res.data.qxzxx.reduce((acc, cur) => acc.concat(cur.trwd), []))
          arr.push(res.data.qxzxx.reduce((acc, cur) => acc.concat(cur.trsf), []))
          arr.push(res.data.qxzxx.reduce((acc, cur) => acc.concat(cur.gzqd), []))
          arr.push(res.data.qxzxx.reduce((acc, cur) => acc.concat(cur.time), []))
          this.setData({
            tabList: arr,
            sbId: res.data.qxzxx[0].sbid || '',
            kqwdyc: res.data.zgwzdw,
            qxcmc: res.data.qxzxx[0].jdmc
          })
          let sjArr = this.data.tabList[this.data.tabList.length - 1]
          let dataList = this.data.tabList[0]
          const unit = (this.data.weatherActive === 0 || this.data.weatherActive === 2) ? '°C' : (this.data.weatherActive === 1 || this.data.weatherActive === 3) ? '%' : 'Lux'
          var xData = sjArr // x轴数据 自己写
          var data_down = [-10]
          var data_up = [50]
          var data_cur = dataList
          var option = getOption(xData, unit, data_cur, data_up, data_down);
          chartLine.setOption(option);
          // this.selected({detail:{name:0,index:0}})
          this.getXlycXlbblb()
        }
      })
    },
    selected({
      detail
    }) {
      console.log(detail);
      this.setData({
        weatherActive: detail.name
      })
      let sjArr = this.data.tabList[this.data.tabList.length - 1]
      let dataList = this.data.tabList[detail.index]
      var xData = sjArr // x轴数据 自己写
      var data_down = [-10]
      var data_up = [50]
      var data_cur = dataList
      const unit = (this.data.weatherActive === 0 || this.data.weatherActive === 2) ? '°C' : (this.data.weatherActive === 1 || this.data.weatherActive === 3) ? '%' : 'Lux'
      if (this.data.weatherActive !== 0) {
        var option = getOption(xData, unit, data_cur);
      } else {
        var option = getOption(xData, unit, data_cur, data_up, data_down);
      }
      chartLine.setOption(option);
    },

    bindCai(e) {
      const item = e.currentTarget.dataset.item
      const params = {
        openid:wx.getStorageSync('thirdSession').openid,
      // openid:'o6JSs5ExBT-2vFxLGDWiEC60SGM8',
        // phone:'15666666666',
        xlbbId: item.id,
        iscai: item.iscai === 1 ? 0 : 1,
        isding: 0
      }
      updateXlbb(params).then(res => {
        if (res) {
          this.data.bbList.map(i => {
            if (i.id === item.id) {
              i.cai = item.iscai === 0 ? i.cai + 1 : i.cai - 1
              i.iscai = item.iscai === 1 ? 0 : 1
              i.isding = 0
              i.ding = item.isding === 1 ? (i.ding > 0 ? i.ding - 1 : 0) : i.ding
            }
          })
          this.setData({
            bbList: this.data.bbList
          })
          wx.showToast({
            title: '操作成功',
            icon: 'none'
          })
        }
      })
    },
    bindZan(e) {
      const item = e.currentTarget.dataset.item
      const params = {
        openid:wx.getStorageSync('thirdSession').openid,
      // openid:'o6JSs5ExBT-2vFxLGDWiEC60SGM8',
        //  phone:15666666666,
        xlbbId: item.id,
        iscai: 0,
        isding: item.isding === 1 ? 0 : 1
      }
      updateXlbb(params).then(res => {
        if (res) {
          this.data.bbList.map(i => {
            if (i.id === item.id) {
              i.iscai = 0
              i.ding = item.isding === 0 ? i.ding + 1 : i.ding - 1
              i.isding = item.isding === 1 ? 0 : 1
              i.cai = item.iscai === 1 ? (i.cai > 0 ? i.cai - 1 : 0) : i.cai
            }
          })
          this.setData({
            bbList: this.data.bbList
          })
          wx.showToast({
            title: '操作成功',
            icon: 'none'
          })
        }
      })
    },
    getXlycXlbblb() {
      if (this.properties.farmRz) {
        const params = {
          // sbid: this.data.sbId,
          lx: this.data.selectVal,
          openid:wx.getStorageSync('thirdSession').openid
        // openid:'o6JSs5ExBT-2vFxLGDWiEC60SGM8'
          // phone:15666666666

        }
        xlbbzxb(params).then(res => {
          if (res) {
            this.setData({
              bbList: res.data
            })
          }
        })
      }
    },
    // 这里是一个自定义方法
    changeTime(e) {
      const idx = e.currentTarget.dataset.idx
      this.setData({
        curYear: idx
      })
      this.getXlycXlbblb()
    },
    showBbColumns() {
      this.setData({
        bbShow: true
      })
    },
    onCancel() {
      this.setData({
        bbShow: false
      })
    },
    onConfirm(event) {
      const {
        picker,
        value,
        index
      } = event.detail;
      this.setData({
        selectVal: value,
        bbShow: false
      })
      this.getXlycXlbblb()
    },
    onChange(e) {
      this.setData({
        forecastActive: e.detail.name
      })
    },
    goRz() {
      wx.navigateTo({
        url: '/pages/studyPlant/attestation/index',
      })
    },
    goEdit(e) {
      const address = e.currentTarget.dataset.address
      wx.navigateTo({
        url: '/pages/studyPlant/search/search?address=' + (address.dz?address.dz:address.address) + '&id=' + e.currentTarget.dataset.address.id,
      })
    }
  }
})