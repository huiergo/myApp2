import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './index.css'

export default class AtRadio extends Component {

  handleClick(option, index) {
    this.props.onClick(option.id, index)
  }

  render() {
    const { customStyle, className, options, id } = this.props

    return (
      <View className={classNames('at-radio', className)} style={customStyle}>
        {options.map((option, index) => (
          <View
            key={option.id}
            className={classNames({ 'at-radio__title': true, 'at-radio__title--checked': id === option.id })}
            onClick={() => this.handleClick(option, index)}
          >{option.name}</View>
        ))}
      </View>
    )
  }
}
