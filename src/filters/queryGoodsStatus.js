import store from '../store/store'

export default function (type, queryType) {
  let goodsData = store.state.goodsStatus;
  let returnData = {};
  let tempItem = {};
  for (let key in goodsData) {
    if (goodsData[key].value === type) {
      tempItem = goodsData[key];
      break;
    }
  }

  if (queryType) {
    returnData = tempItem[queryType];
  } else {
    returnData = tempItem;
  }
  return returnData;
}
