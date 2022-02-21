import { Component } from 'react'
import Taro, { eventCenter } from '@tarojs/taro'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import { View, Image, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import Question from '../../components/question'
import { changeMenu } from "../../actions/menu"
import { tabShow } from "../../actions/common"
import { resetTags } from "../../actions/tags"
import Filter from '../../components/filter'
import Tags from '../../components/tags'
import './index.scss'

@connect((store) => ({ store, ...store, tabList: store.home.list, sortList: store.tags.sortList, cataList: store.tags.cataList, extraParams: store.home.extraParams }), (dispatch) => ({
  changeMenu(cata) {
    dispatch(changeMenu(cata))
  },
  tabShow(params) {
    dispatch(tabShow(params))
  },
  resetTags() {
    dispatch(resetTags())
  }
}))

class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0, //current index 的值
      isOpen: false
    }
  }

  componentDidShow() {
    tabShow('home')
  }
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
  async handleClick(value, extraParams = {}) {
    console.log("[[[[handleClick 入参---", value, extraParams)
    this.setState({
      current: value
    })
    await changeMenu({
      currentIdx: value,
      currentValue: this.props.tabList[value],
    })
    // 触发事件，传入多个参数
    eventCenter.trigger('eventChange', this.props.tabList[value], extraParams)
    console.log("store---", this.props.store)
  }

  openFilter() {
    this.setState({
      isOpen: true
    })
  }

  reset() {
    console.log("reset...")
    resetTags()
  }

  async complete() {

    console.log(" this.props----", this.props)
    let params = {}
    let curVal = ''
    this.props.cataList.map((item, index) => {
      if (item.active) {
        console.log("cataList active----", item, index)
        params = { ...params, type: item.name }
        curVal = index
      }
    })

    this.props.sortList.map((item, index) => {
      if (item.active) {
        console.log("sortList active----", item, index)
        params = { ...params, sort: item.name }
      }
    })

    console.log("store params----", params)
    this.setState({
      isOpen: false
    })
    this.handleClick(curVal, params)

  }

  render() {
    console.log(this.props)
    const { isOpen } = this.state
    const { sortList, cataList } = this.props
    return (
      <View className='index-page'>
        {/* 渐变背景 */}
        <Image className='index-page-bg' src={require('../../assets/jianbian.jpeg')} />
        <AtSearchBar
          onFocus={() => { Taro.navigateTo({ url: '/pages/search/index' }) }}
          disabled
          placeholder='请输入关键词'
          showActionButton={false}
          onActionClick={() => { console.log("onActionClick") }}
        />

        <Button className='index-page__clock-in'>去打卡</Button>
        {/* 分类tab */}
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
        {/* 筛选器 */}
        <View>
          <View onClick={() => this.openFilter()}>筛选按钮</View>
          <Filter isOpened={isOpen} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()}>
            题目排序
            <Tags type='sort' list={sortList} />
            选择阶段
            <Tags type='cata' list={cataList} />
          </Filter>

        </View>
      </View>
    )
  }
}


export default Index