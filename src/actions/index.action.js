// changeMenu(cata) {
//     dispatch(changeMenu(cata))
//   },
//   tabShow(params) {
//     dispatch(tabShow(params))
//   },
//   resetTags() {
//     dispatch(resetTags())
//   }

import { createAction } from 'redux-actions';

/**
 * 切换菜单
 */
export const changeMenu = createAction('change menu');
/**
 * 当前tab
 */
export const tabShow = createAction('tab show');

/**
 * 重置tags
 */
export const resetTags = createAction('reset tags');
