import { getVotingOptions } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";

function Home() {
  const [pokemonIds, setPokemonIds] = useState(getVotingOptions());
  const [first, second] = pokemonIds;

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is cuter?</div>
      <div className="p-4" />
      <div className="border rounded p-8 flex justify-between items-center">
        <div className="h-32 w-32 flex flex-col items-center">
          <div className="capitalize">{firstPokemon.data?.name}</div>
          <img
            className="w-full"
            src={firstPokemon.data?.sprites.front_default}
          />
        </div>
        <div className="p-8">Vs</div>
        <div className="h-32 w-32 flex flex-col items-center">
          <div className="capitalize">{secondPokemon.data?.name}</div>
          <img
            className="w-full"
            src={secondPokemon.data?.sprites.front_default}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
