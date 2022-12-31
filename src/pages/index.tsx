import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const hello = trpc.hello.useQuery({ text: "pokemon" });

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center">
        <div className="h-16 w-16 bg-blue" />
        <div className="p-8">{hello.data.greeting}</div>
        <div className="h-16 w-16 bg-blue" />
      </div>
    </div>
  );
};

export default Home;
