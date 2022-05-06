import {
    areaList,
} from "../../../utils/area-data";
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import {
    fwdyhxxxg,
    fwdyhxxxz
} from "../../../apis/wbm";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        areaList,
        edit: false,
        columns: ['东魁', '荸荠', '其他'],
        show: false,
        show2: false,
        activePinzhong: "", //品种
        activDizhi: '请选择地址', // 地址
        jdxx: '', //基地信息
        jdgm: '', //基地规模
        jdjs: '', //基地介绍
    },
    onChange(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            activePinzhong: value
        })
        // console.log(`当前值：${value}, 当前索引：${index}`);
    },
    onChange1(event) {
        console.log(event.detail);
        this.setData({
            jdxx: event.detail
        })
    },
    onChange2(event) {
        this.setData({
            jdgm: event.detail
        })
    },
    onChange3(event) {
        this.setData({
            jdjs: event.detail
        })
    },
    queren() {
        let phone = wx.getStorageSync('userInfo').lxdh || ""
        if (this.data.activePinzhong != "" && this.data.jdxx != "" && this.data.jdgm != "" && this.data.jdjs != "" && this.data.activDizhi != "") {
            if (this.data.edit) {
                // 编辑
                fwdyhxxxg({
                    "dz": this.data.activDizhi,
                    "jdgm": this.data.jdgm,
                    "jdjs": this.data.jdjs,
                    "jdxx": this.data.jdxx,
                    "jdzypz": this.data.activePinzhong,
                    "openid": wx.getStorageSync('thirdSession').openid
                }).then((res) => {
                    if (res.code == 200) {
                        Toast(res.msg);
                        // 直接去评价
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                })
            } else {
                // 新增
                fwdyhxxxz({
                    "dz": this.data.activDizhi,
                    "jdgm": this.data.jdgm,
                    "jdjs": this.data.jdjs,
                    "jdxx": this.data.jdxx,
                    "jdzypz": this.data.activePinzhong,
                    "openid": wx.getStorageSync('thirdSession').openid
                }).then((res) => {
                    if (res.code == 200) {
                        Toast(res.msg);
                        // 直接去评价
                        wx.navigateBack({
                            delta: 1,
                        })
                    }
                })
            }
        } else {
            Toast("格式有误，请检查");
        }


    },
    openPop() {
        this.setData({
            show: true
        });
    },
    openPop2() {
        this.setData({
            show2: true
        });
    },
    confirmSSQ(value) {
        this.data.activDizhi = value.detail.values.map(item => {
            return item.name
        })
        this.setData({
            activDizhi: this.data.activDizhi.join('')
        })
        this.onClose() //关掉
    },
    onClose() {
        this.setData({
            show: false,
            show2: false,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.item && options.item != "") {
            let item = JSON.parse(options.item)
            console.log(item);
            this.setData({
                edit: true,
                activePinzhong: item.jdzypz, //品种
                activDizhi: item.dz, // 地址
                jdxx: item.jdxx, //基地信息
                jdgm: item.jdgm, //基地规模
                jdjs: item.jdjs, //基地介绍  
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