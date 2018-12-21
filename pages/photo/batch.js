// pages/photo/batch.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: 'oVUDw0Cri4Yf8cWBXgHZmSTkHucY',
    url: 'www.baidu.com'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    console.log("that", that)
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
      },
      fail: function() {
        wx.getStorage({
          key: 'S-TOKEN',
          success(resStorage) {
            console.log("S-TOKEN", resStorage.data)
            wx.request({
              url: app.globalData.Service + 'user/me',
              method: 'GET',
              data: {},
              header: {
                'S-TOKEN': resStorage.data,
                'content-type': 'application/json' // 默认值
              },
              success(result) {
                console.log("result", result.data.data)
                that.setData({
                  openid: result.data.data.openId,
                  url: "https://cstdio.cn/caolvji/caolvji.zip"
                })
              }
            })
          }
        })
      }
    })
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
  Copy: function(e){
    console.log("e",e.currentTarget.dataset.para)
    var para = e.currentTarget.dataset.para
    if(para == 'openid')
      para = this.data.openid
    else para = this.data.url
    console.log("222",para)
    wx.setClipboardData({
      data: para,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
})