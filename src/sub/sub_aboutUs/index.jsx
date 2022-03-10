import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';

function helloWorld() {
  const html = `<p><b>面试公司：</b>广州欣芝妍化妆品有限公司<br></p><p><b>面试岗位：</b>前端开发</p><p><br></p><p>
  </p><p><b>面试问题：
  </b></p><p>1.<a href="https://www.itcast.cn/news/20211007/11050312845.shtml" target="_blank"> let、const、var区别</a>
  </p><p>2. 是否使用过vuex，vuex里面的几个核心模块有哪些
  </p><p>3. <a href="https://www.itcast.cn/news/20180105/13395719059.shtml" target="_blank">闭包</a>
  </p><p>4. <a href="https://www.itheima.com/news/20211019/110800.html" target="_blank">原型链</a>
  </p><p>5. <a href="https://www.itcast.cn/news/20201016/11023220300.shtml" target="_blank">深拷贝的方</a>法（json方法的缺点：不能拷贝函数和 undefined）
  </p><p>6. <a href="https://www.itcast.cn/news/20210929/17580567129.shtml" target="_blank">vue生命周期</a>（mounted和created的区别，mounted是否任何情况下都能操作到dom）
  </p><p>7. 深拷贝如何实现
  </p><p>8. <a href="https://www.itcast.cn/news/20210506/15001052902.shtml" target="_blank">基本数据类型</a>
  </p><p>9. 基本数据类型和引用数据类型你是怎么理解的
  </p><p>10. 简述项目中遇到的问题，如何解决
  </p><p>11. 如何判断数据类型（typeof和instanceof、对象的constructor）
  </p><p>12. 职业发展规划</p><p>
  </p><p>`

  return <View dangerouslySetInnerHTML={{ __html: html }}></View>
}
class SubAboutUs extends Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <View className='index'>
        <View>{helloWorld()}</View>
      </View>
    )
  }
}

export default SubAboutUs
