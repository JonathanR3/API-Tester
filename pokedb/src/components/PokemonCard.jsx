import React, {useState, useEffect} from 'react';
import Palette from 'react-palette';

{/* Component that provides all pokemon sprites*/}
const PokemonCard = ({ name }) => {
    const [pokemonSprites, setSprites] = useState('');
    {/* Hook that connects to external API and retrieves every pokemon sprite as classified by name*/}
    useEffect(() => {
        async function fetchPokemonInfo() {
            try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                    const data = await response.json();
                    const isSprite = () => {
                        {data.sprites.front_default && setSprites(data.sprites.front_default) }
                    }
                    isSprite();
            }
            catch (error) {
                console.error(`Error Fetching ${name}'s Sprite`, error);
            }
        };

        fetchPokemonInfo();
        {/* Function called to fetch, and when new names are fetched, another call for sprites is done */}
    }, [name]);

    {/* darkMuted, darkVibrant, lightMuted, lightVibrant, muted, vibrant */}
    return (
        <Palette src = {pokemonSprites}>
            {({data, loading, error}) => (
                <div className = "pokemon-card" 
                style = {{
                    backgroundColor: data.vibrant,
                    boxShadow: `2px 2px 2px ${data.darkMuted}`,
                    border: `2px ${data.lightVibrant} solid`
                }}>
                    <h2 className = "pokemon-name">{name}</h2>
                    <img className = "pokemon-image" src={pokemonSprites} alt={name}/>
                </div>
            )}
        </Palette>
    );
};

export default PokemonCard;

