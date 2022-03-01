import React, { Component } from "react";
import Taro, { eventCenter } from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import * as tagActions from "../../actions/tag.action"
import * as firstActions from "../../actions/first.action"
import { gotoPage } from "../../utils/index"
import CustomModel from '../../components/customModel'
import CustomTags from '../../components/customTags'
import Topic from '../../components/topic'
import './index.scss'

class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
  }
  componentDidMount() {
    this.props.category()
  }
  change(v) {
    this.props.changeTab(v)
    // 触发事件，传入多个参数
    eventCenter.trigger('eventChange', v)

    console.log("change......====", v)
  }
  getExtralParams() {
    const { sortList, cataList } = this.props
    let keyword = '';
    let sort = '';
    sortList.map((item, index) => {
      if (item.active) {
        sort = index.toString() + item.specialStatus.toString()
      }
    })
    cataList.map((item, index) => {
      if (item.active) {
        keyword = item.name
      }
    })
    return {
      keyword,
      sort
    }

  }
  reset() {
    this.props.resetTagList()
  }
  complete() {
    let params = this.getExtralParams()
    // todo: 1.需要定位到相应的tab  2. 需要同步状态 3.需要请求数据

    this.props.submitFilterParams(params)
    this.props.triggerModel(false)
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { cataList, sortList, updateTagList } = this.props
    const { isOpened } = this.state
    const {
      currentIdx,
      tabList,
      chineseTabList,
      exprState,
      initData,
      loadMore
    } = this.props

    return (
      <View className='index'>
        <View className='top-part'>
          <View className='index__search-bar' onClick={() => gotoPage({ url: '../search/index' })}>
            <AtSearchBar
              placeholder='请输入搜索关键词'
              disabled
            />
          </View>
          <View className='index__clock-in'>去打卡</View>
        </View>



        {/* <View onClick={() => this.setState({ isOpened: true })}>筛选按钮</View> */}
        <CustomModel isOpened={isOpened} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()}>
          <View className='custom__tag-title'> 题目排序 </View>
          <CustomTags type='sortList' circle={false} list={sortList} updateTagList={updateTagList} />
          <View className='custom__tag-title'> 选择阶段</View>
          <CustomTags type='cataList' circle={true} list={cataList} updateTagList={updateTagList} />
        </CustomModel>

        <View className='index-tab-wrap'>
          <AtTabs
            className='index-tab'
            scroll
            current={currentIdx}
            tabList={chineseTabList}
            onClick={this.change.bind(this)}
          >

            {
              chineseTabList.map((item, idx) => {
                return (
                  <AtTabsPane key={idx} current={currentIdx} index={idx} >
                    index-{item.title} - {idx}
                    <Topic
                      current={currentIdx}
                      index={idx}
                      tabType={tabList[idx]}
                      list={exprState[tabList[idx]].list}
                      page={exprState[tabList[idx]].page}
                      initData={initData}
                      loadMore={loadMore}
                    />
                  </AtTabsPane>
                )
              })
            }
          </AtTabs>
          <Image className='test-filter-btn' src={require('../../assets/filter_icon.png')} onClick={() => this.setState({ isOpened: true })} />
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {

  let { currentIdx } = state.first
  // 其实是筛选了下 ：结果是 ['recommand','lastest']
  let tabList = Object.keys(state.first).filter(i => (i !== 'currentIdx' && i !== 'extraParams'))
  //  组合下为了适配taro 组件属性： [{title:'推荐'，{title:'最新'}}]
  let chineseTabList = tabList.map(k => state.first[k].des).filter(i => i).map(j => ({ title: j }))

  return {
    showModal: state.first,
    sortList: state.tag.sortList,
    cataList: state.tag.cataList,
    // 以下是tab列表相关的，将来会用抽离成共用组件
    tabList,
    chineseTabList,
    currentIdx,
    exprState: state.first
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(tagActions, dispatch),
  ...bindActionCreators(firstActions, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(First);
