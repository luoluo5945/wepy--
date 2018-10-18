# 微信小程序框架wepy笔记

本项目仅供参考，不能拿来实际应用
###   WePY项目的创建与使用
> 全局安装或更新WePY命令行工具
```javascript
npm install wepy-cli -g
```
> 在开发目录中生成Demo开发项目, 1.7.0之后版本请移步wepy-cli文档
```javascript
wepy new myproject
```
> 1.7.0之后的版本使用 wepy init standard myproject 初始化项目，使用 wepy list 查看项目模板
切换至项目目录
```javascript
cd myproject
```
> 安装依赖
```javascript
npm  install
```
> 开启实时编译
```javascript
wepy build --watch
```
###  1. 在wepy中使用promise
> 在app.wpy中：
```javascript
import 'wepy-async-function'
export default class extends wepy.app {
  constructor () {
    this.use('promisify')
  }
}
```
> 在actions中request就可以使用promise了：
```javascript
export const getListData = createAction(TYPE_NAME, (param) => {
  return new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      method: 'POST',
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
```
## 2. 在wepy中使用 wx 对象
> 在根目录的eslintrc.js中加上globals: { wx: true }
```javascript
module.exports = {
  ...
  globals: { wx: true },
  ...
}

```
###   3. store结构有三部分actions、reducers、types                                
 ```mermaid
graph LR
A((store)) --> B(actions)
A --> C(reducers)
A --> D(types)
B --> E(定义异步请求)
C --> G(对变量进行操作或赋值)
D --> F(定义函数名和变量名)
```
> 在types中定义所有异步或者非异步的数据，以及函数名
> 在reducers中定义对非异步数据的操作，以及对types中变量的赋值
> 在actions中定义对异步数据的操作

> 注：在reducers中需要注意对象的赋值，返回的对象需要是一个全新的对象，这就意味着不能直接改变原对象并返回，而是要创建一个新的对象并返回
###  4. 使用redux请求数据  
> 在page中引入 connect getStore
> connect： 用来连接状态机，获取里面的值
> getStore： 用来实例化store，之后就可以使用dispatch
```javascript
// 引入connect getStore
import { connect, getStore } from 'wepy-redux'
// 引入actions中定义的请求
import { getListData } from '../store/actions'

// 建立连接
@connect({
  listData (state) {
    return state.counter.listData
  }
}, {
  getListData
})
// 实例化store
const store = getStore()
export default class Index extends wepy.page {

  //------- 自定义方法 开始 -------
  getListData (hostId) {
    let param = { id: 1 }
    store.dispatch(getListData(param))
  }
  //------- 自定义方法 结束 -------
  
  onLoad () {
  	// 请求列表数据
    this.getListData()
  }
}
```
