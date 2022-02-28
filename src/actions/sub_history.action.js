import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeTab = createAction('sub_history change tab');
/**
 * 初始化请求列表
 */
export const initData = createAction('sub_history init data');
/**
 * 列表加载更多
 */
export const loadMore = createAction('sub_history load more');

/**
 * 同步数据-初始化请求列表
 */
export const saveInitData = createAction('sub_history save init data');
/**
 * 同步数据-列表加载更多
 */
export const saveLoadMore = createAction('sub_history save load more');
