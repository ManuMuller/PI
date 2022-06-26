const { Router } = require('express');
const { TypeDiet } = require('../db')
const { getAll, getRecipe } = require('../controllers/Controller')

const router = Router()

router.get('/', async (req, res) => {
    const typeDiets = await TypeDiet.findAll()
    const dietsType = typeDiets.map(el => el.name)
    if (!typeDiets.length > 0) {
        const recipes = await getAll()
        const diets = recipes.map(el => el.diets)

        diets.map(el => {
            el.forEach(element => {
                TypeDiet.findOrCreate({
                    where: { name: element }
                })
            });
        })
        const info = await TypeDiet.findAll()
        const dietsIf = info.map(el => el.name)
        res.send(dietsIf)
    } else {
        res.send(dietsType)
    }
})

    // try {
    //     const callApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results
    //     const getDiets = await callApi.map(recipe => recipe.diets).filter(e => e = e)
    //     console.log(getDiets)
    //     const diets = new Set(getDiets.flat())
    //     diets.forEach(async d => {
    //         if (d) {
    //             await TypeDiet.findOrCreate({
    //                 where: { name: d }
    //             })
    //         }
    //     })
    //     const allDiets = await TypeDiet.findAll()
    //     res.status(200).send(allDiets)
    // } catch (error) {
    //     res.status(400).send("ups...algo malio sal");
    // }
