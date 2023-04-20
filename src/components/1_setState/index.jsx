import React, { Component } from 'react'

export default class Demo extends Component {
    state={count:0}

    increment=()=>{
        /* // 方法1：对象式setState
        // 获取原来的count值
        const {count}=this.state
        // 更新状态
        this.setState({count:count+1},
        // 这个回调函数调用的时机是react帮我改完状态(就是上一行)，react帮我调完render(就是下面的那个)后，才会调用这个函数
            // 但是这个回调函数是可选的参数，不需要可不写
        ()=>{
            console.log(this.state.count);
        })
        // setState()调用后引起的后续动作是一个异步任务
        // console.log('12行的输出',this.state.count);*/

        // 方法2：函数式setState
        this.setState(state=>({count:state.count+1}))

        // 按照下面这样写也可以，不是说新状态依赖原状态就必须用函数式，不依赖就必须用对象式，怎么方便怎么来
        // this.setState({count:this.state.count+1})
    }

    render() {
        return (
        <div>
            <h1>当前求和为：{this.state.count}</h1>
            <button onClick={this.increment}>点我+1</button>
        </div>
        )
    }
}
