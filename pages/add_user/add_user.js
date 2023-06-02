const app = getApp()
import { request } from "../../utils/http"
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    contract_list:{},
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
  },

  onShow(){
    this.getContractOption();
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
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