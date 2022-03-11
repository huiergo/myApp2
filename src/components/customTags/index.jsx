import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import './index.scss'

class CustomTags extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  onClick(index) {
    this.props.updateTagList({ type: this.props.type, index })
  }
  render() {
    const { list, circle } = this.props
    return (
      <View className='container'>
        {
          list.map((item, index) => {
            return (
              <AtTag
                className='tag-custom'
                key={index}
                name='tag-1'
                type='primary'
                circle={circle}
                active={item.active}
                onClick={() => { this.onClick(index) }}
              >
                {item.name}
                {item.canSort ? (item.specialStatus === 0 ? <Image className='filter-sort-arrow' src={require('../../assets/other_icons/up_arrow_icon.png')} />
                  : <Image className='filter-sort-arrow' src={require('../../assets/other_icons/down_arrow_icon.png')} />) : ''}

              </AtTag>
            )
          })
        }
      </View>
    )
  }
}

export default CustomTags