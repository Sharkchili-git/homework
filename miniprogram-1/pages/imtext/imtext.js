Page({
  data: {
    // 待上传的图片列表,存储的是图片的本地地址
    files: [],
    // 下载的图片列表
    downloadedBackupedFiles: []
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 上传图片
  uploadpic: function() {
    for (var i = 0; i < this.data.files.length; i++) {
      var filePath = this.data.files[i]
      // 默认上传方式为 POST
      wx.uploadFile({
        url: 'http://127.0.0.1:8000/api/v1.0/apps/imagetext',
        filePath: filePath,
        name: 'test' + filePath,
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log('上传失败,有可能服务器没有开启')
          console.log(res.errMsg)
        }
      })
    }
  },
  // 下载单张图片(需要设置图片路径在 Python代码中)
  loadpic: function() {
    var that = this
    wx.downloadFile({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/showimage/',
      success: function(res) {
        console.log('成功了')
        console.log(res.tempFilePath)
        console.log(res.filePath)
        var tmpPath = res.tempFilePath
        var newDownloadedBackupedFiles = that.data.downloadedBackupedFiles
        newDownloadedBackupedFiles.push(tmpPath)
        that.setData({
          downloadedBackupedFiles: newDownloadedBackupedFiles
        })
      },
      fail: function(res) {
        console.log('下载失败,有可能服务器没有开启')
        console.log(res.errMsg)
      }

    })
  },
  // 删除单张图片(需要指定图片的名字)
  deletepic: function() {
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/imagetext?imagename=ee34c21e59501132561084651214128d',
      method: 'DELETE',
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },
  // 长按图片删除
  longTapConfirm: function(e) {
    var that = this
    var confirmList = ['删除这张图片', '其他']
    wx.showActionSheet({
      itemList: confirmList,
      success: function(res) {
        if (res.cancel) {
          return
        }
        console.log(e)
        var imageIndex = e.currentTarget.dataset.index
        var imageItem = that.data.downloadedBackupedFiles[imageIndex]
        var newList = that.data.downloadedBackupedFiles
        newList.splice(imageIndex, 1)
        that.setData({
          downloadedBackupedFiles: newList
        })
        // that.deletepic(imageItem)
      }
    })
  },
});