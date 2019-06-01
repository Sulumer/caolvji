// components/intro/intro.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      console.log(e)
      wx.login({
        success: r => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (r.code) {
            // 获取用户信息
            //console.log(r.code)
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                //console.log(res)
                wx.request({
                  url: app.globalData.URL + '/user/oauth',
                  method: 'POST',
                  data: {
                    code: r.code,
                    encryptedData: res.encryptedData,
                    ivStr: res.iv
                  },
                  success: function (res) {
                    wx.setStorage({
                      key: 'userTOKEN',
                      data: res.header["S-TOKEN"],
                    })
                  },
                  fail: function () {
                    console.log('调用微信请求接口失败')
                  }
                })
                // 给父组件传参
                var myEventDetail = {
                  val: 1
                }
                this.triggerEvent('empowerlogin', myEventDetail)
              },
              fail: function () {
                wx.showModal({
                 
                })
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    },
    //   userEmpower: function(e) {
    //     var that = this;
    //     //判断用户是否授权
    //     wx.login({
    //       success: res => {
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         if(res.code) {
    //           // 获取用户信息
    //           wx.getUserInfo({
    //             success: r => {
    //               wx.request({
    //                 url: app.globalData.URL + '/user/oauth',
    //                 method: 'POST',
    //                 data: {
    //                   code: res.code,
    //                   encryptedData: r.encryptedData,
    //                   ivStr: r.iv
    //                 },
    //                 success: function (res) {
    //                   console.log(res.data)
    //                 },
    //                 fail: function () {
    //                   console.log('调用微信请求接口失败')
    //                 }
    //               })

    //               // 给父组件传参
    //               var myEventDetail = {
    //                 val: 1
    //               }
    //               this.triggerEvent('empowerlogin', myEventDetail)
    //             }
    //           })
    //         }
    //       }
    //     })
    //   }
  }
})
