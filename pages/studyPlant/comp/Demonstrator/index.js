import * as echarts from '../../../../components/ec-canvas/echarts';
let chartLine,
  timer = null

import {
  sfhList,
  sfhDataList,
  zhfxData,
  dataCompare,
  MxxxTpLB,
  getWsblb
} from '../../../../apis/index'

function getOption(xData, legends, unit, data_cur, data_his, data_him) {
  var option = {
    color: ["#428ffc", "#d19c4f", "#5cbdd7"],
    legend: {
      data: legends,
      top: '5%'
    },
    grid: {
      top: '20%',
      left: '5%',
      right: '3%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData || [],
      axisLabel: { //坐标轴刻度标签的相关设置。
        rotate: "45"
      }
    },
    yAxis: {
      type: 'value',
      name: unit,
      min: 0,
    },
    series: [{
        name: '数据平均值',
        zIndex: 2,
        type: 'line',
        smooth: true,
        symbolSize: 0,
        data: data_cur || []
      },
      {
        name: legends[1],
        zIndex: 1,
        type: 'bar',
        smooth: true,
        symbolSize: 0,
        data: data_his || []
      },
      {
        name: '我的农场',
        zIndex: 1,
        type: 'bar',
        smooth: true,
        symbolSize: 0,
        data: data_him || []
      }
    ]
  };
  return option;
}
Component({
  data: {
    // 这里是一些组件内部数据
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
    farmerList: [],
    curFarmer: 0,
    curFarmerId: 0,
    showAuthentication: false, //认证弹窗
    demonstratorActive: '0',
    curTime: 1,
    curZhfxTab: 0,
    zbList: [{
        wd: '±5℃',
        zb: 80,
        days: 0
      },
      {
        wd: '±10℃',
        zb: 20,
        days: 0
      },
      {
        wd: '＞10℃',
        zb: 0,
        days: 0
      },
    ],
    isMy: false,
    allSfh: null,
    curGrowthItem:{},
    wsbColumns:[],
    wsbShow:false
  },
  ready() {
    this.getWsblb()
    this.getMxxxTpLB()
  },
  lifetimes: {
    detached: function () {
      timer && clearInterval(timer)
    },
  },
  methods: {
    onWsbCancel(){
      this.setData({
        wsbShow:false
      })
    },
    onWsbConfirm(e){
      const {text,index} = e.detail.value;
      let temp='farmerList[2].xm'
      this.setData({
        [temp]:text, 
        wsbShow:false
      })
      this.getMyDataList()
      this.getzhfxData()
    },
    getWsblb() {
      getWsblb(wx.getStorageSync('userInfo').sfzhm).then((res) => {
        let arr = res.data.map(item=>{
          return {text:item.mc,index:item.sbidh}
        })
        // let temp='farmerList[2].xm'
        this.setData({
          wsbColumns: arr,
          // curWsb:arr[0],
          // [temp]:arr[0].text
        })
        this.getsfhList()
      })
    },
    getMxxxTpLB() {
      MxxxTpLB().then((res) => {
        this.setData({
          curGrowthItem: res.data[0],
        })
      })
    },
    changeDemonstratorActive(e) {
      timer && clearInterval(timer)
      this.setData({
        demonstratorActive: e.detail.name
      })
      this.getMyDataList()
      this.getzhfxData()
    },
    getsfhDataList() {
      const params = {
        lx: this.data.demonstratorActive,
        mobile: this.data.curFarmerId,
        sbidh:''
        // sj: this.data.curTime
      }
      sfhDataList(params).then(res => {
        if (res) {
          const data = res.data;
          let xData = [],
            data_ai = [],
            data_sfh = [],
            data_my = [],
            lengends = ['数据平均值', this.data.curFarmer]
          data.data.map(item => {
            xData.push(item.sj)
            data_sfh.push(item.sz)
          })
          data.AIData.map(item => {
            data_ai.push(item.sz)
          })
          const unit = (this.data.demonstratorActive === '0' || this.data.demonstratorActive === '2') ? '°C' : (this.data.demonstratorActive === '1' || this.data.demonstratorActive === '3') ? '%' : 'Lux'
          // let split_array = (arr, len) => {
          //   let arr_length = arr.length;
          //   let newArr = [];
          //   for (let i = 0; i <= arr_length; i += len) {
          //     if(arr_length === len&& len=== i){
                
          //     }else{
          //       newArr.push(arr.slice(i, i + len));
          //     }
          //   }
          //   return newArr
          // }
          if (this.data.isMy) {
            data_my = this.data.data_my
            lengends.push('我的农场')
          }
          // let newXData = split_array(xData, 5);
          // let newAiData = split_array(data_ai, 5);
          // let newSfhData = split_array(data_sfh, 5);
          // let newMyData = data_my.length > 0 ? split_array(data_my, 5) : [];
          // let newXData2 = newXData.length <2 ? [...newXData[0]] : [...newXData[0], ...newXData[1]]
          // let newAiData2 = newXData.length <2 ? newAiData[0] : [...newAiData[0], ...newAiData[1]]
          // let newSfhData2 = newXData.length <2 ? newSfhData[0] : [...newSfhData[0], ...newSfhData[1]]
          // let newMyData2 = newMyData.length > 0 ? newXData.length <2 ? newMyData[0] : [...newMyData[0], ...newMyData[1]] : [];
          if (this.data.isMy) {
            var option = getOption(xData, lengends, unit, data_ai, data_sfh, data_my);
          } else {
            var option = getOption(xData, lengends, unit, data_ai, data_sfh);
          }
          // let i_num = 1
          chartLine.setOption(option);
          // timer = setInterval(() => {
          //   if (i_num === newXData.length) {
          //     newXData2 = newXData.length <2 ? [...newXData[0]] : [...newXData[0], ...newXData[1]]
          //     newAiData2 = newXData.length <2 ? [...newAiData[0]] : [...newAiData[0], ...newAiData[1]]
          //     newSfhData2 = newXData.length <2 ? [...newSfhData[0]] : [...newSfhData[0], ...newSfhData[1]]
          //     newMyData2 = newMyData.length > 0 ? newXData.length <2 ? [...newMyData[0]] : [...newMyData[0], ...newMyData[1]] : [];
          //     if (this.data.isMy) {
          //       var option = getOption(newXData2, lengends, unit, newAiData2, newSfhData2, newMyData2);
          //     } else {
          //       var option = getOption(newXData2, lengends, unit, newAiData2, newSfhData2);
          //     }
          //     chartLine.setOption(option);
          //     i_num = 1
          //     return
          //   }
          //   i_num++
          //   newXData2.splice(0, 5)
          //   newAiData2.splice(0, 5)
          //   newSfhData2.splice(0, 5)
          //   newXData2 = [...newXData2, ...newXData[i_num]]
          //   newAiData2 = [...newAiData2, ...newAiData[i_num]]
          //   newSfhData2 = [...newSfhData2, ...newSfhData[i_num]]
          //   if (this.data.isMy) {
          //     newMyData2.splice(0, 5)
          //     newMyData2 = [...newMyData2, ...newMyData[i_num]]
          //     var option = getOption(newXData2, lengends, unit, newAiData2, newSfhData2, newMyData2);
          //   } else {
          //     var option = getOption(newXData2, lengends, unit, newAiData2, newSfhData2);
          //   }
          //   chartLine.setOption(option);
          // }, 3000);

        }
      })
    },
    getMyDataList() {
      let data_my = []
      const params = {
        lx: this.data.demonstratorActive,
        mobile: wx.getStorageSync('userInfo').lxdh,
        sbidh:this.data.wsbColumns.length?this.data.wsbColumns.find(item=>item.text===this.data.farmerList[2].xm).index:''
        // sj: this.data.curTime
      }
      sfhDataList(params).then(res => {
        if (res) {
          const data = res.data.data;
          data.map(item => {
            data_my.push(item.sz)
          })
          this.setData({
            data_my: data_my
          })
        }
        this.getsfhDataList()
        this.getdataCompare()
      })
    },
    getzhfxData() {
      const params = {
        lx: this.data.demonstratorActive,
        openid: wx.getStorageSync('thirdSession').openid,
        sj: this.data.curTime,
        sfhlxdh: this.data.curFarmerId,
        sbidh:this.data.wsbColumns.length?this.data.wsbColumns.find(item=>item.text===this.data.farmerList[2].xm).index:''
      }
      zhfxData(params).then(res => {
        if (res) {
          this.setData({
            curSfh: res.data.sfhList[0],
            curMy: res.data.wdList?res.data.wdList[0]:{},
            zhfxAll: res.data
          })
          console.log(this.data.curMy);
        }
      })
    },
    getdataCompare() {
      const params = {
        lx: this.data.demonstratorActive,
        openid: wx.getStorageSync('thirdSession').openid,
        sj: this.data.curTime,
        sfhlxdh: this.data.curFarmerId,
        sbidh:this.data.wsbColumns.length?this.data.wsbColumns.find(item=>item.text===this.data.farmerList[2].xm).index:''
      }
      dataCompare(params).then(res => {
        if (res &&Object.keys(res.data).length>0) {
          let arr = this.data.zbList
          arr[0].zb = res.data.res.firstRangeDaysBfb
          arr[0].days = res.data.res.firstRangeDays
          arr[1].zb = res.data.res.secRangeDaysBfb
          arr[1].days = res.data.res.secRangeDays
          arr[2].zb = res.data.res.thirdRangeDaysBfb
          arr[2].days = res.data.res.thirdRangeDays
          this.setData({
            zbList: arr
          })
        }
      })
    },
    getsfhList() {
      sfhList().then(res => {
        if (res) {
          let sfh = res.data.sfhList
          if (wx.getStorageSync('userInfo').hasFarm) {
            sfh.push({
              xm:this.data.wsbColumns.length?this.data.wsbColumns[0].text:'我的农场'
            })
            this.setData({
              isMy: true
            })
          }
          this.setData({
            farmerList: sfh,
            curFarmerId: sfh[0].mobile,
            curFarmer: sfh[0].xm,
            allSfh: res.data.sfhList
          })
          this.getMyDataList()
          setTimeout(()=>{
            this.getzhfxData()
          },0)
        }
      })
    },
    // 这里是一个自定义方法
    changeFarmer(e) {
      const item = e.currentTarget.dataset.item
      if (!item.mobile){
        this.setData({
          wsbShow:true
        })
        return
      }
      this.setData({
        demonstratorActive: '0',
        curFarmerId: item.mobile,
        curFarmer: item.xm
      })
      timer && clearInterval(timer)
      this.getMyDataList()
      this.getzhfxData()
    },
    changeTime(e) {
      timer && clearInterval(timer)
      const idx = e.currentTarget.dataset.idx
      this.setData({
        curTime: idx
      })
      this.getMyDataList()
      this.getzhfxData()
    },
    changeZhfxTab(e) {
      const idx = e.currentTarget.dataset.idx
      if (idx === 0) {
        this.setData({
          curSfh: this.data.zhfxAll.sfhList[0],
          curZhfxFarmer: this.data.curFarmer
        })
      } else {
        this.setData({
          curSfh: this.data.zhfxAll.AIList[0],
          curZhfxFarmer: "数据平均值"
        })
      }
      this.setData({
        curZhfxTab: idx
      })
    },
  }
})