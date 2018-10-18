import { GET_LIST_DATA } from '../types/counter'
import { createAction } from 'redux-actions'
import wepy from 'wepy'
import { baseUrl } from '../../config/api'

// 获取数据列表
export const getListData = createAction(GET_LIST_DATA, (param) => {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: baseUrl + 'yoururl',
      data: param,
      header: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
})

