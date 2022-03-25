import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
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
