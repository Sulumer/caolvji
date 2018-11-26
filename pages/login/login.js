Page({
  data: {
    
  },
  userinfo: function(e){
    console.log(e.detail)
    wx.setStorageSync("userinfo", e.detail)
    if(e.detail.errMsg == "getUserInfo:ok"){
      wx.navigateTo({
        url: "/pages/index/index"
      })
    }
    else{
      wx.showLoading({
        title: '授权失败！',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1500)
    }
  },
  onLoad: function() {
    // 查看是否授权
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
})