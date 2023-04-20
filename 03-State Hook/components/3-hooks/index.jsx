import React from 'react'

// 类式组件
// class Demo extends Reactr.Component {
//     state={count:0}
//     add=()=>{
//         this.setState(state=>({count:state.count+1}))
//     }
//     render() {
//         return (
//             <div>
//                 <h2>当前求和为：{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//             </div>
//         )
//     }
// }

// 函数式组件
function Demo() {
    // React.useState()调用后返回的结果为数组，数组内包含两个元素，第一个为我想要的状态，第二个为更新状态的方法
    const [count,setCount]=React.useState(0)
    const [name,setName]=React.useState('tom')

    // add的回调
    function add() {
        // setCount(count+1)  //写法1
        setCount(count=>count+1)  //写法2
    }

    function changeName() {
        setName('jack')
    }
    return (
        <div>
            <h2>当前求和为：{count}</h2>
            <h2>我的名字是：{name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>

        </div>
    )
}


export default Demo
