var dataArray = new Array()
var that;
var app = getApp();
var check;
Page({
  data: {
    latitude: 39.8085360414,
    longitude: 116.6748046875,
    flag: true,
    showUpload: true,
    isPopping: false,//是否已经弹出
    animPlus: {},//旋转动画
    animCollect: {},//item位移,透明度
    animTranspond: {},//item位移,透明度
    animInput: {},//item位移,透明度
    homeActionLeftDistance:'100rpx',
    windowWidth:'',
    d:0,
    amarkers:[],  
    modalHidden: true,
    // markers: [{
    //   iconPath: "/images/1542206356985.png",
    //   id: 0,
    //   latitude: 26.0510520000,
    //   longitude: 119.1924740000,
    //   width: 50,
    //   height: 50,
    //   callout: {
    //     content: "福州大学 \n 三十一号楼 316 \n 到此一游  ",
    //      fontSize: "16",
    //     borderRadius: "10",
    //     bgColor: "#CCFFFF",
    //      padding: "5",
    //      display: "byclick",
    //     borderWidth: "15",
    //     borderColor:"#3399FF",

    //    },
   

    // }],
    markers:[],

  },
  //页面跳转
  buttonTap: function () {
    this.setData({
      modalHidden: false,
      check: true,
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true,
      check: false
    })
  },
  navi: function(e){
    console.log(e.currentTarget.dataset.path)
    var path = e.currentTarget.dataset.path
    console.log(path)
    wx.navigateTo({
      url: '/pages/' + path + '/' + path,
    })
  },
  //点击弹出
  ct: function (e) {
    var data = this.data.markers[e.markerId]
    // wx.navigateTo({
    //   url: '/pages/post/post?id=' + e.markerId + '&address=' + data.callout.content + '&img=' + data.iconPath
    // })
    console.log("头上文字被点击", e.markerId)
    console.log("this.maker", data)
  },
  plus: function () {
    // this.setData({
    //   maskFlag: false,
    //   oilchooseFlag: true
    // })
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  //弹出动画
  popp: function () {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,//动画持续时间
      timingFunction: 'ease-out'//结束时减速
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();//在z轴旋转180度
    animationcollect.translate(12, -5).rotateZ(360).opacity(1).step();//opacity时透明度
    animationTranspond.translate(12, -220).rotateZ(360).opacity(1).step();
    animationInput.translate(10, -75).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  onLoad: function (options) {
    // var amarkers = new Array()
    console.log("onLoad")
    var that = this
    wx.getLocation({
      success: function (res) {
        var la = (res.latitude).toFixed(6);
        var lon = (res.longitude).toFixed(6);
        that.setData({
          latitude: la,
          longitude: lon,
        });
        console.log("当前位置", res.latitude, res.longitude);
      },
      fail: function (res) {
        console.log("wu当前位置")
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    console.log("onShoe")
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log("success", res.userInfo)
    //         }
    //       })
    //       setTimeout(function () {
    //         wx.hideLoading()
    //       }, 2)
    //     }
    //     else {
    //       console.log("fail")
    wx.getStorage({
      key: 'S-TOKEN',
      success(resStorage) {
        wx.request({
          url: app.globalData.Service + 'photo/map',
          method: "GET",
          data: {
          },
          header: {
            'content-type': 'application/json', // 默认值
            "S-TOKEN": resStorage.data
          },
          success(res) {
            console.log("nnd", res);
            console.log("status!!",res.statusCode)
            dataArray = res.data.data;
            // var amarkers = new Array()
            var am=that.data.amarkers
            var d = that.data.d
            for (var i = d; i < (dataArray == undefined ? 0 : dataArray.length); i++) {
              d++;
              var dic = dataArray[i];
              if (dic.latitude != null) {
                var laa = (dic.latitude).toFixed(6);
                var lonn = (dic.longitude).toFixed(6);
                // dic.iconPath = dic.imgUrl+ "?imageslim";
                // dic.width=70;
                // dic.height=70;
                //dic.callout.content=dic.province;
                //dic.callout.fontSize= "16";
                // var link = "";
                // if (dic.imgUrl != undefined) link = dic.imgUrl + "?imageslim";
                // else if (dic.imgUrl == undefined) link = "/images/icon/make.png";
                let marker = {
                  iconPath: "/images/icon/make.png",
                  id: i || 0,
                  //name: point.placeName || '',
                  //title: point.placeName || '',
                  latitude: laa,
                  longitude: lonn,
                  // label: {
                  //   x: -24,
                  //   y: -26,
                  //   content: dic.province,
                  // },
                  width: 35,
                  height: 35,
                  callout: {
                    content: dic.address || dic.province + dic.city,
                    fontSize: 14,
                    bgColor: "#FFF",
                    borderWidth: 1,
                    borderColor: "#CCC",
                    padding: 4,
                    display: "byclick",
                    textAlign: "center"
                  }
                };
                // console.log("经纬度", laa, lonn);
                am.push(marker);
              }
              that.setData(
                { markers: am }
              )
            }
            // that.setData({
            //   amarkers: am
            // })
            console.log("markers", that.data.markers);
            that.setData({
              d: d
            })
          }
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2)
      },
      fail(resStorage) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    })
    //     }
    //   }
    // })
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
      title: '听说你还没用过它？', // 分享标题
      desc: '一款可以记录足迹，分享旅游故事的产品', // 分享描述
      path: '/pages/login/login' // 分享路径
    }
  },
  oilConfirm: function () {
    this.setData({
      maskFlag: true,
      oilchooseFlag: false
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
})