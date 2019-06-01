var that;
var time = require('../../../utils/util.js');
var app = getApp()
Page({
  data: {
    labelcount: 0,
    content: "",
    latitude: "",
    longitude: "",
    address: "所在位置",
    photoid: "",
    phototime: "",
    city: "",
    province: "",
    flag: false,
    up_flag: false,
    images: [],
    try: 0,
    uploadedImages: [],
    //imageWidth: getApp().screenWidth / 4 - 10
  },
  onLoad: function(options) {
    that = this;
    var objectId = options.objectId;
    // console.log(objectId);
  },
  chooseImage: function() {
    that = this;
    // 选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['origin'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log("tempFilePaths", tempFilePaths[0]);
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
        console.log("images", that.data.images[0])
        //获取S-TOKEN
        that.analysis()
      }
    })
  },
  analysis: function() {
    var that = this
    wx.showLoading({
      title: '正在上传照片',
    })
    wx.getStorage({
      key: 'S-TOKEN',
      success(resStorage) {
        console.log("S-TOKEN", resStorage.data)
        //获取上传凭证
        wx.request({
          url: app.globalData.Service + 'photo/upload', //仅为示例，并非真实的接口
          method: 'POST',
          data: {
            "label": "福州大学",
            "latitude": "",
            "longitude": "",
            "province": ""
          },
          header: {
            'content-type': 'application/json', // 默认值
            "S-TOKEN": resStorage.data
          },
          success(res_oos) {
            console.log("res_oos", res_oos.data)
            if (res_oos.data.error == "None") {
              that.retry()
            } else {
              console.log("uploadToken", res_oos.data.data.uploadToken)
              console.log("key", res_oos.data.data.key)
              //上传照片
              wx.uploadFile({
                url: 'http://up.qiniu.com',
                filePath: that.data.images[0],
                name: 'file',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                formData: {
                  'key': res_oos.data.data.key,
                  'token': res_oos.data.data.uploadToken
                },
                success: function(r) {
                  that.setData({
                    up_flag: true
                  })
                  console.log("r", r)
                  setTimeout(function() {
                    wx.hideLoading()
                  }, 2)
                  wx.showLoading({
                    title: '正在获取照片信息',
                  })
                  wx.request({
                    url: 'https://qiniu.cstdio.cn/' + res_oos.data.data.key + '?exif',
                    method: 'GET',
                    data: {},
                    header: {
                      'content-type': 'application/json', // 默认值
                    },
                    success(pos_res) {
                      console.log("pos_res", pos_res.data)
                      if (pos_res.data.error != null || pos_res.data.GPSLongitude == null) {
                        that.setData({
                          try: 0
                        })
                        // setTimeout(function () {
                        //   wx.hideLoading()
                        // }, 2)
                        wx.showLoading({
                          title: '查无位置信息！',
                        })
                        setTimeout(function() {
                          wx.hideLoading()
                        }, 1500)
                      } else {
                        //   console.log("GPSLatitude", pos_res.data.GPSLatitude.val)
                        //   console.log("GPSLongitude", pos_res.data.GPSLongitude.val)
                        // that.setData({
                        //   photoid: res_oos.data.data.id,
                        //   latitude: pos_res.data.GPSLatitude.val,
                        //   longitude: pos_res.data.GPSLongitude.val,
                        // })
                        // console.log("photoid", that.data.photoid)
                        // console.log("latitude", that.data.latitude)
                        // console.log("longitude", that.data.longitude)
                        console.log("datetime", pos_res.data.DateTime.val)
                        wx.request({
                          url: 'https://cstdio.cn/caolvji/location.php?latitude=' + pos_res.data.GPSLatitude.val + '&longitude=' + pos_res.data.GPSLongitude.val,
                          method: 'GET',
                          data: {},
                          header: {
                            'content-type': 'application/json', // 默认值
                          },
                          success(position) {
                            console.log("position", position.data)
                            if (position.data.code == 200) {
                              wx.showLoading({
                                title: '获取信息成功',
                              })
                              setTimeout(function() {
                                wx.hideLoading()
                              }, 500)
                              that.setData({
                                flag: true,
                                try: 0,
                                photoid: res_oos.data.data.id,
                                latitude: position.data.latitude,
                                longitude: position.data.longitude,
                                phototime: new Date((pos_res.data.DateTime.val.replace(/:/, "/")).replace(/:/, "/")).getTime(),
                                address: position.data.address,
                                city: position.data.city,
                                province: position.data.province
                              })
                              // console.log("phototime", that.data.phototime)
                              // console.log("address", position.data.result.address)
                              // console.log("nation", position.data.result.address_component.nation)
                              // console.log("province", position.data.result.address_component.province)
                              // console.log("city", position.data.result.address_component.city)
                            } else {
                              that.retry();
                            }
                          },
                          fail: function() {
                            that.retry();
                          }
                        })
                      }
                    }
                  })
                },
                fail: function() {
                  that.setData({
                    up_flag: true
                  })
                  console.log("upfail")
                  // setTimeout(function () {
                  //   wx.hideLoading()
                  // }, 2)
                  that.retry();
                },
                complete: function() {
                  console.log("up_false:", that.data.up_flag)
                  if (that.data.up_flag == false) {
                    that.retry();
                  } else {
                    that.setData({
                      up_flag: false
                    })
                  }
                }
              })
            }
          },
          fail: function() {
            that.retry();
          }
        })
      }
    })
  },
  retry: function() {
    if (that.try > 3) {
      wx.showLoading({
        title: '加载失败',
      })
      setTimeout(function() {
        wx.hideLoading()
      }, 500)
      that.setData({
        try: 0
      })
      // that.analysis()
    } else {
      that.setData({
        try: that.try+1
      })
      wx.showLoading({
        title: '正在为您重试',
      })
      setTimeout(function() {
        wx.hideLoading()
      }, 500)
      that.analysis()
    }
  },
  // 图片预览
  previewImage: function(e) {
    //console.log(this.data.images);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.images
    })
  },
  // submit: function () {        
  //   // 提交图片，事先遍历图集数组
  //   that.data.images.forEach(function (tempFilePath) {
  //     new AV.File('file-name', {
  //       blob: {
  //         uri: tempFilePath,
  //       },
  //     }).save().then(                
  //       // file => console.log(file.url())
  //     function (file) {                    
  //       // 先读取
  //       var uploadedImages = that.data.uploadedImages;
  //       uploadedImages.push(file.url());                    
  //       // 再写入
  //       that.setData({
  //         uploadedImages: uploadedImages
  //       }); console.log(uploadedImages);
  //     }
  //     ).catch(console.error);
  //   });
  //   wx.showToast({
  //     title: '评价成功', success: function () {
  //       wx.navigateBack();
  //     }
  //   });
  // }, 
  delete: function(e) {
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },

  addlabel: function(e) {
    var temp = this.data.labelcount + 1
    this.setData({
      labelcount: temp
    });
  },

  uploadPhoto: function() {
    that = this;
    wx.getStorage({
      key: 'S-TOKEN',
      success(s) {
        console.log("stoken", s.data)
        console.log("province", that.data.province)
        console.log("city", that.data.city)
        console.log("photoid", that.data.photoid)
        console.log("phototime", that.data.phototime)
        console.log("latitude", that.data.latitude)
        console.log("longitude", that.data.longitude)
        console.log("address", that.data.address)
        wx.request({
          url: app.globalData.Service + 'photo/update?',
          method: 'POST',
          data: {
            "id": that.data.photoid,
            "phototime": that.data.phototime,
            "latitude": that.data.latitude,
            "longitude": that.data.longitude,
            "province": that.data.province,
            "city": that.data.city,
            "address": that.data.address
          },
          header: {
            'content-type': 'application/json', // 默认值
            'S-TOKEN': s.data
          },
          success(res) {
            console.log("status", res.data)
            if (res.data.text == 'update success!') {
              wx.showToast({
                title: '发布成功！',
              })
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
          }
        })
      }
    })
  },
  warn: function() {
    wx.showLoading({
      title: '格式错误！',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
  }
})