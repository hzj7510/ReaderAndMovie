var postsData = require('../../../data/post-data.js')
var app = getApp()

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
    var postid = options.id;
    var musicPageId = app.globalData.g_musicPageId;
    var detaildata = postsData.postList[postid];
    this.setData(detaildata);
    this.setData({
      'postid': postid
    });
    var that = this;
    if(musicPageId == postid){
      wx.getBackgroundAudioPlayerState({
        success: function(res){
          that.setData({
            "isplaymusic": res.status
          }); 
        }
      })
    }else{
      this.setData({
        "isplaymusic": false
      });
    }

    wx.getStorage({
      key: 'postcollected',
      success: function(res) {
        var collected = res.data;
        var iscollected = collected[postid];
        if (iscollected == undefined) {
          collected[postid] = false;
          wx.setStorage({
            key: 'postcollected',
            data: collected,
          });
        }else{
          that.setData({
            'iscollected': iscollected
          });
        }
      },
      fail: function (error) {
        var postcollected = {};
        postcollected[postid] = false;
        wx.setStorage({
          key: 'postcollected',
          data: postcollected,
        });
      }
    });

    wx.onBackgroundAudioPlay(function(){
      that.setData({
        "isplaymusic": true
      });
    });
    wx.onBackgroundAudioPause(function(){
      that.setData({
        "isplaymusic": false
      });
    });
  },
  musicTap:function(event){
    var musicdata = postsData.postList[this.data.postid].music;
    var that = this;
    var isplaymusic = this.data.isplaymusic;
    if(isplaymusic){
      wx.pauseBackgroundAudio()
    }else{
      wx.playBackgroundAudio({
        dataUrl: musicdata.url,
        title: musicdata.title,
        coverImgUrl: musicdata.coverImgUrl
      });
      app.globalData.g_musicPageId = this.data.postid;
    }
    isplaymusic = !isplaymusic;
    this.setData({
      'isplaymusic': isplaymusic
    });
  },
  collectionTap: function(event){
    var postid = this.data.postid;
    var that = this;
    wx.getStorage({
      key: 'postcollected',
      success: function(res) {
        var collectedojb = res.data;
        var iscollected = collectedojb[postid];
        iscollected = !iscollected;
        that.setData({
          'iscollected': iscollected
        });
        collectedojb[postid] = iscollected;
        wx.setStorage({
          key: 'postcollected',
          data: collectedojb,
        });
      },
    })
  },
  shareTap: function(event){
    var shareList = ['微信分享', '新浪分享', 'QQ分享'];
    wx.showActionSheet({
      itemList: ['微信分享', '新浪分享', 'QQ分享'],
      success: function(res){
        var index = res.tapIndex;
        console.log(shareList[index]);
      },
      fail: function(err){
        console.log('取消');
      }
    });
  }
})