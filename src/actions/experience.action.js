import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeTab = createAction('experience change tab');
/**
 * 初始化请求列表
 */
export const initData = createAction('experience init data');
/**
 * 列表加载更多
 */
export const loadMore = createAction('experience load more');

/**
 * 同步数据-初始化请求列表
 */
export const saveInitData = createAction('experience save init data');
/**
 * 同步数据-列表加载更多
 */
export const saveLoadMore = createAction('experience save load more');
