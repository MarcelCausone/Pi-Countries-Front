import {
  GET_COUNTRIES,
  GET_BY_NAME,
  GET_BY_ID,
  CREATE_ACTIVITY,
  FILTER,
  RESET,
  SORT,
  GET_ACTIVITIES,
  ACTIVITY_FILTER,
} from "../actions";

let initialState = {
  allCountries: [],
  allCountriesCopy: [],
  allCountriesDetail: {},
  activities: [],
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
        activities: action.payload,
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

      case FILTER:
        const filteredCountries = state.allCountriesCopy.filter(
          (country) => country.continent === action.payload
        );
      
        return {
          ...state,
          allCountries: filteredCountries,
        };

    case ACTIVITY_FILTER:
      return {
        ...state,
        allCountries: state.allCountriesCopy.filter((country) =>
          country.Activities.find(
            (activity) => activity.nombre === action.payload
          )
        ),
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

    case RESET:
      return {
        ...state,
        allCountries: state.allCountriesCopy,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
