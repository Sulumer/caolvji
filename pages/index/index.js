Page({
  data: {
    flag: true,
    showUpload: true,
    isPopping: false,//是否已经弹出
    animPlus: {},//旋转动画
    animCollect: {},//item位移,透明度
    animTranspond: {},//item位移,透明度
    animInput: {},//item位移,透明度
    homeActionLeftDistance:'100rpx',
    windowWidth:'',
    markers: [{
      iconPath: "/images/1542206356985.png",
      id: 0,
      latitude: 26.0510520000,
      longitude: 119.1924740000,
      width: 50,
      height: 50,
      callout: {
        content: "福州大学 \n 三十一号楼 316 \n 到此一游  ",
         fontSize: "16",
        borderRadius: "10",
        bgColor: "#CCFFFF",
         padding: "5",
         display: "byclick",
        borderWidth: "15",
        borderColor:"#3399FF",

       },
   

    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
  },
  //页面跳转
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
    wx.navigateTo({
      url: '/pages/post/post'
    })
    console.log("头上文字被点击", e)
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
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
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
    animationcollect.translate(0, -20).rotateZ(360).opacity(1).step();//opacity时透明度
    animationTranspond.translate(0, -120).rotateZ(360).opacity(1).step();
    animationInput.translate(0, -220).rotateZ(360).opacity(1).step();
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
    // 生命周期函数--监听页面加载
    
    // wx.showLoading({
    //   title: '',
    // })
    // var that = this
    // console.log("1",that.flag)
    // setTimeout(function () {
    //   that.setData({
    //     flag: false
    //   })
    // }, 2000)
    // console.log(this.flag)
    // if(this.flag){
    //   wx.hideLoading()
    // }
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
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
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
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