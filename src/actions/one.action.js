import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeTab = createAction('change tab');
/**
 * 请求题目数据
 */
export const loadTopicData = createAction('load topic');
