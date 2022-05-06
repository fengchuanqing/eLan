import {
    domain,
    gygjsglx,
    tjsf,
} from "../../../apis/aqyy"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        domain,
        active: 0,
        headerTabs: [],
        show: false,
        columns: [],
        state: '', //期间状态
        treeAge: '7-10年',
        treeColumns: ['7-10年', '10-25年', '25年以上'],
        msVal: '',
        czVal: ''
    },
    changeMs() {
        const treeAge = this.data.treeAge
        const num = Number(this.data.czVal)
        const ms = this.data.msVal
        if (num) {
            let tjyl = '';
            let mb = 0
            if (treeAge && treeAge === '7-10年') {
                if (num < 1200) {
                    mb = 1200 / 2 / 100 * ms
                } else if (num >= 1200 && num <= 1440) {
                    mb = num / 2 / 100 * ms
                } else {
                    mb = 1440 / 2 / 100 * ms
                }
            } else if (treeAge && treeAge === '10-25年') {
                if (num < 2000) {
                    mb = 2000 / 2 / 100 * ms
                } else if (num >= 2000 && num <= 2400) {
                    mb = num / 2 / 100 * ms
                } else {
                    mb = 2400 / 2 / 100 * ms
                }
            } else if (treeAge && treeAge === '25年以上') {
                if (num < 1500) {
                    mb = 1500 / 2 / 100 * ms
                } else if (num >= 1500 && num <= 1800) {
                    mb = num / 2 / 100 * ms
                } else {
                    mb = 1800 / 2 / 100 * ms
                }
            }
            tjyl = `N:${(mb*0.8).toFixed(2)}kg,P:${(mb*0.28).toFixed(2)}kg,K:${(mb*1.5).toFixed(2)}kg`
            console.log(tjyl);
            this.setData({
                'curSfObj.sl': tjyl
            })
        }
    },
    changeCz(e) {
        const treeAge = this.data.treeAge
        const num = Number(this.data.czVal)
        const ms = this.data.msVal
        if (!ms) {
            wx.showToast({
                title: '请输入亩数',
                icon: 'none'
            })
            this.setData({
                czVal: ''
            })
            return
        }
        if(!num){
            this.setData({
                'curSfObj.sl': ''
            })
            return
        }
        let tjyl = '';
        let mb = 0
        if (treeAge && treeAge === '7-10年') {
            if (num < 1200) {
                mb = 1200 / 2 / 100 * ms
            } else if (num >= 1200 && num <= 1440) {
                mb = num / 2 / 100 * ms
            } else {
                mb = 1440 / 2 / 100 * ms
            }
        } else if (treeAge && treeAge === '10-25年') {
            if (num < 2000) {
                mb = 2000 / 2 / 100 * ms
            } else if (num >= 2000 && num <= 2400) {
                mb = num / 2 / 100 * ms
            } else {
                mb = 2400 / 2 / 100 * ms
            }
        } else if (treeAge && treeAge === '25年以上') {
            if (num < 1500) {
                mb = 1500 / 2 / 100 * ms
            } else if (num >= 1500 && num <= 1800) {
                mb = num / 2 / 100 * ms
            } else {
                mb = 1800 / 2 / 100 * ms
            }
        }
        tjyl = `N:${(mb*0.8).toFixed(2)}kg,P:${(mb*0.28).toFixed(2)}kg,K:${(mb*1.5).toFixed(2)}kg`
        console.log(tjyl);
        this.setData({
            'curSfObj.sl': tjyl
        })
    },
    headerChangeTab: function (i) {
        const idx = i.currentTarget.dataset.id
        this.setData({
            active: idx,
            msVal: '',
            czVal: ''
        })
        this.tjsf(this.data.headerTabs[idx].id)
    },
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false,
            showTreeAge: false
        });
    },
    onChange(event) {
        const {
            picker,
            value,
            index
        } = event.detail;

        this.setData({
            state: value.text,
            curSfObj: this.data.tjsfAll[value.value].sf[0],
            show: false
        })
        this.changeCz()
    },
    onTreeChange(e) {
        const {
            picker,
            value,
            index
        } = e.detail;
        this.setData({
            treeAge: value,
            showTreeAge: false
        })
        if (this.data.msVal) {
            this.changeCz()
        }
    },
    treeAgePopup() {
        this.setData({
            showTreeAge: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        gygjsglx().then((res) => {
            if (res) {
                this.tjsf(res.data[0].id)
                this.setData({
                    headerTabs: res.data.map(item => {
                        item.text = item.lxmc;
                        item.src = item.tbdz;
                        return item
                    })
                })
            }
        })
    },
    tjsf(id) {
        tjsf({
            id
        }).then(res => {
            if (res) {
                let columns = []
                res.data.map((item, idx) => {
                    columns.push({
                        value: idx,
                        text: item.zq
                    })
                })
                this.setData({
                    columns,
                    tjsfAll: res.data,
                    state: columns.length > 0 ? columns[0].text : '',
                    curSfObj: res.data.length > 0 ? res.data[0].sf[0] : []
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