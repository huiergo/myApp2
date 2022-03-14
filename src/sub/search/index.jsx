import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "../../actions/search.action";
import SearchRecord from '../../components/searchRecord'
import SearchList from '../../components/searchList'

let timer;
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      scrollHeight: 469,
    }
  }
  componentDidShow() {
    console.log('xxx')
    this.props.editTrigger(false)

    this.getScrollHeight()
  }



  getScrollHeight() {
    let _this = this
    let total = 0

    Taro.createSelectorQuery().selectViewport().boundingClientRect(function (res) {
      total = res.height
      Taro.setStorageSync('viewport_height', total)

      let searchBarHeight = Taro.getStorageSync('at_search_height')
      console.log('total searchBarHeight-----', total, searchBarHeight)
      _this.setState({
        scrollHeight: (total - searchBarHeight - 44)
      })
    }).exec()
  }

  onChange(value) {
    this.setState({
      value: value
    })

    this.props.inputTrigger(value)
    const debounce = (fn, delay = 300) => {
      return function () {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          console.log('请求数据。。。。', value)
          fn.apply(this, args);
        }, delay);
      };
    }
    let fn = debounce(this.props.initSearchData, 1000)

    if (value) {
      console.log('input value----', value)
      fn({ keyword: value, page: 1, questionBankType: 9 })
    }
  }

  render() {
    const { list, page, initSearchData, loadSearchMore, unShiftRecord, editTrigger, hasInput, pageTotal } = this.props
    const { scrollHeight } = this.state
    return (
      <View className='index'>
        <AtSearchBar
          placeholder='请输入搜索关键词'
          value={this.state.value}
          showActionButton
          onChange={(value) => this.onChange(value)}
          onFocus={() => {
            editTrigger(false)
            console.log('focus 防抖')
          }}
          onActionClick={() => {
            // 搜索关键词请求
            // todo: 本页的 questionBankType  需要换成tabShow动态的
            initSearchData({ keyword: this.state.value, page: 1, questionBankType: 9 })
            // 
            unShiftRecord({ item: this.state.value })
          }}
          onConfirm={() => {
            // 搜索关键词请求
            // todo: 本页的 questionBankType  需要换成tabShow动态的
            initSearchData({ keyword: this.state.value, page: 1, questionBankType: 9 })
            // 
            unShiftRecord({ item: this.state.value })
          }}
        />
        {!hasInput && <SearchRecord onChange={(value) => this.onChange(value)} />}
        {hasInput && <SearchList
          questionBankType={9}
          keyword={this.state.value}
          pageTotal={pageTotal}
          list={list}
          page={page}
          initData={initSearchData}
          loadMore={loadSearchMore}
          scrollHeight={scrollHeight}
        />}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { list, isEdit, page, hasInput, pageTotal } = state.search
  console.log("[search ...]", state.search)

  return {
    list,
    page,
    isEdit,
    hasInput,
    pageTotal
  }
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
