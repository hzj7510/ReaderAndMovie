Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onTap:function(){
    // wx.navigateTo({
    //   url: '../posts/posts',
    // }),
    wx.redirectTo({
      url: '../posts/posts',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  }
})