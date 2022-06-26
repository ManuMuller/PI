const { Router } = require('express');
const recipes = require('./Recipes.js')
const recipe = require('./CreateRecipe')
const diets = require('./Dietas')
// const diets = require('./Dietas1')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes)
router.use('/recipes', recipe)
// router.use('/diets', diets)
router.use('/diets', diets)
// router.use('/diets', diets)


module.exports = router;
