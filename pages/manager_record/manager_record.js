const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    balance:''
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
    this.getRecordList(),
    this.getRecordBalance()
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
  getTimes(date){
    let now = new Date(date)
    let m = now.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = now.getDate()
    d = d < 10 ? '0' + d : d
    return now.getFullYear() + '-' + m + '-' + d
  },
  /**
   * 查询明细信息
   */
  getRecordList(){
    var that = this
    request({
      url: '/cattle/house/record/getRecordList4Page',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data.list
        data.forEach(val => {
          val.r_date = this.getTimes(val.r_date)
        });
        that.setData({
          list:data
        },()=>{
          console.log(this.data.list)
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },
  saveRecord(){
    wx.navigateTo({
      url: '../add_record/add_record',
    })
  },
  getRecordBalance(){
    var that = this
    request({
      url: '/cattle/house/record/getRecordBalance',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data
        that.setData({
          balance:data
        },()=>{
          console.log(this.data)
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