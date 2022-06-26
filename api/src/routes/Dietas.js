const { Router } = require('express');
const { getAll } = require('../controllers/controller');
const { Recipe, TypeDiet } = require('../db')

const router = Router()


router.get('/', async (req, res) => {
    const typeDiets = await TypeDiet.findAll()

    const dietsType = typeDiets.map(el => el.name)

    if (!typeDiets.length > 0) {

        const recipes = await getAll()

        const diets = recipes.map(el => el.diets)

        diets.map(el => {
            el.forEach(name => {
                TypeDiet.findOrCreate({
                    where: { name: name }
                })
            });
        })
        const info = await TypeDiet.findAll()
        const dietsInfo = info.map(el => el.name)
        res.send(dietsInfo)
    } else {
        res.send(dietsType)
    }
})


module.exports = router