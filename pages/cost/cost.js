// pages/cost/cost.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    that.setData({
      cost:app.globalData.cost
    })
  },
  saveCost(){
    wx.showModal({
      title: '提示',
      content: '是否确认提交',
      success: function (res) {
          if (res.confirm) {
            wx.request({
              url : "https://4017p6352h.goho.co/cattle/house/cost/saveCost",
              //url : "http://124.222.162.17/api/cattle/house/cost/saveCost",
              method: "POST",
              data: JSON.stringify(app.globalData.cost),
              header: {
                "Content-Type": "application/json",
                "token":app.globalData.token,
                "userid":app.globalData.user.user_id
              },
              success: function (res) {
                if(res.data.code===1){
              wx.showToast({
                  title: '成功',
                  duration: 1000,
                  success: function () {
                    setTimeout(function () {
                      wx.redirectTo({
                      url: '../user/user',
                    })
                  }, 1000);
               }
             })  
                }else{
                  wx.showToast({
                    title: res.data.message,
                    icon:'none'
                  })
                }
              },
            })                                     
          }else{
             console.log('用户点击取消')
          }
      }
  })
  },
})