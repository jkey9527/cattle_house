const app = getApp()
import {
  request
} from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      value: 0,
      label: '收入'
    }, {
      value: 1,
      label: '支出'
    }],
    r_type: 0,
    r_date: '',
    r_money: '',
    r_msg: '',
  },
  formReset(){
    this.setData({
      r_type: 0,
      r_date: this.getNow(),
      r_money: '',
      r_msg: '',
    })
    console.log(this.data)
  },
  formSubmit(e) {
    let params = e.detail.value
    params.r_date = new Date(params.r_date).getTime()
    request({
      url: '/cattle/house/record/saveRecord',
      method: 'POST',
      data: params
    }).then((res) => {
      if (res.code === 1) {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        this.formReset()
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      r_type: e.detail.value,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      r_date: e.detail.value
    })
  },
  getNow(){
    let now = new Date()
    let m = now.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = now.getDate()
    d = d < 10 ? '0' + d : d
    return now.getFullYear() + '-' + m + '-' + d
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      r_date: this.getNow()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
})