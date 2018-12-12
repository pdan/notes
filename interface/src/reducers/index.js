import { combineReducers } from 'redux';
import reducerNotes from './reducer_notes';


const rootReducer = combineReducers({
  notesList: reducerNotes
});

export default rootReducer;
