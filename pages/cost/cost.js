const app = getApp()
import { request } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    request({
      url: '/cattle/house/cost/getCostListByContractNo4Page',
      method: 'POST',
      data:{
        cost_contract_no:app.globalData.user.user_contract_no
      }
    }).then((res) => {
      if(res.code===1){
        that.setData({
          list:res.data.list
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