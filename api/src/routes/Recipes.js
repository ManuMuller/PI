const { Router } = require('express');
const { getAll, getRecipe, getDbInfo } = require('../controllers/controller');


const router = Router()


router.get('/', async (req, res) => {
    const { name } = req.query
    const allRecipes = await getAll()
    if (name) {
        const recipe = allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipe.length ?
            res.json(recipe) :
            res.status(404).json([`No se encuentran recetas que incluyan ${name}`])
    } else {
        res.json(allRecipes)
    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const recipe = await getRecipe(id)
    res.json(recipe)
})


module.exports = router