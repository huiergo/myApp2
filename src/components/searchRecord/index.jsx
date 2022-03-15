import React, { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtTag } from 'taro-ui'
import * as searchActions from "../../actions/search.action";
import './index.scss'

class SearchRecord extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { recordList, isEdit,
      clearAllRecordList, deleteRecordByIndex, unShiftRecord, editTrigger
    } = this.props
    return (
      <View className='search-record'>
        <View className='search-record-top'>
          <View className='search-record-left'>
            搜索记录
          </View>
          <View className='search-record-right'>
            {!isEdit &&
              <Image className='trash-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/trash.png' onClick={() => editTrigger(true)} />
            }
            {isEdit && (<View className='edit-group'>
              <Text className='edit-delete-all' onClick={() => clearAllRecordList()}>全部删除</Text>
              <Text className='edit-split'> | </Text>
              <Text className='edit-complete' onClick={() => editTrigger(false)}>完成</Text>
            </View>)}
          </View>
        </View>

        {recordList.map((item, index) => (
          <AtTag className='tag-search' key={index} type='primary' circle>
            <Text
              onClick={() => {
                this.props.onChange(item)
                unShiftRecord({ item })
              }}
            >{item}</Text>
            {isEdit ?
              <Image
                className='edit-item-delete-icon'
                src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/delete.png'
                onClick={() => deleteRecordByIndex(index)}
              />
              : null}
          </AtTag>))
        }
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  const { recordList, isEdit } = state.search
  return {
    recordList,
    isEdit
  }
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(searchActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecord);
