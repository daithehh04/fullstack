import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "../utils/localStorage";
const data = getLocalStorage("data");
let RANGE_NUMBER = getLocalStorage('RANGE_NUMBER')
if(Array.isArray(RANGE_NUMBER) && !RANGE_NUMBER.length ) {
  RANGE_NUMBER = 100
}
const MAX_TIME = Math.ceil(Math.log2(RANGE_NUMBER));
// const randomNum = Math.floor(Math.random() * getLocalStorage('RANGE_NUMBER')) + 1
export const initialState = {
  section: data.length || 0,
  maxTimes: Math.ceil(Math.log2(RANGE_NUMBER)),
  data: data || [],
  RANGE_NUMBER: RANGE_NUMBER,
  randomOfRangeNumber: Math.floor(Math.random() * RANGE_NUMBER) + 1,
  isAddTable: false,
  message: "Chào mừng bạn đến với trò chơi đoán số!",
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_FORM": {
      const newData = [...state.data];
      const timesNew = state.maxTimes - 1;
      newData[state.section] = Array.isArray(newData[state.section])
        ? [...newData[state.section]]
        : [];
      const newItem = {
        ...action.payload,
        time: newData[state.section].length + 1,
        right: action.payload.number === state.randomOfRangeNumber ? true : undefined,
        message: undefined,
      };
      newData[state.section].push(newItem);
      if (
        action.payload.number === state.randomOfRangeNumber ||
        timesNew === 0
      ) {
        setLocalStorage("data", newData);
      }
      return {
        ...state,
        data: newData,
        maxTimes: timesNew,
        message: action.payload.message,
        isAddTable:
          action.payload.number === state.randomOfRangeNumber || timesNew === 0
            ? true
            : false,
      };
    }
    case "SET_NUMBER": {
      setLocalStorage("RANGE_NUMBER", action.payload);
      const MAX_TIME = Math.ceil(Math.log2(action.payload));
      return {
        ...state,
        numberRandom: action.payload,
        maxTimes: MAX_TIME
      }
    }
    case "PLAY_AGAIN_FORM": {
      
      return {
        ...state,
        maxTimes: action.payload,
        section: data.length > 0 ? state.turn + 1 : 0,
        message: "Chào mừng bạn đến với trò chơi đoán số!",
        isAddTable: false,
      };
    }
    case "REMOVE_TABLE": {
      clearLocalStorage("data");
      return {
        ...state,
        data: [],
        maxTimes: MAX_TIME,
        section: 0,
      };
    }

    default: {
      return state;
    }
  }
};