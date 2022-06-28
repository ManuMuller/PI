import React from "react";
import { Link } from "react-router-dom";
import ".//Card.css";


export default function Card({ id, name, image, diets, score }) {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={name} />
            </div>
            <div className="card-content">
                <h3 className="cardName">{name}</h3>
                <p>Dietas: {diets}</p>
                <p>{score}</p>
            </div>
            <div className="card-action">
                <Link to={`/recipes/${id}`}>View Recipe</Link>
            </div>
        </div>
    )
}
