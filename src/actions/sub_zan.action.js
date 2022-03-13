import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeTab = createAction('sub_zan change tab');
/**
 * 初始化请求列表
 */
export const initData = createAction('sub_zan init data');
/**
 * 列表加载更多
 */
export const loadMore = createAction('sub_zan load more');

/**
 * 同步数据-初始化请求列表
 */
export const saveInitData = createAction('sub_zan save init data');
/**
 * 同步数据-列表加载更多
 */
export const saveLoadMore = createAction('sub_zan save load more');

/**
 * 同步数据-加载 loading
 */
export const saveLoading = createAction('sub_zan save scroll loading');
