const { todasLasRecetasDB, recetasPorNameDB, recetasPorIDDB } = require('./controllersDB');
const { recetasPorIDAPI, todasLasRecetasAPI, recetasPorNameAPI } = require('./controllersAPI');


const todasLasRecetas = async () => {
    //const recetasDB = await todasLasRecetasDB();
    const recetasAPI = await todasLasRecetasAPI();
    const recetas = [...recetasAPI];
    return recetas;
}

const recetasPorName = async (name) => {
    //const recetasDB = await recetasPorNameDB(name);
    const recetasAPI = await recetasPorNameAPI(name);
    const recetas = [...recetasAPI];
    return recetas;
}

const recetasPorID = async (id, type) => {

    // try {
    //     let recetas
    //     if (type === 'db') {
    //         recetas = await recetasPorIDDB(id);
    //     }
    //     if (type === 'api') {
    //         recetas = await recetasPorIDAPI(id);
    //     }
    //     return recetas;
    // } catch (error) {
    //     throw new Error("No existe la receta :( IDREQ");
    // }
}






