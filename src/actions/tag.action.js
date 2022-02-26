import { createAction } from 'redux-actions';

/**
 * 当点击tag时， 实时更新tagList
 */
export const updateTagList = createAction('update tagList');

// syncExtraParams

/**
 * 当tag变化时，同步状态到extra params
 */
export const syncExtraParams = createAction('sync extra params');

/**
 * 重置 tagList
 */
export const resetTagList = createAction('reset tagList');
