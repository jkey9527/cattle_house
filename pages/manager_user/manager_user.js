const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_user:false,
    list:{
    },
    user_list:[],
    index:0,
    type_options: [
      {value: '1', name: '租客',checked:true},
      {value: '2', name: '房东'}
    ],
    state_options: [
      {value: '0', name: '停用'},
      {value: '1', name: '启用',checked:true}
    ]
  },
  bindPickerChange: function(e) {
    let that = this
    this.setData({
      index: e.detail.value
    },()=>{
      that.getUser(that.data.user_list[that.data.index].user_id);
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
    this.getUserList();
    this.getSystem();
  },

  /**
   * 表单提交修改用户信息
   * @param {formd对象} e 
   */
  formSubmit(e) {
    let params = e.detail.value
    params.user_id = this.data.user_list[this.data.index].user_id
    request({
      url: '/cattle/house/user/updateUser',
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

  /**
   * 删除用户
   */
  delete(){
    request({
      url: '/cattle/house/user/deleteUser',
      method: 'POST',
      data: {
        user_id : this.data.user_list[this.data.index].user_id
      }
    }).then((res) => {
      if (res.code === 1) {
        // todo 删除成功后，需要重新刷新页面
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

  /**
   * 查询用户详情信息
   * @param {用户ID} user_id 
   */
  getUser(user_id){
    var that = this
    request({
      url: '/cattle/house/user/getUser',
      method: 'POST',
      data:{
        user_id:user_id
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data;
        that.setData({
          list:data
        },()=>{
          this.setTypeOptions(data.user_type);
          this.setStateOptions(data.user_state);
        });
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },

  /**
   * 获得用户列表信息
   */
  getUserList(){
    request({
      url: '/cattle/house/user/getUserOptions',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let val = res.data
        val.forEach(v => {
          v.userNoAndName = v.user_name+'('+v.user_no+')'
        });
        this.setData({
          user_list: val
        },()=>{
          this.getUser(res.data[0].user_id);
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  },

  /**
   * 渲染用户类型
   * @param {用户类型} user_type 
   */
  setTypeOptions(user_type){
    let val = this.data.type_options;
    val.forEach(v => {
      v.value == user_type?v.checked = true:v.checked = false
    });
    this.setData({
      type_options:val
    })
  },

  /**
   * 渲染用户状态
   * @param {用户状态} user_state 
   */
  setStateOptions(user_state){
    let val = this.data.state_options;
    val.forEach(v => {
      v.value == user_state?v.checked = true:v.checked = false
    });
    this.setData({
      state_options:val
    })
  },
  
  /**
   * 跳转新增用户界面
   */
  add(){
    wx.navigateTo({
      url: '../add_user/add_user',
    })
  },

  getSystem(){
    request({
      url: '/cattle/house/system/initSystem',
      method: 'POST',
      data:{}
    }).then((res) => {
      if(res.code===1){
        let val = res.data
        let show_user = false;
        val.forEach(v => {
          if(v.sys_code == 'show_user'){
            show_user = v.sys_value == 'true'?true:false
          }
        });
        this.setData({
          show_user:show_user
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