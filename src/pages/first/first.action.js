import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeActiveIdx = createAction('first change active index');

/**
 * 更新tabList
 */
export const updateTabList = createAction('update tab list');

/**
 *  列表请求 额外参数
 */
export const updateExtraParams = createAction('update extra params');
