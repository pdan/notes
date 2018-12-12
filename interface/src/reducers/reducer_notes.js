import { GET_NOTES_LIST, GET_NOTES_LIST_ERROR } from '../actions';


export default function (state = {}, action) {

  switch (action.type) {
    case GET_NOTES_LIST:
      return { ...state, json: action.payload };
    case GET_NOTES_LIST_ERROR:
      return { ...state, error: action.payload };
    default:
      /* code */
      break;
  }
  return state;
}
