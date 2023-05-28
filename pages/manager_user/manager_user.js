const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    user_list:[],
    index:0,
  },
  bindPickerChange: function(e) {
    let that = this
    this.setData({
      index: e.detail.value
    },()=>{
      that.getUserList(that.data.user_list[that.data.index].user_id);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    request({
      url: '/cattle/house/user/getUserOptions',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let val = res.data
        val.forEach(v => {
          v.userNoAndName = v.user_no + ' -> ' + v.user_name
        });
        that.setData({
          user_list: val
        },()=>{
          that.getUserList(res.data[0].user_id);
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
  
  getUserList(user_id){
    var that = this
    request({
      url: '/cattle/house/user/getUser',
      method: 'POST',
      data:{
        user_id:user_id
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data;
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