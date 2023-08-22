import React from "react";
import Pokemon from "../Pokemon/Pokemon";
import loadingImage from "../../assets/loading__.gif";
import usePokemonLists from "../../hooks/usePokemonLists";

const PokemonLists = () => {

  const  [pokemonListData, setPokemonListData] = usePokemonLists()

  return (
    <>
      <h2 className="text-white text-2xl mt-4 mb-2 tracking-[3px]  font-bold">
        List of Pokemons
      </h2>
      <div className="mt-2 flex gap-8 flex-wrap justify-center items-center pl-4 pr-4 pt-2 ">
        {pokemonListData.isLoading ? (
          <img
            className="md:w-[700px] md:h-[450px] w-[300px] h-[400px] rounded-2xl"
            src={loadingImage}
            alt=""
          />
        ) : (
          pokemonListData.pokemonList.map((p) => {
            return (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            );
          })
        )}
      </div>
      <div className="flex mt-6 gap-10 font-bold justify-center items-center ">
        <button
          className="pt-2 pb-2 pl-8 pr-8 cursor-pointer bg-black tracking-widest text-xl rounded-lg  text-white disabled:bg-slate-800"
          disabled={pokemonListData.prevUrl === null}
          onClick={() => setPokemonListData((prev)=>({
            ...prev,
            pokedexUrl: pokemonListData.prevUrl
          }))}
        >
          Prev
        </button>
        <button
          className="pt-2 pb-2 pl-8 pr-8 cursor-pointer bg-black tracking-widest text-xl rounded-lg  text-white disabled:bg-slate-800"
          disabled={pokemonListData.nextUrl === null}
          onClick={() => setPokemonListData((prev)=>({
            ...prev,
            pokedexUrl: pokemonListData.nextUrl
          }))}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PokemonLists;







// **************** buttons
{/* <button
          className="pt-2 pb-2 pl-8 pr-8 cursor-pointer bg-black tracking-widest text-xl rounded-lg  text-white"
          disabled={pokemonListData.prevUrl === null}
          onClick={() => setPokedexUrl(prevUrl)}
        >
          Prev
        </button>
        <button
          className="pt-2 pb-2 pl-8 pr-8 cursor-pointer bg-black tracking-widest text-xl rounded-lg  text-white"
          disabled={pokemonListData.nextUrl === null}
          onClick={() => setPokedexUrl(nextUrl)}
        >
          Next
        </button> */}