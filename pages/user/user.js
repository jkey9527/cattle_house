// pages/user/user.js
const app = getApp()
let cost_w_e_number=''
let cost_e_e_number=''
let cost_g_e_number=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost:{
      cost_w_e_number:'',
      cost_e_e_number:'',
      cost_g_e_number:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    wx.request({
      url : "https://4017p6352h.goho.co/cattle/house/cost/initCost",
      //url : "http://124.222.162.17/api/cattle/house/cost/initCost",
      method: "POST",
      data: JSON.stringify({
        user_id:app.globalData.user.user_id
      }),
      header: {
        "Content-Type": "application/json",
        "token":app.globalData.token,
        "userid":app.globalData.user.user_id
      },
      success: function (res) {
        if(res.data.code===1){
          that.setData({
            cost:res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
    })
  },

  calculate(){
    wx.request({
      url : "https://4017p6352h.goho.co/cattle/house/cost/calculateCost",
      //url : "http://124.222.162.17/api/cattle/house/cost/calculateCost",
      method: "POST",
      data: JSON.stringify({
        cost_contract_no:app.globalData.user.user_contract_no,
        cost_w_e_number:cost_w_e_number,
        cost_e_e_number:cost_e_e_number,
        cost_g_e_number:cost_g_e_number,
      }),
      header: {
        "Content-Type": "application/json",
        "token":app.globalData.token,
        "userid":app.globalData.user.user_id
      },
      success: function (res) {
        if(res.data.code===1){
          app.globalData.cost = res.data.data;
          wx.navigateTo({
            url: '../cost/cost'
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
    })
  },
  //获取输入款内容
  get_cost_w_e_number(e){
    cost_w_e_number = e.detail.value
  },
  get_cost_e_e_number(e){
    cost_e_e_number = e.detail.value
  },
  get_cost_g_e_number(e){
    cost_g_e_number = e.detail.value
  },
  changeTab(){
    wx.showToast({
      title: '功能开发中',
      icon:'error'
    })
  }
})