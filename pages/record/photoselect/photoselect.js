var that;
var app = getApp()
Page({
  data: {
    labelcount :0,
    images: [],
    uploadedImages: [],
    //imageWidth: getApp().screenWidth / 4 - 10
  },
  onLoad: function (options) {
    that = this; var objectId = options.objectId; console.log(objectId);
  },
  chooseImage: function () {
    // 选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log("tempFilePaths",tempFilePaths[0]);
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
        console.log("images",that.images[0])
        //获取S-TOKEN
        wx.getStorage({
          key: 'S-TOKEN',
          success(res) {
            console.log("S-TOKEN",res.data)
            // console.log("images",that.images)
            //上传照片获取位置
            wx.uploadFile({
              url: app.globalData.Service + 'photo/upload', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'photo',
              formData: {
                'user': 'test'
              },
              header: {
                "S-TOKEN": res.data,
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                const data = res.data
                console.log("uploadsuccess",data)
              }
            })
          }
        })
      }
    })
  },
  // 图片预览
  previewImage: function (e) {
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
  delete: function (e) {
    var index = e.currentTarget.dataset.index; var images = that.data.images;
    images.splice(index, 1);
    that.setData({
      images: images
    });
  },

  addlabel: function(e){
    var temp = this.data.labelcount +1
    this.setData({
      labelcount: temp
    });
  }


})