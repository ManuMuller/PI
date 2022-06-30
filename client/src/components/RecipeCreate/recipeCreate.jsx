/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../actions/index";
import Nav from "../Nav/Nav";
import "./recipeCreate.css";

function validator(input) {
    let errors = {}

    if (!input.name || !/([a-zA-Z])\w+/g.test(input.name)) {
        errors.name = 'Nombre invalido'
    }
    if (!input.summary) {
        errors.summary = 'Es requerido un resumen del plato'
    }
    if (input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = 'Nivel de comida saludable debe estar entre 0 y 100'
    }

    return errors
}

export function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets)
    const [step, setStep] = useState('')
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        description: '',
        healthScore: 0,
        StepByStep: [],
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    let handleOnChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validator({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    let handleOnChangeStep = (e) => {
        setStep(e.target.value)
    }

    let handleRemoveStep = (e, el) => {
        e.preventDefault()
        setInput({
            ...input,
            StepByStep: input.StepByStep?.filter(ele => ele !== el)
        })
    }

    let handleAddStep = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            StepByStep: [...input.StepByStep, step]
        })
        setStep('')
    }

    let handleCheck = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else {
            setInput({
                ...input,
                diets: input.diets.filter(el => el !== e.target.value)
            })
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if (!input.name || !input.summary || input.healthScore < 0 || input.healthScore > 100) return alert('Formulario no valido')
        dispatch(postRecipe(input));
        alert('Receta creada');
        setInput({
            name: '',
            summary: '',
            healthScore: 0,
            preparation: [],
            diets: []
        })
        history.push("/home");
    }

    return (
        <>
            <Nav recipeCreate={false} search={false} />
            <div className="recipe-create">
                <h1>Create your recipe</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <label className="grid-label">Nombre: </label>
                        <input className="grid-input" type='text' name="name" value={input.name} onChange={(e) => handleOnChange(e)}></input>
                        {errors.name && (<p>{errors.name}</p>)}
                        <label className="grid-label">Resumen:</label>
                        <input className="grid-input" type='text' name="summary" value={input.summary} onChange={(e) => handleOnChange(e)}></input>
                        {errors.summary && (<p>{errors.summary}</p>)}

                        <label className="grid-label">Nivel de comida saludable: </label>
                        <input className="grid-input" type='number' name="healthScore" value={input.healthScore} onChange={(e) => handleOnChange(e)}></input>
                        {errors.healthScore && (<p>{errors.healthScore}</p>)}
                        <label className="grid-label">Paso a paso: </label>
                        <input className="grid-input" type='text' name="step" value={step} onChange={(e) => handleOnChangeStep(e)}></input>
                        <button className="grid-button" onClick={handleAddStep} >Agregar</button>
                        {input.StepByStep?.map(el => <><p className="grid-step">{el}</p><button className="grid-stepbutton" onClick={(e) => handleRemoveStep(e, el)}>Eliminar</button></>)}
                    </div>
                    <div className="grid-dietas">
                        <h3 className="grid-titulo">Tipo de dieta</h3>
                        {diets?.map(el => {
                            return (
                                <><div>
                                    <label><input
                                        onChange={e => handleCheck(e)}
                                        type='checkbox'
                                        name={el}
                                        value={el}
                                        key={el}
                                    ></input>{el}</label>
                                </div></>
                            )
                        })}
                    </div>
                    <button type="submit" >Crear</button>
                </form>
            </div>
        </>
    )
}

// export function RecipeCreate() {
//     const dispatch = useDispatch();
//     const diets = useSelector(state => state.diets);
//     const [recipe, setRecipe] = useState({
//         name: "",
//         img: "",
//         description: "",
//         healthScore: "",
//         StepByStep: "",
//         diets: [],
//     })

//     useEffect(() => {
//         dispatch(getDiets());
//     }, [dispatch]);

//     return (
//         <div>
//             <Nav />
//             <h1>Crea tu receta</h1>
//             <form>
//                 <div>
//                     <label>Nombre</label>
//                     <input type="text" name="name" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} />
//                 </div>
//                 <div>
//                     <label>Imagen</label>
//                     <input type="text" name="img" value={recipe.img} onChange={(e) => setRecipe({ ...recipe, img: e.target.value })} />
//                 </div>
//                 <div>
//                     <label>Descripcion</label>
//                     <input type="text" name="description" value={recipe.description} onChange={(e) => setRecipe({ ...recipe, description: e.target.value })} />
//                 </div>
//                 <div>
//                     <label>Puntuacion</label>
//                     <input type="number" name="healthScore" value={recipe.healthScore} onChange={(e) => setRecipe({ ...recipe, healthScore: e.target.value })} />
//                 </div>
//                 <div>
//                     <label>Pasos</label>
//                     <input type="text" name="StepByStep" value={recipe.StepByStep} onChange={(e) => setRecipe({ ...recipe, StepByStep: e.target.value })} />
//                 </div>
//                 <div>
//                     <label>Dietas</label>
//                     {diets?.map(el => {
//                         return (
//                             <><div>
//                                 <label><input
//                                     type='checkbox'
//                                     name={el}
//                                     value={el}
//                                     key={el}
//                                 ></input>{el}</label>
//                             </div></>
//                         )
//                     })}
//                 </div>
//             </form>
//         </div>
//     )
// }