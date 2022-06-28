import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../../actions/index";
import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import "./Home.css"
import Paginado from "../Paginado/Paginado";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
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

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getRecipes());

    }

    return (
        <div className="home">
            <Nav />
            <Link to="/recipes">Crear Receta</Link>
            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <button className="recargarBoton" onClick={(e) => handleClick(e)}>Recargar</button>
            <select className="selectRecetas">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select>
                <option value="All">Todas</option>
                <option value="created">Creadas</option>
                <option value="api">Existente</option>
            </select>
            <div className="cards">
                {currentRecipes?.map(el => {
                    return (
                        <div key={el.id} className="cards">
                            <Card id={el.id} score={el.healthScore} name={el.name} image={el.image} diets={typeof el.id === "number" ? el.diets : el.typeDiets.map(el => el.name)} key={el.id} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}