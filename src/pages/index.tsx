import { getVotingOptions } from "@/utils/getRandomPokemon";
import type { InferGetServerSidePropsType, NextPage } from "next";

function Home(){
  const [first, second] = [1, 2];
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

export default Home;
