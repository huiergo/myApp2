import { createAction } from 'redux-actions';

/**
 * 同步数据-分类
 */
export const saveCategoryToTag = createAction('first save cateList to filter tags');

/**
 * 当点击tag时， 实时更新tagList
 */
export const updateTagList = createAction('update tagList');

/**
 * 当tag变化时，同步状态到extra params
 */
export const syncExtraParams = createAction('sync extra params');

/**
 * 重置 tagList
 */
export const resetTagList = createAction('reset tagList');
