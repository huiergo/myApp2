import { createAction } from 'redux-actions';

/**
 * 切换tab
 */
export const changeTab = createAction('favorite change tab');
/**
 * 初始化请求列表
 */
export const initData = createAction('favorite init data');
/**
 * 列表加载更多
 */
export const loadMore = createAction('favorite load more');

/**
 * 同步数据-初始化请求列表
 */
export const saveInitData = createAction('favorite save init data');
/**
 * 同步数据-列表加载更多
 */
export const saveLoadMore = createAction('favorite save load more');

/**
 * 同步数据-加载 loading
 */
export const saveLoading = createAction('favorite save scroll loading');
