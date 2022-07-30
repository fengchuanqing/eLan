import {
  MxxxXxrq,
  addYhdk
} from '../../apis/index'
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    show: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    // 这里是一些组件内部数据
    year: 0,
    month: 0,
    dateArr: [],
    // 当前维度
    latitude: "",
    // 当前精度
    longitude: "",
    yesDate: [20211105, 20211106, 20211107, 20211108],
    colorDate: [
      [20211105, 20211106, 20211107, 20211108],
      [20211115, 20211116, 20211117, 20211118]
    ]
  },
  ready() {
    let t = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: Number(month),
    });

    const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime() //当天23：59：59秒 转换成的毫秒数
    const start = new Date().getTime() //当前时间的毫秒数
    if (wx.getStorageSync('endTime')) { //首先判断本地有没有存入当天23：59：59秒的毫秒数
      if (start > wx.getStorageSync('endTime')) { //当前时间毫秒数大于当天23：59：59秒 条件成立
        t.getAddYhdk()
        wx.setStorageSync('endTime', end)
      } else {
        t.getMxxxXxrq()
      }
    } else {
      wx.setStorageSync('endTime', end) //存入当天晚上23：59：59秒的毫秒数
      t.getAddYhdk()
    }
  },
  methods: {
    getAddYhdk() {
      const param = {
        openid: wx.getStorageSync('thirdSession').openid
      }
      addYhdk(param).then((res) => {
        this.getMxxxXxrq()
      })
    },
    getMxxxXxrq(dlsj) {
      const param = {
        dlsj: dlsj || '',
        openid: wx.getStorageSync('thirdSession').openid
      }
      MxxxXxrq(param).then((res) => {
        let arr = []
        res.data.map(item => {
          arr.push(item.dlsj.split('-').join(''))
        })
        this.setData({
          yesDate: arr
        })
        this.yesdate()
        this.colordate()
      })
    },
    // 这里是一个自定义方法
    // 标色日期
    colordate() {
      let t = this;
      let colorDate = t.data.yesDate;
      let dateArr = t.data.dateArr;
      for (var i = 0; i < dateArr.length; i++) {
        for (var j = 0; j < colorDate.length; j++) {
          if (dateArr[i].isToday == colorDate[j]) {
            if (j === 0) {
              dateArr[i].leftRadius = true
            }
            if (j === colorDate.length - 1) {
              dateArr[i].rightRadius = true
            }
            dateArr[i].isColor = true;
          }
        }
      }
      t.setData({
        dateArr: dateArr
      })
    },
    // 已签到日期
    yesdate() {
      let t = this;
      let yesdate = t.data.yesDate;
      let dateArr = t.data.dateArr;
      for (var i = 0; i < dateArr.length; i++) {
        for (var j = 0; j < yesdate.length; j++) {
          if (dateArr[i].isToday == yesdate[j]) {
            dateArr[i].choose = true;
          }
        };
      }
      t.setData({
        dateArr: dateArr
      })
    },
    // 日历
    dateInit(setYear, setMonth) {
      let t = this;
      //全部时间的月份都是按0~11基准，显示月份才+1
      let dateArr = []; //需要遍历的日历数组数据
      let arrLen = 0; //dateArr的数组长度
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth() //没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
      let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); //目标月1号对应的星期
      let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
      let obj = {};
      let num = 0;
      if (month + 1 > 11) {
        nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      }
      arrLen = startWeek + dayNums;
      for (let i = 0; i < arrLen; i++) {
        if (i >= startWeek) {
          num = i - startWeek + 1 < 10 ? '0' + String(i - startWeek + 1) : String(i - startWeek + 1);
          obj = {
            isToday: '' + year + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + num,
            dateNum: num,
            weight: 5,
            choose: false,
            isColor: false
          }
        } else {
          obj = {};
        }
        dateArr[i] = obj;
      }
      t.setData({
        dateArr: dateArr
      })
    },
    /**
     * 上月切换
     */
    lastMonth: function () {
      let t = this;
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = t.data.month - 2 < 0 ? t.data.year - 1 : t.data.year;
      let month = t.data.month - 2 < 0 ? 11 : t.data.month - 2;
      t.setData({
        year: year,
        month: (month + 1)
      })
      t.dateInit(year, month);
      this.getMxxxXxrq(year + '-' + (month + 1) + '-' + 1)
      t.colordate()
    },
    /**
     * 下月切换
     */
    nextMonth: function () {
      let t = this;
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = t.data.month > 11 ? t.data.year + 1 : t.data.year;
      let month = t.data.month > 11 ? 0 : t.data.month;
      t.setData({
        year: year,
        month: (month + 1)
      })
      t.dateInit(year, month);
      this.getMxxxXxrq(year + '-' + (month + 1) + '-' + 1)
      t.colordate()
    },
  }
})