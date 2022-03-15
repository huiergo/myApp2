import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro';
import DSearchBar from './DSearchBar/index'
import DSearchRecord from './DSearchRecord/index'
import DSearchList from './DSearchList/index'
import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      scrollHeight: ''
    }
  }

  componentDidMount() {
    this.getScrollHeight()
  }

  componentDidShow() {

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

  // 父组件调用子组件的方法
  onRef = (ref) => {
    this.child = ref
  }

  onInputChange(v) {
    this.setState({
      keyword: v
    })
  }
  onActionClick() {
    // 隐藏添加到storage
    this.child.searchValue(this.state.keyword)
  }
  render() {

    return (
      <View className='search-page'>
        <DSearchBar onInputChange={(v) => this.onInputChange(v)} onActionClick={() => this.onActionClick()} />
        <View className='search-content-wrap'>
          {!this.state.keyword && <DSearchRecord onRef={this.onRef} />}
          {this.state.keyword && <DSearchList keyword={this.state.keyword} scrollHeight={this.state.scrollHeight} />}
        </View>
      </View>
    )
  }
}

export default Search
