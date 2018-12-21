import * as echarts from '../../ec-canvas/echarts';
import geoJson from '/mapData.js';

const app = getApp();
var province = "";
var provinceList = [];
var geoMapList = [];
let chart = null;
var degree = 0;
var optionsMap = {
  tooltip: {},
  visualMap: {
    min: 0,
    max: 600,
    left: 'left',
    top: 'bottom',
    text: ['High', 'Low'],
    seriesIndex: [1],
    inRange: {
      color: ['#e0ffff', '#006edd'] //地图渐变色
    },
    calculable: false,
    show: false
  },
  geo: {
    map: 'china',
    roam: false,
    label: {
      normal: {
        show: false,
        textStyle: {
          color: 'rgba(0,0,0,0.4)'
        }
      }
    },
    itemStyle: {
      normal: {
        borderColor: 'rgba(0, 0, 0, 0.7)'
      },
      emphasis: {
        areaColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: geoMapList,
      symbolSize: 12,
      symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      symbolRotate: 45,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#FF8C00' //symbol颜色
        }
      }
    },
    {
      name: 'categoryA',
      type: 'map',
      geoIndex: 0,
    data: provinceList,

  }]};

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  echarts.registerMap('china', geoJson);
  var option = optionsMap;
  chart.setOption(option);
  return chart;
  
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: '听说你还没用过它？', // 分享标题
      desc: '一款可以记录足迹，分享旅游故事的产品', // 分享描述
      path: '/pages/login/login' // 分享路径
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称     
    },
  },
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    }) 
  },
  onLoad: function (options) {
    var percentage = options.kind;
    var that = this;
    this.setData({
      percentage: 99.8,
    })
    // 获取用户足迹 重新绘图
    wx.getStorage({
      key: 'S-TOKEN',
      success(resStorage) {
        console.log("S-TOKEN:",resStorage.data)

        wx.request({
          url: app.globalData.Service + 'photo/mark',
          method: "GET",
          header: {
            "S-TOKEN": resStorage.data,
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log("res -> ",res)
            var pList = res.data.data;
            for(var i=0;i<pList.length;i++){
              var p = pList[i].province;
              var n = pList[i].num;
              var la = pList[i].latitude;
              var ln = pList[i].longitude;
              var city = pList[i].city;
              if (typeof p == "undefined" || p == null || p == ""){
                continue;
              }else{
                var province_data = { name: p, value: 50 };
                provinceList.push(province_data);

                var city_data = { name: city,value: [ln,la]};
                geoMapList.push(city_data)
              }
            } 
            chart.setOption(optionsMap); 
          }
        })

        }
      }),
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },

  /*onReady: function () {
    // 绘制主背景图
    context.drawImage("/images/ma.jpg", 0, 0, 40, 40)*/
    /*// 绘制底部背景
    context.setFillStyle("#fff")
    context.setGlobalAlpha(0.5)
    context.fillRect(0, 800 * rate, 600 * rate, 800 * rate)
    context.setGlobalAlpha(1)*/
    // 绘制 二维码
   /* context.drawImage("/images/ma.jpg", 430 * rate, 810 * rate, 130 * rate, 130 * rate)*/
   /* // 处理 提示文字
    var className = "高等数学哈哈哈"
    var nickName = that.slice(that.data.userInfo.nickName)
    className = that.slice(className)

    // 绘制 提示文字
    context.setFillStyle("#000")
    context.setFontSize(28 * rate)
    context.fillText(nickName + " 在 " + className + " 课堂上", 30 * rate, 920 * rate)
    context.fillText("手速超过了 ", 30 * rate, 970 * rate)
    context.setFillStyle("#f00")
    context.setFontSize(33 * rate)
    context.fillText("100%", 180 * rate, 970 * rate)
    context.setFillStyle("#000")
    context.setFontSize(28 * rate)
    context.fillText("的同学！", 280 * rate, 970 * rate)

    context.setFontSize(20 * rate)
    context.fillText("长按二维码", 445 * rate, 965 * rate)
    context.fillText("了解E点课堂", 440 * rate, 990 * rate)

    // 下载 微信头像（原官方Url在手机上无法绘制）
    var downloadTask = wx.downloadFile({
      url: that.data.userInfo.avatarUrl,
      success: function (res) {

        // 切割 圆形画布
        context.save()
        context.beginPath()
        context.arc(130 * rate, 800 * rate, 65 * rate, 0, 2 * Math.PI)
        context.closePath()
        context.setStrokeStyle("#fff")
        context.setLineWidth(1)
        context.stroke()
        context.clip()

        // 绘制 微信头像
        context.drawImage(res.tempFilePath, 65 * rate, 735 * rate, 130 * rate, 130 * rate)
        context.restore()
      }
    })*/
    /*downloadTask.onProgressUpdate(function (res) {
      console.log(res)
      if (res.progress == 100) {
        // 绘制
        setTimeout(function () {
          context.draw()
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'canvas',
              success: function (res) {
                console.log("canvas", res)
                that.setData({
                  canvasPic: res.tempFilePath
                })
                if (typeof (callback) == "function") {
                  callback(res.tempFilePath)
                }
              }
            }, this)
          }, 100)

        }, 100)
      }
    })*/
/*},*/
  onSaveImg: function () {
    const ctx = wx.createCanvasContext('canvas');         //看回wxml里的canvas标签，这个的Canvas要和标签里的canvas-id一致
    console.log("123")
    ctx.clearRect(0, 0, 300, 300);
    ctx.drawImage("/images/ma.jpg", 0, 0, 300, 300);
    /*ctx.setFillStyle("#02446e");
    ctx.setFontSize(26);
    ctx.fillText("亲爱的" + this.data.testName + this.data.testId, 100, 610 - 60);
    ctx.setTextAlign("center");
    ctx.fillText("你的有入扔有人不迷", 435, 790 - 60);

    ctx.setTextAlign("left");
    ctx.setFillStyle("black");
    ctx.setFontSize(18);
    ctx.fillText("我等你", 330, 825 - 60);
    ctx.setFontSize(22);

    ctx.drawImage("/images/test.png", 0, 936 - 60, 646, 30);*/
    var self = this;

    ctx.draw(true, setTimeout(function () {     //为什么要延迟100毫秒？大家测试一下
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 646,
        height: 966,
        destWidth: 646,
        destHeight: 966,
        canvasId: 'canvas',
        success: function (res) {
          self.data.savedImgUrl = res.tempFilePath;
          self.saveImageToPhoto();
        }
      })
    }, 100))
  },
  //保存图片到相册
  saveImageToPhoto: function () {
    if (this.data.savedImgUrl != "") {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.savedImgUrl,
        success: function () {
          wx.showModal({
            title: '保存图片成功',
            content: '足迹地图到相册，您可以手动分享到朋友圈！',
            showCancel: false
          });
        },
        fail: function (res) {
          console.log(res);
          if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
            wx.showModal({
              title: '保存图片失败',
              content: '您已取消保存图片到相册！',
              showCancel: false
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
              complete: function (res) {
                console.log(res);
                if (res.confirm) {
                  wx.openSetting({})      //打开小程序设置页面，可以设置权限
                } else {
                  wx.showModal({
                    title: '保存图片失败',
                    content: '您已取消保存图片到相册！',
                    showCancel: false
                  });
                }
              }
            });
          }
        }
      })
    }
  }
})


