// pages/fankui/fankui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  fankui:function(){
    wx.redirectTo({
      url: '../tijiaochenggong/tijiaochenggong',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  xuanzezhaopian:function(){
    var _this=this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths=res.tempFilePaths;
        _this.setData({
          imgs:tempFilePaths
        });
        console.log(tempFilePaths)
      },
    })
  },
  previewImg:function(e){
    var current=e.target.dataset.src;
    wx.previewImage({
      urls: this.data.imgs,
      current:current,
      success:function(e){
        console.log('预览成功');
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})