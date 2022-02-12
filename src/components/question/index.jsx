import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import VirtualList from '@tarojs/components/virtual-list'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import { getInitList, getMoreList } from '../../actions/question'

const Row = React.memo(({ id, index, style, data }) => {
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {id}={index}+{data[index].title}
    </View>
  );
})
@connect((store) => ({
  ...store,
  currentValue: store.home.currentValue,
  events: store.home.events,
}))

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  init = true
  loading = false
  page = 1
  $instance = getCurrentInstance()

  componentWillMount() {
    this.initByTabChange()
    // 监听一个事件，接受参数
    eventCenter.on('eventChange', (currentValue) => {
      this.initByTabChange(currentValue)
    })
  }

  initByTabChange(currentValue = this.props.currentValue) {
    if (this.init && (this.props.type === currentValue.type)) {
      this.init = false
      this.initList()
    }
  }

  componentWillUnmount() {
    // 卸载
    eventCenter.off('eventChange')
  }

  initList() {
    Taro.showLoading()
    this.loading = true
    setTimeout(() => {
      let params = {
        type: this.props.type,
        questionBankType: 10,
        page: 1
      }
      getInitList(params).then(res => {
        if (res) {
          this.setState({
            list: res
          })
        }
      })
      this.page = 1;
    }, 1000);
    Taro.hideLoading()
    this.loading = false
  }

  loadMore = () => {
    Taro.showLoading()
    this.loading = true
    this.page = this.page + 1
    let params = {
      type: this.props.type,
      questionBankType: 10,
      page: this.page
    }
    setTimeout(() => {

      getMoreList(params).then(res => {
        if (res) {
          this.setState({
            list: this.state.list.concat(res)
          })
        }
      })
    }, 1000);

    Taro.hideLoading()
    this.loading = false
  }

  render() {
    const { list } = this.state
    const dataLen = list.length
    const height = 400
    const itemSize = 100
    return (
      <VirtualList
        height={height} /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        itemData={list} /* 渲染列表的数据 */
        itemCount={dataLen} /*  渲染列表的长度 */
        itemSize={itemSize} /* 列表单项的高度  */
        onScrollToLower={() => {
          if (!this.loading) {
            this.loadMore()
          }
        }}
        onScrollToUpper={() => {
          if (!this.loading) {
            this.initList()
          }
        }}
      >
        {Row}
      </VirtualList>
    )
  }
}
export default Index

