import { Component } from 'react'
import Taro, { eventCenter } from '@tarojs/taro'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import Question from '../../components/question'
import { changeMenu } from "../../actions/menu"
import { tabShow } from "../../actions/common"
import Filter from '../../components/filter'
import Tags from '../../components/tags'

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
      current: 0, //current index 的值
      isOpen: true
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

  openFilter() {
    this.setState({
      isOpen: true
    })
  }
  render() {
    console.log(this.props)
    const { isOpen } = this.state
    const html = `<h1 style="color: red">Wallace is way taller than other reporters.</h1>`
    return (
      <View className='index-page'>
        <View>
          <View dangerouslySetInnerHTML={{ __html: html }}></View>
          <View onClick={() => this.openFilter()}>筛选按钮</View>
          <Filter isOpened={isOpen} title="重置" closeText="完成" onReset={() => console.log('reset...')} onClose={() => console.log('close..')}>
            题目排序
            <Tags />
            选择阶段
            <Tags />
          </Filter>
          <AtSearchBar
            onFocus={() => { Taro.navigateTo({ url: '/pages/search/index' }) }}
            disabled
            placeholder='请输入关键词'
            showActionButton={false}
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