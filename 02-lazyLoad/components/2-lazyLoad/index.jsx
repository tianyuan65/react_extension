import React, { Component,lazy,Suspense } from 'react'
import {NavLink,Route,Routes} from 'react-router-dom'

// 不能直接引入子组件，因为这样引入的话，点击选项的同时，与路径匹配的组件就直接展示了
// import Home from './Home'
// import About from './About'

// lazy是一个函数，函数里传递的参数也必须是一个函数，在函数体内部使用import来引入子组件
const Home=lazy(()=>import('./Home'))
const About=lazy(()=>import('./About'))

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header"><h2>React Router Demo</h2></div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 在React中靠路由链接实现切换组件(注意跳转地址写法：小写带杠，不加点)--编写路由链接 */}
              <NavLink className="list-group-item" to="/about">About</NavLink>
              <NavLink className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Routes>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/home" element={<Home/>}/>
                    </Routes>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
