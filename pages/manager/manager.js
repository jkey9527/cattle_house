const app = getApp()
let cost_w_e_number=''
let cost_e_e_number=''
let cost_g_e_number=''
import { request } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost:{
    },
    show:false
  },
  onShow(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    request({
      url: '/cattle/house/cost/initCost',
      method: 'POST',
      data:{
        user_id:app.globalData.user.user_id
      }
    }).then((res) => {
      if(res.code===1){
        that.setData({
          cost:res.data
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },

  calculate(){
    let that = this
    request({
      url: '/cattle/house/cost/calculateCost',
      method: 'POST',
      data:{
        cost_contract_no:app.globalData.user.user_contract_no,
        cost_w_e_number:cost_w_e_number,
        cost_e_e_number:cost_e_e_number,
        cost_g_e_number:cost_g_e_number,
      }
    }).then((res) => {
        if(res.code===1){
          that.setData({
            cost:res.data,
            show:true
          })
        }else{
          wx.showToast({
            title: res.message,
            icon:'none'
          })
        }
    })
  },

  saveCost(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认提交',
      success: function (res) {
          if (res.confirm) {
            console.log(that.data.cost)
            request({
              url: '/cattle/house/cost/saveCost',
              method: 'POST',
              data:that.data.cost
            }).then((res) => {
                if(res.code===1){
                  wx.showToast({
                    title: '成功',
                    duration: 1000,
                    success: function () {
                      setTimeout(function () {
                        wx.switchTab({
                        url: '../pay/pay',
                      })
                    }, 1000);
                 }
               })
                }else{
                  wx.showToast({
                    title: res.message,
                    icon:'none'
                  })
                }
            })                                    
          }else{
             console.log('用户点击取消')
          }
      }
  })
  },

  back(){
    let that = this
    that.setData({
      show:false
    })
  },

  //获取输入款内容
  get_cost_w_e_number(e){
    cost_w_e_number = e.detail.value
  },
  get_cost_e_e_number(e){
    cost_e_e_number = e.detail.value
  },
  get_cost_g_e_number(e){
    cost_g_e_number = e.detail.value
  },
})