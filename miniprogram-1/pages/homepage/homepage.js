// pages/homepage/homepage.js

const app = getApp()
const cookieUtil = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: null,
    userInfo: null,
    hasUserInfo: null
  },

  onReadCookies: function() {
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/test',
      success(res) {
        var cookie = cookieUtil.getSessionIdFromResponse(res)
        console.log(cookie)
      }
    })
  },

  // navigator跳转处理
  onNavigatorTap: function(event) {
    var cookie = cookieUtil.getCookieFromStorage()
    if (cookie.length == 0) {
      wx.showToast({
        title: '尚未授权',
        icon: 'none'
      })
      return
    }

    // 获取由 data-type 标签传递过来的参数
    console.log(event.currentTarget.dataset.type)
    var navigatorType = event.currentTarget.dataset.type

    if (navigatorType == 'focusCity') {
      navigatorType = 'city'
    } else if (navigatorType == 'focusStock') {
      navigatorType = 'stock'
    } else {
      navigatorType = 'constellation'
    }
    var url = '../picker/picker?type=' + navigatorType
    wx.navigateTo({
      url: '../picker/picker?type=' + navigatorType,
    })
  },
  // 注销 登出
  logout: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/logout',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          isLogin: false,
          userInfo: null,
          hasUserInfo: false
        })
        cookieUtil.setCookieToStorage('')
        app.setAuthStatus(false)
      }
    })
  },
// 获取状态
  getstatusFromRemote: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/status',
      method: "GET",
      header: header,
      success: function (res) {
        if (res.data.is_authorized == 1) {
          console.log('status:'+res.data.is_authorized + ' 登陆状态')
        } else {
          console.log('status:'+res.data.is_authorized + ' Session过期,未登录')
        }
      }
    })
  },


  authorize: function() {
    console.log('authorize')
    var that = this
    // 登陆并获取cookie
    wx.login({
      success: function(res) {
        console.log(res)
        var code = res.code
        // var appId = app.globalData.appId
        // var nickname = app.globalData.userInfo.nickName
        // console.log('nickname',nickname)
        // 请求后台
        wx.request({
          // url: app.globalData.serverUrl + app.globalData.apiVersion + '/apps/authorize/',
          url: 'http://127.0.0.1:8000/api/v1.0/apps/authorization',
          method: 'POST',
          data: {
            abc:'123123',
            code: code,
            // appId: appId,
            nickName: app.globalData.userInfo.nickName
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.showToast({
              title: '授权成功',
            })
            // 保存cookie
            var cookie = cookieUtil.getSessionIdFromResponse(res)
            cookieUtil.setCookieToStorage(cookie)
            that.setData({
              isLogin:true,
              userInfo:app.globalData.userInfo,
              hasUserInfo:true
            })
            app.setAuthStatus(true)
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