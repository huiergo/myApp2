import React, { Component } from 'react';
import Taro, { createSelectorQuery, getSystemInfoSync } from '@tarojs/taro';
import { View, ScrollView, Block } from '@tarojs/components';
import PropTypes from 'prop-types';
import { throttle, isH5 } from './common/utils';

export default class VirtialList extends Component {
    constructor(props) {
        super(props);
        this.pageHeightArr = []; // 用来装每一屏的高度
        this.initList = []; // 承载初始化的二维数组
        this.windowHeight = 0; // 当前屏幕的高度
        this.currentPage = Taro.getCurrentInstance();
        this.getSystemInformation = () => {
            try {
                const res = getSystemInfoSync();
                this.windowHeight = res.windowHeight;
            }
            catch (err) {
                console.error(`获取系统信息失败：${err}`);
            }
        };
        /**
         * 列表数据渲染完成
         */
        this.handleComplete = () => {
            const { onComplete } = this.props;
            this.setState({
                isComplete: true,
            }, () => {
                onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            });
        };
        this.renderNext = () => {
            var _a, _b;
            const { onBottom, listType, scrollViewProps, list } = this.props;
            if (listType === "single") {
                const page_index = this.state.wholePageIndex + 1;
                if (!((_a = this.initList[page_index]) === null || _a === void 0 ? void 0 : _a.length)) {
                    this.handleComplete();
                    return;
                }
                onBottom === null || onBottom === void 0 ? void 0 : onBottom();
                this.setState({
                    wholePageIndex: page_index,
                }, () => {
                    const { wholePageIndex, twoList } = this.state;
                    twoList[wholePageIndex] = this.initList[wholePageIndex];
                    this.setState({
                        twoList: [...twoList],
                    }, () => {
                        Taro.nextTick(() => {
                            this.setHeight(list);
                        });
                    });
                });
            }
            else if (listType === "multi") {
                (_b = scrollViewProps === null || scrollViewProps === void 0 ? void 0 : scrollViewProps.onScrollToLower) === null || _b === void 0 ? void 0 : _b.call(scrollViewProps);
            }
        };
        this.webObserve = () => {
            const { listId } = this.props;
            const $targets = document.querySelectorAll(`#${listId} .zt-main-list>taro-view-core`);
            const options = {
                root: document.querySelector(`#${listId}`),
                rootMargin: "500px 0px",
            };
            this.observer = new IntersectionObserver(this.observerCallBack, options);
            $targets.forEach($item => {
                var _a;
                (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observe($item);
            });
        };
        this.observerCallBack = (entries) => {
            const { twoList } = this.state;
            entries.forEach((item) => {
                const screenIndex = item.target['data-index'];
                if (item.isIntersecting) {
                    // 如果有相交区域，则将对应的维度进行赋值
                    twoList[screenIndex] = this.initList[screenIndex];
                    this.setState({
                        twoList: [...twoList],
                    });
                }
                else {
                    // 当没有与当前视口有相交区域，则将改屏的数据置为该屏的高度占位
                    twoList[screenIndex] = { height: this.pageHeightArr[screenIndex] };
                    this.setState({
                        twoList: [...twoList],
                    });
                }
            });
        };
        /**
         * 监听可视区域
         */
        this.handleObserve = () => {
            if (isH5) {
                this.webObserve();
            }
            else {
                this.miniObserve();
            }
        };
        /**
         * 小程序平台监听
         */
        this.miniObserve = () => {
            var _a;
            const { wholePageIndex } = this.state;
            const { scrollViewProps, listId, screenNum } = this.props;
            // 以传入的scrollView的高度为相交区域的参考边界，若没传，则默认使用屏幕高度
            const scrollHeight = ((_a = scrollViewProps === null || scrollViewProps === void 0 ? void 0 : scrollViewProps.style) === null || _a === void 0 ? void 0 : _a.height) || this.windowHeight;
            const observer = Taro.createIntersectionObserver(this.currentPage.page).relativeToViewport({
                top: screenNum * scrollHeight,
                bottom: screenNum * scrollHeight,
            });
            observer.observe(`#${listId} .wrap_${wholePageIndex}`, (res) => {
                var _a;
                const { twoList } = this.state;
                if ((res === null || res === void 0 ? void 0 : res.intersectionRatio) <= 0) {
                    // 当没有与当前视口有相交区域，则将改屏的数据置为该屏的高度占位
                    twoList[wholePageIndex] = { height: this.pageHeightArr[wholePageIndex] };
                    this.setState({
                        twoList: [...twoList],
                    });
                }
                else if (!((_a = twoList[wholePageIndex]) === null || _a === void 0 ? void 0 : _a.length)) {
                    // 如果有相交区域，则将对应的维度进行赋值
                    twoList[wholePageIndex] = this.initList[wholePageIndex];
                    this.setState({
                        twoList: [...twoList],
                    });
                }
            });
        };
        this.handleScroll = throttle((event) => {
            var _a, _b, _c, _d;
            const { listId } = this.props;
            (_b = (_a = this.props).onGetScrollData) === null || _b === void 0 ? void 0 : _b.call(_a, {
                [`${listId}`]: event,
            });
            (_d = (_c = this.props.scrollViewProps) === null || _c === void 0 ? void 0 : _c.onScroll) === null || _d === void 0 ? void 0 : _d.call(_c, event);
        }, 300, 300);
        this.state = {
            wholePageIndex: 0,
            twoList: [],
            isComplete: false,
            innerScrollTop: 0,
        };
    }
    componentDidMount() {
        const { list, listType } = this.props;
        this.getSystemInformation();
        if (listType === "single") {
            this.formatList(list);
        }
        else if (listType === "multi") {
            this.formatMultiList(list);
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a;
        const { list, listType,resetTwoList } = this.props;
        console.log('resetTwoList====',resetTwoList)
        if (listType === "single") {
            // 提前把innerScrollTop置为不是0，防止列表置顶失效
            this.setState({
                innerScrollTop: 1,
            });
            if (JSON.stringify(nextProps.list) !== JSON.stringify(list)) {
                this.pageHeightArr = [];
                this.setState({
                    wholePageIndex: 0,
                    isComplete: false,
                    twoList: [],
                    innerScrollTop: 0,
                }, () => {
                    var _a;
                    if ((_a = nextProps.list) === null || _a === void 0 ? void 0 : _a.length) {
                        this.formatList(nextProps.list);
                    }
                    else {
                        this.handleComplete();
                    }
                });
            }
        }
        else if (listType === "multi") {
            if(resetTwoList){
                    this.pageHeightArr = [];
                    this.setState({
                        wholePageIndex: 0,
                        isComplete: false,
                        twoList: [],
                        innerScrollTop: 0,
                    }, () => {
                        setTimeout(() => {
                            if (JSON.stringify(nextProps.list) !== JSON.stringify(list)) {
                                this.formatMultiList(nextProps.list, nextProps.pageNum);
                            }
                        }, 50);
                        
                    });
            }else{
                if (JSON.stringify(nextProps.list) !== JSON.stringify(list)) {
                    this.formatMultiList(nextProps.list, nextProps.pageNum);
                }
            }
           
        }
        if (!((_a = nextProps.list) === null || _a === void 0 ? void 0 : _a.length)) {
            // list为空
            this.handleComplete();
        }
    }
    /**
     * 当list是通过服务端分页获取的时候，对list进行处理
     * @param	list 外部list
     * @param	pageNum 当前页码
     */
    formatMultiList(list = [], pageNum = 1) {
        const { twoList } = this.state;
        if (!(list === null || list === void 0 ? void 0 : list.length))
            return;
        this.segmentList(list);
        twoList[pageNum - 1] = this.initList[pageNum - 1];
        this.setState({
            twoList: [...twoList],
            wholePageIndex: pageNum - 1,
        }, () => {
            Taro.nextTick(() => {
                this.setHeight(list);
            });
        });
    }
    /**
     * 按规则分割list，存在私有变量initList，备用
     */
    segmentList(list = []) {
        const { segmentNum } = this.props;
        let arr = [];
        const _list = [];
        list.forEach((item, index) => {
            arr.push(item);
            if ((index + 1) % segmentNum === 0) {
                _list.push(arr);
                arr = [];
            }
        });
        // 将分段不足segmentNum的剩余数据装入_list
        const restList = list.slice(_list.length * segmentNum);
        if (restList === null || restList === void 0 ? void 0 : restList.length) {
            _list.push(restList);
            if (_list.length <= 1) {
                // 如果数据量少，不足一个segmentNum，则触发完成回调
                this.handleComplete();
            }
        }
        this.initList = _list;
    }
    /**
     * 将列表格式化为二维
     * @param	list 	列表
     */
    formatList(list = []) {
        this.segmentList(list);
        this.setState({
            twoList: this.initList.slice(0, 1),
        }, () => {
            Taro.nextTick(() => {
                this.setHeight(list);
            });
        });
    }
    /**
     * 设置每一个维度的数据渲染完成之后所占的高度
     */
    setHeight(list = []) {
        const { wholePageIndex } = this.state;
        const { listId } = this.props;
        const query = createSelectorQuery();
        query.select(`#${listId} .wrap_${wholePageIndex}`).boundingClientRect();
        query.exec((res) => {
            var _a;
            // 有数据的时候才去收集高度，不然页面初始化渲染（在H5中无数据）收集到的高度是错误的
            if (list === null || list === void 0 ? void 0 : list.length) {
                this.pageHeightArr.push((_a = res === null || res === void 0 ? void 0 : res[0]) === null || _a === void 0 ? void 0 : _a.height);
            }
        });
        this.handleObserve();
    }
    render() {
        const { twoList, isComplete, innerScrollTop, } = this.state;
        const { segmentNum, scrollViewProps, onRenderTop, onRenderBottom, onRender, onRenderLoad, listId, className, autoScrollTop, } = this.props;
        const scrollStyle = {
            height: '100%',
        };
        const _scrollViewProps = Object.assign(Object.assign({}, scrollViewProps), { scrollTop: autoScrollTop ? (innerScrollTop === 0 ? 0 : "") : scrollViewProps === null || scrollViewProps === void 0 ? void 0 : scrollViewProps.scrollTop });
        return (React.createElement(ScrollView, Object.assign({ scrollY: true, id: listId, style: scrollStyle, onScrollToLower: this.renderNext, lowerThreshold: 250, className: `zt-virtual-list-container ${className}` }, _scrollViewProps, { onScroll: this.handleScroll }), onRenderTop === null || onRenderTop === void 0 ? void 0 :
            onRenderTop(),
            React.createElement(View, { className: "zt-main-list" }, twoList === null || twoList === void 0 ? void 0 : twoList.map((item, pageIndex) => {
                return (React.createElement(View, { key: pageIndex, "data-index": pageIndex, className: `zt-wrap-item wrap_${pageIndex}` }, (item === null || item === void 0 ? void 0 : item.length) > 0 ? (React.createElement(Block, null, item.map((el, index) => {
                    return onRender === null || onRender === void 0 ? void 0 : onRender(el, (pageIndex * segmentNum + index), pageIndex);
                }))) : (React.createElement(View, { style: { 'height': `${item === null || item === void 0 ? void 0 : item.height}px` } }))));
            })),
            (onRenderLoad === null || onRenderLoad === void 0 ? void 0 : onRenderLoad()) && (React.createElement(View, { className: "zt-loading-text" }, onRenderLoad())),
            isComplete && (onRenderBottom === null || onRenderBottom === void 0 ? void 0 : onRenderBottom())));
    }
}
VirtialList.defaultProps = {
    list: [],
    pageNum: 1,
    listId: "zt-virtial-list",
    listType: 'single',
    segmentNum: 10,
    screenNum: 2,
    scrollViewProps: {},
    className: "",
    autoScrollTop: true,
    onRender: function render() {
        return (React.createElement(View, null));
    },
};
VirtialList.propTypes = {
    list: PropTypes.array.isRequired,
    listId: PropTypes.string,
    listType: PropTypes.string,
    segmentNum: PropTypes.number,
    screenNum: PropTypes.number,
    autoScrollTop: PropTypes.bool,
    scrollViewProps: PropTypes.object,
    onRender: PropTypes.func.isRequired,
    onBottom: PropTypes.func,
    onComplete: PropTypes.func,
    onRenderTop: PropTypes.func,
    onRenderBottom: PropTypes.func,
    onGetScrollData: PropTypes.func,
};
//# sourceMappingURL=index.js.map