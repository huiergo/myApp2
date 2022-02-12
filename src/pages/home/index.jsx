import { Component } from 'react'
import { eventCenter } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import Question from '../../components/question'
import { changeMenu } from "../../actions/menu"

@connect((store) => ({ ...store, tabList: store.home.list }), (dispatch) => ({
  changeMenu(cata) {
    dispatch(changeMenu(cata))
  }
}))

class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0 //current index 的值
    }
  }

  async handleClick(value) {
    this.setState({
      current: value
    })
    await changeMenu({
      currentIdx: value,
      currentValue: this.props.tabList[value]
    })
    // 触发事件，传入多个参数
    eventCenter.trigger('eventChange', this.props.tabList[value])
  }

  render() {
    console.log(this.props)
    return (
      <View className='index-page'>
        <AtTabs scroll current={this.state.current} tabList={this.props.tabList} onClick={this.handleClick.bind(this)}>
          {
            this.props.tabList.map((item, idx) => {
              return (
                <AtTabsPane key={idx} current={this.state.current} index={idx} >
                  <Question type={item.type} index={idx} />
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