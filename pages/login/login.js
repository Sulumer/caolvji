var app = getApp()
Page({
  data: {
    
  },
  userinfo: function(e){
    console.log("e",e)
    console.log("userinfo",e.detail.userInfo)
    wx.setStorage({
      key: 'userinfo',
      data: e.detail.userInfo,
    })
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 请求获取用户信息
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            console.log(res)
            console.log("res.code:", res.code)
            console.log("e.detail.encryptedData:", e.detail.encryptedData)
            console.log("e.detail.iv:", e.detail.iv)
            wx.request({
              url: app.globalData.Service + 'user/oauth', //仅为示例，并非真实的接口地址
              method: 'POST',
              data: {
                code: res.code,
                encryptedData: e.detail.encryptedData,
                ivStr: e.detail.iv
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log("res",res)
                //缓存S-TOKEN
                // wx.getSystemInfo({
                //   success(res) {
                //     console.log("system", res)
                //   }
                // })
                if (res.header['S-TOKEN'] != null){
                  wx.setStorage({
                    key: "S-TOKEN",
                    data: res.header["S-TOKEN"]
                  })
                  var stoken = res.header["S-TOKEN"]
                }
                else{
                  wx.setStorage({
                    key: "S-TOKEN",
                    data: res.header["s-token"]
                  })
                  var stoken = res.header["s-token"]
                }
                
                //换取userid
                wx.request({
                  url: app.globalData.Service + 'user/me', //仅为示例，并非真实的接口地址
                  method: 'GET',
                  data: {
                  },
                  header: {
                    "S-TOKEN": stoken,
                    'content-type': 'application/json' // 默认值
                  },
                  success(resme) {
                    // console.log("resme.data.data", resme.data.data)
                    console.log("useId", resme.data.data.userId)
                    //保存id到全局变量
                    // app.globalData.userId = resme.data.data.userId
                    // console.log("app", app.globalData.userId)
                    //缓存useId
                    wx.setStorage({
                      key: "userId",
                      data: resme.data.data.userId
                    })
                    // console.log("userinfo", e.detail.userInfo)
                    // wx.setStorage({
                    //   key: 'userinfo',
                    //   data: e.detail.userInfo,
                    // })
                  }
                })
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }
            })
          } else {
            wx.showLoading({
              title: '登录失败！',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    else {
      wx.showLoading({
        title: '授权失败！',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1500)
    }
    // wx.setStorageSync("userinfo", e.detail)
  },
  onLoad: function() {
    // 查看是否授权
    wx.getStorage({
      key: 'S-TOKEN',
      success: function (resStorage) {
        wx.request({
          url: app.globalData.Service + 'user/me',
          method: 'GET',
          data: {},
          header: {
            'S-TOKEN': resStorage.data,
            'content-type': 'application/json' // 默认值
          },
          success(result) {
            console.log("result", result)
            console.log("status", result.statusCode)
            var code = result.statusCode
            if(code == 200){
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
            else if(code == 401 || code == 500){
              wx.showLoading({
                title: '请重新登录！',
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
            }
          }
        })
      },
    })
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
})