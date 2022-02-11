import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import React from 'react';
import VirtualList from '@tarojs/components/virtual-list'
import Taro from '@tarojs/taro';


function buildData (offset = 0) {
  return Array(100).fill(0).map((_, i) => i + offset);
}


const Row = React.memo(({ id, index, style, data }) => {
  console.log("Row 接收到的",data)
  return (
    <View id={id} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index} : {data[index]}
      {/* {data[index].title} */}
    </View>
  );
})
export default class Index extends Component {
  state = {
    data: buildData(0),
  }
  loading=false

  listReachBottom(){
    Taro.showLoading()
    this.loading = true
    setTimeout(() => {
      const {data}=this.state
      this.setState({
        data:data.concat(buildData(data.length))
      },()=>{
        Taro.hideLoading()
        this.loading=false
      })
    }, 1000);
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
        onScrollToUpper={()=>{console.log('触发顶部了。。。。')}}
      >
        {Row} 
      </VirtualList>
    );
  }
}
