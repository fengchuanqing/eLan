Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    show: {
      type: Boolean,
      value: false,
    },
    content:{
      type:String,
      value:'为了更好的体验功能，请先去认证。'
    },
    url:{
      type:String,
      value:'/pages/attestation/attestation'
    }
  },
  data: {
    // 这里是一些组件内部数据
   
  },
  methods: {
    // 这里是一个自定义方法
    onClose(){
      this.setData({ show: false });
    },
    onConfirm(){
      wx.navigateTo({
        url: this.data.url,
      })
      this.setData({ show: false });
    }
  }
})