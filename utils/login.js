import {
  getOpenid,
  getXcxUserInfo
} from '../apis/index'
let checkSession = () => {
  let thirdSession = wx.getStorageSync('thirdSession');
  if (thirdSession) { //如果之前有存过thirdSession
    //检查session_key是否在有效期
    wx.checkSession({
      //在有效期
      success(res) { //存储中有有自定义登录状态且在有效期
        getUserInfo()
      },
      //不在在有效期,则需重新登录
      fail(err) {
        //调用微信登录请求函数
        wechatLogin()
      }
    })
  } else { //如果之前没存过thirdSession，则需登录
    //调用微信登录请求函数
    wechatLogin();
  }
}
let wechatLogin = () => {
  wx.login({
    success(res) {
      let code = res.code;
      getOpenid({
        js_code: code
      }).then(res => {
        const data = JSON.parse(res.msg)
        wx.setStorageSync('thirdSession', data)
        getUserInfo()
      })
    }
  })
}
const getUserInfo=()=> {
  const param = {
    openid: wx.getStorageSync('thirdSession').openid
  }
  getXcxUserInfo(param).then(res => {
    if (res) {
      res.data.hlz = Number(res.data.hlz)
      wx.setStorageSync('userInfo', res.data)
    }
  })
}
export {
  checkSession
}