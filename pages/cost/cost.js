const app = getApp()
import { request } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    pageNum:1,
    pageSize:10,
    hasNextPage:false,
    nextPage:2,
    prePage:1
  },

  onShow() {
    this.getCost(1);
  },

  onReachBottom() {
    if(this.data.hasNextPage == false){
      wx.showToast({
        title: '没有更多啦！',
        icon:'none'
      })
    }
    this.getCostList(this.data.nextPage)
  },

  onPullDownRefresh(){
    if(this.data.prePage == 1){
      wx.showToast({
        title: '没有更多啦！',
        icon:'none'
      })
    }
    this.getCostList(this.data.prePage)
  },

  /**
   * 查询费用信息
   */
  getCost(pageNum){
    let pageBean = {
      pageNum:pageNum,
      pageSize:this.data.pageSize
    }
    request({
      url: '/cattle/house/cost/getCostListByContractNo4Page',
      method: 'POST',
      data:{
        cost_contract_no:app.globalData.user.user_contract_no,
        pageBean:pageBean
      }
    }).then((res) => {
      if(res.code===1){
        this.setData({
          list:res.data.list
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  }
  
})