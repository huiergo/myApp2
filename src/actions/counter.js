export const add = () => {
  return {
    type: 'add',
  };
};

export const asyncDec = (timeout) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'MINUS' });
    }, timeout);
  };
};
