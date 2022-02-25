import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeTab = createAction('change tab');
/**
 * 初始化请求列表
 */
export const initData = createAction('init data');
/**
 * 列表加载更多
 */
export const loadMore = createAction('load more');

/**
 * 同步数据-初始化请求列表
 */
export const saveInitData = createAction('save init data');
/**
 * 同步数据-列表加载更多
 */
export const saveLoadMore = createAction('save load more');
