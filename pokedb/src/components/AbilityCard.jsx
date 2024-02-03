import React, {useState, useEffect} from 'react';

const AbilityCard = ({ name }) => {
    const [abilityEffects, setEffects] = useState('');

    useEffect(() => {
        async function fetchAbilityEffect() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/ability/${name}/`);
                const data = await response.json();
                setEffects(data.effect_entries.effect);
            }
            catch (error) {
                console.error(`Error Fetching ${name}'s description`, error);
            }
        };
        fetchAbilityEffect();
    }, [name]);

    return (
        <div className = "ability-card">
            {abilityEffects.map((effect, index) => {
                <div key = {index}>
                    <h2 className = "ability-name">{name}</h2>
                    <p className = "ability-effect">{effect}</p>
                </div>
            })};
        </div>
    );
};

export default AbilityCard;