// // pages/find/videoselect/videoselect.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },

//   uploadVideo: function () {
//     var me = this;

//     wx.chooseVideo({
//       sourceType: ['album', 'camera'],
//       success(res) {
//         console.log(res);

//         var duration = res.duration;
//         var tmpheight = res.height;
//         var tmpwidth = res.width;
//         var tmpVideoUrl = res.tempFilePath;
//         var tmpCoverUrl = res.thumbTempFilePath;

//         if (duration > 11) {
//           wx.showToast({
//             title: '视频长度不能超过10秒...',
//             icon: "none",
//             duration: 2500
//           })
//         } else if (duration < 1) {
//           wx.showToast({
//             title: '视频长度不能小于1秒...',
//             icon: "none",
//             duration: 2500
//           })
//         } else {
//           //TODO 打开选择bgm的页面
//         }


//       }
//     })
//   }
// })
//index.js
var app = getApp()
var count = 0;
Page({
  data: {
    chooesVideo: 'https://cstdio.cn/caolvji/clj.mp4', //上传视频地址
    tipHide: false,
    chooseTypeHide: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.status)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
    this.videoContext = wx.createVideoContext('prew_video');
  },
  /**
   * 上传视频
   */
  uploadVideo: function() {
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {
        that.setData({
          chooesVideo: res.tempFilePath
        })
      }
    })
  },

  /**
   * 全屏改变
   */
  bindVideoScreenChange: function(e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  },
  submitClick: function(e) {
    wx.showLoading({
      title: '正在上传',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 3000)
    wx.showToast({
      title: '发布成功！',
    })
    setTimeout(function() {
      wx.navigateBack({
        delta: 1
      })
    }, 1500)
  }
})