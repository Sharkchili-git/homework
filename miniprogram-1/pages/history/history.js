// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos: null
  },
  // 请求 聚合api
  text_network: function() {
    var that = this
    wx.request({
      url: 'http://api.juheapi.com/japi/toh?v=1.0&month=10&day=1&key=5632d75c2c0ea881b88f47e7fb66e6c8',
      method: 'GET',
      header: {},
      success: function(res) {
        that.setData({
          infos: res.data.result
        })
        console.log("请求成功:" + res.data.result)

      },
      fail: function(res) {
        console.log("请求失败" + res.errMsg)
      }
    })
  },
  text_network: function() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/juheapi/Today_in_history/',
      method: 'GET',
      header: {},
      success: function(res) {
        that.setData({
          infos: res.data.result
        })
        console.log("请求成功:" + res.data.result)

      },
      fail: function(res) {
        console.log("请求失败" + res.errMsg)
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