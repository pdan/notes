import { combineReducers } from 'redux';
import reducerNotes from './reducer_notes';
import reducerCategories from './reducer_categories';


const rootReducer = combineReducers({
  notesList: reducerNotes,
  noteCategories: reducerCategories
});

export default rootReducer;
