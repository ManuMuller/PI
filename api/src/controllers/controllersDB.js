const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');


const todasLasRecetasDB = async () => {
    try {
        const recipesData = Recipe.findAll({
            attributes: ['id', 'name', 'img', 'healthScore'],
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        const recipes = recipesData.map(receta => (
            {
                id: receta.id,
                name: receta.name,
                img: receta.img,
                score: receta.healthScore,
                diets: receta.TypeDiet.map(diet => diet.name)
            }
        ));
        return recipes;
    } catch (error) {
        throw new Error("No existe la receta :( DB");
    }
}


const recetasPorNameDB = async (name) => {
    try {
        const recipesData = Recipe.findAll({
            attributes: ['id', 'name', 'img', 'healthScore'],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: {
                model: TypeDiet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        const recipes = recipesData.map(receta => (
            {
                id: receta.id,
                name: receta.name,
                img: receta.img,
                score: receta.healthScore,
                diets: receta.TypeDiet.map(diet => diet.name)
            }
        ));
        return recipes;
    } catch (error) {
        throw new Error("No existe la receta :c DB");
    }
}


const recetasPorIDDB = async (id) => {
    try {
        const recipeData = await Recipe.findByPk(
            id,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'isDB']
                },
                include: {
                    model: Dieet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            }
        );
        const recipe = {
            id: recipeData.id,
            name: recipeData.name,
            img: recipeData.img,
            description: recipeData.description,
            healthScore: recipeData.healthScore,
            stepByStep: recipeData.stepByStep,
            diets: recipeData.TypeDiet.map(diet => diet.name),
        }
        return recipe;
    } catch (error) {
        throw new Error("No existe la receta con ese ID :c DB");
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
        const listaDietas = await Diet.bulkCreate(TypesOfDiets, { returning: true });
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


const addRecetas = async (recetas) => {
    const { diets: dietas, ...resto } = recetas;

    try {
        const newRecipe = await Recipe.create({ ...resto });
        await newRecipe.addDietas(dietas);
        return newRecipe;
    } catch (error) {
        console.log(error)
    }
}

