import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import DTabContent from '../DTabContent/index'
import { set as setGlobalData, get as getGlobalData } from '../../../global_data'
import './index.css'
class DTabs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // 接收到 完成的消息通知后， 去全局变量拿值，然后作相应的切换
  }

  handleClick(idx) {
    // 2.知道当前选择的idx , 怎么同步到更新filter的idx (如果filter idx更改了，那么)
    this.props.onChangeTab(idx)
  }

  render() {
    const { tabList, activeIdx } = this.props
    return (
      <AtTabs
        className='first-tab'
        current={activeIdx}
        scroll
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
      >
        {tabList.map((item, idx) => {
          return (
            <AtTabsPane current={activeIdx} index={idx} key={idx}>
              {/* <DTabContent tabActiveIdx={activeIdx} type={item.id} index={idx} scrollHeight={this.props.scrollHeight} /> */}
            </AtTabsPane>)
        })}
      </AtTabs>
    )
  }
}

export default DTabs
