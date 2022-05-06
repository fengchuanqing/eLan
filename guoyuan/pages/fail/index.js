// pages/guoyuan/fail/index.js
import {
    domain,
} from '../../../apis/aqyy'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        domain: domain + '/bsApi'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.pic) {
            this.setData({
                pic: options.pic
            })
        }
    },
    goBack() {
        wx.navigateBack({
            delta: 1,
        })
    },
    goZj() {
        if (!wx.getStorageSync('userInfo').lxdh) {
            this.setData({
                showAuthentication: true,
                authUrl: '/pages/attestation/attestation'
            })
            return
        }
        wx.navigateTo({
            url: '/micro/pages/zj/zj?url=https://szsn.lx.gov.cn/zlb/&mobile=' + wx.getStorageSync('userInfo').lxdh + '/#/Expert/expertHome',
        })
    }
})