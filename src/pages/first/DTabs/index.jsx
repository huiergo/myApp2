import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import Taro, { eventCenter } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import DTabContent from '../DTabContent/index'
import { set as setGlobalData, get as getGlobalData } from '../../../global_data'
import './index.css'

// // tablist 是外部传递进来的 
// let tabList = [
//   { title: '标签页1' },
//   { title: '标签页2' },
//   { title: '标签页3' },
//   { title: '标签页4' },
//   { title: '标签页5' },
//   { title: '标签页6' }
// ]
class DTabs extends Component {
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
        current: v_pure.index,
      })

      // type 类型id
      // keyword 搜索关键词
      // sort 默认0,可以不传，难易-10从易到难11从难道易，浏览量：20从低到高21从高到底,30推荐数据（按照权重倒序）
      let sortIndex = v_sort && v_sort.index || '0'
      let sortUpArrow = v_sort && v_sort.option && v_sort.option.upArrow || '0'
      setGlobalData('extraParmas', {
        type: v_pure.option.id,
        keyword: v_pure.option.name,
        sort: sortIndex + sortUpArrow
      })
      console.log(' 222222  ----', getGlobalData('extraParmas'))

    })


  }
  componentWillUnmount() {
    eventCenter.off('event_filter_complete')
  }

  handleClick(idx) {
    // todo :  -------???????????? 点击和 tab切换同步
    this.setState({
      current: idx
    })


    // 2.知道当前选择的idx , 怎么同步到更新filter的idx (如果filter idx更改了，那么)
    this.props.onChangeTab(idx)


  }

  render() {
    const { tabList } = this.props
    return (
      <AtTabs
        className='first-tab'
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

export default DTabs
