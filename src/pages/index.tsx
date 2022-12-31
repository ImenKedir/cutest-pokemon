import { getVotingOptions } from "@/utils/getRandomPokemon";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { useState } from "react";

function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [pokemonIds, setPokemonIds] = useState(data);
  const [first, second] = pokemonIds;
  console.log(pokemonIds);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center">
        <div className="h-16 w-16 bg-blue">{first}</div>
        <div className="p-8">Vs</div>
        <div className="h-16 w-16 bg-blue">{second}</div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = getVotingOptions();
  return {
    props: {
      data,
    },
  };
}
export default Home;
