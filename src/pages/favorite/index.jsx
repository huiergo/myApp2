import React, { useEffect } from 'react';
import Taro from '@tarojs/taro'

function Favorite() {
  useEffect(() => {
    console.log("Experience挂载了", Taro.getCurrentInstance().router.path)

  }, [])
  return (
    <div>
      Favorite
    </div>
  );
}

export default Favorite;
