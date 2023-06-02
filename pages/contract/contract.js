const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
  },

  onShow(){
    this.getContract();
  },

  /**
   * 查询合同信息
   */
  getContract(){
    var that = this
    request({
      url: '/cattle/house/contract/getContractList4Page',
      method: 'POST',
      data:{
        con_no:app.globalData.user.user_contract_no
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data.list[0] || []
        data.con_start_date = util.formatTime(new Date(data.con_start_date))
        data.con_end_date = util.formatTime(new Date(data.con_end_date))
        that.setData({
          list:data
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