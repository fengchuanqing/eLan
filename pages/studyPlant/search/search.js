// pages/studyPlant/search/search.js
import {
    updateXlcsDz
} from "../../../apis/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        areaList: {
            backfill: '',
            province_list: {
                1: '兰溪市'
            },
            city_list: {
                11: '马涧镇',
                12: '马涧镇',
            },
            county_list: {
                111: '东城区',
                112: '西城区',
                113: '西城区',

            },
        },
        backfill: '',
        id: ''
    },


    onChange(e) {
        console.log(e);
    },

    changeAddress() {
        let address = this.data.backfill
        let id = Number(this.data.id)
        updateXlcsDz({
            dz: address,
            id: id
        }).then((res) => {
            if (res) {
                console.log(res);
                wx.showToast({
                    icon: '',
                    title: '保存成功',
                })
            }
        })
    },

    //数据回填方法
    backfill: function (e) {
        var id = e.currentTarget.id;
        for (var i = 0; i < this.data.suggestion.length; i++) {
            if (i == id) {
                this.setData({
                    backfill: this.data.suggestion[i].title
                });
            }
        }
    },
    //触发关键词输入提示事件
    getsuggest: function (e) {

        this.setData({
            backfill: e.detail
        })
        console.log(e);
        // 引入SDK核心类
        var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
        // 实例化API核心类
        var qqmapsdk = new QQMapWX({
            key: 'IFOBZ-32WKP-3WEDG-LL26B-JUVIH-RXFGX' // 必填
        });
        var _this = this;
        //调用关键词提示接口
        qqmapsdk.getSuggestion({
            //获取输入框值并设置keyword参数
            keyword: e.detail, //用户输入的关键词，可设置固定值,如keyword:'KFC'
            //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
            success: function (res) { //搜索成功后的回调
                console.log(res);
                var sug = [];
                for (var i = 0; i < res.data.length; i++) {
                    sug.push({ // 获取返回结果，放到sug数组中
                        title: res.data[i].title,
                        id: res.data[i].id,
                        addr: res.data[i].address,
                        city: res.data[i].city,
                        district: res.data[i].district,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng
                    });
                }
                _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
                    suggestion: sug
                });
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                console.log(res);
            }
        });
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            backfill: options.dz ? options.dz : "",
            id: options.id
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