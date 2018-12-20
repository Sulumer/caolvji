// pages/fankui/fankui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    contentCount: 0,
    left: 40,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  handleContentInput: function(e) {
    var value = e.detail.value;

    this.setData({
      contentCount: value.length
    });
  },
  fankui: function() {
    wx.showToast({
      title: '谢谢您的支持!',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  xuanzezhaopian: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs.concat(tempFilePaths);
         if (imgs.length > 2) imgs=imgs.pop;
        that.setData({
          imgs: imgs
        });
        console.log(imgs);
      },
    })
    
  },
  previewImg: function(e) {
    var current = e.target.id;
    console.log("curent:", e)
   
    wx.previewImage({
      urls: this.data.imgs,
      current: current,
      success: function(e) {
        console.log('预览成功');
      }
    })
  },
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