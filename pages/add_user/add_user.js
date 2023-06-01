const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_options: [
      {value: '1', name: '租客',checked:true},
      {value: '2', name: '房东'}
    ],
    state_options: [
      {value: '0', name: '停用'},
      {value: '1', name: '启用',checked:true}
    ]
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

  /**
   * 表单提交新增用户信息
   * @param {formd对象} e 
   */
  formSubmit(e) {
    let params = e.detail.value
    request({
      url: '/cattle/house/user/saveUser',
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
  }
})