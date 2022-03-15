import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro';

let timer = null
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

  }

  componentDidMount() {

  }

  onChange(value) {
    this.setState({
      value: value
    })

    // const debounce = (fn, delay = 300) => {
    //   return function () {
    //     const args = arguments;
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(() => {
    //       console.log('请求数据。。。。', value)
    //       fn.apply(this, args);
    //     }, delay);
    //   };
    // }
    // let fn = debounce(() => {
    this.props.onInputChange(value)
    // }, 1000)

    // fn()
  }

  onActionClick() {
    this.props.onActionClick()
    console.log('开始搜索')
  }

  render() {
    return (
      <View className='index'>
        <AtSearchBar
          showActionButton
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
      </View>
    )
  }
}

export default Search
