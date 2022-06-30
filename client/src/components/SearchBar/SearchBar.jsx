import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipesName(name));
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by name"
                value={name}
                onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    );
}