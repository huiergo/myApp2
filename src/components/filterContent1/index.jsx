import React, { Component } from 'react'
import { View, Text, Radio, RadioGroup, Label } from '@tarojs/components'
import './index.scss'

export default class PageRadio extends Component {
  state = {
    list: [
      {
        value: '美国',
        text: '美国',
        checked: false
      },
      {
        value: '中国',
        text: '中国',
        checked: true
      },
      {
        value: '巴西',
        text: '巴西',
        checked: false
      },
      {
        value: '日本',
        text: '日本',
        checked: false
      },
      {
        value: '英国',
        text: '英国',
        checked: false
      },
      {
        value: '法国',
        text: '法国',
        checked: false
      }
    ]
  }
  render() {
    return (
      <View className='container'>
        <View className='page-body'>
          <View className='page-section'>
            <Text>默认样式</Text>
            <Radio value='选中' checked>选中</Radio>
            <Radio style='margin-left: 20rpx' value='未选中'>未选中</Radio>
            <radio>hahah</radio>
          </View>
          <View className='page-section'>
            <Text>推荐展示样式</Text>
            <View className='radio-list'>
              <RadioGroup>
                {this.state.list.map((item, i) => {
                  return (
                    // <Label className='radio-list__label' for={i} key={i}>
                    <Radio className='radio-list__radio' value={item.value} checked={item.checked}>{item.text}</Radio>
                    // </Label>
                  )
                })}
              </RadioGroup>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
