import { createAction } from 'redux-actions';

/**
 * 点击”搜索按钮“后，或者选中”某个记录“后，升序搜索记录列表
 */
export const unShiftRecord = createAction('unShift to recordList');
/**
 * 点击”全部删除“，清空记录列表
 */
export const clearAllRecordList = createAction('clear all recordList');
/**
 * 点击搜索按钮后，更新搜索记录列表
 */
export const deleteRecordByIndex = createAction('delete record by index');

/**
 * 编辑切换,传递true/false ,刷新状态
 */
export const editTrigger = createAction('edit trigger');

/**
 *  搜索结果列表-初始化请求
 */
export const initSearchData = createAction('init search data');
/**
 *  搜索结果列表-加载更多
 */
export const loadSearchMore = createAction('load search more');

/**
 *  同步-搜索结果列表-初始化请求
 */
export const saveInitSearchData = createAction('save init search data');
/**
 *  同步-搜索结果列表-加载更多
 */
export const saveLoadSearchMore = createAction('save load search more');
