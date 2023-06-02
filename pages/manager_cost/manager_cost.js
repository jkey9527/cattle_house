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
    pageNum:1,
    pageSize:10,
    hasNextPage:false,
    nextPage:2,
    prePage:1
  },
  bindPickerChange: function(e) {
    let that = this
    this.setData({
      index: e.detail.value
    },()=>{
      that.getCostList(that.data.contract_list[that.data.index].con_no,1);
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
    this.getContractOptions();
  },

  onReachBottom() {
    let con_no = this.data.list[0].cost_contract_no
    if(this.data.hasNextPage == false){
      wx.showToast({
        title: '没有更多啦！',
        icon:'none'
      })
    }
    this.getCostList(con_no,this.data.nextPage)
  },

  onPullDownRefresh(){
    let con_no = this.data.list[0].cost_contract_no
    if(this.data.prePage == 1){
      wx.showToast({
        title: '没有更多啦！',
        icon:'none'
      })
    }
    this.getCostList(con_no,this.data.prePage)
  },

  getContractOptions(){
    var that = this
    request({
      url: '/cattle/house/contract/getContractOptions',
      method: 'POST',
      data:{
      }
    }).then((res) => {
      if(res.code===1){
        let val = res.data;
        val.forEach(v => {
          v.house_info = v.con_house_no + '号房间'
        });
        that.setData({
          contract_list:val
        },()=>{
          that.getCostList(res.data[0].con_no,1);
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
   * 获取费用列表信息
   * @param {合同编号} con_no 
   */
  getCostList(con_no,pageNum){
    let pageBean = {
      pageNum:pageNum,
      pageSize:this.data.pageSize
    }
    request({
      url: '/cattle/house/cost/getCostListByContractNo4Page',
      method: 'POST',
      data:{
        cost_contract_no:con_no,
        pageBean:pageBean
      }
    }).then((res) => {
      if(res.code===1){
        let data = res.data.list
        data.forEach(v => {
          v.cost_date = util.formatTime(new Date(v.cost_date))
        });
        this.setData({
          list:data
        })
      }else{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      }
    })
  }
})