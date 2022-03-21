import { Component, createRef } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import DSearchBar from './DSearchBar/index'
import DSearchRecord from './DSearchRecord/index'
import DSearchList from './DSearchList/index'
import './index.css'
import { SEARCH_DEFAULT, SEARCH_CLICK } from '../../utils/constant'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      scrollHeight: '',
      searchAction: SEARCH_DEFAULT
    }

    // 创建 searchInput 的 引用
    this.searchInputRef = createRef()
    // 创建 record 的引用
    this.recordRef = createRef()
    console.log('this.searchInputRef ', this.searchInputRef)
    console.log('this.recordRef', this.recordRef)
    this.fromType = ''
  }
  $instance = getCurrentInstance()

  componentDidMount() {
    this.fromType = this.$instance.router.params.fromType
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

  // 输入框输入回调，刷新列表
  onRef = (ref) => {
    this.child = ref
  }

  onInputChange(v) {
    this.setState({
      keyword: v
    })
  }

  // 搜索按钮回调：用keyword, 更新record的值和刷新列表
  onSearchBtnClick() {
    console.log('[this.recordRef]', this.recordRef)
    this.state.keyword && this.child.insertSearchKey(this.state.keyword)
    this.setState({
      keyword: this.state.keyword,
      searchAction: SEARCH_CLICK
    })
  }

  // 记录回调： 搜索某个记录的点击，更新输入框和列表
  onRecordItemClick(v) {
    this.searchInputRef.current.manualChange(v)
    this.setState({
      keyword: v,
    })
  }


  render() {

    return (
      <View className='search-page'>
        <DSearchBar ref={this.searchInputRef} onInputChange={(v) => this.onInputChange(v)} onSearchBtnClick={() => this.onSearchBtnClick()} />
        <View className='search-content-wrap'>
          {!this.state.keyword &&
            <DSearchRecord
              onRef={this.onRef}
              onRecordItemClick={(v) => this.onRecordItemClick(v)}
            />
          }
          {this.state.keyword && <DSearchList fromType={this.fromType} searchAction={this.state.searchAction} keyword={this.state.keyword} scrollHeight={this.state.scrollHeight} />}
        </View>
      </View>
    )
  }
}

export default Search
