import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import 'taro-ui/dist/style/index.scss';

import { AtTabs, AtTabsPane ,AtFloatLayout } from 'taro-ui'
import { connect } from 'react-redux';

const asyncDec=(timeout)=>{
  return dispatch=>{
    setTimeout(() => {
      dispatch({type:'MINUS'})
    }, timeout);
  }
}

@connect(({counter})=>({counter}),
(dispatch)=>({
  add(){
    dispatch({type:'ADD'})
  },
  dec(){
    dispatch({type:'MINUS'})
  },
  asyncDec(){
    dispatch(asyncDec(1000))
  }
})
)
 class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  handleClose(){
    console.log("close click...")
  }
  handleReset(){
    console.log('reset click...')
  }


  render () {
    const tabList = [ 
    { title: '全部' },
    { title: 'JavaScript' },
    { title: 'React' },
    { title: 'Vue' },
    { title: '移动端布局' },
    { title: 'CSS' },
    { title: 'JavaScript' },
    { title: 'React' },
    { title: 'Vue' },
    { title: '移动端布局' },
    { title: 'CSS' }
  ]
    return (
      <View className='index-page'>
        {/* <View onClick={this.props.add}>+</View>
        <View  onClick={this.props.asyncDec}>-</View>
        <View>{this.props.counter.num}</View> */}
      <AtTabs scroll current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={4}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={5}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>

      <AtFloatLayout isOpened={false} title="这是个标题" onClose={this.handleClose.bind(this)}>
        <View className='reset-btn' onClick={this.handleReset.bind(this)}>重置</View>
  这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
  随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
</AtFloatLayout>
      </View>
    )
  }
}

export default Index;

// export default class Index extends Component {

//   componentWillMount () { }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//                  <AtButton type='primary'>按钮文案</AtButton>

//         <Text>Hello world!</Text>
//       </View>
//     )
//   }
// }

