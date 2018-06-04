var postData = require('../../data/post-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_key: postData.postList
    });
  },
  postTap:function(event){
    var postid = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'postdetail/postdetail?id=' + postid,
    });
  },
  onswiperitemtap: function(event){
    // target 和 currentTarget区别
    // target指的是当前点击的组件 和 currentTarget指的是时间捕捉的组件
    // target指的是image 而currentTarget指的是swiper
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: 'postdetail/postdetail?id=' + postid,
    });
  }
})