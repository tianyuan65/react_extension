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