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
      title: '分享',
      success: function () { },
      fail: function () { }
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
})


