import { GET_CATEGORY_LIST, GET_CATEGORY_LIST_ERROR } from '../actions';


export default function (state = {}, action) {

  switch (action.type) {
    case GET_CATEGORY_LIST:
      return { ...state, json: action.payload };
    case GET_CATEGORY_LIST_ERROR:
      return { ...state, error: action.payload };
    default:
      /* code */
      break;
  }
  return state;
}
