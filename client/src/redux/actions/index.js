import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = " GET_BY_ID";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER = "FILTER";
export const RESET = "RESET";
export const SORT = "SORT";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const ACTIVITY_FILTER = "ACTIVITY_FILTER";

export function getCountries() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      // Maneja el error, si es necesario
      console.error("Error al obtener los países:", error);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/activities");
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      // Maneja el error, si es necesario
      console.error("Error al obtener las actividades:", error);
    }
  };
}

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries/name?name=${name}`
      );
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      // Maneja el error, si es necesario
      console.error("Error al obtener el país:", error);
    }
  };
}

export function getCountriesByID(ID) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${ID}`);

      dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      // Maneja el error, si es necesario
      console.error("Error al obtener el país:", error);
    }
  };
}

export function cleanDetail() {
  return { type: "CLEAN_DETAIL" };
}

export function addActivity(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/activities`,
        input
      );
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      // Maneja el error, si es necesario
      console.error("Error al crear la actividad:", error);
    }
  };
}

export function filterByContinent(continent) {
  return {
    type: FILTER,
    payload: continent,
  };
}

export function filterByActivity(activity) {
  return {
    type: ACTIVITY_FILTER,
    payload: activity,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function sort(order, field) {
  return {
    type: SORT,
    payload: { order, field },
  };
}
