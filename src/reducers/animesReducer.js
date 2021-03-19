import {
  GET_ANIMES,
  SEARCH_ANIMES,
  SET_FAVORITES,
} from "../actions/actionTypes";
const initialState = {
  animes: [],
  search: [],
  favorites: [],
  countAnime: 0,
};
export const animes = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIMES:
      return {
        ...state,
        animes: [...state.animes, ...action.animes],
        countAnime: action.countAnime,
      };
    case SEARCH_ANIMES:
      return {
        ...state,
        search: action.search,
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.favorite,
      };
    default:
      return state;
  }
};

export default animes;
