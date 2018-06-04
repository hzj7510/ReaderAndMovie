Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_key:[
      
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_content=[{
      date:"Sep 18 2016",
      title: "大脸王阿姨",
      imgSrc: "/images/post/crab.png",
      avatar: "/images/avatar/1.png",
      content: "骚话的特点就是油而不腻，寡而不淡。纯粹的油就是脏话，纯粹的寡就是毒舌。所以既要精简干练，又要有梗有料，直戳G点，一杆见血",
      reading: "112",
      collection: "96"
    },{
      date: "Nov 25 2016",
      title: "比利林恩的中场故事",
      imgSrc: "/images/post/bl.png",
      avatar: "/images/avatar/2.png",
      content: "基于微信小程序轻快的特点，我们拟定了小程序界面设计指南和建议。 设计指南建立在充分尊重用户知情权与操作权的基础之上。旨在微信生态体系内，建立友好、高效、一致的用户体验，同时最大程度适应和支持不同需求，实现用户与小程序服务方的共赢。",
      reading: "112",
      collection: "96"
    }]
    this.setData({
      post_key: post_content
    });
  } 
})