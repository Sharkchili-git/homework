// pages/login/login.js
const app = getApp()

// 导入utils.js 
const cookieUtils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getCookie: function() {
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/cookietest',
      success: function(res) {
        var cookie = cookieUtils.getSessionIdFromResponse(res)
        console.log("cookie:" + cookie)
        cookieUtils.setCookieToStorage(cookie)
      }
    })
  },
  sendCookie: function() {
    var newcookie = cookieUtils.getCookieFromStorage()
    var headers = {}
    headers.Cookie = newcookie
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/cookietest2',
      header: headers,
      success: function(res) {
        console.log(res)
      }
    })
  },
  authorization: function() {

    wx.login({
      success: function(res) {
        console.log(app.globalData.userInfo)
        wx.request({
          url: 'http://127.0.0.1:8000/api/v1.0/apps/authorization',
          method: "POST",
          data: {
            code: res.code,
            nickName: app.globalData.userInfo.nickName
          },
          success: function(res) {
            if (res.statusCode == 200) {
              console.log('data:', res.data);
              console.log('openid:', res.data.openid);
              console.log('message:', res.data.message);
            } else {
              console.log(res.errMsg)
            }

            wx.showToast({
              title: '认证成功',

            })


            var cookie = cookieUtils.getSessionIdFromResponse(res)
            console.log("cookie:" + cookie)
            cookieUtils.setCookieToStorage(cookie)
            console.log("cookie:" + '保存成功')
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})