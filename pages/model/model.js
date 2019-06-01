// pages/muban1/muban1.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_img:"https://qiniu.cstdio.cn/userstory/bg/storybg.jpg?slim",
    chooesVideo: '',    //上传视频地址
    tipHide: false,
    chooseTypeHide: true,
    id: '',
    title: '',
    count: '',
    startTime: 0,
    endTime: 999,
    story1: '在旅游世界中，你是一个旅游大魔王',
    story1_1: '到现在你走过了',
    story1_2: '3',
    story1_3: '个省份，走过',
    story1_4: '3',
    story1_5: '座城市',
    story1_6: '路再长，长不过你的脚步。',
    story1_7: '你一共拍下了',
    story1_8: '3',
    story1_9: '张照片',
    story1_10: '悄悄的将记忆写下，静静的躺在梦的口袋里。',
    story2: '你经常去往东方，是不是海岸线的风景深深地吸引了你',
    story2_1: '走走停停，看过千山万水只有',
    story2_2: '福建',
    story2_3: '最得你的偏爱。',
    story2_4: '流连于风的轨迹，只有',
    story2_5: '福州',
    story2_6: '最引你驻足。',
    story3_1: '寻初阳的朝荣，你去过最远的东方是',
    story3_2: '福州',
    story3_3: '再亮的初阳，敌不过你的星眸。',
    story4_1: '探索西域的神秘，你去过最远的西方是',
    story4_2: '福州',
    story4_3: '寻寻觅觅，就在灯火阑珊处。',
    story5_1: '回忆初春的温暖，你去过最远的南方是',
    story5_2: '福州',
    story5_3: '最温暖的，是你的手掌。',
    story6_1: '体验风的凌冽，你去过最远的北方是',
    story6_2: '福州',
    story6_3: '风的寒冷，顶不住你的热情。',
    story7: '时间，让油漆起褶皱，让皮肤起褶皱，让衣服起褶皱，但每天被拿出来的擦拭的回忆，却总是光滑如初。',
    top: '旅游故事',
    userData: {
      // story1_2: '3',
      // story1_4: '3',
      // story1_8: '3',
      // story2_2: '福建',
      // story2_5: '福州',
      // story3_2: '福州',
      // story4_2: '福州',
      // story5_2: '福州',
      // story6_2: '福州',
    },
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
    var back_img = this.data.back_img
    var title = '草履记'
    var startTime = 0
    var endTime = 0
    var back_img = "background-image: url(" + back_img + ")";
    console.log("za", back_img)
    that.setData({
      id: id,
      title: title,
      back_img: back_img
    })
    wx.getStorage({
      key: 'S-TOKEN',
      success(resStorage) {
        console.log("S-TOKEN", resStorage.data)
        wx.getStorage({
          key: 'userinfo',
          success: function (res) {
            console.log("res", res.data)
            that.setData({
              avatarUrl: res.data.avatarUrl,
              nickName: res.data.nickName
            });
            wx.request({
              url: app.globalData.Service + 'photo/count?startTime=' + startTime + '&endTime=' + endTime,
              method: 'GET',
              data: {},
              header: {
                'S-TOKEN': resStorage.data,
                'content-type': 'application/json' // 默认值
              },
              success(result) {
                var userData = that.data.userData
                console.log("result", result.data.data)
                var r = result.data.data
                userData['story1_2'] = r[0]
                userData['story1_4'] = r[1]
                userData['story1_8'] = r[2]
                userData['story2_2'] = r[3]
                userData['story2_5'] = r[4]
                userData['story3_2'] = r[15]
                userData['story4_2'] = r[17]
                userData['story5_2'] = r[16]
                userData['story6_2'] = r[18]
                userData['img1'] = r[5] + '?slim'
                userData['img2'] = r[7] + '?slim'
                userData['img3'] = r[9] + '?slim'
                userData['img4'] = r[8] + '?slim'
                userData['img5'] = r[10] + '?slim'
                userData['img6'] = r[6] + '?slim'
                that.setData({
                  userData: userData
                })
              }
            })
          },
        })
      }
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

  },

  click_share: function() {
    console.log("分享故事")
    wx.showLoading({
      title: '敬请期待',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  }


})