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
    SET_MODAL
} from "../actions/index"

const initialState = {
    recipes: [],
    recipesToFilter: [],
    diets: [],
    details: [],
    modal: false
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
                details: action.payload
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
            const allRecipes = state.recipes;
            const stateFilter = action.payload === "all" ? state.recipesToFilter : allRecipes.filter(
                recipe =>
                    recipe.diets.includes(action.payload) ||
                    recipe.diets.map(r => r.name).includes(action.payload)
            )
            return {
                ...state,
                recipe: stateFilter
            }
        case ORDER_BY_NAME:
            const sortByName = action.payload === "asc"
            state.recipes.sort(function (a, b) {
                return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
            })
            state.recipes.sort(function (a, b) {
                return a.name > b.name ? -1 : b.name > a.name ? 1 : 0;
            })
            return {
                ...state,
                recipes: sortByName
            }
        case ORDER_BY_SCORE:
            const sortByScore = action.payload === "mayor"
            state.recipes.sort(function (a, b) {
                return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
            })
            state.recipes.sort(function (a, b) {
                return a.score > b.score ? 1 : b.score > a.score ? -1 : 0;
            })
            return {
                ...state,
                recipes: sortByScore
            }
        case SET_MODAL:
            return {
                ...state,
                modal: action.payload
            }

        default:
            return state;
    }
}