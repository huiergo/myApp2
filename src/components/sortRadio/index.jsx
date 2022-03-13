import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './index.css'

import SortItem from './sortItem/index'

export default class AtRadio extends Component {

  handleClick(option, event) {
    this.props.onClick(option.value, event)
  }

  onStatus(v) {
    this.props.onStatus(v)
  }

  render() {
    const { customStyle, className, options, value } = this.props

    return (
      <View className={classNames('at-radio', className)} style={customStyle}>
        {options.map(option => (
          <View
            key={option.value}
            className={classNames({ 'at-radio__title': true, 'at-radio__title--checked': value === option.value })}
            onClick={this.handleClick.bind(this, option)}
          >
            <SortItem label={option.label} isSelf={value === option.value} onStatus={this.onStatus.bind(this)} />
          </View>
        ))}
      </View>
    )
  }
}