
import './App.css';
import {useState} from "react";
import axios from 'axios';

const App = () => 
  {const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon,setPokemon] = useState({
    name:"",
    number:"",
    species:"",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
		type: ""
  });


  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        setPokemon({
          name:pokemonName,
          number:res.data.id,
          species:res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
					type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
        
      }
    );
  };

  return (
    <div className="App">
      <div class="titleSection">
        <h1> Pokédex </h1>
        <input type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          value = {pokemonName.toLowerCase()}
        />
        <div>
          {pokemonName && <button onClick={searchPokemon}> Buscar Pokemon </button>}
        </div>
      </div>
      <div class="displaySection">
          {!pokemonChosen ? (
            <h1 class="selectChoise">Por favor, elige un Pokemon</h1>
          ) : (
            <>
              <div class="pokemon__container">
                <div class="pokeinfo__container">
                  <h1> {pokemon.name}</h1>
                  <h3> #{pokemon.number}</h3>
                  <h3>Tipo: {pokemon.type}</h3>
                  <h4>Hp: {pokemon.hp}</h4>
                  <h4>Ataque: {pokemon.attack}</h4>
                  <h4>Defensa: {pokemon.defense}</h4>
                  <h4>Velocidad: {pokemon.speed}</h4>
                </div>
                <div class="img__container">
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
              </div>
            </>
          )
          }
      </div>
    </div>
  );
}


export default App;
