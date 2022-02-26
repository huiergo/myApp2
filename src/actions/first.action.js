import { createAction } from 'redux-actions';

/**
 * 提交筛选结果,最终参数
 */
export const submitFilterParams = createAction('submit filter params');

/**
 * 切换筛选蒙层model 展示和隐藏
 */
export const triggerModel = createAction('trigger model');
