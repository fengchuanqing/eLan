import{btlb,btlxlb} from '../../../apis/message'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option: [{
            text: '全部',
            value: 0
        }, ],
        value1: 0,
        value: '',
        pageNum:1,
        pageSize:10,
        isReachBottom:true,
        btList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getbtlxlb()
        this.getbtlb()
    },
    selected({detail}){
        this.setData({
            pageNum:1,
            isReachBottom:true,
            value1:detail,
            btList:[]
        })
        this.getbtlb()
    },
    getbtlxlb(){
        btlxlb().then(res=>{
            if(res){
                this.setData({
                    option:[...this.data.option,...res.data]
                })
            }
        })
    },
    serach(e){
        this.setData({
            pageNum:1,
            isReachBottom:true,
            value:e.detail,
            btList:[]
        })
        this.getbtlb()
    },
    getbtlb(){
        const params={
            pageNum:this.data.pageNum,
            pageSize:this.data.pageSize,
            mobile:wx.getStorageSync('userInfo').lxdh,
            lxId:this.data.value1===0?'':this.data.value1,
            param:this.data.value
        }
        btlb(params).then(res=>{
            if(res){
                this.setData({
                    btList:[...this.data.btList,...res.data]
                })
                if(res.data.length<10){
                    this.setData({
                        isReachBottom:false
                    })
                    return
                }
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
        if(this.data.isReachBottom){
            this.setData({
                pageNum:this.data.pageNum+1
            })
            this.getbtlb()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})