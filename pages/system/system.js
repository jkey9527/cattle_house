const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
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
    this.initSystem();
  },

  /**
   * 表单提交
   * @param {formd对象} e 
   */
  formSubmit(e) {
    let params = e.detail.value
    let list = this.data.list;
    list.forEach(v => {
        v.sys_value=params[v.sys_code]
    });
    request({
      url: '/cattle/house/system/saveSystem',
      method: 'POST',
      data: list
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

  initSystem() {
    request({
      url: '/cattle/house/system/initSystem',
      method: 'POST',
      data: {}
    }).then((res) => {
      if (res.code === 1) {
        let val = res.data;
        val.forEach(v => {
            v.sys_value = v.sys_value=='true'?true:false;
        });
       this.setData({
           list:val
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