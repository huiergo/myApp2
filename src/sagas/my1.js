// import { takeEvery, put } from 'redux-saga/effects';
// import { loadProducts, saveProducts } from '../actions/mine.action';

// // 加载商品列表数据
// function* handleLoadProducts() {
//   // 向服务器端发送请求 加载商品列表数据
//   const { data } = yield axios.get('http://localhost:3005/goods');
//   // 将商品列表数据保存到本地的store对象中
//   yield put(saveProducts(data));
// }

// export default function* productSaga() {
//   // 加载商品列表数据
//   yield takeEvery(loadProducts, handleLoadProducts);
// }

// // export default function* cartSaga () {
// //     // 将商品添加到购物车中
// //     yield takeEvery(addProductToCart, handleAddProductToCart);
// //     // 向服务器端发送请求 获取购物车列表数据
// //     yield takeEvery(loadCarts, handleLoadCarts);
// //     // 向服务器端发送请求 告诉服务器端我们要删除哪一个商品
// //     yield takeEvery(deleteProductFromCart, handleDeleteProductFromCart);
// //     // 向服务器端发送请求 告诉服务器端我们要将哪一个商品的数量更改成什么
// //     yield takeEvery(changeServiceProductNumber, handleChangeServiceProductNumber)
// //   }
