import { createAction } from 'redux-actions';

/**
 * 提交筛选结果,最终参数
 */
export const submitFilterParams = createAction('submit filter params');

/**
 * 切换筛选蒙层model 展示和隐藏
 */
export const triggerModel = createAction('trigger model');

// 以下是tab列表相关

/**
 * 切换tab
 */
export const changeTab = createAction('first change tab');
/**
 * 初始化请求列表
 */
export const initData = createAction('first init data');
/**
 * 列表加载更多
 */
export const loadMore = createAction('first load more');

/**
 * 同步数据-初始化请求列表
 */
export const saveInitData = createAction('first save init data');
/**
 * 同步数据-列表加载更多
 */
export const saveLoadMore = createAction('first save load more');

/**
 * 请求分类列表
 */
export const category = createAction('first cateList');
/**
 * 同步数据-分类
 */
export const saveCategory = createAction('first save cateList');
//
