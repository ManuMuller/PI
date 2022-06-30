const { Router } = require('express');
const { Recipe, TypeDiet } = require('../db')
const { addDietas } = require('../controllers/controller.js')
const { API_KEY, API_KEY2 } = process.env

const router = Router()

router.post('/', async (req, res, next) => {
    let {
        name,
        img,
        description,
        healthScore,
        StepByStep,
        diets,
        createInDb
    } = req.body
    try {
        let createRecipe = await Recipe.create({
            name,
            img,
            description,
            healthScore,
            StepByStep,
            diets,
            createInDb
        })
        let dietTypeDb = await TypeDiet.findAll({ where: { name: diets } })
        createRecipe.addTypeDiet(dietTypeDb)
        res.status(200).send('receta creada')

    } catch (e) {
        next(e)
    }
});




module.exports = router