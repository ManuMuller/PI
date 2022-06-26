import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landingBody">
            <div className="landingPage">
                <h1 className="title">no se como mierda llamar a esta pagina</h1>
                <Link to="/home" className="buttonHome">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
}
