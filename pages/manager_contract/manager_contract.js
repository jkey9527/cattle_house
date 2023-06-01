const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    contract_list:[],
    index:0,
    type_options: [
      {value: '1', name: '套一',checked:true},
      {value: '2', name: '套二'}
    ],
    state_options: [
      {value: '1', name: '在租',checked:true},
      {value: '0', name: '停租'}
    ],
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    },()=>{
      this.getContractList(this.data.contract_list[this.data.index].con_no);
    })
  },
  bindStartDateChange: function (e) {
    let val = this.data.list;
    val.con_start_date = e.detail.value;
    this.setData({
      list:val
    })
  },
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
    this.getContractOption();
  },
  
  /**
   * 渲染房屋类型
   * @param {房屋类型} house_type 
   */
  setTypeOptions(house_type){
    let val = this.data.type_options;
    val.forEach(v => {
      v.value == house_type?v.checked = true:v.checked = false
    });
    this.setData({
      type_options:val
    })
  },

  /**
   * 渲染合同状态
   * @param {合同状态} con_state 
   */
  setStateOptions(con_state){
    let val = this.data.state_options;
    val.forEach(v => {
      v.value == con_state?v.checked = true:v.checked = false
    });
    this.setData({
      state_options:val
    })
  },

  /**
   * 查询合同列表信息
   * @param {合同编号} con_no 
   */
  getContractList(con_no){
    var that = this
    request({
      url: '/cattle/house/contract/getContractList4Page',
      method: 'POST',
      data:{
        con_no:con_no
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data.list[0] || []
        data.con_start_date = util.formatTime(new Date(data.con_start_date))
        data.con_end_date = util.formatTime(new Date(data.con_end_date))
        that.setData({
          list:data
        },()=>{
          this.setTypeOptions(data.con_house_type);
          this.setStateOptions(data.con_state);
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
   * 查询合同列表
   */
  getContractOption(){
    request({
      url: '/cattle/house/contract/getContractOptions',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let val = res.data
        val.forEach(v => {
          v.house_info = v.con_house_no + '号房间'
        });
        this.setData({
          contract_list:val
        },()=>{
          this.getContractList(res.data[0].con_no);
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
   * 表单提交修改合同信息
   * @param {formd对象} e 
   */
  formSubmit(e) {
    let params = e.detail.value
    params.con_id = this.data.list.con_id
    request({
      url: '/cattle/house/contract/updateContract',
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
   * 删除合同
   */
  delete(){
    request({
      url: '/cattle/house/contract/deleteContract',
      method: 'POST',
      data: {
        con_id : this.data.list.con_id
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
   * 跳转新增合同界面
   */
  add(){
    wx.navigateTo({
      url: '../add_contract/add_contract',
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
})