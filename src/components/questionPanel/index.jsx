import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import React from 'react';
import {getInitList,getMoreList} from '../../actions/panel'
import Taro,{ eventCenter, getCurrentInstance } from '@tarojs/taro'
import VirtualList from '@tarojs/components/virtual-list'



const Row = React.memo(({ id, index, style, data }) => {
  console.log("Row 接收到的",data)
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {id}={index}+{data[index].title}
    </View>
  );
})
@connect((store)=>({...store, currentIdx:store.home.currentIdx,currentValue:store.home.currentValue}))

class Index extends Component {
 state={
   list:[]
 }
  init=true
  loading=false
  page=0
  $instance = getCurrentInstance()

  componentWillMount () {
    console.log('will mount')
    const onShowEventId = this.$instance.router.onShow
    // 监听
    eventCenter.on(onShowEventId, this.onShow)
  }

  componentWillUnmount () {
    const onShowEventId = this.$instance.router.onShow
    // 卸载
    eventCenter.off(onShowEventId, this.onShow)
  }

  onShow = () => {
    console.log("onshow...",this.props.type,this.props.currentValue.type)
      if(this.init&& (this.props.type===this.props.currentValue.type)){
    console.log("onshow",this.props.type)

        this.initList()
      }
  }
  initList(){
    Taro.showLoading()
    this.loading = true
    console.log("initList")
   setTimeout(() => {
      // // 初始化
    let params={  
      type:this.props.type,
      questionBankType:10,
      page:1
    }
    getInitList(params).then(res=>{
      if(res){
        this.setState({
          list:res
        })
      }
    })
   }, 1000);
    Taro.hideLoading()
    this.loading=false
  }
  
  loadMore=()=>{
    Taro.showLoading()
    this.loading = true
    this.page=this.page+1
    let params={  
      type:this.props.type,
      questionBankType:10,
      page:this.page
    }
    setTimeout(() => {

    getMoreList(params).then(res=>{
      if(res){
        this.setState({
          list:this.state.list.concat(res)
        })
      }
    })
  }, 1000);

    Taro.hideLoading()
    this.loading=false
  }

  render () {
    const { list } = this.state
    console.log("[list...]",list)
    console.log("type...",this.props.type)
    // const {data}=this.props
    const dataLen = list.length
    const height=400
    const itemSize=100
    return (
      // <View className='index'>
      //   <Button onClick={this.initList.bind(this)}>刷新</Button>
      //   {this.state.list.map((item,index)=>{
      //     return (
      //       <View key={index}><Text>{item.title}</Text></View>
      //     )
      //   })}
       
      //   <Button onClick={this.loadMore.bind(this)}>加载更多</Button>
      // </View>
      <VirtualList
        height={height} /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        itemData={list} /* 渲染列表的数据 */
        itemCount={dataLen} /*  渲染列表的长度 */
        itemSize={itemSize} /* 列表单项的高度  */
        onScroll={({scrollDirection, scrollOffset})=>{
          console.log('scrollOffset',scrollOffset,'固定',(list.length-6)*itemSize)
            if(!this.loading&&scrollDirection==='forward'&&
              scrollOffset>((list.length-6)*itemSize)
            ){
            console.log('if...')
            this.loadMore()
            }
        }}  
        onScrollToUpper={()=>{
          console.log('触发顶部了。。。。')
         this.initList()
        }}
      >
      {Row} 
    </VirtualList>
    )
  }
}
export default Index

