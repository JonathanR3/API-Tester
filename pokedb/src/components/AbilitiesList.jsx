import { useEffect, useState } from "react";
import AbilityCard from "./AbilityCard";


export default function AbilitiesList() {
    const max = 100;
    const [abilitiesList, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);

    useEffect(() => {
        async function fetchAbilities() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/ability/?limit=${max}`);
                const data = await response.json();
                setMaxPages(Math.ceil(data.count/max)-1);
                setList(data.results);
            }
            catch (error) {
                console.error("Error Fetching Abilities", error);
            }
        };
        fetchAbilities();
    }, [currentPage]);

    return (
        <div>
            <div className = "abilities-list">
                <div className = "ability-cards">
                    {abilitiesList.map((ability, index) => {
                        <AbilityCard key = {index} name = {ability.name} />
                    })}
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