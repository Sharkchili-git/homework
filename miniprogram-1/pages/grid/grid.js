const app = getApp()
Page({
      data: {
        grids: ["语文", "数学", "英语", "H5", "Python", "UI", "物理", "化学", "生物"]
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        // 调用一个方法来获取Django中的数据,并且将获取到的数据更新到九宫格
        this.updateMenuData()
      },
      updateMenuData: function() {
        var that = this
        wx.request({
          url: app.globalData.appurl + app.globalData.appv + app.globalData.routeapp,
          success: function(res) {
            // console.log('请求成功:', res.data)
            // console.log('请求成功:', res.data.appnames)
            console.log('请求成功:', res.data.publish)
            that.setData({
              grids: res.data.publish
            })
          },
          fail: function(res) {
            console.log('获取数据失败,有可能服务器没有开启')
            console.log(res.errMsg)
          }
        })

      },
      onNavigatorTap: function(e) {
        console.log(e)
        var index = e.currentTarget.dataset.index
        // wx.showToast({
        //   title: index+'',
        // })
        var item = this .data.grids[index]
        console.log(item)
        if (item.app.name == "隰县天气") {
          wx.navigateTo({
            url: "/pages/weather/weather",
          })
        } else if (item.app.name == "微信") {
          wx.navigateTo({
            url: "/pages/history/history"
            })
          }
        },
      });