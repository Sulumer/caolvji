// pages/find/find.js
Page({
  data: {
    images: [],
    active: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  // photoClick()  {
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths
  //       const images = this.data.images.concat(res.tempFilePaths)
  //       this.data.images = images.length
  //     }
  //   })
  // },
  photoClick() {
    wx.navigateTo({
      url: '/pages/record/photoselect/photoselect'
    })
  },
  // videoClick() {
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: 'back',
  //     success(res) {
  //       console.log(res.tempFilePath)
  //     }
  //   })
  // },
  videoClick() {
    wx.navigateTo({
      url: 'videoselect/videoselect'
    })
  },
  wordsClick() {
    wx.navigateTo({
      url: 'wordselect/wordselect'
    })
  },
  storyClick() {
    wx.navigateTo({
      url: '/pages/user/model/storymodel'
    })
  },
  hotClick() {
    console.log(1)
    this.setData({
      active: 0
    })
  },
  aroundClick() {
    this.setData({
      active: 1
    })
  },
  hongkongClick() {
    this.setData({
      active: 2
    })
  },
  aomenClick() {
    this.setData({
      active: 3
    })
  }
})