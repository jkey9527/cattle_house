const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    balance:'',
    pageNum:1,
    pageSize:10,
    hasNextPage:false,
    nextPage:2,
    prePage:1
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
    this.getRecordList(1)
    this.getRecordBalance()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.hasNextPage == false){
      wx.showToast({
        title: '没有更多啦！',
        icon:'none'
      })
    }else{
      this.getRecordList(this.data.nextPage,wx.pageScrollTo({scrollTop: 0}))
    }
  },

  onPullDownRefresh(){
    if(this.data.pageNum == 1){
      wx.showToast({
        title: '没有更多啦！',
        icon:'none'
      })
    }else{
      this.getRecordList(this.data.prePage)
    }
    wx.stopPullDownRefresh()
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
  getRecordList(pageNum){
    let param = {
      pageBean:{
        pageNum:pageNum,
        pageSize:this.data.pageSize
      }
    }
    request({
      url: '/cattle/house/record/getRecordList4Page',
      method: 'POST',
      data: param
    }).then((res) => {
      if(res.code===1){
        let list = res.data.list
        list.forEach(val => {
          val.r_date = this.getTimes(val.r_date)
        });
        this.setData(res.data)
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