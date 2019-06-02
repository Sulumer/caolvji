// pages/fankui/fankui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    contentCount: 0,
    left: 40,
    three: false
  },
  gettxt:function(e){
    var that = this
    var id = e.target.dataset.id
    console.log('id',id)
    console.log("value", e.detail.value)
    if(id == 0)
    {
      that.setData({
        question: e.detail.value
      })
    }
    else if (id == 1) {
      that.setData({
        contact: e.detail.value
      })
    }
    else if (id == 2) {
      that.setData({
        txt: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleContentInput: function(e) {
    var value = e.detail.value;

    this.setData({
      contentCount: value.length
    });
  },
  feedback: function() {
    var that = this
    var imgs = that.data.imgs
    if (imgs != ''){
      for (var i = 0; i < imgs.length; i++){
        console.log("img", imgs[i]);
        wx.uploadFile({
          url: 'https://cstdio.cn/caolvji/upload.php', //仅为示例，非真实的接口地址
          filePath: imgs[i],
          name: 'file',
          formData: {
            'user': 'SLM'
          },
          success(res) {
            const data = res.data
            //do something
            console.log("php",data)
          }
        })
      }

      wx.request({
        url: 'https://cstdio.cn/caolvji/feedback.php?question=' + that.data.question + '&contact=' + that.data.contact + '&txt=' + that.data.txt + '&imgs=' + that.data.imgs,
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(result) {
          console.log("result", result.data.data)

        }
      })
      wx.showToast({
        title: '谢谢您的支持!',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
    else{
      wx.showLoading({
        title: '请上传截图！',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }
  },
  choosePhoto: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        var three = false
        var imgs = that.data.imgs.concat(tempFilePaths);
        if (imgs.length > 2)
          three = true;
        that.setData({
          imgs: imgs,
          three: three
        });
        console.log(imgs);
      },
    })
  },
  previewImg: function(e) {
    var current = e.target.id;
    console.log("curent:", e)
    wx.previewImage({
      urls: this.data.imgs,
      current: current,
      success: function(e) {
        console.log('预览成功');
      }
    })
  },
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

  }
})