import { AppRouter } from "@/server/router";
import { getVotingOptions } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import Link from "next/link";
import type React from "react";
const btn =
  "capitalize text-accent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow min-w-32";

const Home = () => {
  const [pokemonIds, setPokemonIds] = useState(getVotingOptions());
  const [first, second] = pokemonIds;

  const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: second });

  const voteMutation = trpc.castVote.useMutation();

  function voteForPokemon(pokemonId: number) {
    if (pokemonId === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    setPokemonIds(getVotingOptions);
  }

  if (
    firstPokemon.isLoading ||
    !firstPokemon.data ||
    secondPokemon.isLoading ||
    !secondPokemon.data
  ) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center ">
        <div className="text-3xl lg:text-4xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-3xl lg:text-4xl font-bold text-center">
        Which <span className="text-accent">Pokémon</span> is Cuter?
      </div>
      <div className="p-2" />
      <div className="flex justify-between items-center">
        <PokemonListing
          pokemon={firstPokemon.data}
          vote={() => voteForPokemon(first)}
        />
        <div className="p-4">Vs</div>
        <PokemonListing
          pokemon={secondPokemon.data!}
          vote={() => voteForPokemon(second)}
        />
      </div>
      <div className="absolute bottom-16">
        <div className="capitalize hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow min-w-32">
          <Link href="/results">Top 10</Link>
        </div>
      </div>
    </div>
  );
};

type PokemonFromServer = inferRouterOutputs<AppRouter>["getPokemonById"];

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img
        className="h-32 w-32 lg:h-48 lg:w-48"
        src={props.pokemon.sprites.front_default!}
      />
      <button className={btn} onClick={() => props.vote()}>
        {props.pokemon.name}
      </button>
    </div>
  );
};

export default Home;
