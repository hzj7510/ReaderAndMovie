// pages/moviemore/moviemore.js
var app = getApp();
var tools = require('../../tools/tools.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalcount: 0,
    requesturl: '',
    moviedata:{},
    isempty: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cate = options.cate;
    wx.setNavigationBarTitle({
      title: cate,
    });
    var requesturl = "";
    switch(cate){
      case "正在热映":
        requesturl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        requesturl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        requesturl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
      default:
        break;
    }
    this.data.requesturl = requesturl;
    this.morerequest(requesturl);
  },
  morerequest: function (url) {
    var that = this;
    tools.http(url, "GET", function(data){
      that.processdata(data);
    });
  },

  processdata: function (dt) {
    var moviedata = [];
    for (var index in dt.subjects) {
      var subject = dt.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: tools.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        largeimgurl: subject.images.large,
        movieid: subject.id,
      }
      moviedata.push(temp);
    }
    // totalcount在这里更新
    var totalmovies = {}
    if (this.data.isempty){
      totalmovies = moviedata;
      this.data.isempty = false;
    }else{
      totalmovies = this.data.moviedata.concat(moviedata);
    }
    this.setData({
      moviedata: totalmovies,
    });
    this.data.totalcount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  // onScrollLower: function (event) {
  //   var nexturl = this.data.requesturl + '?start=' + this.data.totalcount + "&count=20";
  //   this.morerequest(nexturl);
  // },

  onReachBottom: function (event) {
    var nexturl = this.data.requesturl + '?start=' + this.data.totalcount + "&count=20";
    this.morerequest(nexturl);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh:function(event){
    this.data.moviedata = {};
    this.data.totalcount = 0;
    this.data.isempty = true;
    var refreshurl = this.data.requesturl + "?start=0&count=20";
    this.morerequest(refreshurl);
    wx.showNavigationBarLoading();
  }
})