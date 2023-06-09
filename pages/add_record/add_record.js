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

  /**
   * 表单重置
   */
  formReset(){
    this.setData({
      r_type: 0,
      r_date: this.getNow(),
      r_money: '',
      r_msg: '',
    })
    console.log(this.data)
  },
  
  /**
   * 表单提交
   * @param {*} e 
   */
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

  /**
   * 收支类型绑定方法
   * @param {*} e 
   */
  bindPickerChange: function (e) {
    this.setData({
      r_type: e.detail.value,
    })
  },

  /**
   * 交易日期绑定事件
   * @param {*} e 
   */
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

  onShow() {
    this.setData({
      r_date: this.getNow()
    })
  },

})