## 一、setState
* setState更新状态的2种写法
    * 1. setState(stateChange, [callback])------对象式的setState
        * stateChange为状态改变对象(该对象可以体现出状态的更改)
        * callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
    * 2. setState(updater, [callback])------函数式的setState
        * updater为返回stateChange对象的函数。
        * updater可以接收到state和props。
        * callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
    * 总结：
        * 对象式的setState是函数式的setState的简写方式(语法糖)
        * 使用原则：
            * 如果新状态不依赖于原状态 ===> 使用对象方式
            * 如果新状态依赖于原状态 ===> 使用函数方式
            * 如果需要在setState()执行后获取最新的状态数据，要在第二个callback函数中读取
            
## 二、lazyLoad 懒加载
* 路由组件的懒加载
    * 路由组件什么时候需要懒加载？
        * 以淘宝官网网页举例，网页中有我经常访问的导航选项，如女装、美妆、零食、数码等；也有我除了特殊情况，一般根本不会去访问的导航选项，如男装、居家生活、母婴用品等。我经常访问的选项中有一个一个的路由组件，为了整体页面和局部页面更快、更好地展示，没啥事根本不看的就不会在页面一开始加载时就全部展示，只有特殊情况想要访问的时候，才会进行懒加载并展示。
    * 语法：
        * ```
            //1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包，lazy是一个函数，函数里传递的参数也必须是一个函数，在函数体内部使用import来引入子组件
            const Home=lazy(()=>import('./Home'))
            const About=lazy(()=>import('./About'))
            //2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
            <Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </Suspense>
        ```

## 三、Hook
* 1. React Hook/Hooks是什么？
    * Hook是React 16.8.0版本增加的新特性/新语法
    * 可以让你在函数组件中使用 state 以及其他的 React 特性
* 2. 三个常用的Hook
    * State Hook: React.useState()
    * Effect Hook: React.useEffect()
    * Ref Hook: React.useRef()
* 3. State Hook
    * State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
    * 语法: const [xxx, setXxx] = React.useState(initValue)，```const [count,setCount]=React.useState(0)```
    * useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
    * setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
* 4. Effect Hook
    *  Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
    * React中的副作用操作:
        * 发ajax请求数据获取
        * 设置订阅 / 启动定时器
        * 手动更改真实DOM
    * 语法和说明: 
        * ```
          useEffect(() => { 
            // 在此可以执行任何带副作用操作
            //这个函数是最近的上一个函数的返回值，相当于componentWillUnmount钩子
            return () => { // 在组件卸载前执行
                // 在此做一些收尾工作, 比如清除定时器/取消订阅等
            }
            }, 
            // 具体指哪个钩子看配置，若传入的第二个参数，就是数组中什么也没写，那就是全方位都监测(componentDidUpdate)；若写了某个状态的名，那就只监测那个状态的改变(componentDidMount)
            [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
          ```
    * 可以把 useEffect Hook 看做如下三个函数的组合
        * componentDidMount()
        * componentDidUpdate()
    	* componentWillUnmount()
* 5. Ref Hook
    * Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
    * 语法: const refContainer = useRef()，```const myRef=React.useRef()```
        * 在提示输入的回调函数中，可以提取输入的值，```alert(myRef.current.value)```
    * 作用:保存标签对象,功能与React.createRef()一样 

## 四、Fragment  文档碎片
* 打开文件后，在控制台会发现因为组件之间多次暴露、引入的关系，有多层的真正要展示的部分由多层的div包裹。Fragment标签的作用就是可以不用必须有一个真实的DOM根标签，可以消除想要删除的一些中间的div标签，或者拿App.js举例，App的子组件标签可以被空的标签包裹。Fragment标签有且只有一个属性，就是key。

## 五、Context
* 用于组件间通信(就是组件间想要相互传递一些数据)的方式，常用语【祖先组件】与【后代组件】间通信.
* 1. 创建Context容器对象：const XxxContext=React.createContext()
* 2. 渲染子组件时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
    * ```
        <MyContext.Provider value={username}>
            <B />
        </MyContext.Provider>
      ```
* 3. 后代组件读取数据
    * 方法1：在需要读取数据的组件中声明接收数据 **(仅适用于类是组件)**
        * ```
            <!-- 在后代组件中声明接收context -->
            static contextType=MyContext
            <!-- render方法中解构赋值后，读取context中的value -->
            const {username,age}=this.context
            <h4>我从我爸组件中接收到的是用户名是：{username},年龄为：{age}</h4>
          ```
    * 方法2：XxxContext.Consumer标签中写函数 **(函数组件和类组件都适用)**
        * ```
            <!-- 从MyContext中获取Consumer -->
            const {Provider,Consumer}=MyContext
            <!-- 在后代组件中，使用Consumer标签将获取的数据的函数胡value包裹起来 -->
            <Consumer>
                {
                    <!-- value就是context中的数据 -->
                    value=> `${value.username},年龄为:${value.age}`
                    // console.log(value);  //{username: 'tom', age: 12}
                }
            </Consumer>
          ```
* 注意：在应用开发中一般不用context, 一般都用它的封装react插件(就是react-redux)

## 六、组件优化
* 1. Component的2个问题
    * 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
    * 只当前组件重新render(), 就会自动重新render子组件，即便子组件没有用到父组件的任何数据 ==> 效率低
* 2. 提高效率的方法
    * 只有当组件的state或props数据发生改变时，重新调用render()
* 3. 原因
    * Component中的shouldComponentUpdate()(这个钩子是个控制组件更新的阀门，若不做特殊处理，默认为true)总是返回true
* 4. 解决方法
    * 方法1：重写shouldComponentUpdate()方法，比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
        * ```
            //父组件
            shouldComponentUpdate(nextProps,nextState){
                // 打印组件实例目前的props和state
                console.log(this.props,this.state);  //{}[[Prototype]]: Object {bagName: 'Gucci'}
                // 打印组件实例接下来要更新的目标props和state
                console.log(nextProps,nextState);   //{}[[Prototype]]: Object {bagName: 'Prada'}
                // 若目前的状态和即将更新的状态一样，那就关闭阀门，且不调用render()
                if(this.state.bagName===nextState.bagName) return false
                // 若状态发生了变化，开启阀门，并调用render()
                else return true
                // return !this.state.bagName===nextState.bagName  //与上面if判断作用相同
            }
            //子组件
            shouldComponentUpdate(nextProps,nextState){
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
            }
          ```
    * 方法2：使用PureComponent，因为PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
        * 注意：PureComponent中只是进行state和props数据的浅比较, 如果只是数据对象内部数据有了变化, 返回false，比如下面的代码，即使点了按钮也不会有变化，因为只是state这个对象的内部的数据改变了，bagName变为Prada，而不是状态的变化。所以要产生新数据，而不是直接修改state数据。项目中一般使用PureComponent来优化。
            * ```
                state={bagName:"Gucci",stus:"s1","s2","s3"}
                //直接修改数据行为
                const {stus}=this.state
                stus.unshift('p4')
                this.setState(stus)
                //创建新数据行为
                const {stus}=this.state
                this.setState({'p4',[...stus]})
              ```

## 八、render props

