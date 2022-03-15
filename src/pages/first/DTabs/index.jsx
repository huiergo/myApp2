import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import DTabContent from '../DTabContent/index'
import './index.css'

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
