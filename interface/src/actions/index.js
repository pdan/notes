export const GET_NOTES_LIST = 'GET_NOTES_LIST';
export const GET_NOTES_LIST_ERROR = 'GET_NOTES_LIST_ERROR';

export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
export const GET_CATEGORY_LIST_ERROR = 'GET_CATEGORY_LIST_ERROR';

export async function fetchNotesList(page) {
  try {
    const response = await fetch(`/api/note/list`);
    let data = await response.json();

    return {
      type: GET_NOTES_LIST,
      payload: data
    }
  } catch (error) {
    return {
      type: GET_NOTES_LIST_ERROR,
      payload: error
    }
  }
}

export async function fetchCategories(page) {
  try {
    const response = await fetch(`/api/category/list`);
    let data = await response.json();

    return {
      type: GET_NOTES_LIST,
      payload: data
    }
  } catch (error) {
    return {
      type: GET_NOTES_LIST_ERROR,
      payload: error
    }
  }
}