const searchState = {
  recordList: ['react', 'Vue', 'js'],
  isEdit: false,
  searchValue: '',
  list: [],
};

export default function search(preState = searchState, action) {
  switch (action.type) {
    case 'updateRecordList':
      return {
        ...preState,
        recordList: action.recordList,
        isEdit: false,
      };
    case 'edit':
      return {
        ...preState,
        isEdit: true,
      };
    case 'complete':
      return {
        ...preState,
        isEdit: false,
      };

    case 'deleteAll':
      return {
        ...preState,
        isEdit: false,
        recordList: [],
      };

    case 'quitEdit':
      return {
        ...preState,
        isEdit: false,
      };
    // todo
    case 'searchItem':
      return {
        ...preState,
        isEdit: false,
        searchValue: action.searchValue,
        list: action.list,
      };
    case 'deleItem':
      return {
        ...preState,
        recordList: action.recordList,
      };

    default:
      return {
        ...preState,
      };
  }
}
