import {
    GET_RECIPES,
    GET_RECIPES_NAME,
    GET_DIETS,
    GET_DETAILS,
    RESET_DETAILS,
    POST_RECIPE,
    FILTER_BY_DIET,
    ORDER_BY_NAME,
    ORDER_BY_SCORE,
    FILTER_CREATED
} from "../actions/index"

const initialState = {
    recipes: [],
    recipesToFilter: [],
    diets: [],
    detail: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesToFilter: action.payload
            }
        case GET_RECIPES_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case RESET_DETAILS:
            return {
                ...state,
                details: []
            }
        case POST_RECIPE:
            return {
                ...state
            }
        case FILTER_BY_DIET:
            if (action.payload === "All") state.recipes = state.recipesToFilter
            else state.recipes = state.recipesToFilter.filter(recipe => recipe.diets === action.payload)
            return {
                ...state,
                recipes: state.recipes
            }
        case ORDER_BY_NAME:
            const sortByName = action.payload === "asc" ?
                state.recipes.sort(function (a, b) {
                    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
                }) :
                state.recipes.sort(function (a, b) {
                    return a.name > b.name ? -1 : b.name > a.name ? 1 : 0;
                })
            return {
                ...state,
                recipes: sortByName
            }
        case ORDER_BY_SCORE:
            const recypesByScore = action.payload === 'mayor' ? state.recipesToFilter.sort((a, b) => {

                if ((a.healthScore - b.healthScore) < 0) return 1
                else return -1
            }) : state.recipesToFilter.sort((a, b) => {

                if ((a.healthScore - b.healthScore) < 0) return 1
                else return -1
            })
            return {
                ...state,
                recipes: recypesByScore
            }
        case FILTER_CREATED:
            if (action.payload === "api") state.recipes = state.recipes.filter(recipe => typeof recipe.id === "number")
            if (action.payload === "created") state.recipes = state.recipes.filter(recipe => typeof recipe.id === "string")
            if (action.payload === "All") state.recipes = state.recipesToFilter
            return {
                ...state,
                recipes: state.recipes
            }

        default:
            return state;
    }
}