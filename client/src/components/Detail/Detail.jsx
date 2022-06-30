import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../../actions";
import './Detail.css';
import Nav from "../Nav/Nav";


export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const detail = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(resetDetail());
        }
    }, [dispatch, id]);

    return (
        <div>
            <Nav />
            <div>
                {
                    detail.name ?
                        <div className="recipe">
                            <img src={detail.image ? detail.image : detail.img}
                                alt='not found'
                            />
                            <h1>{detail.name}</h1>
                            <div className="grid">
                                <div>
                                    <h2>Tipo de plato</h2>
                                    <p>{detail.dishTypes ? detail.dishTypes : 'No definido'}</p>
                                </div>
                                <div>
                                    <h2>Tipos de dietas</h2>
                                    {detail.diets.map(el => el.name ? <p key={el.name}>{el.name + ' '}</p> : <p key={el}>{el + ' '}</p>)}
                                </div>
                                <div>
                                    <h2>Nivel de comida saludable</h2>
                                    <p>{detail.healthScore}</p>
                                </div>
                            </div>
                            <h2>Resumén del plato</h2>
                            <p className="resumen-paso" dangerouslySetInnerHTML={{ __html: detail.description }}></p>
                            <h2>Paso a paso</h2>
                            {detail.StepByStep?.map(el => <p className="resumen-paso" key={el}>{el}</p>)}
                        </div> : <img className="gif" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif" />
                }
            </div>
        </div>
        // <div className="detail">
        //     <Nav />
        //     <div className="detail-container">
        //         <div className="detail-image">
        //             <img src={detail.image} alt={detail.name} />
        //         </div>
        //         <div className="detail-content">
        //             <h3 className="detail-name">{detail.name}</h3>
        //             <p className="detail-description">{detail.description}</p>
        //             <div>
        //                 <h2>Tipos de dietas</h2>
        //                 {detail.diets.map(el => el.name ? <p key={el.name}>{el.name + ' '}</p> : <p key={el}>{el + ' '}</p>)}
        //             </div>
        //             <p className="resumen-paso" dangerouslySetInnerHTML={{ __html: detail.summary }}></p>
        //             <p className="detail-score">{detail.score}</p>
        //             <p className="detail-steps">Pasos: {detail.StepByStep}</p>
        //         </div>
        //     </div>
        // </div>
    )
}