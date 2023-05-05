//index.js
//获取应用实例
const app = getApp()
 let user_no=''
 let user_password=''
Page({
  data: {
    user_no: '',
    user_password: '',
    clientHeight:''
  },
  onLoad(){
    var that=this
    wx.getSystemInfo({ 
      success: function (res) { 
        console.log(res.windowHeight)
          that.setData({ 
              clientHeight:res.windowHeight
        }); 
      } 
    }),
    wx.request({
      url : "https://4017p6352h.goho.co/cattle/house/token/getToken",
      //url : "http://124.222.162.17/api/cattle/house/token/getToken",
      method: "POST",
      data: JSON.stringify({
        privateKey:'d49ec97c-a9e9-4fd3-8790-2559cb5a2df0'
      }),
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if(res.data.code===1){
          app.globalData.token = res.data.data;
        }
      },
    })
  },
  //获取输入款内容
  get_user_no(e){
    user_no=e.detail.value
  },
  get_user_password(e){
    user_password=e.detail.value
  },
  //登录事件
  login(e){
    if(user_no==''){
      wx.showToast({
        icon:'none',
        title: '账号不能为空',
      })
    }else if(user_password==''){
      wx.showToast({
        icon:'none',
        title: '密码不能为空',
      })
    }else{
      wx.request({
        url : "https://4017p6352h.goho.co/cattle/house/user/login",
        //url : "http://124.222.162.17/api/cattle/house/user/login",
        method: "POST",
        data: JSON.stringify({
          user_no: user_no,
          user_password: user_password,
          user_phone: user_no
        }),
        header: {
          "Content-Type": "application/json",
          "token":app.globalData.token,
          "userid":app.globalData.user.user_id
        },
        success: function (res) {
          if(res.data.code===1){
            app.globalData.user = res.data.data;
            wx.redirectTo({
              url: '../user/user'
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        },
      })
    }
  },
})
 
