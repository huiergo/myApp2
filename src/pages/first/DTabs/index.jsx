import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import DTabContent from '../DTabContent/index'
import './index.css'
import { get as getGlobalData } from '../../../global_data'


// tablist 是外部传递进来的 
let tabList = [
  { title: '标签页1' },
  { title: '标签页2' },
  { title: '标签页3' },
  { title: '标签页4' },
  { title: '标签页5' },
  { title: '标签页6' }
]
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentDidMount() {
    // 接收到 完成的消息通知后， 去全局变量拿值，然后作相应的切换
    let _this = this
    eventCenter.on('event_filter_complete', () => {
      let v_pure = getGlobalData('pure_radio_select')
      let v_sort = getGlobalData('sort_radio_select')
      //  可以setState 更新 
      console.log('v_pure------', v_pure)
      console.log('v_sort------', v_sort)
      _this.setState({
        current: v_pure.index
      })
    })
  }
  componentWillUnmount() {
    eventCenter.off('event_filter_complete')
  }

  handleClick(idx) {
    this.setState({
      current: idx
    })
  }

  render() {
    return (
      <AtTabs
        current={this.state.current}
        scroll
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
      >
        {tabList.map((item, idx) => {
          return (
            <AtTabsPane current={this.state.current} index={idx} key={idx}>
              <DTabContent tabActiveIdx={this.state.current} index={idx} scrollHeight={this.props.scrollHeight} />
            </AtTabsPane>)
        })}
      </AtTabs>
    )
  }
}

export default Search
