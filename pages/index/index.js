//index.js

import {
  request
} from "../../utils/http"
//获取应用实例
const app = getApp()
let user_no = ''
let user_password = ''
Page({
  data: {
    user_no: '',
    user_password: '',
    clientHeight: ''
  },
  onLoad() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    request({
      url: '/cattle/house/token/getToken',
      method: 'POST',
      data: JSON.stringify({
        privateKey: 'd49ec97c-a9e9-4fd3-8790-2559cb5a2df0'
      })
    }).then((res) => {
      if (res.code === 1) {
        wx.setStorageSync('token', res.data)
      }
    })
  },
  //获取输入款内容
  get_user_no(e) {
    user_no = e.detail.value
  },
  get_user_password(e) {
    user_password = e.detail.value
  },
  //登录事件
  login(e) {
    if (user_no == '') {
      wx.showToast({
        icon: 'none',
        title: '账号不能为空',
      })
    } else if (user_password == '') {
      wx.showToast({
        icon: 'none',
        title: '密码不能为空',
      })
    } else {
      request({
        url: '/cattle/house/user/login',
        method: 'POST',
        data: {
          user_no: user_no,
          user_password: user_password,
          user_phone: user_no
        }
      }).then((res) => {
        if (res.code === 1) {
          app.globalData.user = res.data;
          wx.setStorageSync('userid', res.data.user_id)
          if (res.data.user_type === 1) {
            wx.switchTab({
              url: '../pay/pay'
            })
          } else {
            wx.showActionSheet({
              itemList: ['我的家', '管理员'],
              itemColor: '#000000',
              success(res) {
                if (res.tapIndex === 0) {
                  wx.switchTab({
                    url: '../pay/pay'
                  })
                } else if (res.tapIndex === 1) {
                  wx.redirectTo({
                    url: '../manager/manager',
                  })
                }
              }
            })
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    }
  },
})
