import Api from "../services/api";
import { GET_ANIMES, SEARCH_ANIMES, SET_FAVORITES } from "./actionTypes";

export const getAnimes = (count, fn = () => {}) => {
  return async (dispatch) => {
    const promise = await Api.get(
      `anime?page%5Blimit%5D=10&page%5Boffset%5D=${count}`
    ).then((resp) => {
      fn(resp.data);
      return resp.data;
    });
    dispatch({
      type: GET_ANIMES,
      animes: promise.data,
      countAnime: count,
    });
  };
};

export const searchAnimes = (name, fn = () => {}) => {
  return async (dispatch) => {
    const promise = await Api.get(`anime?filter[text]=${name}`)
      .then((resp) => {
        fn(resp.data);
        return resp.data;
      })
      .catch((err) => {
        console.clear();
        fn(err.response.data);

        console.log("Erro: Anime não encontrado");
      });
    if (promise) {
      dispatch({
        type: SEARCH_ANIMES,
        search: promise.data,
      });
    }
  };
};

export const toggleFavorite = (array, fn = () => {}) => {
  return async (dispatch) => {
    dispatch({
      type: SET_FAVORITES,
      favorite: array,
    });
  };
};
