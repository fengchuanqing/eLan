// specialZone/pages/index/index.js
import {
    Jxsjlbt,
    Rxtscplbt,
    Rxtscplb,
    img,
    img2,
    Syss,Gglb
} from "../../../apis/specialZone"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        img,img2,
        rxcpList: [],
        jxsjList: [],
        banner:[]
    },
    goShop(){
        wx.navigateTo({
          url: '/specialZone/pages/shopCart/shopCart',
        })
    },
    searchShop(e) {
        wx.navigateTo({
          url: '/specialZone/pages/search/search',
        })
        return
        this.setData( e.detail);
        Syss(e.detail)
        .then((res)=>{
            if(res){
                if(res.data[1].length>0){
                    const query = wx.createSelectorQuery()
                    console.log(res.data[1][0].dpid);
                    query.select(`#sj${res.data[1][0].dpid}`).boundingClientRect()
                    query.selectViewport().scrollOffset()
                    query.exec(function (res) {
                        console.log(res);
                        var miss = res[1].scrollTop + res[0].top - 10;
                        wx.pageScrollTo({
                            scrollTop: miss,
                            duration: 300
                        });
                    })
                }else if(res.data[0].length>0){
                    wx.pageScrollTo({
                        scrollTop: 300,
                        duration: 300
                    });
                    let oldArr=this.data.rxcpList
                   let index= oldArr.map((item,index)=>{
                        if(item.dpid==res.data[0][0].dpid){
                           return index
                        }
                    })
                    oldArr.split(index[0],1)
                    console.log(oldArr);
                    this.setData({
                        rxcpList:[...res.data[0],...oldArr]
                    })
                    console.log(this.data.rxcpList);
                }
            }
        })
       
    },
    getJxsjlbt() {
        Jxsjlbt().then((res) => {
            console.log(res);
            if (res) {
                this.setData({
                    jxsjList: res.data
                })
            }
        })
    },
    getRxtscplbt() {
        Rxtscplb({
            page:1,size:2
        }).then((res) => {
            if (res) {
                console.log(res);
                res.data.map((item) => {
                    item.img = item.img.split(',').reduce((acc, cur) => acc.concat(img + cur), [])
                })
                console.log(res.data);
                this.setData({
                    rxcpList: res.data
                })
            }
        })
    },
    navTo(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getJxsjlbt()
        this.getRxtscplbt()
        Gglb().then((res)=>{
            console.log(res);
            this.setData({
                banner:res.data
            })
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