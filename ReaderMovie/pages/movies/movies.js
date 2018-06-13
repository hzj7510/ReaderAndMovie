var app = getApp();
var tools = require('../../tools/tools.js')

// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // inTheaters:{},
    // comingsoon:{},
    // top250:{}
    containershow: true,
    searchpanelshow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaters = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingsoon = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250 = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheaters, 'inTheaters', '正在热映');
    this.getMovieListData(comingsoon, 'comingsoon', '即将上映');
    this.getMovieListData(top250, 'top250', '豆瓣Top250');
  },
  
  getMovieListData: function (url, tp, categorytitle){
    var that = this;
    tools.http(url, 'GET', function(data){
      that.processdata(data, tp, categorytitle);
    });
  },
  processdata: function (dt, tp, categorytitle){
    var moviedata = [];
    for(var index in dt.subjects){
      var subject = dt.subjects[index];
      var title= subject.title;
      if(title.length>=6){
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

    var readyData = {};
    readyData[tp] = {
      categorytitle: categorytitle,
      moviedata:moviedata
    };
    this.setData(readyData);
  },
  moreTap:function(event){
    var cate = event.currentTarget.dataset.cate;
    wx.navigateTo({
      url: '/pages/moviemore/moviemore?cate=' + cate,
    });
  },
  onbindfocus:function(event){
    this.setData({
      containershow :false,
      searchpanelshow : true,
    });
  },
  oncancelimgtap:function(event){
    this.setData({
      containershow: true,
      searchpanelshow: false,
    });
  },
  onbindchange:function(event){
    var text = event.detail.value;
    var searchurl = app.globalData.doubanBase + '/v2/movie/search?q=' + text;
    this.getMovieListData(searchurl, 'searchResult', '');
  },
  onMovieDetailTap:function(event){
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?movieid=' + movieid,
    });
  }
})