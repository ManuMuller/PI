require('dotenv').config();
const { API_KEY, API_KEY2 } = process.env;
const axios = require('axios')
const { Recipe, TypeDiet } = require('../db')
const { Op } = require('sequelize')


const getApiInfo = async () => {
    try {
        const info = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`)).data.results
        const getApiInfo = await info.map(receta => {
            return {
                id: receta.id,
                name: receta.title,
                image: receta.image,
                dishTypes: receta.dishTypes,
                diets: receta.diets,
                healthScore: receta.healthScore,
                steps: info.analyzedInstructions
            }
        })
        return getApiInfo
    } catch (error) {
        console.log('Error Api', error.message)
    }
}


const getDbInfo = async (name) => {

    return await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    // const recipesData = await Recipe.findAll({
    //     attributes: ['id', 'name', 'img', 'healthScore', 'description'],
    //     where: {
    //         name: {
    //             [Op.like]: `%${name}%`
    //         }
    //     },
    //     include: {
    //         model: TypeDiet,
    //         attributes: ['name'],
    //         through: {
    //             attributes: []
    //         }
    //     }
    // })
    // console.log(recipesData)
    // const recipes = await recipesData.map(receta => (
    //     {
    //         id: receta.id,
    //         name: receta.name,
    //         img: receta.img,
    //         score: receta.healthScore,
    //         diets: receta.TypeDiet.map(diet => diet.name)
    //     }
    // ));
    // console.log(recipes)
    // return recipes;
}

const getAll = async () => {
    const apiInfo = await getApiInfo()
    console.log(getApiInfo)
    const dbInfo = await getDbInfo()
    console.log(getDbInfo)
    const infoTotal = apiInfo ? apiInfo.concat(dbInfo) : dbInfo
    return infoTotal
}

const getRecipe = async (id) => {
    try {
        const info = await Recipe.findByPk(id, {
            include: {
                model: TypeDiet,
                through: { attributes: [] },
                attributes: ["name"],
            }
        })
        return info
    } catch (error) {
        console.log('error db id', error);
    }
    id = parseInt(id)
    try {
        const recetaAPI = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`)
        return {
            id: recetaAPI.data.id,
            name: recetaAPI.data.title,
            img: recetaAPI.data.image,
            diets: recetaAPI.data.diets,
            description: recetaAPI.data.summary,
            healthScore: recetaAPI.data.healthScore,
            StepByStep: recetaAPI.data.analyzedInstructions[0] ? recetaAPI.data.analyzedInstructions[0].steps.map(el => el.step) : ['No se encontro un paso a paso']
        }
    } catch (e) {
        console.log(e)
        return e.message
    }
}


const addDietas = async () => {
    const TypesOfDiets = [
        { nombre: 'vegetarian' },
        { nombre: 'lacto vegetarian' },
        { nombre: 'ovo vegetarian' },
        { nombre: 'vegan' },
        { nombre: 'pescetarian' },
        { nombre: 'paleolithic' },
        { nombre: 'dairy free' },
        { nombre: 'primal' },
        { nombre: 'whole30' },
        { nombre: 'gluten free' },
        { nombre: 'lacto ovo vegetarian' }
    ]

    try {
        const listaDietas = await TypeDiet.bulkCreate(TypesOfDiets, { returning: true });
        console.log(listaDietas)
        return listaDietas;
    } catch (error) {
        console.log(error)
    }
}

const getDietas = async () => {
    try {
        let dietasList = await TypeDiet.findAll();

        if (dietasList.length === 0) {
            dietasList = await addDietas();
        }
        return dietasList;

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getAll,
    getRecipe,
    getDbInfo,
    addDietas,
    getDietas
}