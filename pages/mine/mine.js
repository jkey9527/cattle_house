const app = getApp()
import { request } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUser();
  },

  //退出登录事件
  loginOut(e) {
    request({
      url: '/cattle/house/user/loginOut',
      method: 'POST',
      data: {
        user_id: app.globalData.user.user_id
      }
    }).then((res) => {
      if (res.code === 1) {
        wx.redirectTo({
          url: '../index/index',
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },

  getUser(){
    var that = this
    request({
      url: '/cattle/house/user/getUser',
      method: 'POST',
      data:{
        user_id:app.globalData.user.user_id
      }
    }).then((res) => {
      if(res.code===1){
        that.setData({
          user:res.data
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },
})