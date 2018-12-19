// pages/bianji/bianji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: []

  },
  chooseimgs: function() {
    var that=this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        var imgs = that.data.imgs.concat(tempFilePaths)
        that.setData({
            imgs:imgs
        })

      }
    })
  },
  deleteImgs:function(e){
    var that=this;
    var imgs=this.data.imgs;
    
    var current=e.target.dataset.index;
    console.log(e.target.dataset.index);
    imgs.splice(current,1);
    this.setData({
      imgs:imgs
    })
    console.log(e);
    console.log(this.data.imgs);
  
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

  },

})