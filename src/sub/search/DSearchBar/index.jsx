import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  // 输入框输入回调
  onChange(value) {
    this.setState({
      value: value
    })
    // 回调 记录和列表
    this.props.onInputChange(value)
  }

  // 外界设置value的值
  manualChange(value) {
    this.setState({
      value: value
    })
  }


  // 搜索按钮点击
  onSearchBtnClick() {
    this.props.onSearchBtnClick()
  }

  render() {
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onSearchBtnClick.bind(this)}
          onConfirm={this.onSearchBtnClick.bind(this)}
        />
      </View>
    )
  }
}

export default Search
