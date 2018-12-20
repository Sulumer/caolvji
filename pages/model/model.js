// pages/muban1/muban1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooesVideo: '',    //上传视频地址
    tipHide: false,
    chooseTypeHide: true,
    id: '',
    title: '',
    url: '',
    count:'',
    story1: '在你的旅游生活中，你去过了N个城市，是一个旅游大魔王',
    story1_1: '在你的旅游生活中，你去过了',
    story1_2: '3',
    story1_3: '个城市，是一个旅游大魔王',
    story2: '你经常去往东方，是不是海岸线的风景深深地吸引了你',
    story3_1: '你热衷的口味成迷，但是你最近好像爱上了',
    story3_2:'福州',
    story3_3:',我猜你定是在那儿找到了属于自己的羁绊。',
    top:'我的故事',
  },

  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // console.log(options)
    // var id = options.id
    // var url = options.url
    // var title = options.title
    var id = 4
    var url = '/images/model/model4.jpg'
    var title = '草履记'
    var back_img = "background-image: url(" + url + ")";
    console.log("za", back_img)
    that.setData({
      id: id,
      title: title,
      url: back_img
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  upphoto: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls: that.data.urls
        })

      }
    })
  },

  /**
   * 上传视频
   */
  upmovie: function () {
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          chooesVideo: res.tempFilePath
        })
      }
    })
  },

  upphoto1: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls1 = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls1: that.data.urls1
        })

      }
    })
  },

  upphoto2: function () {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls2 = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls2: that.data.urls2
        })

      }
    })
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