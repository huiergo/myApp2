import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import { initRecord, edit, deleteAll, quitEdit, searchItem, deleItem } from '../../actions/search'

@connect((store) => ({ ...store, recordList: store.search.recordList, isEdit: store.search.isEdit, }),
  (dispatch) => ({
    initRecord(params) {
      console.log('init')
      dispatch(initRecord(params))
    },
    edit() {
      dispatch(edit())
    },
    deleteAll() {
      dispatch(deleteAll())
    },
    quitEdit() {
      dispatch(quitEdit())
    },
    searchItem(index, item) {
      dispatch(searchItem(index, item))
    },
    deleItem(index) {
      // 1. 请求删除记录的方法
      // 2、请求历史记录的方法，相当于刷新历史记录列表
      dispatch(deleItem(index))
    }
  }))

class Index extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.initRecord(this.props.recordList)
  }
  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {

  }

  render() {
    const { recordList, isEdit } = this.props
    return (
      <View className='index'>
        <View ><Text>SearchRecord 搜索记录模块</Text></View>
        {!isEdit && <Button onClick={() => this.props.edit()}>编辑</Button>}
        {isEdit && (<View>
          <Button onClick={() => this.props.deleteAll()}>全部删除</Button>
          <Button onClick={() => this.props.quitEdit()}>完成</Button>
        </View>)}
        {recordList.map((item, index) => (
          <View key={index}>
            <Text onClick={() => this.props.searchItem(index, item)}>{item}</Text>
            {isEdit ? <Button onClick={() => this.props.deleItem(index)}>删除</Button> : null}
          </View>
        ))}
      </View>
    )
  }
}
export default Index

