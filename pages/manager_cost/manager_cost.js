const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    contract_list:[],
    index:0,
  },
  bindPickerChange: function(e) {
    let that = this
    this.setData({
      index: e.detail.value
    },()=>{
      that.getCostList(that.data.contract_list[that.data.index].con_no);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    request({
      url: '/cattle/house/contract/getContractOptions',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let val = res.data;
        val.forEach(v => {
          v.house_info = v.con_house_no + '号房间'
        });
        that.setData({
          contract_list:val
        },()=>{
          that.getCostList(res.data[0].con_no);
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
  getCostList(con_no){
    var that = this
    request({
      url: '/cattle/house/cost/getCostListByContractNo4Page',
      method: 'POST',
      data:{
        cost_contract_no:con_no
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data.list
        data.forEach(v => {
          v.cost_date = util.formatTime(new Date(v.cost_date))
        });
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