import React from "react";
import { Link } from "react-router-dom";


export default function Card(id, name, image, diets, healthScore) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={name} />
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p>{diets}</p>
                <p>{healthScore}</p>
            </div>
            <div className="card-action">
                <Link to={`/recipe/${id}`}>View Recipe</Link>
            </div>
        </div>
    )
}
