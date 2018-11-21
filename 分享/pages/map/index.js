import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';

const app = getApp();
var province = "";
var provinceList = [];
let chart = null;
var degree = 0;
var options = {
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
        areaColor: '#389BB7',
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

  var option = options;
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
   
  },

  onReady() {
  },
  /**
   * 页面的初始数据
   */
  data2: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }
  },
  /**
   *点击添加地址事件
   */
  add_address_fun: function () {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  data:{
    provinceNum: {},
    cityNum: {},
    countryNum: {},
    photoNum: {},
    videoNum: {},
    moodNum: {},
  },
  onLoad: function (options) {
    var provinceNum = options.kind;
    var cityNum = options.kind;
    var countryNum = options.kind;
    var photoNum = options.kind;
    var videoNum = options.kind;
    var moodNum = options.kind;
    this.setData({
      provinceNum: 1,
      cityNum: 1,
      countryNum: 1,
      photoNum : 1,
      videoNum: 1,
      moodNum: 1,
    })

  },
})


