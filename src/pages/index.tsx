import { getVotingOptions } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
const btn =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow min-w-32";

function Home() {
  const [pokemonIds, setPokemonIds] = useState(getVotingOptions());
  const [first, second] = pokemonIds;

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return null;
  }

  function voteForPokemon(pokemonId: number) {
    /* fire mutation to presiste data */
    setPokemonIds(getVotingOptions);
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Cuter?</div>
      <div className="p-4" />
      <div className="flex justify-between items-center">
        <div className="h-32 w-32 flex flex-col items-center">
          <img
            className="w-full"
            src={firstPokemon.data?.sprites.front_default!}
          />
          <button className={btn} onClick={() => voteForPokemon(second)}>
            {firstPokemon.data?.name}
          </button>
        </div>
        <div className="p-8">Vs</div>
        <div className="h-32 w-32 flex flex-col items-center">
          <img
            className="w-full"
            src={secondPokemon.data?.sprites.front_default!}
          />
          <button className={btn} onClick={() => voteForPokemon(second)}>
            {secondPokemon.data?.name}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
