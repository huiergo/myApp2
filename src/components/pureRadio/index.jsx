import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './index.css'

export default class AtRadio extends Component {

  handleClick(option, event) {
    this.props.onClick(option.value, event)
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
          >{option.label}</View>
        ))}
      </View>
    )
  }
}

// AtRadio.defaultProps = {
//   customStyle: '',
//   className: '',
//   value: '',
//   options: [],
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   onClick: (): void => { }
// }

// AtRadio.propTypes = {
//   customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
//   value: PropTypes.string,
//   options: PropTypes.array,
//   onClick: PropTypes.func
// }





// import { Component } from 'react'
// import { View, Text, Radio, RadioGroup, Label } from '@tarojs/components'
// import { AtButton, AtRadio, } from 'taro-ui'
// import { AtFloatLayout } from "taro-ui"
// import XRadio from '../customRadio/index'

// import './index.scss'


// export default class Index extends Component {
//   constructor() {
//     super(...arguments)
//     this.state = {
//       value: ''
//     }
//   }
//   handleChange(value) {
//     this.setState({
//       value
//     })
//   }
//   render() {
//     return (
//       <AtRadio
//         options={[
//           { label: '单选项一', value: 'option1' },
//           { label: '单选项二', value: 'option2' },
//           { label: '单选项三禁用', value: 'option3' }
//         ]}
//         value={this.state.value}
//         onClick={this.handleChange.bind(this)}
//       />
//       // <View>

//       //   <XRadio />
//       //   <XRadio />
//       //   <XRadio />
//       // </View>

//     )
//   }
// }

// export default class PageRadio extends Component {
//   state = {

//     radioOptions: [
//       { label: '单选项一', value: 'option1', desc: '单选项描述' },
//       { label: '单选项二', value: 'option2' },
//       { label: '单选项三禁用', value: 'option3', desc: '单选项描述', disabled: true }
//     ],
//     radioValue: 'option1',
//   }


//   handleRadioChange(value) {
//     this.setState({
//       radioValue: value
//     })
//   }
//   render() {
//     return (
//       <View className='container'>
//         {/* Radio */}
//         <View className='panel'>
//           <View className='panel__title'>Radio 单选框</View>
//           <View className='panel__content no-padding'>
//             <View className='radio-container'>
//               <AtRadio options={this.state.radioOptions} value={this.state.radioValue} onClick={this.handleRadioChange.bind(this)} />
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   }
// }

// export default class Index extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isOpened: false
//     }
//   }
//   componentWillMount() { }

//   componentDidMount() { }

//   componentWillUnmount() { }

//   componentDidShow() { }

//   componentDidHide() { }
//   handleOpen() {
//     this.setState({
//       isOpened: true
//     })
//   }

//   handleClose() {
//     console.log('close..')
//   }
//   render() {
//     const { isOpened } = this.state
//     return (
//       <View className='index'>
//         <View onClick={() => this.handleOpen()}>点击</View>
//         <AtFloatLayout isOpened title="这是个标题" onClose={() => this.handleClose()}>
//           这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
//           随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
//         </AtFloatLayout>

//       </View>
//     )
//   }
// }



// import React, { Component } from "react";
// import Taro from '@tarojs/taro';
// import { View, Image, Button } from '@tarojs/components';
// import './index.css'

// class Radio extends Component {
//   constructor() {
//     super(...arguments)
//     this.state = {
//       flag: true
//     }
//   }

//   triggerFLag() {
//     let flag = this.state.flag
//     this.setState({
//       flag: !flag
//     })
//   }

//   render() {
//     const { flag } = this.state
//     return (
//       <View className='index' class={flag ? 'selected' : 'normal'} onClick={() => this.triggerFLag()}>
//         单项选择
//       </View>
//     )
//   }
// }

// export default Radio
