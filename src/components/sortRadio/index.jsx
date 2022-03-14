import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './index.css'

import SortItem from './sortItem/index'

export default class AtRadio extends Component {

  handleClick(option, event) {
    this.props.onClick(option.id, event)
  }

  onStatus(v) {
    this.props.onStatus(v)
  }

  render() {
    const { customStyle, className, options, id } = this.props

    return (
      <View className={classNames('cu-radio', className)} style={customStyle}>
        {options.map(option => (
          <View
            key={option.id}
            className={classNames({ 'cu-radio__title cu-sort-radio__title': true, 'cu-radio__title--checked  cu-sort-radio__title--checked': id === option.id })}
            onClick={this.handleClick.bind(this, option)}
          >
            <SortItem name={option.name} isSelf={id === option.id} onStatus={this.onStatus.bind(this)} />
          </View>
        ))}
      </View>
    )
  }
}