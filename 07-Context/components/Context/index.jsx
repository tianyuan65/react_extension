import React, { Component } from 'react'
import './index.css'

// 创建Context对象
const MyContext=React.createContext()
const {Provider,Consumer}=MyContext
export default class A extends Component {
    state={username:'tom',age:12}
    render() {
        const {username,age}=this.state
        return (
        <div className="parent">
            <h3>我是A组件</h3>
            <h4>我是用户名是：{username},年龄为：{age}</h4>
            <Provider value={{username,age}}>
                <B />
            </Provider>
        </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className="child">
                <h3>我是B组件</h3>
                <C />
            </div>
        )
    }
}

// class C extends Component {
//     // 声明接收数据
//     static contextType=MyContext
//     render() {
//         const {username,age}=this.context
//         // console.log(this.context);  //{username: 'tom', age: 12}
//         return (
//             <div className="grand">
//                 <h3>我是C组件</h3>
//                 <h4>我从我爸组件中接收到的是用户名是：{username},年龄为：{age}</h4>
//             </div>
//         )
//     }
//   }

function C() {
    return (
        <div className="grand">
            <h3>我是C组件</h3>
            <h4>我从我爸组件中接收到的是用户名是：
                <Consumer>
                    {
                        value=> `${value.username},年龄为:${value.age}`
                        // console.log(value);  //{username: 'tom', age: 12}
                    }
                </Consumer>
            </h4>
        </div>
    )
}
  
  