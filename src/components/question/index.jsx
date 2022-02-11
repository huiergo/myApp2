import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import React from 'react';
import VirtualList from '@tarojs/components/virtual-list'
import Taro from '@tarojs/taro';
import { getInitList, getNextList } from '../../actions/question';

const Row = React.memo(({ id, index, style, data }) => {
  console.log("Row 接收到的",data)
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index} : {data[index]}
    </View>
  );
})
@connect((store)=>({...store,current:store.menu.current, }),(dispatch)=>({
  getInitList(params){
    dispatch(getInitList(params))
  },
  getNextList(params){
    dispatch(getNextList(params))
  }
}))

 class Index extends Component {
  state = {
    data:[]
   
  }
  init=false
  loading=false
  page=1

  // ===  从外界传入进来的  ====
  current=1
  //===  end  ====

//1、 菜单切换的时候，判断（包含初始化和切换）
 async compareType(){
    if(this.props.type===this.current){
      if(!this.init){
        let params={
          page:1
        }
        await getInitList(params)
      }
    }
  }

// 3、下拉刷新（根据currentMenu），数据合成到对一个的index的data上
// 刷新的时候 多列表数据, 根据 currentMenu 知道应该刷新哪个
 async refreshMulList() {
  Taro.showLoading()
  this.loading = true
    let params={
      page:1
    }
    await getInitList(params)
    Taro.hideLoading()
    this.loading=false
  }


 async listReachBottom(){
    Taro.showLoading()
    this.loading = true
    let params={
      page:1
    }
    getNextList(params)
    Taro.hideLoading()
    this.loading=false
  }

  render() {
    const { data } = this.state
    // const {data}=this.props
    const dataLen = data.length
    const height=400
    const itemSize=100
    return (
      <VirtualList
        height={height} /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        itemData={data} /* 渲染列表的数据 */
        itemCount={dataLen} /*  渲染列表的长度 */
        itemSize={itemSize} /* 列表单项的高度  */
        onScroll={({scrollDirection, scrollOffset})=>{
          console.log('scrollOffset',scrollOffset,'固定',(data.length-6)*itemSize)
            if(!this.loading&&scrollDirection==='forward'&&
              scrollOffset>((data.length-6)*itemSize)
            ){
             console.log('if...')
              this.listReachBottom()
            }
        }}  
        onScrollToUpper={()=>{
          console.log('触发顶部了。。。。')
          this.refreshMulList.bind(this)
        }}
      >
        {Row} 
      </VirtualList>
    );
  }
}

export default Index