const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    type_options: [
      {value: '1', name: '套一',checked:true},
      {value: '2', name: '套二'}
    ],
    state_options: [
      {value: '1', name: '在租',checked:true},
      {value: '0', name: '停租'}
    ],
  },

  /**
   * 开始日期绑定事件
   * @param {*} e 
   */
  bindStartDateChange: function (e) {
    let val = this.data.list;
    val.con_start_date = e.detail.value;
    this.setData({
      list:val
    })
  },

    /**
   * 结束日期绑定事件
   * @param {*} e 
   */
  bindEndDateChange: function (e) {
    let val = this.data.list;
    val.con_end_date = e.detail.value;
    this.setData({
      list:val
    })
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
    let val = this.data.list;
    val.con_start_date = this.getNow();
    val.con_end_date = this.getNextNow();
    this.setData({
      list:val
    })
  },

  /**
   * 表单提交新增合同信息
   * @param {formd对象} e 
   */
  formSubmit(e) {
    let params = e.detail.value
    request({
      url: '/cattle/house/contract/saveContract',
      method: 'POST',
      data: params
    }).then((res) => {
      if (res.code === 1) {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
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

  getNextNow(){
    let now = new Date()
    let m = now.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = now.getDate()
    d = d < 10 ? '0' + d : d
    return now.getFullYear()+1 + '-' + m + '-' + d
  },
})