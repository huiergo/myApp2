import React, { Component } from "react";
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, Button } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import * as tagActions from "../../actions/tag.action"
import * as firstActions from "../../actions/first.action"


import { gotoPage } from "../../utils/index"

import CustomModel from '../../components/customModel'
import CustomTags from '../../components/customTags'

class First extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
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
    this.props.submitFilterParams(params)
    this.props.triggerModel(false)
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { cataList, sortList, updateTagList } = this.props
    const { isOpened } = this.state
    return (
      <View className='index'>
        假的搜索框
        <View onClick={() => gotoPage({ url: '../search/index' })}>
          <AtSearchBar
            placeholder='请输入搜索关键词'
            disabled
          />
        </View>

        <View onClick={() => this.setState({ isOpened: true })}>筛选按钮</View>
        <CustomModel isOpened={isOpened} title='重置' closeText='完成' onReset={() => this.reset()} onClose={() => this.complete()}>
          题目排序
          <CustomTags type='sortList' list={sortList} updateTagList={updateTagList} />
          选择阶段
          <CustomTags type='cataList' list={cataList} updateTagList={updateTagList} />
        </CustomModel>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("first page state.tag====", state.tag)
  return {
    showModal: state.first,
    sortList: state.tag.sortList,
    cataList: state.tag.cataList
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(tagActions, dispatch),
  ...bindActionCreators(firstActions, dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(First);
