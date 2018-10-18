import { handleActions } from 'redux-actions'
import { GET_LIST_DATA } from '../types/counter'

const defaultState = {
  /**
   *  listData 列表数据
   */
  listData: []
}

export default handleActions({
  // 列表数据
  [GET_LIST_DATA] (state, action) {
    return {
      ...state,
      listData: action.payload.data
    }
  }
}, defaultState)
