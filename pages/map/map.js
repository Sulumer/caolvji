import * as echarts from '../../ec-canvas/echarts';
import geoJson from '/mapData.js';

const app = getApp();
var province = "";
var provinceList = [];
let chart = null;
var degree = 0;
var optionsMap = {
  tooltip: {
    trigger: 'item'
  },

  visualMap: {
    min: 0,
    max: 100,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: false,
    show: false,
  },
  series: [{
    type: 'map',
    mapType: 'china',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    itemStyle: {

      normal: {
        borderColor: '#389BB7',
        areaColor: '#fff',
      },
      emphasis: {
        areaColor: '#00FFFF',
        borderWidth: 0
      }
    },
    animation: false,

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
      path: '/pages/index/index',
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
    provinceNum: {},
    cityNum: {},
    countryNum: {},
    photoNum: {},
    videoNum: {},
    moodNum: {},
  },
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },
  onLoad: function (options) {
    var provinceNum = options.kind;
    var cityNum = options.kind;
    var countryNum = options.kind;
    var photoNum = options.kind;
    var videoNum = options.kind;
    var moodNum = options.kind;
    var percentage = options.kind;
    var that = this;
    this.setData({
      provinceNum: 1,
      cityNum: 1,
      countryNum: 1,
      photoNum: 1,
      videoNum: 1,
      moodNum: 1,
      percentage: 100,
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
            //console.log("res -> ",res)
            var pList = res.data.data;
            for(var i=0;i<pList.length;i++){
              var p = pList[i].province;
              var n = pList[i].num;
              if (typeof p == "undefined" || p == null || p == ""){
                continue;
              }else{
                var province_data = { name: p, value: n };
                provinceList.push(province_data);
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
  
  //获取输入框的内容，并赋值到text中
  expInput: function (e) {  
    province = e.detail.value;
  },
  showCity: function (e){
    console.log(province);
    degree = 10;
    var province_data = { name: province, value: degree };
    provinceList.push(province_data);
    setTimeout(function () {
      chart.setOption(options);  //赋值后再设置一次option
    }, 10);
  },
})


