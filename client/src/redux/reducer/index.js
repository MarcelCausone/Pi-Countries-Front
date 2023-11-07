import {
  GET_COUNTRIES,
  GET_BY_NAME,
  GET_BY_ID,
  CREATE_ACTIVITY,
  FILTER,
  RESET,
  SORT,
  ADD_ACTIVITY_TO_COUNTRY,
  FILTER_BY_ACTIVITY,
  GET_ACTIVITIES,
} from "../actions";

let initialState = {
  allCountries: [],
  allCountriesCopy: [],
  allCountriesDetail: {},
  activities: [],
  countriesActivities: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        allCountriesCopy: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case GET_BY_NAME:
      return {
        ...state,
        allCountries: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        allCountriesDetail: action.payload[0],
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        allCountriesDetail: {},
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case ADD_ACTIVITY_TO_COUNTRY: // agregar actividad a un país
      const { countryId, activity } = action.payload;

      return {
        ...state,
        countriesActivities: {
          ...state.countriesActivities,
          [countryId]: [
            ...(state.countriesActivities[countryId] || []),
            activity,
          ],
        },
      };

    case FILTER_BY_ACTIVITY: //  filtrar por actividad
      const selectedActivity = action.payload;
      const filteredCountries = state.allCountries.filter((country) =>
        state.countriesActivities[country.ID]?.includes(selectedActivity)
      );

      return {
        ...state,
        allCountries: filteredCountries,
      };

    case FILTER:
      return {
        ...state,
        allCountries: state.allCountries.filter(
          (country) => country.continent === action.payload
        ),
      };

    case RESET:
      return {
        ...state,
        allCountries: state.allCountriesCopy,
      };
    case SORT:
      const sortedCountries = [...state.allCountries]; // Copia de la matriz de países
      const { order, field } = action.payload;
      if (field === "name") {
        if (order === "Ascendente") {
          sortedCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else {
          sortedCountries.sort((a, b) => (b.name > a.name ? 1 : -1));
        }
      } else if (field === "population") {
        if (order === "Ascendente") {
          sortedCountries.sort((a, b) => a.population - b.population);
        } else {
          sortedCountries.sort((a, b) => b.population - a.population);
        }
      }

      return {
        ...state,
        allCountries: sortedCountries,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
