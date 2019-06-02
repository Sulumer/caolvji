//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nickName: '',
    avatarUrl: '',
    countryNum: 0,
    proNum: 0,
    cityNum: 0,
    autoplay: false,
    achievement:[
      {
        name: '说走就走',
        status:0,
        icon_up:"https://qiniu.cstdio.cn/userstory/ac/说走就走.png?slim",
        icon_down:"https://qiniu.cstdio.cn/userstory/ac/说走就走暗.png?slim"
      },
      {
        name: '拉帮结派',
        status: 0,
        icon_up: "https://qiniu.cstdio.cn/userstory/ac/拉帮结派.png?slim",
        icon_down: "https://qiniu.cstdio.cn/userstory/ac/拉帮结派暗.png?slim"
      },
      {
        name: '尽兴而归',
        status: 0,
        icon_up: "https://qiniu.cstdio.cn/userstory/ac/尽兴而归.png?slim",
        icon_down: "https://qiniu.cstdio.cn/userstory/ac/尽兴而归暗.png?slim"
      },
      {
        name: '壕无人性',
        status: 0,
        icon_up: "https://qiniu.cstdio.cn/userstory/ac/壕无人性.png?slim",
        icon_down: "https://qiniu.cstdio.cn/userstory/ac/壕无人性暗.png?slim"
      },
      {
        name: '行万里路',
        status: 0,
        icon_up: "https://qiniu.cstdio.cn/userstory/ac/行万里路.png?slim",
        icon_down: "https://qiniu.cstdio.cn/userstory/ac/行万里路暗.png?slim"
      },
      {
        name: '游出天外',
        status: 0,
        icon_up: "https://qiniu.cstdio.cn/userstory/ac/游出天外.png?slim",
        icon_down: "https://qiniu.cstdio.cn/userstory/ac/说走就走暗.png?slim"
      },
    ],
    //ctx=wx.createCanvasContext('firstCanvas')
  },
  feedback: function() {
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  canvasIdErrorCallback: function(e) {
    console.error(e.detail.errMsg)
  },
  onReady: function(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    /* var context = wx.createCanvasContext('firstCanvas')

     context.setStrokeStyle('green')
     context.setLineWidth(1)
     context.moveTo(110, 50)
     context.arc(80, 50, 30, 0, 2 * Math.PI,true)
     context.moveTo(110, 130)
     context.arc(80, 130, 30, 0, 2 * Math.PI, true)
     context.moveTo(190, 50)
     context.arc(160, 50, 30, 0, 2 * Math.PI, true)
     context.moveTo(190, 130)
     context.arc(160, 130, 30, 0, 2 * Math.PI, true)
     context.moveTo(270, 50)
     context.arc(240, 50, 30, 0, 2 * Math.PI, true)
     context.moveTo(270, 130)
     context.arc(240, 130, 30, 0, 2 * Math.PI, true)
     context.stroke()
     context.drawImage("../../picture/图片.png", 54, 35, 50, 28)
     context.drawImage("../../picture/图片.png", 134, 35, 50, 28)
     context.drawImage("../../picture/图片.png", 214, 35, 50, 28)
     context.drawImage("../../picture/图片.png", 54, 115, 50, 28)
     context.drawImage("../../picture/图片.png", 134, 115, 50, 28)
     context.drawImage("../../picture/图片.png", 214, 115, 50, 28)
     context.draw()*/
  },

  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function() {
    var that = this
    console.log("that",that)
    wx.getStorage({
      key: 'S-TOKEN',
      success(resStorage) {
        console.log("S-TOKEN", resStorage.data)
        wx.getStorage({
          key: 'userinfo',
          success: function(res) {
            console.log("res",res.data)
            that.setData({
              avatarUrl: res.data.avatarUrl,
              nickName: res.data.nickName
            });
            wx.request({
              url: app.globalData.Service + 'user/me',
              method: 'GET',
              data: {},
              header: {
                'S-TOKEN': resStorage.data,
                'content-type': 'application/json' // 默认值
              },
              success(result) {
                console.log("result", result.data.data)
                var r = result.data.data
                that.setData({
                  countryNum: 1,
                  cityNum: r.cityNum,
                  proNum: r.proNum
                })
                var achievement = that.data.achievement
                for(var i=0;i<6;i++)
                {
                  achievement[i].status = r.achievement[i]
                }
                that.setData({
                  achievement: achievement
                })
                console.log("achievement", that.data.achievement)
              }
            })
          },
        })
      }
    })
  }
})