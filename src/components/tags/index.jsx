import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'

export default class Tags extends Component {
  state = {
    list: [
      {
        specialStatus: 0,
        special: false,
        name: '美国',
        active: false
      },
      {
        specialStatus: 0,
        special: true,
        name: '中国',
        active: false
      },
      {
        specialStatus: 0,
        special: false,
        name: '巴西',
        active: false
      },
      {
        specialStatus: 0,
        special: false,
        name: '日本',
        active: false
      },
      {
        specialStatus: 0,
        special: false,
        name: '英国',
        active: false
      },
      {
        specialStatus: 0,
        special: false,
        name: '法国',
        active: false
      }
    ]
  }
  onClick(item, index) {
    let { list } = this.state
    list.map((item, i) => {
      if (!item.special) {
        i == index ? list[i].active = true : list[i].active = false
      } else {
        i == index ? list[i].active = true : list[i].active = false
        list[index].specialStatus == 0 ? list[index].specialStatus = 1 : list[index].specialStatus = 0
      }

    })
    console.log(list)
    this.setState({
      list
    })
  }
  render() {
    return (
      <View className='container'>
        {
          this.state.list.map((item, index) => {
            return (
              <AtTag
                key={index}
                name='tag-1'
                type='primary'
                circle={false}
                active={item.active}
                onClick={() => { this.onClick(item, index) }}
              >
                {item.special ? item.specialStatus : ''}
                {item.name}
              </AtTag>
            )
          })
        }
      </View>
    )
  }
}
