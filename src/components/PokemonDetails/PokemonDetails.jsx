import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://0pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex items-center flex-col">
      <h1 className="text-white text-2xl font-bold capitalize tracking-[5px]">
        Name: {pokemon.name}
      </h1>
      <div className=" p-6 m-8 rounded-full shadow-[rgba(247,255,117,0.75)_0px_0px_12px_4px] ">
      <img
        className="w-[300px] h-[300px] p-2 "
        src={pokemon.image}
        alt=""
      />
      </div>
      <div className="flex items-center gap-4">
        <p className="text-white text-2xl border-4 p-2 rounded-lg tracking-wider">
          Height: {pokemon.height}
        </p>
        <p className="text-white text-2xl border-4 border-gray-50 p-2 rounded-lg tracking-wider">
          Weight: {pokemon.weight}
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        {pokemon.types && pokemon.types.map((t) => <h4 className="bg-white p-2 pl-6 pr-6 text-center rounded-lg tracking-widest font-bold text-3xl capitalize" key={t}> {t} </h4>)}
      </div>
    </div>
  );
};

export default PokemonDetails;
