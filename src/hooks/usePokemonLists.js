import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonLists(){

    const [pokemonListData, setPokemonListData] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
        prevUrl: "",
        nextUrl: "",
      });
    
      async function downloadPokemons() {
        setPokemonListData((prev) => ({
          ...prev,
          isLoading: true,
        }));
        const response = await axios.get(pokemonListData.pokedexUrl);
    
        setPokemonListData((prev) => ({
          ...prev,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        }));
    
        const pokemonResults = response.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonResultPromise);
        const pokeListResults = pokemonData.map((pokeData) => {
          const pokemon = pokeData.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.front_shiny,
            types: pokemon.types,
          };
        });
        setPokemonListData((prev)=>({
          ...prev,
          isLoading: false,
          pokemonList: pokeListResults
        }))
      }
    
      useEffect(() => {
        downloadPokemons();
      }, [pokemonListData.pokedexUrl]);

      return  [pokemonListData, setPokemonListData] 
}

export default usePokemonLists