import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "../../actions/search.action";

class SearchRecord extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { recordList, isEdit,
      clearAllRecordList, deleteRecordByIndex, unShiftRecord, editTrigger
    } = this.props
    return (
      <View className='index'>
        <View ><Text>SearchRecord 搜索记录模块</Text></View>
        {!isEdit && <Button onClick={() => editTrigger(true)}>编辑</Button>}
        {isEdit && (<View>
          <Button onClick={() => clearAllRecordList()}>全部删除</Button>
          <Button onClick={() => editTrigger(false)}>完成</Button>
        </View>)}
        {recordList.map((item, index) => (
          <View key={index}>
            <Text onClick={() => unShiftRecord({ item, index })}>{item}</Text>
            {isEdit ? <Button onClick={() => deleteRecordByIndex(index)}>删除</Button> : null}
          </View>
        ))}
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
