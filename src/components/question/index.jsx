import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import VirtualList from '@tarojs/components/virtual-list'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import { getInitList, getMoreList } from '../../actions/question'

const Row = React.memo(({ id, index, style, data }) => {
  console.log('[Row...]', data)
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
  store
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
    console.log('willmount...')

    if (this.init && (this.props.type === this.props.currentValue.type)) {
      console.log("满足相等...")
      this.init = false
      this.initList()
    }
    // 监听一个事件，接受参数
    this.props.events.on('eventName', (currentValue) => {
      console.log("eventname 回调了。。。", this.props.type, this.props.currentValue.type)
      if (this.init && (this.props.type === currentValue.type)) {
        console.log("满足相等...")
        this.init = false
        this.initList()
      }
    })
    // const onShowEventId = this.$instance.router.onShow
    // // 监听
    // eventCenter.on(onShowEventId, this.onShow)
  }

  componentWillUnmount() {
    const onShowEventId = this.$instance.router.onShow
    // 卸载
    eventCenter.off(onShowEventId, this.onShow)
  }

  onShow = () => {
    console.log("onshow ...传进来的type和currentValue", this.props.type, this.props.currentValue.type)
    console.log("当前的store...", this.props.store)
    // console.log("[this.props.currentValue.type]", this.props.currentValue.type)
    // if (this.init && (this.props.type === this.props.currentValue.type)) {
    //   console.log("满足if...")
    //   this.initList()
    // }
    // 监听一个事件，接受参数
    this.props.events.on('eventName', (currentValue) => {
      console.log("eventname 回调了。。。", this.props.type, this.props.currentValue.type)
      if (this.init && (this.props.type === currentValue.type)) {
        console.log("满足相等...")
        this.init = false
        this.initList()
      }
    })
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
        onScroll={({ scrollDirection, scrollOffset }) => {
          console.log('scrollOffset', scrollOffset, '固定', (list.length - 6) * itemSize)
          if (!this.loading && scrollDirection === 'forward' && list.length > 0 &&
            scrollOffset > ((list.length - 6) * itemSize)
          ) {
            // this.loadMore()
            console.log('[func loadMore]', this.props.type, this.props.currentValue.type)
          }
        }}
        onScrollToUpper={() => {
          // this.initList()
          console.log('[func initList]', this.props.type, this.props.currentValue.type)
        }}
      >
        {Row}
      </VirtualList>
    )
  }
}
export default Index

