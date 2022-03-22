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
  }

  handleClick(idx) {
    this.props.onChangeTab(idx)
  }

  render() {
    const { tabList, activeIdx } = this.props
    return (
      <AtTabs
        className='first-tab'
        current={activeIdx}
        scroll
        animated={false}
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
      >
        {tabList.map((item, idx) => {
          return (
            <AtTabsPane current={activeIdx} index={idx} key={idx}>
            </AtTabsPane>)
        })}
      </AtTabs>
    )
  }
}

export default DTabs
