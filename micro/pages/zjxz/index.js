Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:wx.getStorageSync('userInfo').lxdh
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goNext(e){
    const idx = e.currentTarget.dataset.idx
    if(idx!==2){
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }else{
      if(wx.getStorageSync('userInfo').hasExperts){
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      }else{
        wx.showToast({
          icon:'none',
          title: "暂无权限",
        })
      }
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
})