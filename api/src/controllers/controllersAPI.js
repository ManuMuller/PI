const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, TypeDiet } = require('../db');

const todasLasRecetasAPI = async () => {
    try {
        const recetas = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        recetas = recetas.data.results.map(receta => (
            {
                id: receta.id,
                name: receta.title,
                img: receta.image,
                score: receta.healthScore,
                diets: receta.diets,
            }
        ));
        return recetas;
    } catch (error) {
        throw new Error("No existe la receta API", error);
    }
}

const recetasPorNameAPI = async (name) => {
    try {
        let recetas = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        recetas = recetas.data.results.map(receta => (
            {
                id: receta.id,
                name: receta.title,
                img: receta.image,
                score: receta.healthScore,
                diets: receta.diets,
            }
        ))

        //let recetas = await todasLasRecetasAPI()
        //recetas = recetas.filter(receta => receta.name.toLowerCase().includes(name.toLowerCase()))

        return recetas;
    } catch (error) {
        throw new Error("No existe la receta API", error);
    }
}

const recetasPorIDAPI = async (id) => {
    try {
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);

        return {
            id: data.id,
            name: data.title,
            img: data.image,
            score: data.healthScore,
            diets: data.diets,
            description: data.summary,

        };
    } catch (error) {
        throw new Error("No existe la receta API", error);
    }
}




