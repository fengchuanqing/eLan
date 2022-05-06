// pages/farm/lot/shebei/index.js
import {
    wsbxx,
    wsbxq,
    wlwsb,
    jdxx,
    cqcbd,
    cqcbdxq,
    wlwsbz
} from '../../../../apis/farm'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cbdData: [], //弹窗测报灯列表
        cbdShow: false, //测报灯
        wsbxx: {},
        jdxx: {},
        wsbShow: false,
        mapShow: false,
        bottomData: {},
        keyword: '',
        dw: {
            lon: '119.4650987323588',
            lat: "29.21075487441193"
        },
        listZe40HXSk: [null, null],
        markers: [
            // {
            //     iconPath: '/farm/assets/16394607786274557870.png',
            //     id: 0,
            //     latitude: 29.21075487441193,
            //     longitude: 119.4650987323588,
            //     width: 30,
            //     height: 30,
            //     // label: {
            //     //     content: "下城",
            //     //     color: "#fff",
            //     //     fontSize: 12,
            //     //     anchorX: -(0.5 * (3 * 24)) / 2,
            //     //     textAlign: "center"
            //     // }
            // },
            // {
            //     iconPath: "/farm/assets/16394607784631459317.png",
            //     id: 1,
            //     latitude: 40.380874,
            //     longitude: 116.852466,
            //     width: 30,
            //     height: 30,
            //     // label: {
            //     //     content: "鄂尔多斯",
            //     //     color: "#fff",
            //     //     fontSize: 12,
            //     //     anchorX: -(0.5 * (5 * 24)) / 2,
            //     //     textAlign: "center"
            //     // }
            // }
        ]
    },
    closeX() {
        this.setData({
            wsbShow: false,
            cbdShow: false,
        })
    },
    bindmarkertap(e) {
        console.log(this.data.markers[e.detail.markerId]);
        let params = {
            sbbh: this.data.markers[e.detail.markerId].sbidh
        }
        // 温室宝
        if (this.data.markers[e.detail.markerId].type == "温室宝") {
            wsbxq(params).then(res => {
                if (res.code == 200) {
                    console.log(res.data);
                    if (res.data) {
                        // this.wsbShow
                        this.setData({
                            wsbxx: res.data.wsbxx[0],
                            jdxx: res.data.jdxx[0],
                            wsbShow: true,
                        })
                    }
                }
            })
        } else {
            let params2 = {
                rank: 4,
                sbbh: this.data.markers[e.detail.markerId].sbidh
            }
            cqcbdxq(params2).then(res => {
                if (res.code == 200) {
                    console.log(res.data);
                    if (res.data) {
                        // this.wsbShow
                        res.data.length = 4
                        this.setData({
                            cbdData: res.data,
                            cbdShow: true,
                        })
                    }
                }
            })
        }
    },
    // 获取点位 添加数组
    bindmaptap: function (e) {
        // console.log(e);
        var that = this;
        var point1 = [{
            longitude: e.detail.longitude,
            latitude: e.detail.latitude
        }]
    },
    // 搜索
    GetKeyWord(event) {
        const {
            detail
        } = event
        this.setData({
            keyword: detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getStorageSync('userInfo').lxdh) {

            let params = {
                mobile: wx.getStorageSync('userInfo').lxdh || "",
                param: ""
            }
            // 温室宝点位 // 按照唯一id 顺序排列
            wsbxx(params).then(res => {
                if (res.code == 200) {
                    if (res.data) {
                        this.data.markers.length = 0
                        let num = this.data.markers.length - 1
                        this.data.markers = res.data.map((item, i) => {
                            let icon = "/farm/assets/16394607784631459317.png"
                            if (item.s != '正常') {
                                icon = "/farm/assets/16394607787263949915.png"
                            }
                            num++
                            return {
                                iconPath: icon,
                                id: num,
                                sbidh: item.sbidh,
                                zIndex: 999,
                                type: '温室宝',
                                latitude: item.wd * 1,
                                longitude: item.jd * 1,
                                width: 30,
                                height: 30,
                            }
                        })
                        cqcbd(params).then(res2 => {
                            if (res2.code == 200) {
                                // console.log('虫情测报灯点位',res2.data);
                                if (res2.data) {
                                    let num1 = this.data.markers.length - 1
                                    this.setData({
                                        bottomData: {
                                            wsbsl: res.data.length,
                                            cqcbdsl: res2.data.length,
                                            ...this.data.bottomData
                                        },
                                        // 按照唯一id 顺序排列
                                        markers: [...this.data.markers, ...res2.data.map((ite, i) => {
                                            num1++
                                            return {
                                                iconPath: "/farm/assets/16394607786274557870.png",
                                                id: num1,
                                                sbidh: ite.sbid,
                                                type: '虫情测报灯',
                                                latitude: ite.wd * 1,
                                                longitude: ite.jd * 1,
                                                width: 30,
                                                height: 30,
                                            }
                                        })],
                                        mapShow: true
                                    })
                                }
                            }
                        })
                    }
                }
            })

            // 底部数据
            jdxx(params).then(res => {
                if (res.code == 200) {
                    if (res.data) {
                        this.setData({
                            bottomData: {
                                jdsl: res.data.length,
                                jdxq: res.data,
                                ...this.data.bottomData
                            }
                        })
                    }
                }
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: "请确认手机号信息",
            })
        }

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
    GoSearch() {
        if (this.data.keyword) {
            console.log();
            let params = {
                mobile: wx.getStorageSync('userInfo').lxdh || "",
                param: this.data.keyword
            }
            wlwsbz(params).then(res => {
                if (res.data.jd.length) {
                    console.log('查询结果', res.data);
                    this.data.markers.length = 0
                    let num = this.data.markers.length - 1
                    // 温室宝点位
                    this.data.markers = res.data.wsb.map((item, i) => {
                        let icon = "/farm/assets/16394607784631459317.png"
                        if (item.s != '正常') {
                            icon = "/farm/assets/16394607787263949915.png"
                        }
                        num++
                        return {
                            iconPath: icon,
                            id: num,
                            sbidh: item.sbidh,
                            type: '温室宝',
                            latitude: item.wd * 1,
                            longitude: item.jd * 1,
                            width: 30,
                            height: 30,
                        }
                    })
                    let num1 = this.data.markers.length - 1
                    this.setData({
                        markers: [...this.data.markers, ...res.data.cqcbd.map((ite, i) => {
                            num1++
                            return {
                                iconPath: "/farm/assets/16394607786274557870.png",
                                id: num1,
                                sbidh: ite.sbid,
                                type: '虫情测报灯',
                                latitude: ite.wd * 1,
                                longitude: ite.jd * 1,
                                width: 30,
                                height: 30,
                            }
                        })],
                        bottomData: {
                            jdsl: res.data.jd.length,
                            jdxq: res.data.jd,
                            wsbsl: res.data.wsb.length,
                            cqcbdsl: res.data.cqcbd.length,
                        }
                    })
                } else {
                    wx.showToast({
                        title: '未查到相关基地',
                        icon: 'none'
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请输入关键字',
                icon: 'none'
            })
        }
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})