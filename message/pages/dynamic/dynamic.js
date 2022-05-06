// message/pages/dynamic/dynamic.js
import {
    wdtz,dz,xqpl,pl
} from '../../../apis/tycx.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        page: 1,
        list: [],
        comment:'',
        show:false,
        isEmptyList:[],
        headerList: [{
                name: '待审核'
            },
            {
                name: '已通过'
            },
            {
                name: '已驳回'
            },
        ]
    },
    bindzan(e) {
        dz({
          openid: wx.getStorageSync('thirdSession').openid,
          tzId: e.currentTarget.dataset.id
        }).then((res) => {
          if (res.code == 200) {
            this.setData({
              index: e.currentTarget.dataset.index
            })
            this.message(e.currentTarget.dataset.id)
          }
        })
      },
      message(id, pageNum = 1) {
        xqpl({
          id,
          pageNum,
          openid: wx.getStorageSync('thirdSession').openid
        }).then((res) => {
          console.log(res);
          if (res) {
            let pls = 'list[' + this.data.index + '].pls'
            let dzs = 'list[' + this.data.index + '].dzs'
            let sfdz = 'list[' + this.data.index + '].sfdz'
            this.setData({
              [pls]: res.data.pls,
              [dzs]: res.data.dzs,
              [sfdz]: res.data.sfdz
            })
          }
        })
      },
      showMsgPop(e) {
        console.log(e);
        const id = e.currentTarget.dataset.id;
        this.setData({
          curId: id,
          show: true,
          index: e.currentTarget.dataset.index
        })
      },
      send() {
        if (this.data.comment) {
        pl({
          openid: wx.getStorageSync('thirdSession').openid,
          hfnr: this.data.comment,
          tzId: this.data.curId,
        }).then((res) => {
          console.log(res);
          this.message(this.data.curId)
          this.setData({
            comment:''
          })
        }) } else {
          wx.showToast({
            title: '评论不能为空',
            icon: 'none'
          })
        }
      },
      close() {
        this.setData({
          show: false,
          comment:''
        })
      },
    GoDelete() {
        // wx.navigateTo({
        //   url: '../dynamicDelete/dynamicDelete',
        // })
        wx.navigateTo({
            url: '../dynamicDelete/dynamicDelete?id=' + this.data.active,
        })
    },
    select(zt, pageNum = 1, key = true) {
        if (this.data.list.length >= (pageNum - 1) * 5) {
            wdtz({
                openid: wx.getStorageSync('thirdSession').openid,
                zt,
                pageNum,
            }).then((res) => {
                if (res) {
                    res.data.map((item) => {
                        if (item.dz) {
                            if (item.lb == '视频') {
                              item.dz = item.dz.split(',').reduce((acc,cur)=>acc.concat({
                                  pic:cur.replace(/.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)/gi, '.jpg'),
                                  video:cur,
                              }),[])
                              console.log( item.dz);
                            } else {
                              item.dz = item.dz.split(',')
                            }
                            console.log(item.dz);
                          }
                        console.log(item.fbsj);

                        item.fbsj = this.changeTime(item.fbsj)
                    })
                    console.log(res.data);
                    let arr = res.data
                    let oldList = this.data.list
                    if (key) {
                        this.setData({
                            list: [...oldList, ...arr]
                        })
                    } else {
                        this.setData({
                            list:arr
                        })
                    }

                }
            })
        }
    },
    onChange(e) {
        this.setData({
            active: e.detail.index,
            page: 1
        })
        this.select(e.detail.index,1,false)

    },
    changeTime(t) {
        let res= wx.getSystemInfoSync()
        console.log(res.system);
        let time;
        var isiOS =res.system.match(/ios/i); //ios终端
        console.log(isiOS);
        if(isiOS){
           time=t.replace(/-/g,'/')
        }else{
           time= t
        }
        let currentDay = new Date((new Date).toLocaleDateString()).getTime()
        let cTime = (new Date).getTime()
        let targetTime = new Date(time).getTime()
        let day = 24 * 60 * 60 * 1000
        let delTime = (currentDay + day) - targetTime
        if (0 <= delTime && delTime < day) {
            return '今日' + new Date(time).getHours() + ':' + (new Date(time).getMinutes()<10? '0'+new Date(time).getMinutes():new Date(time).getMinutes())
        } else if (day <= delTime && delTime < day * 2) {
            return '昨天' + new Date(time).getHours() + ':' + (new Date(time).getMinutes()<10? '0'+new Date(time).getMinutes():new Date(time).getMinutes())
        } else if (day * 2 <= delTime && delTime < day * 7) {
            return (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
        } else if (day * 7 <= delTime && delTime < day * 14) {
            return '一周前' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
        } else {
            return time
        }
    },
    navTo(e) {
        wx.navigateTo({
            url: '/pages/countryside/add/add?id=' + e.currentTarget.dataset.id,
        })
    },
    navQfb(){
     wx.navigateTo({
       url: '/pages/countryside/add/add',
     })
    },
    navToPlay(e){
        console.log(e.currentTarget.dataset.dz);
        wx.navigateTo({
            url: '/micro/pages/video/video?dz=' + e.currentTarget.dataset.dz+'&videoKey=true',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(this.changeTime('2022-01-15 14:03:29'));
        wdtz({
            openid: wx.getStorageSync('thirdSession').openid,
            zt:'',
            pageNum:1
        }).then((res)=>{
           this.setData({
               isEmptyList:res.data
           })
        })
        this.select(0)
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
        this.data.page++
        this.select(this.data.active, this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        console.log(res.target.dataset.id);
          return {
            title: 'e兰茗果',
          }}
   
})