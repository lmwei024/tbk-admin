import store from '../store/store'

export default function (gameType, queryType) {
  let gameData = store.state.gameType
  let returnData = {}
  let tempItem = {}
  for (let key in gameData) {
    if (gameData[key].game_type === Number(gameType)) {
      tempItem = gameData[key]
      break
    }
  }

  if (queryType) {
    returnData = tempItem[queryType]
  } else {
    returnData = tempItem
  }
  return returnData
}
