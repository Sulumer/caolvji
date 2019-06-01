function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

class Util {

  /***
   * 按照显示图片的宽等比例缩放得到显示图片的高
   * @params originalWidth  原始图片的宽
   * @params originalHeight 原始图片的高
   * @params imageWidth     显示图片的宽，如果不传就使用屏幕的宽
   * 返回图片的宽高对象
  ***/
  static imageZoomHeightUtil(originalWidth, originalHeight, imageWidth) {
    let imageSize = {};
    if (imageWidth) {
      imageSize.imageWidth = imageWidth;
      imageSize.imageHeight = (imageWidth * originalHeight) / originalWidth;
    } else {//如果没有传imageWidth,使用屏幕的宽
      wx.getSystemInfo({
        success: function (res) {
          imageWidth = res.windowWidth;
          imageSize.imageWidth = imageWidth;
          imageSize.imageHeight = (imageWidth * originalHeight) / originalWidth;
        }
      });
    }
    return imageSize;
  }

  /***
   * 按照显示图片的高等比例缩放得到显示图片的宽
   * @params originalWidth  原始图片的宽
   * @params originalHeight 原始图片的高
   * @params imageHeight    显示图片的高，如果不传就使用屏幕的高
   * 返回图片的宽高对象
  ***/
  static imageZoomWidthUtil(originalWidth, originalHeight, imageHeight) {
    let imageSize = {};
    if (imageHeight) {
      imageSize.imageWidth = (imageHeight * originalWidth) / originalHeight;
      imageSize.imageHeight = imageHeight;
    } else {//如果没有传imageHeight,使用屏幕的高
      wx.getSystemInfo({
        success: function (res) {
          imageHeight = res.windowHeight;
          imageSize.imageWidth = (imageHeight * originalWidth) / originalHeight;
          imageSize.imageHeight = imageHeight;
        }
      });
    }
    return imageSize;
  }

}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  Util: Util
}