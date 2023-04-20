import React from 'react'
import ReactDOM from 'react-dom'

// 类式组件
class Demo extends React.Component {
    state={count:0}
    myRef=React.createRef()
    add=()=>{
        this.setState(state=>({count:state.count+1}))
    }
    unmount=()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    componentDidMount(){
        this.timer=setInterval(()=>{
            this.setState(state=>({count:state.count+1}))
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render() {
        return (
            <div>
                <h2>当前求和为：{this.state.count}</h2>
                <button onClick={this.add}>点我+1</button>
                <button onClick={this.unmount}>卸载组件</button>
                
            </div>
        )
    }
}

// // 函数式组件
// function Demo() {
//     // React.useState()调用后返回的结果为数组，数组内包含两个元素，第一个为我想要的状态，第二个为更新状态的方法
//     const [count,setCount]=React.useState(0)
//     const [name,setName]=React.useState('tom')
    
//     // React.useEffect()时传入的作为参数的函数就相当于类式组件当中componentDidUpdate/componentDidMount这个钩子
//         // 具体指哪个钩子看配置，若传入的第二个参数，就是那个数组中什么也没写，那就是全方位都监测(componentDidUpdate)；若写了某个状态的名，那就只监测那个状态的改变(componentDidMount)
//     React.useEffect(()=>{
//         let timer=setInterval(()=>{
//             setCount(count=>count+1)
//         },1000)
//         // 这个函数是上面包着setInterval的那个函数的返回值，相当于componentWillUnmount钩子
//         return ()=>{
//             clearInterval(timer)
//         }
//     },[])

//     function change() {
//         setName('jack')
//     }
//     // add的回调
//     function add() {
//         // setCount(count+1)  //写法1
//         setCount(count=>count+1)  //写法2
//     }
//     // 卸载组件的回调
//     function unmount() {
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }
    
//     return (
//         <div>
//             <h2>当前求和为：{count},{name}</h2>
//             <button onClick={add}>点我+1</button>
//             <button onClick={change}>点我改名</button>
//             <button onClick={unmount}>卸载组件</button>

//         </div>
//     )
// }


export default Demo
