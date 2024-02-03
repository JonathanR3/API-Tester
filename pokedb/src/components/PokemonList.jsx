import React, {useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

{/* Component that provides all pokemon and generates cards with the names*/}
export default function PokemonList() {
    const max = 24;
    const [pokemonList, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);

    {/* Hook that connects to external API and retrieves every pokemon*/}
    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${max}&offset=${currentPage}`);
                const data = await response.json();
                setMaxPages(Math.ceil(data.count/max)-1);
                {/* Spread operator to append new pokemon to current list -> setList([...pokemonList,...data.results]);*/}
                setList(data.results);
            }
            catch (error) {
                console.error("Error Fetching Pokemon", error);
            }
        };
        fetchPokemon();
        {/* Function called to fetch, and empty array indicates only runs once upon mounting */}
    }, [currentPage]);

    const keyWordsRemove = ["build", "super", "small", "large", "meteor", "starter", "world-cap", "mode", "totem"];
    {/* Takes pokemon and maps each to an individual card component */}
    return (
        <div>
            <div className = "pokemon-list">
                <div className = "pokemon-cards">
                    {pokemonList.map((pokemon, index) => (
                        (!keyWordsRemove.some(str => pokemon.name.includes(str)) && <PokemonCard key = {index} name = {pokemon.name} />) 
                    ))}
                </div>
                <div className = "pagination">
                        <a href = "#" onClick={() => setCurrentPage(0)}>{'<<'}</a>    
                        <a href = "#" onClick={() => {currentPage/max > 0 ? setCurrentPage(currentPage - max) : console.log("Min Pages")}}>Prev</a>
                        <a id = "page-indicator">{(currentPage/max)+1}</a>
                        <a href = "#" onClick={() => {currentPage/max < maxPages ? setCurrentPage(currentPage + max) : console.log("Max pages")}}>Next</a>
                        <a href = "#" onClick={() => setCurrentPage(max*maxPages)}>{'>>'}</a>
                </div>
            </div>
        </div>
    );
}