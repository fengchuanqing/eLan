// pages/guoyuan/aqyy/index.js
import {
    gygjsglx,
    gygjaqyy,
    gygjaqyyzqlb,
    domain
} from "../../../apis/aqyy"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        domain: domain,
        active: 0,
        headerTabs: [],
        show: false,
        columns: [{
            value: 1,
            text: '杭州'
        }],
        state: '', //期间状态
        ms: "", //亩数
        item: { //上方数据
            jyqd: '',
            jyqkssj: '2020-04-15',
            jyqjssj: '2020-06-20',
        },
        yao: [{
            text: '对氯苯氧乙酸钠',
            value: 0,
            yl: 7500 / 2667
        }, {
            text: '抑霉唑',
            value: 0,
            yl: 7500 / 600
        }, {
            text: '嘧菌酯',
            value: 0,
            yl: 7500 / 800
        }, {
            text: '甲维盐',
            value: 0,
            yl: 7500 / 4000
        }, {
            text: '氯虫苯甲酰胺',
            value: 0,
            yl: 7500 / 6667
        }, {
            text: '乙基多杀菌素',
            value: 0,
            yl: 7500 / 1500
        }],

    },
    showPopup() {
        this.setData({
            show: true
        });
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    // 选择器改变刷新
    onChange(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            state: value.text
        })
        this.getData(value.value)
    },
    // 头部tab数据切换
    headerChangeTab: function (i) {
        this.setData({
            active: i.currentTarget.dataset.idx
        })
        this.getColumnsData(i.currentTarget.dataset.id)
    },
    // 选择器列表
    getColumnsData: function (i) {
        gygjaqyyzqlb({
            zwlxid: i,
        }).then((res) => {
            if (res.data.length) {
                this.setData({
                    state: res.data[0].text,
                    columns: res.data
                })
                this.getData(res.data[0].value)
            } else {
                this.setData({
                    item: {},
                })
            }
        })
    },
    // 计算 亩数用药量
    onChange2(event) {
        // event.detail 为当前输入的值
        this.data.yao.forEach((item, i) => {
            item.value = (event.detail * item.yl).toFixed(2)
        })
        this.setData({
            yao: this.data.yao
        })
    },
    // 页面数据
    getData: function (i) {
        gygjaqyy({
            zwlxid: this.data.headerTabs[this.data.active].id, //当前选中水果 id
            zwzqid: i,
            lb: 1
        }).then((res) => {
            if (res) {
                let list = []
                res.data[0].lx_id.split(',').forEach(item => {
                    list.push({
                        text: item,
                        value: 0
                    })
                })
                this.setData({
                    item: res.data[0],
                    // yao: list
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 头部数据
        let that = this;
        gygjsglx().then((res) => {
            if (res) {
                this.getColumnsData(res.data[0].id)
                that.setData({
                    headerTabs: res.data.map(item => {
                        item.text = item.lxmc;
                        item.src = item.tbdz;
                        return item
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