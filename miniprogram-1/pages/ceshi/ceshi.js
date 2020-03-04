// pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      infos : null
  },
  // 请求 聚合api
  // text_network: function() {
  //   var that = this
  //   wx.request({
  //     url: 'http://api.juheapi.com/japi/toh?v=1.0&month=10&day=1&key=5632d75c2c0ea881b88f47e7fb66e6c8',
  //     method: 'GET',
  //     header: {},
  //     success: function(res) {
  //       that.setData({ infos : res.data.result})
  //       console.log("请求成功:" + res.data.result)
        
  //     },
  //     fail: function(res) {
  //       console.log("请求失败" + res.errMsg)
  //     }
  //   })
  // },
  // 请求 Django api
  text_network: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/juheapi/Today_in_history/',
      method: 'GET',
      header: {},
      success: function (res) {
        that.setData({ infos: res.data.result })
        console.log("请求成功:" + res.data.result)

      },
      fail: function (res) {
        console.log("请求失败" + res.errMsg)
      }
    })
  },

  click: function() {
    console.log("别点了")
  },

  /*
  setStorage 将数据存储在本地缓存中指定的key中,数据的生命周期与小程序本身一致
  */

  saveDate: function() {
    wx.setStorage({
      key: 'text',
      data: '我是保存的数据!',
      success: function(res) {
        console.log('保存成功')
      }
    })
  },
  // getStorage 将本地缓存中的数据从key中取出来
  read_data: function() {
    wx.getStorage({
      key: 'text',
      success: function(res) {
        var text = res.data
        console.log('读取成功:' + text)
      },
      fail: function(res) {
        console.log('读取失败' + res.errMsg)
      }
    })
  },
  // removeStorage 将指定key中的本地缓存删除
  remove_data: function() {
    wx.removeStorage({
      key: 'text',
      success: function(res) {
        console.log('清除缓存成功')
      }
    })
  },
  // clearStorage 将本地缓存全部删除(慎用)
  clear: function() {
    wx.clearStorage()
    console.log("全部的缓存清空了")
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