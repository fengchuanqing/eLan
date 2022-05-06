// pages/farm/dk/detail.js
import {
    saveMassif,
    getFarmBase
} from '../../../../apis/farm'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        categoryShow: false,
        categoryColumns: ['露天', '大棚'],
        dw: {},
        params: {
            dkmc: '',
            nclx: "",
            zwmc: ""
        },
        ssjd: "",
        columns: [{
            text: '123',
            value: '1'
        }],
        show: false,
        polygon: [{
            points: [
                // {
                //     latitude: 37.53088612588587,
                //     longitude: 114.75629613050262
                // },
            ],
            strokeWidth: 1,
            strokeColor: '#FF0000DD',
            fillColor: '#7cb5ec88'
        }],
    },
    changeShow() {
        this.setData({
            categoryShow: true
        })
    },
    categoryChange(e) {
        this.data.params.nclx = e.detail.value
        this.setData({
            params: {
                ...this.data.params
            },
            categoryShow: false,
        })
    },
    categoryClose() {
        this.setData({
            categoryShow: false
        })
    },
    GetJd() {
        console.log('打开基地选项');
        this.setData({
            show: true
        })
    },
    onConfirm(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.data.params.ssjdid = value.value
        this.setData({
            show: false,
            ssjd: value.text,
            params: this.data.params
        })
    },
    quxiao() {
        wx.navigateTo({
            url: "../add2/index",
        })
    },
    GetDkmc(event) {
        this.data.params.dkmc = event.detail
        this.setData({
            params: this.data.params
        })
    },
    GetZwmc(event) {
        this.data.params.zwmc = event.detail
        this.setData({
            params: this.data.params
        })
    },
    GetNclx(event) {
        this.data.params.nclx = event.detail
        this.setData({
            params: this.data.params
        })
    },
    queren() {
        let on = true;
        Object.keys(this.data.params).map(key => {
            if (this.data.params[key]) {} else {
                on = false
                wx.showToast({
                    icon: 'none',
                    title: "请正确填入数据",
                })
            }
        })
        if (on) {
            // let params = {
            //     dkmc: '',
            //     // 地块名称string
            //     dkmj: "",
            //     // 地块面积 string
            //     dkwz: "",
            //     // 地块位置 string
            //     jwdList: [],
            //     // 经纬度List
            //     nclx: "",
            //     // 农场类型 string
            //     openid: "",
            //     // openid string
            //     ssjdid: "",
            //     // 所属基地id string
            //     zwmc: ""
            //     // 作物名称 string
            // }
            this.setData({
                params: {
                    ...this.data.params,
                    openid: wx.getStorageSync('thirdSession').openid
                }
            })
            saveMassif(this.data.params).then(res => {
                console.log(res);
                if (res.code == 200) {
                    wx.redirectTo({
                        url: "../guanli/index",
                    })
                }
            })
        }

    },
    onCancel() {
        this.setData({
            show: false
        })
    },
    onChange(event) {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(JSON.parse(options.points));
        this.setData({
            dw: {
                lon: JSON.parse(options.points)[0].longitude,
                lat: JSON.parse(options.points)[0].latitude,
            },
            params: {
                dkwz: options.address,
                dkmj: options.area,
                jwdList: JSON.parse(options.points),
            },
            polygon: [{
                points: JSON.parse(options.points),
                strokeWidth: 1,
                strokeColor: '#FF0000DD',
                fillColor: '#7cb5ec88'
            }],
        })
        console.log(this.data.params);
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})