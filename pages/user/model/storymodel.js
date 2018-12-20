// pages/gushimoban/gushimoban.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: [
      {
        id: 1,
        url: '/images/model/model1.jpg',
        title: '模板1',
      },
      {
        id: 2,
        url: '/images/model/model2.jpg',
        title: '模板2',
      },
      {
        id: 3,
        url: '/images/model/model3.jpg',
        title: '模板3',
      }, {
        id: 4,
        url: '/images/model/model4.jpg',
        title: '模板4',
      },
      {
        id: 5,
        url: '/images/model/model5.jpg',
        title: '模板5',
      }, {
        id: 6,
        url: '/images/model/model6.jpg',
        title: '模板6',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  clickimage: function (res) {
    // console.log(res)
    var id = res.currentTarget.dataset.id;
    var title = res.currentTarget.dataset.title;
    var url = res.currentTarget.dataset.url;
    wx.navigateTo({
      url: "/pages/user/model/model?id=" + id + "&url=" + url + "&title=" + title
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