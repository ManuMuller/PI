/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, filterByDiet, filterCreated, orderByName } from "../../actions/index";
import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import "./Home.css"
import Paginado from "../Paginado/Paginado";
import Filters from "../Filters/Filters";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const [orden, setOrden] = useState("");
    const [render, setRender] = useState("");
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


    function paginado(pageNumber) {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    const handleFilterDiet = (e) => {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1);
        setRender(`Render ${e.target.value}`)
    }
    const handleSortName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado  ${e.target.value}`)
    }
    const handleSortScore = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado  ${e.target.value}`)
    }


    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getRecipes());
    }

    // const handleFilterDiet = (e) => {
    //     dispatch(filterByDiet(e.target.value));
    // }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setRender(`Render ${e.target.value}`)
    }

    return (
        <div className="home">
            <Nav />
            <Link to="/createrecipe">Crear Receta</Link>
            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <button className="recargarBoton" onClick={(e) => handleClick(e)}>Recargar</button>
            <select className="selectRecetas" onChange={e => handleSortName(e)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select className="orderScore" onChange={e => handleSortScore(e)}>
                <option value="mayor">Mayor</option>
                <option value="menor">Menor</option>
            </select>
            <select onChange={e => handleFilterDiet(e)}>
                <option value="All">Todas</option>
                <option value="vegan">Vegana</option>
                <option value="lacto ovo vegetarian">Ovolactovegetariano</option>
                <option value="pescatarian">Pescataria</option>
                <option value="gluten free">Sin Gluten</option>
                <option value="dairy free">Sin Lactosa</option>
                <option value="paleolithic">Paleolítica</option>
                <option value="primal">Primal</option>
                <option value="ketogenic">Ketogénica</option>
                <option value="fodmap friendly">FODMAP</option>
                <option value="whole 30">Whole30</option>
            </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value="All">Todas</option>
                <option value="created">Creadas</option>
                <option value="api">Existente</option>
            </select>
            <div className="cards">
                {currentRecipes?.map(el => {
                    return (
                        <div key={el.id} className="cards">
                            <Card
                                id={el.id}
                                score={el.healthScore}
                                name={el.name}
                                image={el.image ? el.image : el.img}
                                diets={typeof el.id === "number" ? el.diets : el.typeDiets.map(el => el.name).join(", ")}
                                key={el.id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}