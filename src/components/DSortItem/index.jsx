import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View, Image } from '@tarojs/components'
import './index.css'

export default class SortItem extends Component {
  constructor(props) {
    super(props)
  }

  handleItemFlag() {
    this.props.onStatus(this.props.index)
  }


  render() {
    return (
      <View onClick={() => this.handleItemFlag()}>
        <Text >{this.props.name} </Text>
        {
          this.props.name == '默认' ? '' : (this.props.selected ? (this.props.upArrow == '0' ? <Image className='filter-sort-arrow' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/up_arrow_icon.png' /> : <Image className='filter-sort-arrow' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/down_arrow_icon.png' />) : <Image className='filter-sort-arrow' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/up_arrow_icon.png' />)
        }
      </View>
    )
  }
}