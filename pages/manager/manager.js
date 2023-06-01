const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  toContract(){
    wx.navigateTo({
      url: '../manager_contract/manager_contract',
    })
  },

  toUser(){
    wx.navigateTo({
      url: '../manager_user/manager_user',
    })
  },

  toCost(){
    wx.navigateTo({
      url: '../manager_cost/manager_cost',
    })
  },

  toRecord(){
    wx.navigateTo({
      url: '../manager_record/manager_record',
    })
  },

  toSystem(){
    wx.navigateTo({
      url: '../system/system',
    })
  },
})