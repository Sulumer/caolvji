//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name:'陈瀚霖',
    country:"234",
    province:"数量",
    city:"33",
    autoplay:false,
    achieve:[
      {
        id:1,
        url:'fankui/fankui',
        src:'/images/achievement.png',
        content:'说走就走'
      },
      {
        id: 2,
        url: 'fankui/fankui',
        src: '/images/achievement.png',
        content: '说走就走'
      },
      {
        id: 3,
        url: 'fankui/fankui',
        src: '/images/achievement.png',
        content: '说走就走'
      },
    ],
    achieve1:[
      {
        id: 4,
        url: 'fankui/fankui',
        src: '/images/achievement.png',
        content: '说走就走'
      },
      {
        id: 5,
        url: 'fankui/fankui',
        src: '/images/achievement.png',
        content: '说走就走'
      },
      {
        id: 6,
        url: 'fankui/fankui',
        src: '/images/achievement.png',
        content: '说走就走'
      },
    ],
    //ctx=wx.createCanvasContext('firstCanvas')
  },
  link:function(){
      wx.navigateTo({
        url: 'fankui/fankui',
      })
  },
  btfankui:function(){
    //console.log(res),
    wx.navigateTo({
      url: '/pages/user/fankui/fankui',
    })
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
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
  onLoad: function () {
   
  }
  
})
