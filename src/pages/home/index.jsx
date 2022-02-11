import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import {connect} from 'react-redux'
import Panel from '../../components/questionPanel'
import { AtTabs, AtTabsPane  } from 'taro-ui'
import {changeMenu} from "../../actions/menu"

@connect((store)=>({...store, tabList:store.home.list, currentIdx:store.home.currentIdx}),(dispatch)=>({
  changeMenu(){
    dispatch(changeMenu)
  }
}))

// 请求menu
// 传递current--可以让组件从store中取值
// type 类型 给 Question组件

class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0 //current index 的值
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick (value) {
    this.setState({
      current: value
    })
    console.log("点击的标签是--",value)
    changeMenu({
      currentIdx:value,
      currentValue:this.props.tabList[value]
    })
  }

  render () {
    console.log(this.props)
    return (
      <View className='index-page'>
        <AtTabs scroll current={this.state.current} tabList={this.props.tabList} onClick={this.handleClick.bind(this)}>
        {
              this.props.tabList.map((item,idx) => {
                return (
                  <AtTabsPane key={idx} current={this.state.current} index={idx} >
                    <Panel   type={item.type} index={idx} />
                  </AtTabsPane>
                )
              })
            }
        </AtTabs>
      </View>
    )
  }
}


export default Index