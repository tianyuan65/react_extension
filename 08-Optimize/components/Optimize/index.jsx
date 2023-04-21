import React, { PureComponent } from 'react'
import './index.css'

export default class Parent extends PureComponent {
    state={bagName:"Gucci"}
    changeBag=()=>{
        this.setState({bagName:"Chanel"})
    }
    /*shouldComponentUpdate(nextProps,nextState){
        // 打印组件实例目前的props和state
        console.log(this.props,this.state);  //{}[[Prototype]]: Object {bagName: 'Gucci'}
        // 打印组件实例接下来要更新的目标props和state
        console.log(nextProps,nextState);   //{}[[Prototype]]: Object {bagName: 'Prada'}
        // 若目前的状态和即将更新的状态一样，那就关闭阀门，且不调用render()
        if(this.state.bagName===nextState.bagName) return false
        // 若状态发生了变化，开启阀门，并调用render()
        else return true
        // return !this.state.bagName===nextState.bagName  //与上面if判断作用相同
    }*/
    render() {
        console.log('Parent--render');
        const {bagName}=this.state
        return (
        <div className="parent">
            <h3>我是Parent组件</h3>
            <span>我的包名字是：{bagName}</span><br />
            <button onClick={this.changeBag}>点我换包</button>
            <Child bagName="LV"/>
        </div>
        )
    }
}

class Child extends PureComponent {
    /*shouldComponentUpdate(nextProps,nextState){
        // 打印组件实例目前的props和state，若父组件没有给子组件传递props，子组件中props输出的永远是空对象，但若传递的props值是固定的，那就只输出被传递的那个props值
            // state输出null的原因是子组件没有自身的state
        console.log(this.props,this.state);  //{} null
        // 打印组件实例接下来要更新的目标props和state，若父组件没有给子组件传递props，子组件中props输出的永远是空对象，但若传递的props值是固定的，那就只输出被传递的那个props值
            // state输出null的原因是子组件没有自身的state
        console.log(nextProps,nextState);   //{} null
        // 若目前的props值和即将更新的props值一样，那就关闭阀门，且不调用render()
        if(this.props.bagName===nextProps.bagName) return false
        // 若props值发生了变化，开启阀门，并调用render()
        else return true
        // return !this.props.bagName===nextProps.bagName  //与上面if判断作用相同
    }*/
    render() {
        console.log('Child--render');
      return (
        <div className="child">
          <h3>我是Child组件</h3>
          <span>我接到的包是：{this.props.bagName}</span>
        </div>
      )
    }
}
