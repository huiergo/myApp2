import { Component } from 'react'
import Taro, { eventCenter } from '@tarojs/taro'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import Question from '../../components/question'
import { changeMenu } from "../../actions/menu"
import { tabShow } from "../../actions/common"

@connect((store) => ({ ...store, tabList: store.home.list }), (dispatch) => ({
  changeMenu(cata) {
    dispatch(changeMenu(cata))
  },
  tabShow(params) {
    dispatch(tabShow(params))
  }
}))

class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0 //current index 的值
    }
  }

  componentDidShow() {
    tabShow('home')
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
        <View onClick={() => { Taro.navigateTo({ url: '/pages/search/index' }) }}>
          <AtSearchBar
            disabled
            placeholder='请输入关键词'
            showActionButton={false}
            onFocus={() => { console.log("onfocus") }}
            onActionClick={() => { console.log("onActionClick") }}
          />
        </View>

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