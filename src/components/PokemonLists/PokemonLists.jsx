import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import loadingImage from "../../assets/loading__.gif";

const PokemonLists = () => {

  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [prevUrl, setPrevUrl] = useState('')
  const [nextUrl, setNextUrl] = useState('')

  async function downloadPokemons() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl);

    setNextUrl(response.data.next)
    setPrevUrl(response.data.previous)

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
    setIsLoading(false);
    setPokemonList(pokeListResults);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <>
        <h2 className="text-white text-2xl mt-4 mb-2 tracking-[3px]  font-bold">List of Pokemons</h2>
      <div className="mt-2 flex gap-8 flex-wrap justify-center items-center pl-4 pr-4 pt-2 ">
        {isLoading ? (
          <img className="md:w-[700px] md:h-[450px] w-[300px] h-[400px] rounded-2xl" src={loadingImage} alt="" />
        ) : (
          pokemonList.map((p) => {
            return (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            );
          })
        )}
      </div>
      <div className="flex mt-6 gap-10 font-bold justify-center items-center ">
        <button className="pt-2 pb-2 pl-8 pr-8 cursor-pointer bg-black tracking-widest text-xl rounded-lg  text-white" disabled={prevUrl === null} onClick={() => setPokedexUrl(prevUrl)} >Prev</button>
        <button className="pt-2 pb-2 pl-8 pr-8 cursor-pointer bg-black tracking-widest text-xl rounded-lg  text-white" disabled={nextUrl === null} onClick={()=> setPokedexUrl(nextUrl)} >Next</button>
      </div>
    </>
  );
};

export default PokemonLists;
