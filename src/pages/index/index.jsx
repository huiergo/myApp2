import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import 'taro-ui/dist/style/index.scss';

import { AtTabs, AtTabsPane ,AtFloatLayout } from 'taro-ui'
import { connect } from 'react-redux';
import { add , asyncDec} from '../../actions/counter'
import {changeMenu,getClockIn} from "../../actions/menu"
import Question from "../../components/question"

@connect((store)=>({...store,tabList:store.menu.menuList}),
(dispatch)=>({
  add(){
    dispatch(add)
  },
  dec(){
    dispatch({type:'MINUS'})
  },
  asyncDec(){
    dispatch(asyncDec(1000))
  },
  changeMenu(){
    dispatch(changeMenu)
  }
})
)
 class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0 //current index 的值
    }
  }
  componentDidMount(){
    console.log(this.props)
    getClockIn().then(res=>{
      console.log("didmout request...",res)
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
    console.log("点击的标签是--",value)
    changeMenu(value)
  }

  handleClose(){
    console.log("close click...")
  }
  handleReset(){
    console.log('reset click...')
  }


  render () {
    return (
      <View className='index-page'>
        {/* <button open-type='feedback' type='primary'>意见反馈</button> */}
        {/* <View onClick={this.props.add}>+</View>
        <View  onClick={this.props.asyncDec}>-</View>
        <View>{this.props.counter.num}</View> */}
      <AtTabs scroll current={this.state.current} tabList={this.props.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <Question data={this.props.tabList[0].tabs.list} />
          {/* <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View> */}
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <Question data={this.props.tabList[1].tabs.list} />
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

