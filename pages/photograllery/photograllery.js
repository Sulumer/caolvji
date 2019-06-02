//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    // degree1: "  111.11°",
    // degree2: "  111.11°",
    // adress: " 福建省福州市福州大学",
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // imgUrls: [
    //   '/images/1.jpg',
    //   '/images/photo.png',
    //   '/images/movie.png',
    // ]
    photoData: []
  },

  //事件处理函数
  toupper: function() {
    console.log("触发了toupper");
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var that = this;
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    wx.getStorage({
      key: 'S-TOKEN',
      success(resStorage) {
        console.log("S-TOKEN", resStorage.data)
        wx.request({
          url: app.globalData.Service + 'photo/map',
          method: 'GET',
          data: {},
          header: {
            'S-TOKEN': resStorage.data,
            'content-type': 'application/json' // 默认值
          },
          success(result) {
            console.log("photosData", result.data.data)
            var data = result.data.data
            for(var i = 0; i < data.length; i ++){
              // console.log("i",data[i]);
              if (data[i].latitude & data[i].longitude){
                data[i].latitude = (data[i].latitude).toFixed(6);
                data[i].longitude = (data[i].longitude).toFixed(6);
              }
              // console.log("99",data[i].address.length)
              if (data[i].address == null)
                data[i].address = "无位置信息";
              // else if(data[i].address.length > 15)
              //   data[i].address = (data[i].address).substring(0,15) + "...";
              data[i].imgUrl = data[i].imgUrl + "?slim";
            }
            that.setData({
              photoData: data
            })
          }
        })
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  imageLoad: function (e) {
    var that = this
    //获取图片的原始宽度和高度
    let originalWidth = e.detail.width;
    let originalHeight = e.detail.height;
    // let imageSize = util.Util.imageZoomHeightUtil(originalWidth,originalHeight);

    // let imageSize = util.Util.imageZoomHeightUtil(originalWidth,originalHeight,375);
    let imageSize = util.Util.imageZoomWidthUtil(originalWidth, originalHeight, 81);
    that.setData({
      imageWidth: imageSize.imageWidth, 
      imageHeight: imageSize.imageHeight
    });
  }
})