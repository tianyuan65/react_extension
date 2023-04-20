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
* 用于组件间通信(就是组件间想要相互传递一些数据)的方式，常用语【祖先组件】与【后代组件】间通信

