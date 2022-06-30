import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_NAME = 'GET_RECIPES_NAME';
export const GET_DIETS = 'GET_DIETS';
export const GET_DETAILS = 'GET_DETAILS';
export const RESET_DETAILS = 'RESET_DETAILS';
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const FILTER_CREATED = 'FILTER_CREATED';

export function getRecipes() {
    return dispatch => {
        axios.get('http://localhost:3001/recipes')
            .then(res => {
                dispatch({
                    type: GET_RECIPES,
                    payload: res.data
                });
            }).catch(err => console.log(err));
    }
}

export function getRecipesName(name) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/recipes?name=${name}`)
            .then(res => {
                dispatch({
                    type: GET_RECIPES_NAME,
                    payload: res.data
                });
            }).catch(err => console.log(err));
    }
}

export function getDiets() {
    return function (dispatch) {
        axios.get('http://localhost:3001/diets')
            .then(res => {
                dispatch({
                    type: GET_DIETS,
                    payload: res.data
                });
            }).catch(err => console.log(err));
    }
}

export function getDetail(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then(res => {
                dispatch({
                    type: GET_DETAILS,
                    payload: res.data
                });
            }).catch(err => console.log(err));
    }
}

export function resetDetail() {
    return {
        type: RESET_DETAILS
    }
}

export function postRecipe(recipe) {
    return async function () {
        let info = await axios.post("http://localhost:3001/createrecipe", recipe)
        return info.data
    }
}

export function filterByDiet(payload) {
    console.log(payload)
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function filterCreated(payload) {
    console.log(payload)
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}
