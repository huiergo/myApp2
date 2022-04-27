import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { AtCheckbox, AtTextarea, AtButton, AtFloatLayout } from 'taro-ui'
import { getJSON, postJSON } from "../../services/method";
import apis from '../../services/apis'

import './index.scss'

class SubAboutUs extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            checkedList: [],
            value: '',
            isOpened: false
        }
        this.checkboxOption = [{
            value: 1,
            label: '知识点不准确'
        }, {
            value: 2,
            label: '内容不准或错误'
        }, {
            value: 3,
            label: '题目重复'
        }, {
            value: 4,
            label: '其他'
        }]
    }
    questionId = ''
    async onLoad(options) {
        const { id } = options
        this.questionId = id
    }

    handleCheckChange(value) {
        this.setState({
            checkedList: value
        })
    }

    handleTextChange(value) {
        this.setState({
            value
        })
    }

    async submitRequest({ questionId, type, feedbackInfo }) {
        let result = await postJSON({ url: apis.submitFeed, data: { questionId, type, feedbackInfo } });
        console.log('[result---]', result, type)
        return result
    }


    async submitFeed() {
        const { checkedList, value } = this.state
        if (checkedList && checkedList.length > 0) {
            // 提交
            let result = await this.submitRequest({ questionId: this.questionId, type: checkedList, feedbackInfo: value })
            result && this.setState({
                isOpened: true
            })

        } else {
            // 弹窗说请填写
            Taro.showToast({
                title: '请选择反馈类别',
                duration: 1000
            })
        }
    }

    handleClose() {
        this.setState({
            isOpened: false
        })
    }

    back() {
        this.handleClose()
        Taro.navigateBack()
    }
    render() {
        const { isOpened } = this.state
        return (
            <View className='feed-box'>
                <View className='feed-card feed-card-first'>
                    <View className='feed-title'><span className='feed-span-warn'>*</span>错误类型（可多选)</View>
                    <AtCheckbox
                        options={this.checkboxOption}
                        selectedList={this.state.checkedList}
                        onChange={this.handleCheckChange.bind(this)}
                    />
                </View>
                <View className='feed-card'>
                    <View className='feed-title'>问题描述（可选填）</View>
                    <AtTextarea
                        className='feed-textarea'
                        value={this.state.value}
                        onChange={this.handleTextChange.bind(this)}
                        maxLength={200}
                        placeholder='你的问题是...'
                    />
                </View>
                <View className='feed-btn-wrap'>
                    <AtButton className='feed-btn' type='primary' onClick={() => this.submitFeed()}>提交反馈</AtButton>
                </View>
                <AtFloatLayout className='feed-layout' isOpened={isOpened} onClose={this.handleClose.bind(this)}>
                    <View className='feed-layout-title'>提交反馈</View>
                    <View className='feed-modal'>
                        <Image className='feed-check-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/feedback/success-icon.png' />
                        <View className='feed-modal-title'>提交成功，感谢您的反馈</View>
                        <View className='feed-modal-desc'>工作人员将在5-7个工作日内解决您的问题</View>
                        <View className='feed-modal-footer' onClick={() => this.back()}>
                            <Image className='feed-modal-btn-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/feedback/success-btn.png' />
                        </View>
                    </View>
                    {/* <View className='fail-modal'>
                        <Image className='check-icon' src='http://teachoss.itheima.net/heimaQuestionMiniapp/assets/other_icons/about_us_img.png' />
                        <View>提交成功，感谢您的反馈</View>
                        <View>工作人员将在5-7个工作日内解决您的问题</View>
                    </View> */}

                </AtFloatLayout>
            </View>
        )
    }
}

export default SubAboutUs
