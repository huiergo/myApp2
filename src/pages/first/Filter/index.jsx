import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import DTabContent from '../DTabContent/index'
import CustomModel from '../../../components/customModel'
import DPureRadio from '../../../components/DPureRadio'
import DSortRadio from '../../../components/DSortRadio'


import './index.css'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReset: false
    }
  }

  handlePureRadio(v) {
    console.log('handle Pure Radio----', v)
  }

  handleSortRadio(v) {
    console.log('handle Sort Radio----', v)
  }

  reset() {
    // 重置应该  不需要跟外界  交互
    this.setState({
      isReset: true
    })
  }

  complete() {
    // 消息通知首页刷新
    eventCenter.trigger('event_filter_complete')
  }
  render() {
    return (
      <CustomModel
        isOpened={this.props.filterOpen}
        title='重置'
        closeText='完成'
        onReset={() => this.reset()}
        onClose={() => this.complete()}
        onHideModel={() => this.props.hideModel()}
      >
        <View className='panel__content no-padding'>
          <View className='custom__tag-title'> 题目排序</View>
          <View className='radio-container'>
            <DSortRadio isReset={this.state.isReset} onClick={this.handleSortRadio.bind(this)} />
          </View>

          <View className='custom__tag-title'> 测试阶段</View>
          <View className='radio-container'>
            <DPureRadio tabList={this.props.tabList} isReset={this.state.isReset} onClick={this.handlePureRadio.bind(this)} />
          </View>

        </View>

      </CustomModel>
    )
  }
}

export default Filter