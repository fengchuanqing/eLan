// farm/pages/farming/tjns/index.js
function add0(m) {
    return m < 10 ? '0' + m : m
}

function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

import {
    saveFarmingRecord,
    getFarmingRecordTypes,
    getFarmBase
} from '../../../../apis/farm'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        farmName: "",
        jsShow: true, //主体显示基地
        userInfo: {
            sf: '主体'
        },
        show: false,
        show1: false,
        createTime: '',
        minDate: new Date(2020, 1, 1).getTime(),
        maxDate: new Date().getTime(),
        currentDate: new Date().getTime(),
        list: [{
                name: '施肥',
                value: 1,
                checked: false
            },
            {
                name: '剪枝',
                value: 2,
                checked: false
            }
        ]
    },
    openShow2() {
        this.setData({
            show1: true,
        });
    },
    openShow() {
        this.setData({
            show: true,
        });
    },
    cancel() {
        this.setData({
            show: false,
            show1: false,
        });
    },
    confirm(event) {
        console.log(event);
        let createTime = format(event.detail)
        this.setData({
            show: false,
            createTime
        });
    },
    confirm2(event) {
        this.setData({
            farmName: event.detail.value.text,
            farmId: event.detail.value.value,
            show1: false,
        });
    },
    onInput(event) {
        this.setData({
            currentDate: event.detail,
        });
    },
    changeActive(params) {
        this.data.list[params.target.dataset.item].checked = !this.data.list[params.target.dataset.item].checked
        this.setData({
            list: this.data.list
        })
    },
    gogogo() {
        console.log(this.data.createTime);
        console.log(this.data.farmId);
        let arr = []
        this.data.list.forEach(item => {
            if (item.checked) {
                arr.push(item.id)
            }
        })
        console.log(arr);
        if (arr.length && this.data.createTime && this.data.farmId) {
            let params = {
                formatTime: this.data.createTime,
                // 创建时间
                nsczlxId: arr,
                // 农事操作类型id数组
                ssjd: this.data.farmId,
                // 所属基地id
            }
            saveFarmingRecord(params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'none'
                    })
                    wx.redirectTo({
                        url: "../history/index",
                    })
                }
            })

        } else {
            wx.showToast({
                title: '请正确填写信息',
                icon: 'none'
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getFarmingRecordTypes().then(res => {
            console.log(res);
            if (res.code == 200) {
                this.setData({
                    list: res.data.map(item => {
                        return {
                            name: item.nsczlx,
                            value: item.id,
                            checked: false,
                            ...item
                        }
                    })
                })
            }
        })

        this.setData({
            userInfo: wx.getStorageSync('userInfo') || this.data.userInfo
        })
        if (this.data.userInfo.ztid == null || this.data.userInfo.ztid == "") {
            wx.showToast({
                icon: 'none',
                title: "当前身份不可添加",
            })
            this.setData({
                jsShow: false
            })
        } else {
            getFarmBase().then(res => {
                if (res) {
                    console.log(res);
                    this.setData({
                        columns: res.data.map(item => {
                            return {
                                text: item.jdmc,
                                value: item.id
                            }
                        })
                    })
                    // wx.showToast({
                    //     title: '操作成功',
                    //     icon: 'none'
                    // })
                }
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